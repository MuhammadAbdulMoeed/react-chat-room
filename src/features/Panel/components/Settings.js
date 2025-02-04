import React, {useRef, useState} from 'react';
import {useGlobal} from "reactn";
import "./Settings.sass";
import {FiCalendar, FiMessageCircle, FiStar, FiUsers, FiSearch} from 'react-icons/fi';
import {useToasts} from "react-toast-notifications";
import {useDispatch, useSelector} from "react-redux";
import upload from "../../../actions/uploadImage";
import Config from "../../../config";
import {FiEdit2} from "react-icons/fi";
import changePicture from "../../../actions/changePicture";
import {useHistory} from "react-router-dom";

const Settings = () => {
    const { addToast } = useToasts();
    const history = useHistory();

    const [user, setUser] = useGlobal('user');
    const setToken = useGlobal('token')[1];
    const setPanel = useGlobal('panel')[1];

    const fileInput = useRef(null);

    const change = async image => {
        const picture = await upload(image, null, () => {}, 'square');
        await changePicture(picture.data.image._id);
        const newUser = {...user, picture: picture.data.image};
        localStorage.setItem('user', JSON.stringify(newUser));
        await setUser(newUser);
    };

    const remove = async () => {
        await changePicture();
        const newUser = {...user, picture: undefined};
        localStorage.setItem('user', JSON.stringify(newUser));
        await setUser(newUser);
    };

    const logout = async () => {
        const username = user.username;
        localStorage.removeItem('token');
        await setToken(null);
        await setUser({});
        addToast(`User ${username} logged out!`, {
            appearance: 'success',
            autoDismiss: true,
        })
        history.replace("/login");
    };

    const notAvailable = name => {
        addToast(`The ${name} feature is not available yet.`, {
            appearance: 'warning',
            autoDismiss: true,
        })
    };

    const Picture = () => {
        if (user.picture)
            return <img src={`${Config.url || ''}/api/images/${user.picture.shieldedID}/256`} alt="Picture" className="picture"/>;
        else
            return <div className="img">{user.firstName.substr(0,1)}{user.lastName.substr(0,1)}</div>;
    };

    return (
        <div className="settings uk-flex uk-flex-column uk-padding-small">
            <input
                className="file-input"
                type="file"
                ref={fileInput}
                accept="image/*"
                onChange={e => change(e.target.files[0])}
            />
            <div className="picture uk-margin-small" onClick={() => fileInput && fileInput.current && fileInput.current.click()}>
                <Picture/>
                <div className="overlay">
                    <div className="text"><FiEdit2/></div>
                </div>
            </div>
            <button className="uk-margin-small-top uk-button uk-button-secondary" onClick={remove}>Remove Picture</button>
            <button className="uk-margin-small-top uk-button uk-button-secondary" onClick={logout}>Logout</button>
            {/* <button className="uk-margin-small uk-button uk-button-honey uk-button-large" onClick={() => setPanel('createGroup')}>Create Group</button> */}
        </div>
    );
}

export default Settings;

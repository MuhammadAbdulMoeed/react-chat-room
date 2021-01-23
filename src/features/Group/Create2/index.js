import React, {useRef, useState} from 'react';
import {useGlobal} from "reactn";
import "./Create.sass";
import TopBar from "./components/TopBar";
import search from "../../../actions/search";
import Config from "../../../config";
import {FiEdit2} from "react-icons/all";
import {useDispatch, useSelector} from "react-redux";
import upload from "../../../actions/uploadImage";
import createGroup from "../../../actions/createGroup";
import createRoom from "../../../actions/createRoom";
import Actions from "../../../constants/Actions";
import {useHistory, useLocation} from "react-router-dom";

const Panel = () => {
    const dispatch = useDispatch();
    const setPanel = useGlobal('panel')[1];
    const searchText = useGlobal('search')[0];
    const [newGroupUsers, setNewGroupUsers] = useGlobal('newGroupUsers');
    const [searchResults, setSearchResults] = useGlobal('searchResults');
    const fileInput = useRef(null);
    const [title, setTitle] = useGlobal('groupTitle');
    const [error, setError] = useState(false);
    const [groupPicture, setGroupPicture] = useGlobal('groupPicture');

    const history = useHistory();
    const location = useLocation();

    const GroupPicture = ({picture}) => {
        if (picture)
            return <img src={`${Config.url || ''}/api/images/${picture.shieldedID}/256`} alt="Picture" className="picture"/>;
        else
            return <div className="img">{(title && title.length > 0) ? title.substr(0, 1) : 'G'}</div>;
    };

    const changePicture = async image => {
        const picture = await upload(image, null, () => {}, 'square');
        setGroupPicture(picture.data.image);
    };

    const create = async e => {
        e.preventDefault();
        if (!title || title.length === 0) return setError(true);
        setError(null);
        const res = await createGroup({people: newGroupUsers, picture: groupPicture, title});
        const room = res.data;
        setPanel('standard');
        const target = `/room/${room._id}`;
        history.replace(target);
    }

    return (
        <div className="group-create">
            <TopBar/>
            <button className="uk-button uk-button-large uk-button-primary create-button" onClick={create}>Create Group</button>
            <div className="selection-text error" hidden={!error}>
                Group name required!
            </div>
            <input
                className="file-input"
                type="file"
                ref={fileInput}
                accept="image/*"
                onChange={e => changePicture(e.target.files[0])}
            />
            <div style={{marginTop: 15}} className="picture" onClick={() => fileInput && fileInput.current && fileInput.current.click()}>
                <GroupPicture picture={groupPicture} />
                <div className="overlay">
                    <div className="text"><FiEdit2/></div>
                </div>
            </div>
            <input className="group-name" type="text" placeholder="Group name..." value={title} onChange={e => setTitle(e.target.value)} />
        </div>
    );
}

export default Panel;

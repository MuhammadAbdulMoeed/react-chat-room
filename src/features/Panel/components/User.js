import React, {useState} from 'react';
import "./Room.sass";
import {FiPlus, FiMessageSquare} from 'react-icons/fi';
import Picture from "../../../components/Picture";
import createRoom from "../../../actions/createRoom";
import {useHistory, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import Actions from "../../../constants/Actions";
import {useGlobal} from "reactn";

const Room = ({user}) => {
    const [hover, setHover] = useState(false);
    const [nav, setNav] = useGlobal('nav');

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const title = `${user.firstName} ${user.lastName}`.substr(0, 22);

    const chat = async () => {
        const res = await createRoom(user._id);
        setNav('rooms');
        const target = `/room/${res.data.room._id}`;
        dispatch({type: Actions.SET_ROOM, room: res.data.room});
        dispatch({type: Actions.SET_MESSAGES, messages: res.data.room.messages});
        if (location.pathname !== target) history.replace(target);
    };

    return (
        <div className="room uk-flex" onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} onClick={chat}>
            <div className="profile">
                <Picture user={user} />
            </div>
            <div className="text">
                <div className="title">{title}{title.length > 22 && '...'}</div>
            </div>
            <div className="controls" hidden={hover}>
                <div className="date">@{user.username}</div>
            </div>
            <div className="controls" hidden={!hover}>
                <div className="button">
                    <FiMessageSquare/>
                </div>
            </div>
        </div>
    );
}

export default Room;

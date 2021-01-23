import React, {useState} from 'react';
import "./User.sass";
import {FiPlusCircle, FiPhoneCall} from 'react-icons/fi';
import Picture from "../../../components/Picture";

const User = ({user, selected, onSelect}) => {
    const [hover, setHover] = useState(false);

    const title = `${user.firstName} ${user.lastName}`.substr(0, 22);

    return (
        <div className="room uk-flex" onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} onClick={onSelect}>
            <div className="profile">
                <Picture user={user} />
            </div>
            <div className="text">
                <div className="title">{title}{title.length > 22 && '...'}</div>
            </div>
            <div className="controls">
                <div className={`date${selected ? ' selected' : ''}`}>@{user.username}</div>
            </div>
            <div className="controls">
                <div className={`button${selected ? ' selected' : ''}`}>
                    {selected ? <FiPhoneCall/> : <FiPlusCircle/>}
                </div>
            </div>
        </div>
    );
}

export default User;

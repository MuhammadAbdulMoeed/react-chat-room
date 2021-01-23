import React, {useState, useRef, useEffect} from 'react';
import Message from "./Message";
import { Lightbox } from "react-modal-image";
import Config from "../../../config";
import {useGlobal} from "reactn";
import './Messages.sass';
import {useDispatch, useSelector} from "react-redux";
import getMoreMessages from "../../../actions/getMoreMessages";
import Actions from "../../../constants/Actions";
import striptags from "striptags";
import Picture from "../../../components/Picture";
import moment from "moment";

const Messages = () => {
    const user = useGlobal('user')[0];
    const messages = useSelector(state => state.io.messages) || [];
    const room = useSelector(state => state.io.room);
    const [loading, setLoading] = useState(false);
    const typing = useSelector(state => state.messages.typing)

    const dispatch = useDispatch();

    const chat = useRef(null);

    const [open, setOpen] = useState(null);

    let other = {
        firstName: 'A', lastName: 'A'
    };

    if (!room.isGroup && room.people) {
        room.people.forEach(person => {
            if (person._id !== user.id) other = person;
        });
    }

    const Messages = messages.map((message, index) => {
        return <Message
            key={message._id}
            message={message}
            previous={messages[index - 1]}
            next={messages[index + 1]}
            onOpen={setOpen}
        />;
    });

    const onScroll = () => {
        if (chat.current.scrollTop === 0) {
            if (loading) return;
            setLoading(true);
            getMoreMessages({roomID: room._id, firstMessageID: messages[0]._id}).then(res => {
                console.log(res.data.messages)
                dispatch({type: Actions.MORE_MESSAGES, messages: res.data.messages});
                setLoading(false);
            }).catch(err => {
                setLoading(false);
            });
        }
    };


    useEffect(() => {
        if (chat.current) chat.current.scrollTop = chat.current.scrollHeight;
    }, [messages.length]);

    useEffect(() => {
        if (typing && chat.current) chat.current.scrollTop = chat.current.scrollHeight;
    }, [typing])

    return (
        <div className="messages-wrapper" ref={chat} onScroll={onScroll}>
            <div className="messages-container">
                {open && (
                    <Lightbox
                        medium={`${Config.url || ''}/api/images/${open.content}/1024`}
                        large={`${Config.url || ''}/api/images/${open.content}/2048`}
                        alt="Lightbox"
                        hideDownload={true}
                        onClose={() => setOpen(null)}
                    />
                )}
                {Messages}
                {typing && <div className="message left attach-previous">
                    <div className="picture">
                        <Picture user={other} />
                    </div>
                    <div className="content-x">
                        <div className="bubble bubble-left left" style={{width: 20}}>
                            <div id="wave">
                                <span className="dot"/>
                                <span className="dot"/>
                                <span className="dot"/>
                            </div>
                        </div>
                        <div className={`message-details left`} style={{color: "transparent"}}>-</div>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default Messages;

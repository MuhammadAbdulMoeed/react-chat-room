import React from 'react';
import {useGlobal} from "reactn";
import "./MeetingBar.sass";
import {useHistory} from "react-router-dom";

const MeetingBar = () => {
    const [meeting, setMeeting] = useGlobal('meetingID');
    const [over, setOver] = useGlobal('over');
    const [showPanel, setShowPanel] = useGlobal('showPanel');

    const history = useHistory();

    return (
        <div className="meeting-bar uk-flex uk-flex-center uk-flex-middle" onClick={() => {
            setShowPanel(false);
            setOver(true);
            history.replace('/meeting/' + meeting);
        }}>
            Go back to the meeting
        </div>
    );
}

export default MeetingBar;

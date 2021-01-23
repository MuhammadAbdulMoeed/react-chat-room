import React from 'react';
import Info from "./components/Info";
import Room from "./components/Room";
import "./Details.sass";
import {useHistory, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import TopBar from "./components/TopBar";
import {useGlobal} from "reactn";

const Details = () => {
    const location = useLocation();
    const room = useSelector(state => state.io.room);

    const history = useHistory();

    const back = () => history.replace('/room/' + room._id);

    const getComponent = () => {
        if (location.pathname.startsWith("/room") && room) return <Room/>;
        if (expand && room) return <Room/>;
        return <Info/>;
    }

    const expand = location.pathname.endsWith('/info');

    return (
        <div className={`details${expand ? ' expand' : ' uk-visible@l'}`}>
            {expand && <TopBar back={back} />}
            {getComponent(expand)}
        </div>
    );
}

export default Details;

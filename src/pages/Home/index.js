import React, {useEffect, useState} from 'react';
import Div100vh from 'react-div-100vh';
import CreateGroup from "../../features/Group/Create";
import CreateGroup2 from "../../features/Group/Create2";
import Panel from "../../features/Panel";
import Details from "../../features/Details";
import "./Home.sass";
import {useGlobal, getGlobal, setGlobal} from "reactn";
import Conversation from "../../features/Conversation";
import Meeting from "../../features/Meeting";
import Welcome from "../../features/Welcome";
import NotFound from "../../features/NotFound";
import {Route, Switch, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Admin from "../../features/Admin";

const Home = () => {
    const location = useLocation();

    const [over, setOver] = useGlobal('over');
    const showPanel = useGlobal('showPanel')[0];
    const showDetails = useGlobal('showDetails')[0];
    const panel = useGlobal('panel')[0];
    const callIncrement = useSelector(state => state.rtc.callIncrement);
    const callData = useSelector(state => state.rtc.callData);

    const history = useHistory();

    useEffect(() => {
        if (!callData) return;
        setGlobal({
            audio: true,
            video: false,
            callDirection: 'incoming',
            meeting: {_id: callData.meetingID},
        }).then(() => {
            history.replace('/meeting/' + callData.meetingID);
        });
    }, [callIncrement, callData])

    useEffect(() => {
        console.log(location.pathname)
        if (location.pathname !== '/') setOver(true);
    }, [location]);

    const getPanel = () => {
        switch (panel) {
            case 'createGroup':
                return <CreateGroup/>
            case 'createGroup2':
                return <CreateGroup2/>
            default:
                return <Panel/>
        }
    }

    return (
        <Div100vh>
            <div className="app">
                {showPanel && getPanel()}
                <div className={`main uk-flex uk-flex-column${over ? ' over' : ''}${over === false ? ' exit' : ''}`}>
                    <Switch>
                        <Route exact path="/" component={Welcome} />
                        <Route exact path="/admin" component={Admin} />
                        <Route exact path="/meeting/:id" component={Meeting} />
                        <Route exact path="/room/:id" component={Conversation} />
                        <Route exact path="/room/:id/info" component={Details} />
                        <Route path="/" component={NotFound} /> {/* Comment this line when Electron build */}
                        {/* <Route path="/" component={Welcome} />  Uncomment this line when Electron build */}
                    </Switch>
                </div>
                {!location.pathname.endsWith('/info') && (showDetails || !location.pathname.startsWith('/meeting')) && <Details/>}
            </div>
        </Div100vh>
    );
}

export default Home;

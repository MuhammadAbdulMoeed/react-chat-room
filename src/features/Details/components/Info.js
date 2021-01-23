import React from "react";
import './Info.sass';
import logo from '../../../assets/logo.png';
import Config from '../../../config';
import {useGlobal} from "reactn";

const Info = () => {
    const version = useGlobal('version')[0];

    return (
        <div className="info">
            <div className="top">
                <div className="logo">
                    <img src={logo} alt="Picture" />
                </div>
                <div className="text">
                    Welcome to {Config.appName || 'Clover'}!<br/><br/>
                    {Config.appName || 'Ivy Chat'} is a messaging platform.
                </div>
            </div>
            <div className="text">
                Copyright &copy; {Config.brand || 'IvyLab Technologies'}<br />
                v{version}
            </div>
        </div>
    );
};

export default Info;

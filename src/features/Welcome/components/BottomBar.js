import React from 'react';
import "./BottomBar.sass";
import placeholder from "../../../assets/placeholder.jpg";
import {FiMoreVertical, FiSettings} from 'react-icons/fi';
import {useGlobal} from "reactn";
import Config from "../../../config";

const BottomBar = () => {
    const version = useGlobal('version')[0];

    return (
            <div className="bottom-bar uk-flex uk-flex-between uk-flex-middle">
                <div className="nav uk-flex uk-flex-between uk-flex-middle">
                    <div className="button">
                        &copy; Copyright 2021 - <a href="https://schoolroomhelp.com" target="_blank">School Room Help</a> | All rights reserved.
                    </div>
                    <div className="button">
                        Powered by <a href="https://20thfloor.com" target="_blank">20thFloor Techease</a> since 2002-01-09
                    </div>
                    
                </div>
            </div>
    );
}

export default BottomBar;

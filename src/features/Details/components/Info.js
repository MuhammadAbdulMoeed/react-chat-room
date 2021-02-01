import React, { useState, createStore } from "react";
import './Info.sass';
import logo from '../../../assets/logo.png';
import Config from '../../../config';
import { setGlobal, useGlobal } from "reactn";
import getSchool from "../../../actions/getSchool";

const Info = () => {
    const version = useGlobal('version')[0];
    const [schoolData, setSchoolData] = useState(null)
    const [hasSchoolData, setHasSchoolData] = useState(false)
    if (!hasSchoolData) {
        getSchool('getInfo').then(data => {
            setSchoolData(data.data[0]);
            setHasSchoolData(true);
        })
    }


    function isValidUrl(url) {
        let regEx = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
        return regEx.test(url);
    }

    return (
        <div className="info">
            {schoolData && schoolData.name && <div className="top">
                <div className="logo">
                    <img className="img-fluid" src={isValidUrl('schoolData.logo') ? schoolData.logo : logo} alt="Picture" />
                </div>
                <div className="text">
                    Welcome to <br />{schoolData.name}
                </div>
            </div>}
            {/* <div className="text">
                Copyright &copy; {Config.brand || 'IvyLab Technologies'}<br />
                v{version}
            </div> */}
        </div>
    );
};

export default Info;

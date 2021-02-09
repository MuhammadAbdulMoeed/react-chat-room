import { setGlobal } from 'reactn';
import setAuthToken from "./actions/setAuthToken";
import initIO from "./actions/initIO";
import store from "./store";
import jwtDecode from 'jwt-decode';
import axios from "axios";
import Config from "./config";

const init = async () => {
    document.addEventListener('gesturestart', e => {
        e.preventDefault();
    });

    if (localStorage.getItem('app') !== 'SRH Chat 1.0.0') {
        localStorage.clear();
        localStorage.setItem('app', 'SRH Chat 1.0.0');
    }

    let token = localStorage.getItem('token');
    let userString = localStorage.getItem('user');
    let user = userString ? JSON.parse(userString) : null;

    if (token) {
        const decoded = jwtDecode(token);

        let result;
        let status
        try {
            const res = await axios({
                method: "post",
                url: (Config.url || '') + "/api/check-user",
                data: {id: decoded.id},
            });
            console.log('Check User Response',res);
            status=res.status;
            console.log('status code',status);
            result = res.data;
            if(status==200){
                if(result.user_type){
                    console.log("User Role",result.user_type);
                    localStorage.setItem("user_role",result.user_type);
                }
            }
        } catch (e) {
            console.log(e);
            result = null;
        }
        if(status==404){
            console.log("User not authorized");
        }
        if (!result || result.error) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("user_role");
            token = localStorage.getItem('token');
            userString = localStorage.getItem('user');
            user = userString ? JSON.parse(userString) : null;
        }
    }

    if (token) {
        setAuthToken(token);
        store.dispatch(initIO(token));
    }

    const state = {
        version: '1.0.0',
        entryPath: window.location.pathname,
        token,
        user: user || (token ? jwtDecode(token) : {}),
        rooms: [],
        searchResults: [],
        favorites: [],
        meetings: [],
        nav: 'rooms',
        search: '',
        over: null,
        isPicker: false,
        messages: [],
        streams: [],
        inCall: false,
        video: true,
        audio: true,
        audioStream: null,
        videoStream: null,
        screenStream: null,
        callStatus: null,
        counterpart: null,
        callDirection: null,
        meeting: null,
        showPanel: true,
        panel: 'standard',
        newGroupUsers: [],
    };

    setGlobal(state).then(() => console.log('Global state init complete!', state));
}

export default init;

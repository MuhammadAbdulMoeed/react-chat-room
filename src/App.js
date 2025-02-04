import React, { useEffect, useState } from 'react';
import { getGlobal, useGlobal } from 'reactn';
import { ToastProvider } from 'react-toast-notifications';
import './App.sass';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Config from './config';
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from 'jwt-decode';
import setAuthToken from "./actions/setAuthToken";
import initIO from "./actions/initIO";
import { setGlobal } from "reactn";
import { useToasts } from "react-toast-notifications";

const App = () => {
    const dispatch = useDispatch();
    const { addToast } = useToasts();
    const io = useSelector(state => state.io.io);
    const [loading, setLoading] = useState(true);
    const token = useGlobal('token')[0];
    const setStartingPoint = useGlobal('entryPath')[1];
    // setLoading(true);
    const toHome = token && <Redirect to="/" />;
    const toLogin = !token && <Redirect to="/login" />;

    //const redirectURL="https://www.schoolroomhelp.com/signin";
    const redirectURL="https://beta.schoolroomhelp.com/signin";

    if (!['dark', 'light'].includes(Config.theme)) Config.theme = 'light';

    useEffect(() => {

        if (!io || !getGlobal().user || !token) return;
        let focusCount = 0;
        let interval = setInterval(() => {
            if (!document.hasFocus()) {
                focusCount++;
                if (focusCount === 10) {
                    io.emit('status', { status: 'away' });
                }
            } else if (focusCount !== 0) {
                focusCount = 0;
                io.emit('status', { status: 'online' });
            }
            console.log('called1')
        }, 1000);
        return () => clearInterval(interval);
    }, [io, token]);

    useEffect(() => {
        return () => {
            try {
                console.log('called2')
                if (getGlobal().audioStream) getGlobal().audioStream.getTracks().forEach(track => track.stop());
            } catch (e) {
            }
            try {
                if (getGlobal().videoStream) getGlobal().videoStream.getTracks().forEach(track => track.stop());
            } catch (e) {
            }
        }
    }, []);

    if (!window.loaded) {
        setStartingPoint(window.location.pathname);
        const splitPath = window.location.pathname.split('/');
        const route = splitPath[1];
        const token = splitPath[2];
        console.log('Loaded');

        if(route === 'login' && !token){
            console.log('Route Login')
            window.location = redirectURL;
        }
        else if (route === 'login' && token && token.length > 20) {
            console.log("Route Login and Token")
            let decoded;
            try {
                        decoded = jwtDecode(token);
                        console.log('User',decoded);
                        if (typeof decoded !== 'object' || typeof decoded.id !== 'string'){
                            return
                        };
                        setAuthToken(token);
                        localStorage.setItem('token', token);
                        localStorage.setItem('user', JSON.stringify(decoded));
                        setGlobal({
                            user: decoded,
                            token,
                        }).then(() => {
                            dispatch(initIO(token));
                        });
                        console.log("Login Successfully")
                        console.log("Redirecting to Home")
                    } catch (e) {
                        addToast("Invalid token provided in URL. You can still login manually.", {
                            appearance: 'error',
                            autoDismiss: true,
                        });
                    }
        }
        else{
            console.log("Route Not Found")
            var token_local=localStorage.getItem('token',null);
            console.log('Checking Token');
            if(!token_local){
                console.log('Token not available');
                console.log("Redirecting to SRH Login Page")
                window.location=redirectURL;
            }else{
                console.log('Token available');
                console.log("Redirecting to Home");
                // history.push('/');
            }
        }




        // if (route === 'login' && token && token.length > 20) {
        //     console.log('called4')
        //     // setLoading(false);
        //     let decoded;
        //     console.log(route, token);
        //     try {
        //         decoded = jwtDecode(token);
        //         console.log(decoded);
        //         if (typeof decoded !== 'object' || typeof decoded.id !== 'string'){
        //             return
        //         };
        //         setAuthToken(token);
        //         localStorage.setItem('token', token);
        //         localStorage.setItem('user', JSON.stringify(decoded));
        //         setGlobal({
        //             user: decoded,
        //             token,
        //         }).then(() => {
        //             dispatch(initIO(token));
        //         });
        //     } catch (e) {
        //         addToast("Invalid token provided in URL. You can still login manually.", {
        //             appearance: 'error',
        //             autoDismiss: true,
        //         });
        //     }
        // }
        // else if(route === 'login'){
        //     console.log('called5')
        //     window.location = redirectURL;
        // }
        //  else {
        //     window.location = redirectURL;
        // }
        window.loaded = true
    }

    return (
        loading ? <div className={`theme ${Config.theme}`}>
            <Router>
                <Switch>
                    <Route path="/login">
                        {toHome}
                    </Route>
                    <Route path="/">
                        {toLogin}
                        {!toLogin && <Home />}
                    </Route>
                </Switch>
            </Router>
        </div> : <div />
    );
}

export default App;

import axios from "axios";
import Actions from "../constants/Actions";

const loadEmojis = () => dispatch => {
    /*axios.get("https://unpkg.com/emoji-datasource-apple@^3.0.0/img/apple/sheets/64.png")
        .then(res => dispatch({type: Actions.SET_EMOJI, sheet: res.data}));*/
};

export default loadEmojis;

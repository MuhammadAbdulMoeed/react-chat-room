import axios from "axios";
import Config from "../config";

const typing = (room, isTyping) => dispatch => {
    axios.post(`${Config.url || ''}/api/typing`, {room, isTyping}).then(res => {}).catch(err => {
        console.log(err);
    });
};

export default typing;

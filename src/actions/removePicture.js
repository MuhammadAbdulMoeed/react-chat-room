import axios from "axios";
import Config from "../config";

const removePicture = imageID => {
    return axios({
        method: "post",
        url: (Config.url || '') + '/api/picture/remove'
    });
};

export default removePicture;

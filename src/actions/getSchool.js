import axios from "axios";
import Config from "../config";

const getSchool = (token) => {

    return axios({
        method: "post",
        url: (Config.url || '') + "/api/school/find",
        data: { token }
    });
};

export default getSchool;

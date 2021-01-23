import Config from "../config";
import axios from 'axios'

const upload = (image, token, onProgress = () => {}, crop) => {
    const url = (Config.url || '') + '/api/upload';

    const data = new FormData();

    data.append('image', image, image.name);
    data.append('crop', crop);

    const config = {
        onUploadProgress: onProgress,
    };

    return axios.post(url, data, config);
};

export default upload;

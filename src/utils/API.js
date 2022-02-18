import axios from 'axios';
const { REACT_APP_BASEURL } = process.env;

const search = () => {
    return axios.get(`${REACT_APP_BASEURL}`);
}

export default search;
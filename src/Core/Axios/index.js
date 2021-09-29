import axios from 'axios';

export default axios.create({
    baseURL: "https://dando-server.herokuapp.com/"
});
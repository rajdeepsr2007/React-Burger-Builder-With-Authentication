import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://the-burger-builder-30e55-default-rtdb.firebaseio.com/'
});

export default instance;
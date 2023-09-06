import axios from 'axios';
import { EXPIRE_TIME } from 'constants/cache';

const now = new Date();
const expiry = now.getTime() + EXPIRE_TIME;

export const getSearchData = async keyword => {
  return await axios
    .get(`http://localhost:4000/sick?q=${keyword}`)
    .then(res => {
      const sessionData = {
        list: res.data,
        time: expiry,
      };
      sessionStorage.setItem(`${keyword}`, JSON.stringify(sessionData));
      return res.data;
    })
    .catch(e => alert(e))
    .finally(console.info('calling api'));
};

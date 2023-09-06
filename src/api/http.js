import axios from 'axios';

export const getSearchData = async keyword => {
  return await axios
    .get(`http://localhost:4000/sick?q=${keyword}`)
    .then(res => {
      sessionStorage.setItem(`${keyword}`, JSON.stringify(res.data));
      return res.data;
    })
    .finally(console.info('calling api'));
};

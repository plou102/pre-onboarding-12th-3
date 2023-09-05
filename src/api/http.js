import axios from 'axios';

export const getSearchData = () => {
  axios.get('/dummy/db.json').then(res => {
    console.info('calling api');
    return res.data;
  });
};

import axios from 'axios';

export const fetchUser = () => {
  return axios.get('/api/user/getUser');
};

export const fetchLatestCryptocurrency = () => {
  return axios.get('/api/cryptocurrency/latest');
};

export const fetchUserCryptocurrency = (username) => {
  return axios.get(`/api/user/crytocurrencies/${username}`);
};

export const userAddCryptocurrency = (username) => {
  return axios.get(`/api/user/add/crytocurrencies/${username}`);
};

export const userRemoveCryptocurrency = (username) => {
  return axios.get(`/api/user/remove/crytocurrencies/${username}`);
};

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

export const userAddCryptocurrency = (username,cryptocurrencies) => {
  return axios.post(`/api/user/add/crytocurrencies/${username}`,{cryptocurrencies:cryptocurrencies});
};

export const userRemoveCryptocurrency = (username,cryptocurrencies) => {
  return axios.post(`/api/user/remove/crytocurrencies/${username}`,{cryptocurrencies:cryptocurrencies});
};

import axios from 'axios';

export const fetchUser = () => {
  return axios.get('/api/user/getUser');
};

export const fetchLatestCryptocurrencies = () => {
  return axios.get('/api/cryptocurrencies/latest');
};

export const fetchUserCryptocurrencies = (username) => {
  return axios.get(`/api/user/cryptocurrencies/${username}`);
};

export const addCryptocurrenciesToUser = (username,cryptocurrencies) => {
  return axios.put(`/api/user/${username}`,{cryptocurrencies:cryptocurrencies});
};

export const removeCryptocurrenciesFromUser = (username,cryptocurrencies) => {
  return axios.put(`/api/user/${username}`,{cryptocurrencies:cryptocurrencies});
};

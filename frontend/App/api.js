import axios from 'axios';

export const fetchUser = () => {
  return axios.get('/api/user/getUser');
};

export const fetchLatestCryptocurrencies = () => {
  return axios.get('/api/cryptocurrencies/latest');
};

export const updateCryptocurrenciesByUser = (username,cryptocurrencies) => {
  return axios.put(`/api/user/${username}/cryptocurrencies`,{cryptocurrencies:cryptocurrencies});
};

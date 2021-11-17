import axios from 'axios';

export const apiData = async (url, data, method, token) => {
  const config = {
    withCredentials: true,
    headers: { Authorization: localStorage.getItem('token-admin') },
  };
  if (method === 'GET') {
    const getData = await axios.get(url, config);
    return getData.data;
  } else if (method === 'POST') {
    const postData = await axios.post(url, data, config);
    return { data: postData.data, token: postData.headers['authorization'] };
  } else if (method === 'PUT') {
    const putData = await axios.put(url, config);
    return putData.data;
  } else if (method === 'DELETE') {
    const deleteData = await axios.delete(url);
    return deleteData.data;
  }
};

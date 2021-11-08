import axios from 'axios';

export const apiData = async (url, data, method) => {
  if (method === 'GET') {
    const getData = await axios.get(url);
    return getData.data;
  } else if (method === 'POST') {
    const postData = await axios.post(url, data);
    return postData.data;
  } else if (method === 'PUT') {
    const putData = await axios.put(url, data);
    return putData.data;
  } else if (method === 'DELETE') {
    const deleteData = await axios.delete(url);
    return deleteData.data;
  }
};

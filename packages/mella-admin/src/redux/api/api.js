import axios from 'axios';

export const apiData = async (url, data, method) => {
  if (method === 'GET') {
    const getData = await axios.get(url, {
      withCredentials: true,
    });
    return getData.data;
  } else if (method === 'POST') {
    const postData = await axios.post(url, data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return postData.data;
  } else if (method === 'PUT') {
    const putData = await axios.put(url, data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return putData.data;
  } else if (method === 'DELETE') {
    const deleteData = await axios.delete(url, {
      withCredentials: true,
    });
    return deleteData.data;
  }
};

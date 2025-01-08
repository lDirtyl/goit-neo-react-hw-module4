import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/';

axios.defaults.headers['Authorization'] =
  'Client-ID 8wPQUsYRAEslZL8o2RdsRXiY60r6FJVWq9Od5sq9vU4';

  export const getPhotos = async (name, page=0, perpage=12) => {
    const response = await axios.get(`/search/photos?query=${name}&page=${page}&per_page=${perpage}`);
    return response.data;
  };
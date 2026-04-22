import axios from 'axios';

const api = axios.create({baseURL: 'http://localhost:3000',})

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if(token){
    config.headers.Authorization = `Bearer ${token}`;
    }
    return config
})

api.interceptors.response.use(
  
  (response) => {
    const novoToken = response.headers['authorization']?.split(' ')[1];

    console.log('----------------------------');
    console.log(localStorage.getItem('token'));
    console.log('----------------------------');


    if(novoToken){
      localStorage.setItem('token',novoToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${novoToken}`;

    }
    return response;
  },

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/#/login';
    }

    return Promise.reject(error);
  }
);

export default api;
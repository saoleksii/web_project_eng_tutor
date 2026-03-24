import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8000/api'
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(
            `${error.config.method.toUpperCase()} ${error.config.url}`,
            '\nStatus:', error.response?.status,
            '\nMessage:', error.response?.data?.message || error.message
        )
        const isLoginRoute = error.config.url.includes('/auth/login')
        if (error.response?.status === 401 && !isLoginRoute) {
            localStorage.clear();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default instance
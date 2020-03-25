import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';


const options: AxiosRequestConfig = {
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
};

class RestClient {
    private readonly _restService: AxiosInstance;

    constructor(options: AxiosRequestConfig) {
        this._restService = axios.create(options);

        this._restService.interceptors.request.use(config => {
                const token = localStorage.getItem("access_token");
                if (token && !config.url?.includes("api/auth/login")) {
                    config.headers['Authorization'] = 'Bearer ' + token;
                }
                return config;
            },
            error => {
                Promise.reject(error)
            });
        this._restService.interceptors.response.use((response: AxiosResponse) => {
            let authorization = response.headers['authorization'];
            if(authorization) {
                let authorizationHeaders = authorization.split(" ");
                localStorage.setItem("access_token", authorizationHeaders[1]);
            }

            return response;
        }, (error: AxiosError) => {
            if (error.response && error.response.status === 401) {
                const originalRequest: AxiosRequestConfig = error.config;

                const authorization = originalRequest.headers['Authorization'];
                let authorizationHeaders = authorization && authorization.split(" ");

                if (authorization && authorizationHeaders.length === 2) {
                    localStorage.setItem("access_token", authorizationHeaders[1]);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authorizationHeaders[1];
                    return axios(originalRequest);
                }
            }
            return Promise.reject(error);
        });
    }

    get restService(): AxiosInstance {
        return this._restService;
    }
}

const restClient = new RestClient(options);

export default restClient.restService;
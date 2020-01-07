import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

const HTTP_STATUS_UNAUTHORIZED = 401;

const options: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: false,
};

class RestClient {
    private readonly _restService: AxiosInstance;

    constructor(options: AxiosRequestConfig) {
        this._restService = axios.create(options);
    }

    get restService(): AxiosInstance {
        return this._restService;
    }
}

const restClient = new RestClient(options);

export default restClient.restService;
import axios from 'axios'

class HttpService {
    public getApi(url: string): Promise<any>{
        return axios.get(url)
    }
}

 export const httpService = new HttpService()
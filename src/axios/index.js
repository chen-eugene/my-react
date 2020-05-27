import axios from 'axios'

export default class Axios {

    static ajax(options) {
        let baseApi = 'https://api.flickr.com';
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then((response) => {
                if (response.status === 200) {
                    let res = response.data;
                    if (res.stat === 'ok') {
                        resolve(res);
                    }
                } else {
                    reject(response.data);
                }
            })
        });
    }
}

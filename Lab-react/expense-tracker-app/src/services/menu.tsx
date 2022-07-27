import axios from 'axios';
import datalist from '../modal/dataList';

const getDataFromServer = () => {
    return axios.get<datalist>('http://localhost:3000/items').then(res => res.data);
}

const pushDataToServer = (newPurchase: Omit<datalist, 'id'>) => {
    return axios.post<datalist>('http://localhost:3000/items', newPurchase, {
        headers: {
            'Content-type': 'Application/json'
        }
    }).then(res => res.data);
}


export {
    getDataFromServer,
    pushDataToServer
}
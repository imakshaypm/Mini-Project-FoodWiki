import client from './client';

const getCategory = (id) => client.get('/categories', id)



export default {
    getCategory,
}
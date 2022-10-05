import client from './client';

const getUsersById = (list) => client.get("/getUser", list);

export default { 
    getUsersById
};
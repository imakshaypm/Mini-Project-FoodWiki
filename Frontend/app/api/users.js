import client from './client';

//const removeExtraSpace = (s) => s.trim().split(/ +/).join(' ');
const register = (userInfo) => client.post("/users", userInfo);

export default { register };
import client from './client';

const register = (pushToken) => client.post('/expoPushToken', { token: pushToken })

export default {
    register,
}
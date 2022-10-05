import clinet from './client';

const send = (message, listingId) => {
    clinet.post("/messages", {
        message,
        listingId
    });
}

export default {
    send,
}
import client from './client';

const endpoint = '/listings';
const verifyList = (list) => client.post("/verifyList", list)
const getUser = (userId) => client.get("/getUser", userId)
const getListings = (list) => client.get(endpoint, list);
const getSearch = (list) => client.get(endpoint, list)


const popListing = (listing) => {
    return client.post(endpoint, listing, {
            onUploadProgress: (progress) => console.log(progress)
    })
}

const removeExtraSpace = (s) => s.trim().split(/ +/).join(' ');

const addListing = (listing, loc, giver, onUploadProgress) => {
    const { category, description, images, title, phone, city, dishone, doneprice, dishtwo, dtwoprice, dishthree, dthreeprice } = listing
    const cityWS = removeExtraSpace(city)
    console.log(giver[0])
    const data = new FormData();
    data.append('title', title);
    data.append('dishone', dishone);
    data.append('doneprice', doneprice);
    data.append('dishtwo', dishtwo);
    data.append('dtwoprice', dtwoprice);
    data.append('dishthree', dishthree);
    data.append('dthreeprice', dthreeprice);
    data.append('userId', giver)
    data.append('city', cityWS);
    data.append('phone', phone);
    data.append('categoryId', category.value);
    data.append('description', description);
    data.append('location', JSON.stringify(loc));

    images.forEach((image, index) =>
        data.append('images', {
            name: 'image' + index,
            type: 'image/jpeg',
            uri: image
        })
    );
    
    return client.post(endpoint, data, {
        onUploadProgress: (progress) => onUploadProgress(progress.loaded / progress.total)
    });
}

export default {
    addListing,
    getListings,
    popListing,
    verifyList,
    getUser,
}
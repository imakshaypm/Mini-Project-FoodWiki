const listings = [
  {
    id: 201,
    title: "Nadan Thattukada",
    dishone: "Masala Dosa",
    doneprice: 30,
    dishtwo: "Nadan Chiken Curry",
    dtwoprice: 90,
    dishthree: "Beef Roast",
    dthreeprice: 120,
    images: [{ fileName: "nadan_thattukada" }],
    price: 100,
    categoryId: 5,
    userId: 1,
    location: {
      latitude: 8.691066131714795,
      longitude: 76.81993327346954,
    },
    phone: +919746662583,
    city: "Keezhattingal"
  },
  {
    id: 3,
    title: "Mehfil Multi Cuisine Restaurant",
    dishone: "Chicken Fried Rice",
    doneprice: 149,
    dishtwo: "Chilli Chicken",
    dtwoprice: 150,
    dishthree: "Beef Roast",
    dthreeprice: 120,
    images: [
      { fileName: "mehfil-attingal-no-1" },
      { fileName: "mehfil-attingal-no-2" }
    ],
    categoryId: 1,
    userId: 2,
    location: {
      latitude: 8.694823537777147,
      longitude: 76.81975609921189,
    },
    phone: 9048012345,
    city: "Keezhattingal"
  },
  {
    id: 1,
    title: "Sunset Restaurant",
    dishone: "Dum Biriyani",
    doneprice: 150,
    dishtwo: "Chiken Biriyani",
    dtwoprice: 90,
    dishthree: "Beef Roast",
    dthreeprice: 100,
    images: [
      { fileName: "Sunset_Restaurant_1" },
      { fileName: "Sunset_Restaurant_2" },
      { fileName: "Sunset_Restaurant_3" },
    ],
    categoryId: 1,
    userId: 1,
    location: {
      latitude: 8.736542199999999,
      longitude: 76.7032464,
    },
    phone: +919847280800,
    city: "Keezhattingal"
  },
  {
    id: 2,
    title: "Variety Thattukada",
    dishone: "Masala Dosa",
    doneprice: 30,
    dishtwo: "Nadan Chiken Curry",
    dtwoprice: 90,
    dishthree: "Beef Roast",
    dthreeprice: 120,
    images: [
      { fileName: "variety_thattukada_1" },
      { fileName: "variety_thattukada_2" }
    ],
    categoryId: 5,
    price: 100,
    userId: 2,
    location: {
      latitude: 8.5723216,
      longitude: 76.90658619999999,
    },
    phone: 8129238731,
    city: "Keezhattingal"
  },
  {
    id: 102,
    title: "Al Haja Family Restaurant",
    dishone: "Al Faham Half",
    doneprice: 284,
    dishtwo: "Chicken Roast",
    dtwoprice: 216,
    dishthree: "Beef Fry",
    dthreeprice: 169,
    images: [
      { fileName: "al_haja_1" },
      { fileName: "al_haja_2" }
    ],
    categoryId: 3,
    userId: 1,
    location: {
      latitude: 8.694656199999999,
      longitude: 76.8195283,
    },
    phone: +914702621202,
    city: "Keezhattingal"
  },
  {
    id: 101,
    title: "Astro Kitchen",
    dishone: "Monster Fries Chiken",
    doneprice: 320,
    dishtwo: "Spicy Bbq Burger",
    dtwoprice: 216,
    dishthree: "French Fries",
    dthreeprice: 169,
    images: [{ fileName: "astro_kitchen_1" }],
    categoryId: 3,
    userId: 1, 
    location: {
      latitude: 8.693170399555715,
      longitude: 76.82045514060493,
    },
    phone: 9995101018,
    city: "Keezhattingal"
  },
  {
    id: 4,
    title: "Hotel Aaramam",
    dishone: "Chilli Chicken",
    doneprice: 170,
    dishtwo: "Gobi Manchurian",
    dtwoprice: 149,
    dishthree: "Panner Masala",
    dthreeprice: 149,
    images: [{ fileName: "hotel-aramam-attingal-1" }],
    categoryId: 1,
    userId: 2,
    location: {
    latitude: 8.695886788990338,
      longitude: 76.81867714603291,
    },
    phone: 9447332505,
    city: "Keezhattingal"
  },
  {
    id: 6,
    title: "CENTRE HOTEL (Family Restaurant)",
    dishone: "Half Shawaya Combo",
    doneprice: 225,
    dishtwo: "Chicken Roast",
    dtwoprice: 149,
    images: [
      { fileName: "central_hotel_attingal_1" },
      { fileName: "central_hotel_attingal_2" },
    ],
    categoryId: 3,
    userId: 2,
    location: {
      latitude: 8.719811390360045,
      longitude: 76.81250116931297,
    },
    phone: 9747910551,
    city: "Keezhattingal"
  },
];

const popListings = (listing) => {
  listings.pop(listing)
}

/*const addListing = (listing) => {
  listing.id = listings.length + 1;
  listings.push(listing);
};*/

const getListings = () => listings;

/*const getListing = (id) => listings.find((listing) => listing.id === id);*/

const filterListings = (predicate) => listings.filter(predicate);

module.exports = {
  /*addListing,*/
  getListings,
  /*getListing,*/
  filterListings,
  popListings,
};

const users = [
  {
    id: 1,
    name: "Akshay P M",
    email: "akshay@domain.com",
    password: "12345",
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    }, 
    city:"Keezhattingal"
  },
  {
    id: 2,
    name: "John",
    email: "john@domain.com",
    password: "12345",
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    city: "Attingal"
  },
];

const getUsers = () => users;

const getUserById = (id) => users.find((user) => user.id === id);

const getUserByEmail = (email) => users.find((user) => user.email === email);

const getUserByLocation = (location) => users.find((user) => user.location === location)

const addUser = (user) => {
  console.log("UserStore: "+user)
  user.id = users.length + 1;
  users.push(user);
};

module.exports = {
  getUsers,
  getUserByEmail,
  getUserById,
  getUserByLocation,
  addUser,
};

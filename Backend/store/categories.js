const categories = [
  {
    id: 1,
    name: "Veg",
    icon: "food-variant",
    backgroundColor: "#fc5c65",
    color: "white"
  },
  {
    id: 2,
    name: "Non-Veg",
    icon: "food",
    backgroundColor: "#fd9644",
    color: "white"
  },
  {
    id: 3,
    name: "Both",
    icon: "food-takeout-box",
    backgroundColor: "#fed330",
    color: "white"
  },
  {
    id: 4,
    name: "Other",
    icon: "application",
    backgroundColor: "#778ca3",
    color: "white"
  }
];

const getCategories = () => categories;

const getCategory = (id) =>  categories.find(c => c.id === id);

module.exports = {
  getCategories,
  getCategory
};

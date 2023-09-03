const products = [
  { product: "banana", price: "2" },
  { product: "mango", price: 6 },
  { product: "potato", price: " " },
  { product: "avocado", price: "8" },
  { product: "coffee", price: 10 },
  { product: "tea", price: "" },
];

//logs each item name to the console
const itemName = products.forEach((item) => {
  console.log(item.product);
});

//filters out names with 5 or more characters
const filterName = products.filter((item) => item.product.length <= 5);

//converts prices to numbers, removes items from array & calculates combined price
const filterPrice = products
  .filter((item) => item.price !== "" && !isNaN(item.price))
  .map((item) => ({ ...item, price: Number(item.price) }))
  .reduce((total, item) => total + item.price, 0);

//combines all product names
const combine = products.reduce(
  (names, item) => names + " " + item.product,
  ""
);

//calculates highest & lowest priced items
const { highestCost, lowestCost } = products.reduce(
  (acc, product) => {
    if (product.price > acc.highestPrice) {
      acc.highestPrice = product.price;
      acc.highestCost = product.product;
    }
    if (product.price < acc.lowestPrice) {
      acc.lowestPrice = product.price;
      acc.lowestCost = product.product;
    }
    return acc;
  },
  { highestPrice: -Infinity, lowestPrice: Infinity }
);

//changing the names of the object keys
const newNames = products.reduce((acc, item) => {
  const newItem = Object.entries(item).reduce((obj, [key, value]) => {
    if (key === "product") {
      obj.name = value;
    } else if (key === "price") {
      obj.cost = value;
    } else {
      obj[key] = value;
    }
    return obj;
  }, {});
  acc.push(newItem);
  return acc;
}, []);

console.log(filterName, filterPrice, combine, {
  highestCost,
  lowestCost,
  newNames,
});

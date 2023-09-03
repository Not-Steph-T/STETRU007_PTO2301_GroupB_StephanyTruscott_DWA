const provinces = [
  "Western Cape",
  "Gauteng",
  "Northern Cape",
  "Eastern Cape",
  "KwaZulu-Natal",
  "Free State",
];

const names = [
  "Ashwin",
  "Sibongile",
  "Jan-Hendrik",
  "Sifso",
  "Shailen",
  "Frikkie",
];

//logs each name to the console
names.forEach((name) => {
  console.log(name);
});

//logs each name with a matching province to the console
names.forEach((arrName, i) => {
  const addProvince = provinces[i];
  console.log(arrName, addProvince);
});

//lowercase to uppercase
const upper = provinces.map((value) => {
  return value.toUpperCase();
});
console.log(upper);

//logs the amount of characters in each name
const newArray = names.map((value) => {
  return value.length;
});
console.log(newArray);

//sorts the provinces in alphabetical order
console.log(provinces.toSorted());

//filters provinces with the word "cape" & logs the value to the console
const provinceFilter = provinces.filter((char) => char.includes("Cape"));
const finalFiltered = provinceFilter.length;
console.log(finalFiltered);

//creates a boolean array with names containing an s
const hasS = names.map((name) =>
  name.split("").some((char) => char.toLowerCase() === "s")
);
console.log(hasS);

//match the names and provinces in one array
const individualProvince = names.reduce((acc, name, index) => {
  acc[name] = provinces[index];
  return acc;
}, {});
console.log(individualProvince);

//https://www.draw.io/#G1apOSc7jIZAEUIFt7ZIjJcm5InS0PDjvr

/*
MATERIALS
1. Understanding Asyncronomous JS
https://www.youtube.com/watch?v=8aGhZQkoFbQ
2. NODELIST
https://www.stefanjudis.com/blog/accessing-the-dom-is-not-equal-accessing-the-dom/
https://developer.mozilla.org/en-US/docs/Web/API/NodeList
*/

/*
CHALLENGES
1. event listener does not work on nodelist
*/

const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const inOrderBtn = document.querySelector("#inOrderBtn");
const anyPositionBtn = document.querySelector("#anyPositionBtn");
const arrowBtn = document.querySelector("#arrowBtn");
const display = document.querySelector(".search-result-display");
// get access to live node vs static node
const countryItems = display.childNodes;
let allCountryArr = [];
let onDisplayCountries = [];
//Identifier to check ascending and descending orders
let isItAtoZ = true;
// Temporal DOM storage for ascending and descending order display
const docFrag = document.createDocumentFragment();

const createCountryArr = () => {
  for (let i = 1; i < countryItems.length; i++) {
    allCountryArr.push(countryItems[i]);
  }
  return allCountryArr;
};

const filterDisplaidCountries = () => {
  onDisplayCountries = allCountryArr.filter(
    country => country.style.display === ""
  );
};

const clearDisplay = () => {
  for (let i = 1; i < countryItems.length; i++) {
    countryItems[i].style.display = "none";
  }
};

const createTempDOM = () => {
  onDisplayCountries.forEach(country => {
    let div = document.createElement("div");
    div.className = "countryTempItem";
    div.textContent = country.textContent;
    docFrag.appendChild(div);
    display.appendChild(docFrag);
  });
};

const removeDuplicatedDOM = () => {
  for (let i = 1; i < countryItems.length; i++) {
    for (let j = 1; j < countryItems.length; j++) {
      if (
        countryItems[i].textContent === countryItems[j].textContent &&
        countryItems[j].className === "countryTempItem"
      ) {
        display.removeChild(countryItems[j]);
      }
    }
  }
};

//get countries data
const getAllCountries = async () => {
  try {
    let countryRawData = await fetch("https://restcountries.eu/rest/v2/all");

    let countryData = await countryRawData.json();
    //countryData.reverse();
    let countryDisplay = await countryData.forEach(country => {
      for (let key in country) {
        if (key === "name") {
          let uiCountryName = country.name.toUpperCase();
          let newDiv = document.createElement("div");
          newDiv.textContent = uiCountryName;
          newDiv.className = "countryItem";
          display.appendChild(newDiv);
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
};

//show search result
const getSearchingCountries = input => {
  for (let i = 1; i < countryItems.length; i++) {
    let countryItemText = countryItems[i].textContent;

    if (countryItemText.includes(input) == true) {
      countryItems[i].style.display = "";
    } else {
      countryItems[i].style.display = "none";
    }
  }
};

const searchingCountriesInOrder = input => {
  for (let i = 1; i < countryItems.length; i++) {
    let countryItemText = countryItems[i].textContent;

    if (countryItemText.indexOf(input) == 0) {
      countryItems[i].style.display = "";
    } else {
      countryItems[i].style.display = "none";
    }
  }
};

//NODELIST
const arrangeAtoZ = () => {
  //in ascending order
  onDisplayCountries = onDisplayCountries.sort((a, b) => {
    let countryA = a.textContent;
    let countryB = b.textContent;

    if (countryA < countryB) {
      return -1;
    } else {
      return 1;
    }
  });
};

const arrangeZtoA = () => {
  onDisplayCountries = onDisplayCountries.sort((a, b) => {
    let countryA = a.textContent;
    let countryB = b.textContent;

    if (countryB < countryA) {
      return -1;
    } else {
      return 1;
    }
  });
};

//When DOM Loaded
document.addEventListener("DOMContentLoaded", function() {
  getAllCountries();
});

//In the input field
input.addEventListener("keyup", function() {
  let apiEnding = `name/${input.value.toLowerCase()}`;
  let userInput = input.value.toUpperCase();
  getSearchingCountries(userInput);

  // createCountryArr();
  // console.log(countryArr);
});

// When the Search in Order button is clicked
inOrderBtn.addEventListener("click", function() {
  let userInput = input.value.toUpperCase();
  searchingCountriesInOrder(userInput);
});

// When the Search in Order button is clicked
anyPositionBtn.addEventListener("click", function() {
  console.log(onDisplayCountries);
  let userInput = input.value.toUpperCase();
  getSearchingCountries(userInput);
});

//Sort button
arrowBtn.addEventListener("click", function() {
  // removeDuplicatedDOM();
  allCountryArr = [];
  onDisplayCountries = [];
  createCountryArr();
  filterDisplaidCountries();
  console.log(onDisplayCountries);
  //clearDisplay();

  if (isItAtoZ === true) {
    arrangeZtoA(); // undefined
    //console.log(onDisplayCountries);

    createTempDOM();
    isItAtoZ = false;
    console.log(countryItems);
  } else {
    arrangeAtoZ(); // undefined
    clearDisplay();
    //console.log(onDisplayCountries);
    createTempDOM();
    isItAtoZ = true;
    console.log(countryItems);
  }
});

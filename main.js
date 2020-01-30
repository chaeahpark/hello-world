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
let isItAtoZ = true;

//get countries data
const getAllCountries = async () => {
  try {
    let countryRawData = await fetch("https://restcountries.eu/rest/v2/all");

    let countryData = await countryRawData.json();
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

//show searching results (matching regarless of location)
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

// show searhing results (matching from the first location)
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

const removeTempDOM = () => {
  if (countryItems.length > 251) {
    onDisplayCountries.forEach(country => {
      display.removeChild(country);
    });
  }
  console.log(countryItems);
};

const createTempDOM = () => {
  onDisplayCountries.forEach(country => {
    let div = document.createElement("div");
    div.className = "countryTempItem";
    div.textContent = country.textContent;
    display.appendChild(div);
  });
};

// Arragne in ascending order
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

//Arrange in descending order
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

// ========== When DOM Loaded ========== //
document.addEventListener("DOMContentLoaded", function() {
  getAllCountries();
});

// ========== In the input field ========== //
input.addEventListener("keyup", function() {
  let apiEnding = `name/${input.value.toLowerCase()}`;
  let userInput = input.value.toUpperCase();
  getSearchingCountries(userInput);
  console.log(countryItems);
});

// ========== When the Search in Order button is clicked ========== //
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

// ========== Sort button ========== //
arrowBtn.addEventListener("click", function() {
  allCountryArr = [];
  onDisplayCountries = [];
  createCountryArr();
  filterDisplaidCountries();

  if (isItAtoZ === true) {
    arrangeZtoA();
    clearDisplay();
    createTempDOM();
    removeTempDOM();
    isItAtoZ = false;
  } else {
    arrangeAtoZ();
    clearDisplay();
    createTempDOM();
    removeTempDOM();
    isItAtoZ = true;
  }
});

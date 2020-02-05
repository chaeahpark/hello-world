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
let tempItems;

let isItAtoZ = true;

const createTempItem = () => {
  onDisplayCountries.forEach(country => {
    let div = document.createElement("div");
    div.className = "countryTempItem";
    div.innerHTML = country.innerHTML;
    display.appendChild(div);
  });

  tempItems = document.querySelectorAll(".countryTempItem");
};

const removeTempItem = () => {
  if (countryItems.length > 251 && tempItems !== "undefined") {
    for (let i = 0; i < tempItems.length; i++) {
      display.removeChild(tempItems[i]);
    }
  }
};

//get countries data
const getAllCountries = async () => {
  try {
    let countryRawData = await fetch("https://restcountries.eu/rest/v2/all");
    let countryData = await countryRawData.json();
    let countryDisplay = await countryData.forEach(country => {
      let { name, alpha2Code, capital, languages, population } = country;
      let langs = "";
      population = population.toLocaleString();

      //Extract languages
      const extractlang = () => {
        // If a country has only one language
        if (languages.length === 1) {
          for (let language of languages) {
            lang = language.name;
            langs = langs.concat(lang);
          }
        }
        //If a country has two or more languages
        else if (languages.length > 1) {
          for (let language of languages) {
            lang = language.name;
            langs = langs.concat(lang + ", ");
          }
          langs = langs.slice(0, langs.length - 2);
        }
      };

      extractlang();
      console.log(langs);

      let uiCountryName = name.toUpperCase();
      let countryCode = alpha2Code.toLowerCase();
      let newDiv = document.createElement("div");
      let newImg = document.createElement("img");
      newDiv.textContent = uiCountryName;
      newDiv.className = "countryItem";
      newImg.setAttribute(
        "src",
        `https://www.countryflags.io/${countryCode}/flat/64.png`
      );
      newDiv.innerHTML = `<p class="countryInfo"><span class="countryName">${uiCountryName}</span> <br/>
      Capital: ${capital} <br/> 
      Languages: ${langs}<br/>
      Population: ${population}</p>`;
      newDiv.appendChild(newImg);
      display.appendChild(newDiv);
    });
  } catch (err) {
    console.log(err);
  }
};

//show searching results (matching regarless of location)
const getSearchingCountries = input => {
  for (let i = 1; i < countryItems.length; i++) {
    let countryItemText = countryItems[i].firstChild.firstChild.textContent;

    if (countryItemText.includes(input) == true) {
      countryItems[i].style.display = "";
    } else {
      countryItems[i].style.display = "none";
    }
  }
};

//TODO searchingCountries
// show searhing results (matching from the first location)
const searchingCountriesInOrder = input => {
  for (let i = 1; i < countryItems.length; i++) {
    let countryItemText = countryItems[i].firstChild.firstChild.textContent;
    console.log(countryItemText);
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
  let userInput = input.value.toUpperCase();
  removeTempItem();
  getSearchingCountries(userInput);
  console.log(countryItems);
});

// ========== When the Search in Order button is clicked ========== //
inOrderBtn.addEventListener("click", function(e) {
  e.preventDefault();
  let userInput = input.value.toUpperCase();
  // removeTempItem();
  searchingCountriesInOrder(userInput);
});

// When the Search in Order button is clicked
anyPositionBtn.addEventListener("click", function(e) {
  e.preventDefault();
  let userInput = input.value.toUpperCase();
  removeTempItem();
  getSearchingCountries(userInput);
});

// ========== Sort button ========== //
arrowBtn.addEventListener("click", function(e) {
  e.preventDefault();
  allCountryArr = [];
  onDisplayCountries = [];
  createCountryArr();
  filterDisplaidCountries();

  if (isItAtoZ === true) {
    arrangeZtoA();
    clearDisplay();
    createTempItem();
    isItAtoZ = false;
  } else {
    arrangeAtoZ();
    clearDisplay();
    createTempItem();
    isItAtoZ = true;
  }
});

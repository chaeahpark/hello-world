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

const removeTempDOM = () => {
  // if (countryItems.length > 251) {
  //   for (let i = 1; i < countryItems.length; i++) {
  //     console.log(countryItems[i]);
  //   }
  // }

  if (countryItems.length > 251) {
    onDisplayCountries.forEach(country => {
      display.removeChild(country);
    });
  }
  console.log(countryItems);
  /*
  if (countryItems.length > 251) {
    for (let i = 1; i < countryItems.length; i++) {
      console.log("loop through all");
      console.log(countryItems[i]);
      if (countryItems[i].className === "countryTempItem") {
        console.log("identify temp items");
        console.log(countryItems[i]);
        //display.removeChild(countryItems[i]);
        countryItems[i].parentNode.removeChild(countryItems[i]);
      }
    }
  }
  */
  /*
  if (countryItems.length > 251) {
    for (let i = 1; i < countryItems.length; i++) {
      if (countryItems[i].className === "countryTempItem") {
        let tempItem = document.querySelector(".coutryTempItem")
        display.removeChild(tempItem)
      }
      if (
        countryItems[i].textContent === "HONG KONG" ||
        countryItems[i].textContent ===
          "KOREA (DEMOCRATIC PEOPLE'S REPUBLIC OF)" ||
        countryItems[i].textContent === "REPUBLIC OF KOSOVO" ||
        countryItems[i].textContent === "KOREA (REPUBLIC OF)"
      ) {
        console.log("lets see");
        console.log(countryItems[i]);
      }
    }
  }
  */
};

const createTempDOM = () => {
  onDisplayCountries.forEach(country => {
    let div = document.createElement("div");
    div.className = "countryTempItem";
    div.textContent = country.textContent;
    display.appendChild(div);
  });
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
  console.log(countryItems);

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
  allCountryArr = [];
  onDisplayCountries = [];
  createCountryArr();
  filterDisplaidCountries();
  //console.log(onDisplayCountries);

  if (isItAtoZ === true) {
    arrangeZtoA(); // undefined
    //console.log(onDisplayCountries);
    clearDisplay();
    createTempDOM();
    console.log("after createtemp");
    console.log(countryItems);

    removeTempDOM();
    // console.log("after remove temp");
    // console.log(countryItems);
    isItAtoZ = false;
  } else {
    arrangeAtoZ(); // undefined
    clearDisplay();
    createTempDOM();

    // console.log("after createtemp");
    console.log(countryItems);
    removeTempDOM();
    isItAtoZ = true;
  }
  /*erase bottom*/

  // console.log("after remove");
  // for (let i = 1; i < countryItems.length; i++) {
  //   console.log(countryItems[i]);
  // }
});

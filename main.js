// Set global varialbes.
const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const countryBtn = document.querySelector("#countryBtn");
const capitalBtn = document.querySelector("#capitalBtn");
const populationBtn = document.querySelector("#populationBtn");
const display = document.querySelector(".search-result-display");
// Create nodelist from the display.
const countryItems = display.childNodes;
// Create an array from countryItems.
// (Refer to line:122)
let allCountryArr = [];
// Filter out coutries which is displaid on the webpage and then,
// put them in an array. (Refer to line:129)
// It is mainly used to apply sort functions.
let onDisplayCountries = [];
// Create the same array with onDisplayCountries.
let tempItems;
// Identifier for sort functions
let isItAtoZ = true;
let capitalAtoZ = false;
let population0to9 = false;

// Create a storage(array) for temporary items.
const createTempItem = () => {
  onDisplayCountries.forEach(country => {
    let div = document.createElement("div");
    div.className = "countryTempItem";
    div.innerHTML = country.innerHTML;
    display.appendChild(div);
  });

  tempItems = document.querySelectorAll(".countryTempItem");
};

// Remove the storage(array) for temporary items.
const removeTempItem = () => {
  if (countryItems.length > 251 && tempItems !== "undefined") {
    for (let i = 0; i < tempItems.length; i++) {
      display.removeChild(tempItems[i]);
    }
  }
};

// Fetch countries data
const getAllCountries = async () => {
  try {
    // Fetch data via api
    let countryRawData = await fetch("https://restcountries.eu/rest/v2/all");
    // Transform Json data into JS
    let countryData = await countryRawData.json();
    // Display countries on the browser with the data
    let countryDisplay = await countryData.forEach(country => {
      let { name, alpha2Code, capital, languages, population } = country;
      // Set the variable to extract language from an array of objects.
      let langs = "";
      // Transform population(type: number)
      // to redable number(type: string).
      let populationStr = population.toLocaleString();

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

      // Creating UI using the data created above.
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
      <span class="countryCapital">Capital: ${capital}</span> <br/> 
      Languages: ${langs}<br/>
      <span class="countryPopulation">Population: ${populationStr}</span></p>`;
      newDiv.appendChild(newImg);
      display.appendChild(newDiv);
    });
  } catch (err) {
    console.log("ERROR MESSAGE: " + err);
  }
};

// Show searching results (matching regarless of location)
const getSearchingCountries = input => {
  for (let i = 1; i < countryItems.length; i++) {
    let countryItemText = countryItems[i].firstChild.firstChild.textContent;
    // Check if the user input matches country name.
    // If it does, display items.
    if (countryItemText.includes(input) == true) {
      countryItems[i].style.display = "";
    }
    // If it does not, hide items.
    else {
      countryItems[i].style.display = "none";
    }
  }
};

// Put elements into allCountryArr.
const createCountryArr = () => {
  for (let i = 1; i < countryItems.length; i++) {
    allCountryArr.push(countryItems[i]);
  }
  return allCountryArr;
};

// Filter countries displaied on the browser.
const filterDisplaidCountries = () => {
  onDisplayCountries = allCountryArr.filter(
    country => country.style.display === ""
  );
};

// Clear up display.
const clearDisplay = () => {
  for (let i = 1; i < countryItems.length; i++) {
    countryItems[i].style.display = "none";
  }
};

//Arrange by country name
const arrangeByCountry = () => {
  if (isItAtoZ === true) {
    onDisplayCountries = onDisplayCountries.sort((a, b) => {
      let countryA = a.textContent;
      let countryB = b.textContent;

      if (countryA < countryB) {
        return -1;
      } else {
        return 1;
      }
    }); //sort out with onDisplayCountries
    clearDisplay();
    createTempItem();
    isItAtoZ = false;
  } else {
    onDisplayCountries = onDisplayCountries.sort((a, b) => {
      console.log(a.firstChild.children[2].textContent);
      let countryA = a.textContent;
      let countryB = b.textContent;

      if (countryB < countryA) {
        return -1;
      } else {
        return 1;
      }
    });
    clearDisplay();
    createTempItem();
    isItAtoZ = true;
  }
};

// Arrange by capital cities.
const arrangeByCapital = () => {
  // If capitalAtoZ is true, display in descending order.
  if (capitalAtoZ === true) {
    onDisplayCountries = onDisplayCountries.sort((a, b) => {
      let countryA = a.firstChild.children[2].textContent;
      let countryB = b.firstChild.children[2].textContent;

      if (countryB < countryA) {
        return -1;
      } else {
        return 1;
      }
    });
    clearDisplay();
    createTempItem();
    capitalAtoZ = false;
  }
  // If capitalAtoZ is false, display in ascending order.
  else if (capitalAtoZ === false) {
    onDisplayCountries = onDisplayCountries.sort((a, b) => {
      let countryA = a.firstChild.children[2].textContent;
      let countryB = b.firstChild.children[2].textContent;

      if (countryA < countryB) {
        return -1;
      } else {
        return 1;
      }
    });
    clearDisplay();
    createTempItem();
    capitalAtoZ = true;
  }
};

// Arrange by population.
const arrangeByPopulation = () => {
  // If countries are arranged in ascending order by population,
  // then rearrange in descending order.
  if (population0to9 === true) {
    onDisplayCountries = onDisplayCountries.sort((a, b) => {
      // Change population (type: string) to number(type: number)
      let populationA_text = a.firstChild.children[5].textContent;
      populationA_text = populationA_text.slice(11, populationA_text.length);
      populationA_text = populationA_text.replace(/\,/g, "");
      let populationA = Number(populationA_text);

      let populationB_text = b.firstChild.children[5].textContent;
      populationB_text = populationB_text.slice(11, populationB_text.length);
      populationB_text = populationB_text.replace(/\,/g, "");
      let populationB = Number(populationB_text);

      let countryA = populationA;
      let countryB = populationB;

      if (countryB < countryA) {
        return -1;
      } else {
        return 1;
      }
    });
    clearDisplay();
    createTempItem();
    population0to9 = false;
  }
  // If countries are arranged in descending order by population,
  // then rearrange in ascending order.
  else if (population0to9 === false) {
    onDisplayCountries = onDisplayCountries.sort((a, b) => {
      // Change population (type: string) to number(type: number)
      let populationA_Text = a.firstChild.children[5].textContent;
      populationA_Text = populationA_Text.slice(11, populationA_Text.length);
      populationA_Text = populationA_Text.replace(/\,/g, "");
      let populationA = Number(populationA_Text);

      let populationB_Text = b.firstChild.children[5].textContent;
      populationB_Text = populationB_Text.slice(11, populationB_Text.length);
      populationB_Text = populationB_Text.replace(/\,/g, "");
      let populationB = Number(populationB_Text);

      let countryA = populationA;
      let countryB = populationB;

      if (countryA < countryB) {
        return -1;
      } else {
        return 1;
      }
    });
    clearDisplay();
    createTempItem();
    population0to9 = true;
  }
};

// Event Listeners
// When DOM Loaded,
document.addEventListener("DOMContentLoaded", function() {
  getAllCountries();
});

// When a user put inputs.
input.addEventListener("keyup", function() {
  let userInput = input.value.toUpperCase();
  removeTempItem();
  getSearchingCountries(userInput);
});

// When the country button is clicked.
countryBtn.addEventListener("click", function(e) {
  e.preventDefault();
  allCountryArr = [];
  onDisplayCountries = [];
  createCountryArr(); //allCountryArr is created.
  filterDisplaidCountries(); //onDisplayCountries is created.
  arrangeByCountry();
});

// When capital button is clicked.
capitalBtn.addEventListener("click", function(e) {
  e.preventDefault();
  allCountryArr = [];
  onDisplayCountries = [];
  createCountryArr(); //allCountryArr is created.
  filterDisplaidCountries(); //onDisplayCountries is created.
  arrangeByCapital();
});

// When the Search in Order button is clicked
populationBtn.addEventListener("click", function(e) {
  e.preventDefault();
  allCountryArr = [];
  onDisplayCountries = [];
  createCountryArr(); //allCountryArr is created.
  filterDisplaidCountries();
  arrangeByPopulation();
});

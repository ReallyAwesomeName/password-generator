/*
FIXME:
unchecking all boxes 
*/
// Assignment Code
var generateBtn = document.querySelector("#generate");
var configureBtn = document.querySelector("#configure");
var showConfigHasRan = false;
// options with defaults
var options = {
  "Number of characters": 20,
  Lowercase: true,
  Uppercase: true,
  Numeric: true,
  Special: true,
};
var defaults = {
  "Number of characters": 20,
  Lowercase: true,
  Uppercase: true,
  Numeric: true,
  Special: true,
};

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

function generatePassword() {
  // TODO:high - learn how to make this cryptographically secure
  // generate a random password using specified options
  var chosenCharSet = "";
  var retVal = "";

  getConfig();

  // build chosen set of characters
  for (const [key, option_value] of Object.entries(window.options)) {
    if (option_value === false) continue;
    switch (key) {
      case "Lowercase":
        chosenCharSet += "abcdefghijklmnopqrstuvwxyz";
        break;
      case "Uppercase":
        chosenCharSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        break;
      case "Numeric":
        chosenCharSet += "0123456789";
        break;
      case "Special":
        chosenCharSet += "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";
        break;
      default:
        continue;
    }
  }
  // console.log(chosenCharSet);
  for (let i = 0; i < window.options["Number of characters"]; i++) {
    // random index
    randInt = Math.floor(Math.random() * (chosenCharSet.length - 1));
    retVal += chosenCharSet[randInt];
  }
  // console.log(retVal);
  return retVal;
}

function generateLabel(key) {
  // generate an HTML label for <key> element
  let label = document.createElement("label");
  label.setAttribute("for", key);
  let textContent = document.createTextNode(` ${key}`);
  label.appendChild(textContent);

  return label;
}

function showConfig() {
  // show options for password generation

  // check if options have already been displayed
  if (window.showConfigHasRan) return;

  // make unordered list where config options will be placed
  const ul = document.createElement("ul");
  const footer = document.getElementById("card-footer");
  footer.appendChild(ul);

  // create input/checkboxes for each configuration option
  for (const [key, option_value] of Object.entries(window.options)) {
    const li = document.createElement("li");
    li.setAttribute("style", "margin:1em");

    // num chars needs integer input instead of checkbox
    if (key === "Number of characters") {
      let input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("id", key);
      input.setAttribute("min", "8");
      input.setAttribute("max", "128");
      input.setAttribute("style", "max-width:3.5em");
      input.value = option_value;

      ul.appendChild(li);
      li.appendChild(input);
      li.appendChild(generateLabel(key));
    } else {
      // make the checkboxes for the rest
      let checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("id", key);
      checkbox.checked = option_value;

      ul.appendChild(li);
      li.appendChild(checkbox);
      li.appendChild(generateLabel(key));
    }
    window.showConfigHasRan = true;
  }
  return;
}

function getConfig() {
  // no changes - return and use default
  if (!window.showConfigHasRan) return;

  // get the custom config options for generatePassword()
  for (const [key, option_value] of Object.entries(window.options)) {
    current_element = document.getElementById(key);
    // TODO:low - can be made more versatile in case of other input types
    if (current_element.getAttribute("type") === "number") {
      // number of characters must be from 8 - 128
      if (current_element.value < 8 || current_element.value > 128) {
        current_element.value = defaults["Number of characters"];
        alert("Number of characters must be from 8 - 128");
        continue;
      } else {
        window.options[key] = current_element.value;
      }
    } else if (current_element.getAttribute("type") === "checkbox") {
      window.options[key] = current_element.checked;
    } else {
      // something went wrong
      console.log("getConfig() - error retrieving configuration");
      window.options = defaults;
      alert("Something went wrong when gathering your configuration");
      return;
    }
  }
  // FIXME:high - there must be a better way
  if (window.options.Lowercase === false && window.options.Uppercase === false && window.options.Numeric === false && window.options.Special === false) {
    window.options.Lowercase = true;
    window.options.Uppercase = true;
    window.options.Numeric = true;
    window.options.Special = true;
    alert("Must select at least one character group");
  }
  return;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Add event listener to configure button
configureBtn.addEventListener("click", showConfig);

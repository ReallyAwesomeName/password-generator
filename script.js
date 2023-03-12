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

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}
function generatePassword() {
  var retval;
  if (!window.showConfigHasRan) {
    // default configuration
    return;
  } else {
    // user defined configuration
    var retval = getConfig(window.options);
  }

  return retval;
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
  // get the custom config options for generatePassword()
  for (const [key, option_value] of Object.entries(window.options)) {
    current_element = document.getElementById(key);
    // if element type is number get value
    // else if element type is checkbox get checked
    if (current_element.getAttribute("type") === "number") {
      console.log("it a num");
      window.options[key] = current_element.value;
    } else if (current_element.getAttribute("type") === "checkbox") {
      console.log("it a checkbox");
      window.options[key] = current_element.checked;
    } else {
      console.log("error");
    }
  }
  console.log(window.options);

  return;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Add event listener to configure button
configureBtn.addEventListener("click", showConfig);

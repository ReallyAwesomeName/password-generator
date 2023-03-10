// Assignment Code
var generateBtn = document.querySelector("#generate");
var configureBtn = document.querySelector("#configure");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}
function generatePassword() {
  var retval;

  return retval;
}

function configPopup() {
  // prompt user for password criteria and return an object to use in generation
  var retval;
  var special;
  var options = [
    "Number of characters",
    "Lowercase",
    "Uppercase",
    "Numeric",
    "Special",
  ];
  // make unordered list where config options will be placed
  const ul = document.createElement("ul");
  const footer = document.getElementById("card-footer");
  footer.appendChild(ul);
  // create input/checkboxes for each configuration option
  for (element of options) {
    const li = document.createElement("li");
    li.setAttribute("style", "margin:1em");
    // num chars needs integer input instead of checkbox
    if (element === "Number of characters") {
      const input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("min", "8");
      input.setAttribute("max", "128");
      input.setAttribute("style", "max-width:3.5em");
      ul.appendChild(li);
      li.appendChild(input);
    } else {
      // make the checkboxes for the rest
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("id", element);
      li.appendChild(checkbox);

      const label = document.createElement("label");
      label.setAttribute("for", element);
      const textContent = document.createTextNode(` ${element}`);
      label.appendChild(textContent);

      ul.appendChild(li);
      li.appendChild(label);
    }
  }

  return retval;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Add event listener to configure button
configureBtn.addEventListener("click", configPopup);

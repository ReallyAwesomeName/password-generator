// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}
function generatePassword() {
  var retval;
  // user Xyz on stackoverflow https://stackoverflow.com/questions/1497481/javascript-password-generator#answer-29770068
  retval = window.crypto
    .getRandomValues(new BigUint64Array(4))
    .reduce(
      (prev, curr, index) =>
        (!index ? prev : prev.toString(36)) +
        (index % 2 ? curr.toString(36).toUpperCase() : curr.toString(36))
    )
    .split("")
    .sort(() => 128 - window.crypto.getRandomValues(new Uint8Array(1))[0])
    .join("");
  // end Xyz
  return retval;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

import { compose } from "redux";

function removeSpaces(string) {
  return string.split(" ").join("");
}

function repeatString(string) {
  //   return string + string;
  return string.repeat(2);
}

function convertToUppercase(string) {
  return string.toUpperCase(string);
}

// console.log(repeatString("abcd"));

// console.log(removeSpaces("dcvds  sfdgvfdvb  gffegbv   gfrfdvb"));

// console.log(convertToUppercase("abcd"));

// **************** To Apply all Function Once on Any String ********************

const input = "ab cd";

// const output = convertToUppercase(repeatString(removeSpaces(input)));

// console.log(output);

// OR | By Compose Method

const composeFunction = compose(removeSpaces, repeatString, convertToUppercase);

console.log(composeFunction); // [Function (anonymous)]   = It makes a function

console.log(composeFunction(input)); // ABCDABCD

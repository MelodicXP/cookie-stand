'use strict';


// ********** GLOBALS **************
//Creates window into HTML document to manipulate
let salesDataSection = document.getElementById('cookie-stands');
console.dir(salesDataSection);

let salesTableSection = document.getElementById('cookie-sales-table');

let hours = [
  '6am',
  '7am',
  '8am',
  '9am',
  '10am',
  '11am',
  '12pm',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
  '7pm',
  '8pm'
];

let allFranchiseStores = []; // store all franchise store objects

// ********** HELPER FUNCTIONS/UTILITES *********
function randomNumCust(min,max){
  //Got this from MDN docs
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function cookiesBoughtPerCust(numCust, cookies){
  return numCust * cookies;
}

// ********** CONSTRUCTOR FUNCTION **********

function FranchiseStore(name, minCust, maxCust, avgCookiesPerCust){
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookiesPerCust = avgCookiesPerCust;
  this.numOfCust = 0;
  this.cookiesBought = [];
  this.totalCookies = 0;
}

// ********** PROTOTYPE METHODS **********

FranchiseStore.prototype.getCookiesBought = function() {
  for(let i = 0; i < hours.length; i++) {
    this.numOfCust = randomNumCust(this.minCust, this.maxCust);
    // Placeholder 'cookies' in order to be adding it to the running total of 'totalCookies, and calls helper function cookiesBoughtPerCust()
    // Got Math.round() from MDN docs, used in order to get rid of decimals
    let cookies = cookiesBoughtPerCust(this.numOfCust, Math.round(this.avgCookiesPerCust));
    this.cookiesBought.push(cookies);
    this.totalCookies += cookies;
  }
};

FranchiseStore.prototype.render = function() {

  // Create <article> element
  let articleElem = document.createElement('article');
  // Add <article> element to the DOM
  salesDataSection.appendChild(articleElem);

  // Create <h2> element
  let h2Elem = document.createElement('h2');
  // Add text to <h2> element to display name of store
  h2Elem.textContent = this.name;
  // Attach <h2> element to <article> element
  articleElem.appendChild(h2Elem);

  // Create <ul> element
  let ulElem = document.createElement('ul');
  // Attach <ul> element to <h2> element
  articleElem.appendChild(ulElem);

  // For loop to create and attach <li> elements from cookiesBought[] array into <ul> element
  for(let i = 0; i < this.cookiesBought.length; i++) {
    let liElem = document.createElement('li');
    liElem.textContent = `${hours[i]}: ${this.cookiesBought[i]}`;
    ulElem.appendChild(liElem);
  }

  // Create <p> element to display total of cookies
  let pElem = document.createElement('p');
  // Add text to <p> element containing total of cookies
  pElem.textContent = `Total Cookies: ${this.totalCookies}`;
  ulElem.appendChild(pElem);


  // Create table
  let tableElem = document.createElement('table');
  salesTableSection.appendChild(tableElem);

  // Create row
  let row1 = document.createElement('tr');
  tableElem.appendChild(row1);

  // Create table header for name of store
  let th1Elem = document.createElement('th');
  th1Elem.textContent = this.name;
  row1.appendChild(th1Elem);

  // Create table data to display daily sales of cookies
  for(let i = 0; i < this.cookiesBought.length; i++) {
    let tdElem = document.createElement('td');
    tdElem.textContent = `${this.cookiesBought[i]}`;
    row1.appendChild(tdElem);
  }

  // Create table data total sales of each location
  let tdElem = document.createElement('td');
  tdElem.setAttribute('id', 'total-cookies'); //set id for styling
  tdElem.textContent = `${this.totalCookies}`;
  row1.appendChild(tdElem);


};

// ********** EXECUTABLE CODE **********

let seattle = new FranchiseStore('Seattle', 23, 65, 6.3);

// Push franchise store to the allFranchiseStores array
allFranchiseStores.push(seattle);

function renderAllStores(){
  for(let i = 0; i < allFranchiseStores.length; i++) {
    allFranchiseStores[i].getCookiesBought();
    allFranchiseStores[i].render();
  }
}

renderAllStores();

// ********** Class 06 Lab (old code) **********
// // ********** OBJECT LITERALS **********
// // Seattle Location
// let seattle = {
//   name: 'Seattle',
//   minCust: 23,
//   maxCust: 65,
//   numOfCust: 0,
//   avgCookiesPerCust: 6.3,
//   totalCookies: 0,
//   //Creates array to store cookies per hour of operation
//   cookiesBought: [],

//   // Pushed amount of cookies into cookiesBought[] array, and keeps running total of cookies.
//   getCookiesBought: function() {

//     for(let i = 0; i < hours.length; i++) {
//       this.numOfCust = randomNumCust(this.minCust, this.maxCust);
//       // Placeholder 'cookies' in order to be adding it to the running total of 'totalCookies, and calls helper function cookiesBoughtPerCust()
//       // Got Math.round() from MDN docs, used in order to get rid of decimals
//       let cookies = cookiesBoughtPerCust(this.numOfCust, Math.round(this.avgCookiesPerCust));
//       this.cookiesBought.push(cookies);
//       this.totalCookies += cookies;
//     }
//   },

//   //      ***** DOM MANIPULATION *****
//   // Function to render/display to sales.html
//   render: function () {

//     seattle.getCookiesBought();

//     // Create <article> element
//     let articleElem = document.createElement('article');
//     // Add <article> element to the DOM
//     salesDataSection.appendChild(articleElem);

//     // Create <h2> element
//     let h2Elem = document.createElement('h2');
//     // Add text to <h2> element to display name of store
//     h2Elem.textContent = this.name;
//     // Attach <h2> element to <article> element
//     articleElem.appendChild(h2Elem);

//     // Create <ul> element
//     let ulElem = document.createElement('ul');
//     // Attach <ul> element to <h2> element
//     articleElem.appendChild(ulElem);

//     // For loop to create and attach <li> elements from cookiesBought[] array into <ul> element
//     for(let i = 0; i < this.cookiesBought.length; i++) {
//       let liElem = document.createElement('li');
//       liElem.textContent = `${hours[i]}: ${this.cookiesBought[i]}`;
//       ulElem.appendChild(liElem);
//     }

//     // Create <p> element to display total of cookies
//     let pElem = document.createElement('p');
//     // Add text to <p> element containing total of cookies
//     pElem.textContent = `Total Cookies: ${this.totalCookies}`;
//     ulElem.appendChild(pElem);
//   }

// };

// // Tokyo Location
// let tokyo = {
//   name: 'Tokyo',
//   minCust: 3,
//   maxCust: 24,
//   numOfCust: 0,
//   avgCookiesPerCust: 1.2,
//   totalCookies: 0,
//   //Creates array to store cookies per hour of operation
//   cookiesBought: [],

//   // Pushed amount of cookies into cookiesBought[] array, and keeps running total of cookies.
//   getCookiesBought: function() {

//     for(let i = 0; i < hours.length; i++) {
//       this.numOfCust = randomNumCust(this.minCust, this.maxCust);
//       // Placeholder 'cookies' in order to be adding it to the running total of 'totalCookies, and calls helper function cookiesBoughtPerCust()
//       // Got Math.round() from MDN docs, used in order to get rid of decimals
//       let cookies = cookiesBoughtPerCust(this.numOfCust, Math.round(this.avgCookiesPerCust));
//       this.cookiesBought.push(cookies);
//       this.totalCookies += cookies;
//     }
//   },

//   //      ***** DOM MANIPULATION *****
//   // Function to render to sales data page
//   render: function () {

//     tokyo.getCookiesBought();

//     // Create <article> element
//     let articleElem = document.createElement('article');
//     // Add <article> element to the DOM
//     salesDataSection.appendChild(articleElem);

//     // Create <h2> element
//     let h2Elem = document.createElement('h2');
//     // Add text to <h2> element to display name of store
//     h2Elem.textContent = this.name;
//     // Attach <h2> element to <article> element
//     articleElem.appendChild(h2Elem);

//     // Create <ul> element
//     let ulElem = document.createElement('ul');
//     // Attach <ul> element to <h2> element
//     articleElem.appendChild(ulElem);

//     // For loop to create and attach <li> elements from cookiesBought[] array into <ul> element
//     for(let i = 0; i < this.cookiesBought.length; i++) {
//       let liElem = document.createElement('li');
//       liElem.textContent = `${hours[i]}: ${this.cookiesBought[i]}`;
//       ulElem.appendChild(liElem);
//     }

//     // Create <p> element to display total of cookies
//     let pElem = document.createElement('p');
//     // Add text to <p> element containing total of cookies
//     pElem.textContent = `Total Cookies: ${this.totalCookies}`;
//     ulElem.appendChild(pElem);
//   }

// };

// // Dubai Location
// let dubai = {
//   name: 'Dubai',
//   minCust: 11,
//   maxCust: 38,
//   numOfCust: 0,
//   avgCookiesPerCust: 3.7,
//   totalCookies: 0,
//   //Creates array to store cookies per hour of operation
//   cookiesBought: [],

//   // Pushed amount of cookies into cookiesBought[] array, and keeps running total of cookies.
//   getCookiesBought: function() {

//     for(let i = 0; i < hours.length; i++) {
//       this.numOfCust = randomNumCust(this.minCust, this.maxCust);
//       // Placeholder 'cookies' in order to be adding it to the running total of 'totalCookies, and calls helper function cookiesBoughtPerCust()
//       // Got Math.round() from MDN docs, used in order to get rid of decimals
//       let cookies = cookiesBoughtPerCust(this.numOfCust, Math.round(this.avgCookiesPerCust));
//       this.cookiesBought.push(cookies);
//       this.totalCookies += cookies;
//     }
//   },

//   //      ***** DOM MANIPULATION *****
//   // Function to render to sales data page
//   render: function () {

//     dubai.getCookiesBought();

//     // Create <article> element
//     let articleElem = document.createElement('article');
//     // Add <article> element to the DOM
//     salesDataSection.appendChild(articleElem);

//     // Create <h2> element
//     let h2Elem = document.createElement('h2');
//     // Add text to <h2> element to display name of store
//     h2Elem.textContent = this.name;
//     // Attach <h2> element to <article> element
//     articleElem.appendChild(h2Elem);

//     // Create <ul> element
//     let ulElem = document.createElement('ul');
//     // Attach <ul> element to <h2> element
//     articleElem.appendChild(ulElem);

//     // For loop to create and attach <li> elements from cookiesBought[] array into <ul> element
//     for(let i = 0; i < this.cookiesBought.length; i++) {
//       let liElem = document.createElement('li');
//       liElem.textContent = `${hours[i]}: ${this.cookiesBought[i]}`;
//       ulElem.appendChild(liElem);
//     }

//     // Create <p> element to display total of cookies
//     let pElem = document.createElement('p');
//     // Add text to <p> element containing total of cookies
//     pElem.textContent = `Total Cookies: ${this.totalCookies}`;
//     ulElem.appendChild(pElem);
//   }

// };

// // Paris Location
// let paris = {
//   name: 'Paris',
//   minCust: 20,
//   maxCust: 38,
//   numOfCust: 0,
//   avgCookiesPerCust: 2.3,
//   totalCookies: 0,
//   //Creates array to store cookies per hour of operation
//   cookiesBought: [],

//   // Pushed amount of cookies into cookiesBought[] array, and keeps running total of cookies.
//   getCookiesBought: function() {

//     for(let i = 0; i < hours.length; i++) {
//       this.numOfCust = randomNumCust(this.minCust, this.maxCust);
//       // Placeholder 'cookies' in order to be adding it to the running total of 'totalCookies, and calls helper function cookiesBoughtPerCust()
//       // Got Math.round() from MDN docs, used in order to get rid of decimals
//       let cookies = cookiesBoughtPerCust(this.numOfCust, Math.round(this.avgCookiesPerCust));
//       this.cookiesBought.push(cookies);
//       this.totalCookies += cookies;
//     }
//   },

//   //      ***** DOM MANIPULATION *****
//   // Function to render to sales data page
//   render: function () {

//     paris.getCookiesBought();

//     // Create <article> element
//     let articleElem = document.createElement('article');
//     // Add <article> element to the DOM
//     salesDataSection.appendChild(articleElem);

//     // Create <h2> element
//     let h2Elem = document.createElement('h2');
//     // Add text to <h2> element to display name of store
//     h2Elem.textContent = this.name;
//     // Attach <h2> element to <article> element
//     articleElem.appendChild(h2Elem);

//     // Create <ul> element
//     let ulElem = document.createElement('ul');
//     // Attach <ul> element to <h2> element
//     articleElem.appendChild(ulElem);

//     // For loop to create and attach <li> elements from cookiesBought[] array into <ul> element
//     for(let i = 0; i < this.cookiesBought.length; i++) {
//       let liElem = document.createElement('li');
//       liElem.textContent = `${hours[i]}: ${this.cookiesBought[i]}`;
//       ulElem.appendChild(liElem);
//     }

//     // Create <p> element to display total of cookies
//     let pElem = document.createElement('p');
//     // Add text to <p> element containing total of cookies
//     pElem.textContent = `Total Cookies: ${this.totalCookies}`;
//     ulElem.appendChild(pElem);
//   }

// };

// // Lima Location
// let lima = {
//   name: 'Lima',
//   minCust: 2,
//   maxCust: 16,
//   numOfCust: 0,
//   avgCookiesPerCust: 4.6,
//   totalCookies: 0,
//   //Creates array to store cookies per hour of operation
//   cookiesBought: [],

//   // Pushed amount of cookies into cookiesBought[] array, and keeps running total of cookies.
//   getCookiesBought: function() {

//     for(let i = 0; i < hours.length; i++) {
//       this.numOfCust = randomNumCust(this.minCust, this.maxCust);
//       // Placeholder 'cookies' in order to be adding it to the running total of 'totalCookies, and calls helper function cookiesBoughtPerCust()
//       // Got Math.round() from MDN docs, used in order to get rid of decimals
//       let cookies = cookiesBoughtPerCust(this.numOfCust, Math.round(this.avgCookiesPerCust));
//       this.cookiesBought.push(cookies);
//       this.totalCookies += cookies;
//     }
//   },

//   //      ***** DOM MANIPULATION *****
//   // Function to render to sales data page
//   render: function () {

//     lima.getCookiesBought();

//     // Create <article> element
//     let articleElem = document.createElement('article');
//     // Add <article> element to the DOM
//     salesDataSection.appendChild(articleElem);

//     // Create <h2> element
//     let h2Elem = document.createElement('h2');
//     // Add text to <h2> element to display name of store
//     h2Elem.textContent = this.name;
//     // Attach <h2> element to <article> element
//     articleElem.appendChild(h2Elem);

//     // Create <ul> element
//     let ulElem = document.createElement('ul');
//     // Attach <ul> element to <h2> element
//     articleElem.appendChild(ulElem);

//     // For loop to create and attach <li> elements from cookiesBought[] array into <ul> element
//     for(let i = 0; i < this.cookiesBought.length; i++) {
//       let liElem = document.createElement('li');
//       liElem.textContent = `${hours[i]}: ${this.cookiesBought[i]}`;
//       ulElem.appendChild(liElem);
//     }

//     // Create <p> element to display total of cookies
//     let pElem = document.createElement('p');
//     // Add text to <p> element containing total of cookies
//     pElem.textContent = `Total Cookies: ${this.totalCookies}`;
//     ulElem.appendChild(pElem);
//   }

// };


// //     This example will be useful when time comes to add image
// //     let imgElem = document.createElement('img');
// //     imgElem.src = this.photo;
// //     imgElem.alt = `${this.name} is an adorable ${this.age} month old kitten.`;
// //     articleElem.appendChild(imgElem);
// //   }
// // };


// // ********** EXECUTABLE CODE **********
// // Calls render function to display output of sales data
// seattle.render();
// tokyo.render();
// dubai.render();
// paris.render();
// lima.render();


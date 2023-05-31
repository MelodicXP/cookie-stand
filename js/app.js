'use strict';


// ********** GLOBALS **************
//Creates window into HTML document to manipulate

// Old code, was used to display as a list
// let salesDataSection = document.getElementById('cookie-stands');
// console.dir(salesDataSection);

let salesTableSection = document.getElementById('cookie-sales-table');

let hours = [
  '6:00am',
  '7:00am',
  '8:00am',
  '9:00am',
  '10:00am',
  '11:00am',
  '12:00pm',
  '1:00pm',
  '2:00pm',
  '3:00pm',
  '4:00pm',
  '5:00pm',
  '6:00pm',
  '7:00pm',
  '8:00pm'
];

let allFranchiseStores = []; // store all franchise store objects
let salesTable; // variable to attach rows and table elements to

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

// Creates a general table element to be called when necessary
FranchiseStore.prototype.renderTable = function() {

  this.tableSalesElem = document.createElement('table');
  salesTableSection.appendChild(this.tableSalesElem);

  // Applies tableSalesElem table element to globalscope variable 'salesTable'
  // so that all table elements from render() can attach to this one table
  salesTable = this.tableSalesElem;
};

FranchiseStore.prototype.renderHours = function() {

  //Create row that will display hours
  let rowHours = document.createElement('tr');
  rowHours.setAttribute('id', 'row-hours');
  salesTable.appendChild(rowHours);

  // Create empty cell first cell
  let thHoursElem = document.createElement('th');
  thHoursElem.textContent = '';
  rowHours.appendChild(thHoursElem);

  // Create for loop to display hours across rowHours
  // ! Reminder: when accessing global variables don't use '.this'
  // ! Bug was from using 'this.hours.length' which wouldn't display anything
  for(let i = 0; i < hours.length; i++) {
    let thHoursElem = document.createElement('th');
    thHoursElem.textContent = `${hours[i]}`;
    rowHours.appendChild(thHoursElem);
  }

  // Create last cell displaying text 'Daily Location Total'
  let thDailyLocTotal = document.createElement('th');
  thDailyLocTotal.setAttribute('id', 'daily-loc-total'); //set id for styling
  thDailyLocTotal.textContent = 'Daily Location Total';
  rowHours.appendChild(thDailyLocTotal);

  // ********** Creates empty row below hours displayed **********
  // Might need later
  // // Create empty row below hours displayed
  // let rowHours2 = document.createElement('tr');
  // rowHours2.setAttribute('id', 'row-hours2');
  // salesTable.appendChild(rowHours2);

  // // Create for loop displaying empty cells below hours
  // // ! Reminder: when accessing global variables don't use '.this'
  // // ! Bug was from using 'this.hours.length' which wouldn't display anything
  // for(let i = 0; i < hours.length + 2; i++) {
  //   let tdHoursElem = document.createElement('td');
  //   tdHoursElem.setAttribute('id', 'td-row-hours2');
  //   tdHoursElem.textContent = '';
  //   rowHours2.appendChild(tdHoursElem);
  // }
};

FranchiseStore.prototype.render = function() {

  //Creates row to display each franchise name and daily sales data
  let row = document.createElement('tr');
  salesTable.appendChild(row);

  // Create table header for name of store
  let th1Elem = document.createElement('th');
  th1Elem.textContent = this.name;
  row.appendChild(th1Elem);

  // Create table data to display daily sales of cookies
  for(let i = 0; i < this.cookiesBought.length; i++) {
    let tdElem = document.createElement('td');
    tdElem.textContent = `${this.cookiesBought[i]}`;
    row.appendChild(tdElem);
  }

  // Create table data total sales of each location
  let tdElem = document.createElement('td');
  tdElem.setAttribute('id', 'total-cookies'); //set id for styling
  tdElem.textContent = `${this.totalCookies}`;
  row.appendChild(tdElem);
};

// ********** EXECUTABLE CODE **********

// Create object for each store
let seattle = new FranchiseStore('Seattle', 23, 65, 6.3);
let tokyo = new FranchiseStore('Tokyo', 3, 24, 1.2);
let dubai = new FranchiseStore('Dubai', 11, 38, 3.7);
let paris = new FranchiseStore('Paris', 20, 38, 2.3);
let lima = new FranchiseStore('Lima', 2, 16, 14.6);

// Push franchise store objects to the allFranchiseStores array
allFranchiseStores.push(seattle, tokyo, dubai, paris, lima);

function renderAllStores(){

  // Initial call to renderTable, all elements will attach to the global variable
  // salesTable stored within the renderTable method
  allFranchiseStores[0].renderTable();

  allFranchiseStores[0].renderHours();

  for(let i = 0; i < allFranchiseStores.length; i++) {
    allFranchiseStores[i].getCookiesBought();
    allFranchiseStores[i].render();
  }
}

// Render all franchise store data
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


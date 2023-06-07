'use strict';


// ********** GLOBALS **************

//Creates window into HTML document to manipulate
let salesTableSection = document.getElementById('cookie-sales-table'); //access to dom
let allFranchiseStores = []; // store all franchise store objects
let salesTable; // variable to attach rows and table elements to
let allCookieTotals = []; // to store hourly total cookies sold on all locations
let allDayCookieSales = 0; // to store aggregate total of all cookies of all stores all day
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

// **************** HELPER FUNCTIONS/UTILITES ***************

// Generate random number of customers

function randomNumCust(min,max){
  //Got this from MDN docs
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Generate number of cookies bought per customer

function cookiesBoughtPerCust(numCust, cookies){
  return numCust * cookies;
}

// Create a table

function renderTable() {
  let tableElem = document.createElement('table');
  salesTableSection.appendChild(tableElem);

  // Apply tableElem to globalscope variable 'salesTable'
  // so that all table elements from render() can attach to this one table
  salesTable = tableElem;
}

// Ouput hours as header to table

function renderHours() {

  //Create row that will display hours
  let rowHours = document.createElement('tr');
  rowHours.setAttribute('id', 'row-hours');
  salesTable.appendChild(rowHours);

  // Create empty cell first cell
  let thHoursElem = document.createElement('th');
  thHoursElem.textContent = '';
  rowHours.appendChild(thHoursElem);

  // Create for loop to display hours across rowHours
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
}

// Output aggregate totals as footer to table

function renderAllTotals(){

  //Create row that will display total sales per hour of all stores
  let rowAllTotals = document.createElement('tr');
  rowAllTotals.setAttribute('id', 'row-all-totals');
  salesTable.appendChild(rowAllTotals);

  // Create empty cell first cell
  let thTotalsElem = document.createElement('th');
  thTotalsElem.setAttribute('id', 'total-all-locations');
  thTotalsElem.textContent = 'Total All Locations';
  rowAllTotals.appendChild(thTotalsElem);

  // Create for loop to display total sales across 'rowAllTotals'
  for(let i = 0; i < hours.length; i++) {
    let thTotalsElem = document.createElement('th');
    thTotalsElem.setAttribute('id', 'hourly-totals'); //set id for styling
    thTotalsElem.textContent = `${allCookieTotals[i]}`;
    rowAllTotals.appendChild(thTotalsElem);
  }

  // Create last cell displaying text aggregate total of all stores for the day
  let thAggregateTotal = document.createElement('th');
  thAggregateTotal.setAttribute('id', 'aggregate-total'); //set id for styling
  thAggregateTotal.textContent = `${allDayCookieSales}` ;
  rowAllTotals.appendChild(thAggregateTotal);
}

// Ouput all sales by hour of each location and aggregate totals

function renderAllStores(){

  // Elements will attach to global variable 'salesTable' stored within renderTable method
  renderTable();

  // Displays hours as header in the table
  renderHours();

  // Loop through each store retrieving cookies bought per day and outputting to the table
  for(let i = 0; i < allFranchiseStores.length; i++) {
    allFranchiseStores[i].getCookiesBought();
    allFranchiseStores[i].render();
  }

  // Retrieve total of all stores cookies bought per hour, and aggregate total of cookies of all stores
  allFranchiseStores[0].getAllCookiesBought();

  // Outputs to last row of the table the aggregate totals per hour and day
  renderAllTotals(); // the last row at the bottom
}

// **************** CONSTRUCTOR FUNCTION ****************

function FranchiseStore(name, minCust, maxCust, avgCookiesPerCust){
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookiesPerCust = avgCookiesPerCust;
  this.numOfCust = 0;
  this.cookiesBought = [];
  this.totalCookies = 0;
}

// **************** PROTOTYPE METHODS ****************

// Calculate cookies bought per hour, stores to cookiesBought array,
// keep a running aggregate in 'totalCookies'
FranchiseStore.prototype.getCookiesBought = function() {
  for(let i = 0; i < hours.length; i++) {
    this.numOfCust = randomNumCust(this.minCust, this.maxCust);
    let cookies = cookiesBoughtPerCust(this.numOfCust, Math.round(this.avgCookiesPerCust));
    this.cookiesBought.push(cookies);
    this.totalCookies += cookies;
  }
};

// Calculate total of cookies from all stores per hour, and aggregate total

FranchiseStore.prototype.getAllCookiesBought = function() {

  //Loop through each hour
  for (let i = 0; i < hours.length; i++) {

    let allHourlyCookieSales = 0; // Holds total of hourly aggregate cookie sales

    // Loop through each store, sum daily sales from cookiesBought array
    // Sum total in 'allHourlyCookiSales'
    for (let j = 0; j < allFranchiseStores.length; j++) {
      allHourlyCookieSales += allFranchiseStores[j].cookiesBought[i];
    }

    // Push aggregate total per hour to allCookiesTotal array
    allCookieTotals.push(allHourlyCookieSales);

    // Sum total of each hour aggregate sales of all stores
    allDayCookieSales += allHourlyCookieSales;
  }
};

// Output cookie sales by hour for each store

FranchiseStore.prototype.render = function() {

  //Create row to display each franchise name and daily sales data
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

  // Create table data to display total sales of each location
  let tdElem = document.createElement('td');
  tdElem.setAttribute('id', 'total-cookies-perStore'); //set id for styling
  tdElem.textContent = `${this.totalCookies}`;
  row.appendChild(tdElem);
};

// **************** EXECUTABLE CODE ****************

// Create object for each store
let seattle = new FranchiseStore('Seattle', 23, 65, 6.3);
let tokyo = new FranchiseStore('Tokyo', 3, 24, 1.2);
let dubai = new FranchiseStore('Dubai', 11, 38, 3.7);
let paris = new FranchiseStore('Paris', 20, 38, 2.3);
let lima = new FranchiseStore('Lima', 2, 16, 14.6);

// Push franchise store objects to the allFranchiseStores array
allFranchiseStores.push(seattle, tokyo, dubai, paris, lima);

// Render all franchise store data
renderAllStores();

let newStoreForm = document.getElementById('newStoreForm');


function handleSubmit(event) {
  event.preventDefault();
  console.log ('form submitted');
}


newStoreForm.addEventListener('submit', handleSubmit);

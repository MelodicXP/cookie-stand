'use strict';

// ********** GLOBALS **************
let allFranchiseStores = []; // store all franchise store objects
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
function generateRandomNumOfCustomers(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Generate number of cookies bought per customer
function calculateCookiesBoughtPerCustomer(numCust, cookies) {
  return numCust * cookies;
}

// Create a cell element for the table
const createTableCell = (type, content) => {
  const cell = document.createElement(type);
  cell.textContent = content;
  return cell;
}

// Create and append a table element to the salesTableSection
function renderTable() {
  const salesTableSection = document.getElementById('cookie-sales-table');
  const salesTableElement = document.createElement('table');
  salesTableSection.appendChild(salesTableElement);
  return salesTableElement;
}

// Render hours as table headers
function renderTableHeader(tableElement, hours) {

  // Create row that will display hours
  const hoursRow = document.createElement('tr');
  hoursRow.id = 'row-hours';
  tableElement.appendChild(hoursRow);

  // Add an initial empty header cell
  hoursRow.appendChild(createTableCell('th', ''));

  // Create for loop to display hours across hours row
  for (let i = 0; i < hours.length; i++) {
    hoursRow.appendChild(createTableCell('th', `${hours[i]}`));
  }

  // Add a final cell for 'Daily Location Total'
  let dailyLocationTotalHeader = createTableCell('th', 'Daily Location Total');
  dailyLocationTotalHeader.id = 'daily-loc-total';
  hoursRow.appendChild(dailyLocationTotalHeader);
}

// Output aggregate totals as footer to table
function renderFooter(salesTableElement) {

  //Create row that will display total sales per hour of all stores
  let rowAllTotals = document.createElement('tr');
  rowAllTotals.setAttribute('id', 'row-all-totals');
  salesTableElement.appendChild(rowAllTotals);

  // Create empty cell first cell
  let thTotalsElem = document.createElement('th');
  thTotalsElem.setAttribute('id', 'total-all-locations');
  thTotalsElem.textContent = 'Total All Locations';
  rowAllTotals.appendChild(thTotalsElem);

  // Create for loop to display total sales across 'rowAllTotals'
  for (let i = 0; i < hours.length; i++) {
    let thTotalsElem = document.createElement('th');
    thTotalsElem.setAttribute('id', 'hourly-totals'); //set id for styling
    thTotalsElem.textContent = `${allCookieTotals[i]}`;
    rowAllTotals.appendChild(thTotalsElem);
  }

  // Create last cell displaying text aggregate total of all stores for the day
  let thAggregateTotal = document.createElement('th');
  thAggregateTotal.setAttribute('id', 'aggregate-total'); //set id for styling
  thAggregateTotal.textContent = `${allDayCookieSales}`;
  rowAllTotals.appendChild(thAggregateTotal);
}

// Ouput all sales by hour of each location and aggregate totals
function renderAllStores() {

  // Elements will attach to global variable 'salesTableElement' stored within renderTable method
  let salesTableElement = renderTable();

  // Displays hours as header in the table
  renderTableHeader(salesTableElement, hours);

  // Loop through each store retrieving cookies bought per day and outputting to the table
  for (let i = 0; i < allFranchiseStores.length; i++) {
    allFranchiseStores[i].getCookiesBought();
    allFranchiseStores[i].render(salesTableElement);
  }

  // Retrieve total of all stores cookies bought per hour, and aggregate total of cookies of all stores
  allFranchiseStores[0].getAllCookiesBought();

  // Outputs to last row of the table the aggregate totals per hour and day
  renderFooter(salesTableElement); // the last row at the bottom

  return salesTableElement; // return to be used elsewhere (i.e., when removing footer)
}

// User adds new franchise store
function handleSubmit(event) {
  event.preventDefault();

  // Grab values from the form via their 'name' assigned
  let newStoreName = event.target.newStoreName.value;
  let minCust = +event.target.minCust.value; // Adding '+' converts from typeof 'string' to typeof 'number'
  let maxCust = +event.target.maxCust.value; // Adding '+' converts from typeof 'string' to typeof 'number'
  let avgCookiesPerCust = +event.target.avgCookiesPerCust.value; // Adding '+' converts from typeof 'string' to typeof 'number'

  // Create new store with the entered values
  let newFranchiseStore = new FranchiseStore(newStoreName, minCust, maxCust, avgCookiesPerCust);
  allFranchiseStores.push(newFranchiseStore); // Add new store to array

  // Retrieve and keep track of salesTableElement
  let salesTableElement = document.querySelector('#cookie-sales-table table');

  removeFooter(salesTableElement); //remove footer
  newFranchiseStore.getCookiesBought(); // Calculate cookies bought per hour at new store
  newFranchiseStore.render(salesTableElement); // Render cookies bought per hour at new store to table
  recalculateAllCookieTotals(); // Re-calculate totals
  renderFooter(salesTableElement); // Render footer with new totals to table
  newStoreForm.reset(); //resets form for continued user input
}

// Recalculate total of all cookies for all stores after adding new store
function recalculateAllCookieTotals() {
  allCookieTotals = []; // Clear out allCookieTotals array
  allDayCookieSales = 0; // Clear out running total of allDayCookieSales
  allFranchiseStores[0].getAllCookiesBought(); // Calculate all totals of cookies with new store added
}

// Remove footer row (invoked when user adds new store)
function removeFooter(salesTableElement) {
  let footerRow = document.getElementById('row-all-totals'); // Access the row element by id of the footer
  if (footerRow) {
    salesTableElement.removeChild(footerRow); // Remove footer row from table
  }
}
// **************** CONSTRUCTOR FUNCTION ****************

// Constructor - Franchise store
function FranchiseStore(name, minCust, maxCust, avgCookiesPerCust) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookiesPerCust = avgCookiesPerCust;
  this.numOfCust = 0;
  this.cookiesBought = [];
  this.totalCookies = 0;
}

// **************** PROTOTYPE METHODS ****************

// Calculate cookies bought per hour, stores to cookiesBought array, keeps running aggregate in 'totalCookies'
FranchiseStore.prototype.getCookiesBought = function () {
  for (let i = 0; i < hours.length; i++) {
    this.numOfCust = generateRandomNumOfCustomers(this.minCust, this.maxCust);
    let cookies = calculateCookiesBoughtPerCustomer(this.numOfCust, Math.round(this.avgCookiesPerCust));
    this.cookiesBought.push(cookies);
    this.totalCookies += cookies;
  }
};

// Calculate total of cookies from all stores per hour, and aggregate total
FranchiseStore.prototype.getAllCookiesBought = function () {

  //Loop through each hour
  for (let i = 0; i < hours.length; i++) {

    let allHourlyCookieSales = 0; // Holds total of hourly aggregate cookie sales

    // Loop through each store, sum daily sales from cookiesBought array, sum total in 'allHourlyCookiSales'
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
FranchiseStore.prototype.render = function (salesTableElement) {

  //Create row to display each franchise name and daily sales data
  let row = document.createElement('tr');
  salesTableElement.appendChild(row);

  // Create table header for name of store
  let th1Elem = document.createElement('th');
  th1Elem.textContent = this.name;
  row.appendChild(th1Elem);

  // Create table data to display daily sales of cookies
  for (let i = 0; i < this.cookiesBought.length; i++) {
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

// Render all initial franchise store data to the table
renderAllStores();

// 'Listen' to 'newStoreForm' for user input and and pass to event handler 'handSubmit' once user clicks 'Add Store'
// The event handler will render new store sales data to table and re-calculate the footer totals of the table
let newStoreForm = document.getElementById('newStoreForm');
newStoreForm.addEventListener('submit', handleSubmit);

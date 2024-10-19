'use strict';

// ********** GLOBALS **************
let allFranchiseStores = []; // store all franchise store objects
let allCookieTotals = []; // to store hourly total cookies sold on all locations
let allDayCookieSales = 0; // to store aggregate total of all cookies of all stores all day
const hours = [
  '6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am',
  '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm',
  '6:00pm', '7:00pm', '8:00pm'
];

// **************** HELPER FUNCTIONS/UTILITES ***************

// Generate random number of customers between min and max
const generateRandomNumOfCustomers = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Generate number of cookies bought per customer
const calculateCookiesBoughtPerCustomer = (numCust, avgCookies) => numCust * avgCookies;

// Create a cell element for the table (used for headers and data cells)
const createTableCell = (type, content, attributes = {}) => {
  const cell = document.createElement(type);
  cell.textContent = content;
  for (const key in attributes) {
    cell.setAttribute(key, attributes[key]);
  }
  return cell;
};

// Create and append a table element to the salesTableSection
const renderTable = () => {
  const salesTableSection = document.getElementById('cookie-sales-table');
  const salesTableElement = document.createElement('table');
  salesTableSection.appendChild(salesTableElement);
  return salesTableElement;
};

// Render hours as table headers
const renderTableHeader = (tableElement) => {

  // Create row that will display hours
  const hoursRow = document.createElement('tr');
  hoursRow.id = 'row-hours';
  tableElement.appendChild(hoursRow);

  // Create and add to row initial empty header cell 
  hoursRow.appendChild(createTableCell('th', '')); // Initial empty cell
  
  // Create and add to row additional header cells for each hour
  hours.forEach((hour) => {
    hoursRow.appendChild(createTableCell('th', hour))
  });

  // Create and add final "Total" cell
  hoursRow.appendChild(createTableCell('th', 'Daily Location Total', { id: 'daily-loc-total'}));
};

// Output aggregate totals as footer to table
const renderFooter = (salesTableElement) => {

  // Check if a footer row exists
  let footerRow = document.getElementById('row-all-totals');

  // If exists remove to update totals
  if (footerRow) {
    footerRow.remove(); // Remove the existing footer to add updated totals
  }

  // Create new footer row and append to table
  footerRow = document.createElement('tr');
  footerRow.id = 'row-all-totals';
  salesTableElement.appendChild(footerRow);

  // Create an empty cell, followed by total sales for each hour, then total for entire day
  footerRow.appendChild(createTableCell('th', 'Total All Locations', { id: 'total-all-locations' }));
  allCookieTotals.forEach((total) => {
    footerRow.appendChild(createTableCell('th', total, {id: 'hourly-totals '}));
  });
  footerRow.appendChild(createTableCell('th', allDayCookieSales, { id: 'aggregate-total'}));
}

// Render all franchise stores into the sales table
const renderAllStores = () => {
  const salesTableElement = renderTable(); // Create the sales table

  renderTableHeader(salesTableElement, hours); // Render header row with hours 

  // Render each store row and calculate total sales
  allFranchiseStores.forEach((store) => {
    store.getCookiesBought();
    store.render(salesTableElement);
  });

  FranchiseStore.calculateAllCookiesBought(); // Calculate totals for the footer
  renderFooter(salesTableElement); // Render footer row

  return salesTableElement; // return to be used elsewhere (i.e., when removing footer)
};

// User adds new franchise store
const handleSubmit = (event) => {
  event.preventDefault();

  // Grab values from the form via their 'name' assigned
  const newStoreName = event.target.newStoreName.value;
  const minCust = +event.target.minCust.value; // Adding '+' converts from typeof 'string' to typeof 'number'
  const maxCust = +event.target.maxCust.value; // Adding '+' converts from typeof 'string' to typeof 'number'
  const avgCookiesPerCust = +event.target.avgCookiesPerCust.value; // Adding '+' converts from typeof 'string' to typeof 'number'

  // Create new store with the entered values
  const newFranchiseStore = new FranchiseStore(newStoreName, minCust, maxCust, avgCookiesPerCust);
  allFranchiseStores.push(newFranchiseStore); // Add new store to array

  // Re-render the sales table to include new store
  const salesTableElement = document.querySelector('#cookie-sales-table table');
  renderFooter(salesTableElement); // Remove footer
  newFranchiseStore.getCookiesBought(); // Calculate cookies bought per hour at new store
  newFranchiseStore.render(salesTableElement); // Render cookies bought per hour at new store to table
  FranchiseStore.calculateAllCookiesBought(); // Re-calculate totals
  renderFooter(salesTableElement); // Render footer with new totals to table
  newStoreForm.reset(); // Reset form for continued user input
}

// **************** Franchise Store Class ****************
class FranchiseStore {
  constructor(name, minCust, maxCust, avgCookiesPerCust) {
    this.name = name;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.avgCookiesPerCust = avgCookiesPerCust;
    this.cookiesBought = [];
    this.totalCookies = 0;
  }

  // Calculate cookies bought per hour
  getCookiesBought() {
    this.cookiesBought = []; // Clear any previous data
    this.totalCookies = 0; // Reset running total

    // Calculate cookies bought per hour and track total
    hours.forEach((hour) => {
      const numCust = generateRandomNumOfCustomers(this.minCust, this.maxCust);
      const cookies = Math.floor(calculateCookiesBoughtPerCustomer(numCust, this.avgCookiesPerCust));
      this.cookiesBought.push(cookies);
      this.totalCookies += cookies; // Track total of cookies sold by all stores per hour
    });
  }

  // Static method to calculate total cookies from all stores per hour and aggregate total
  static calculateAllCookiesBought() {
    allCookieTotals = Array(hours.length).fill(0); // Reset totals for each hour
    allDayCookieSales = 0; // Reset daily total

    //Loop through each hour and sum sales across all stores
    hours.forEach((_, hourIndex) => {
      let hourlyTotal = 0;
      allFranchiseStores.forEach((store) => {
        hourlyTotal += store.cookiesBought[hourIndex];
      })
      allCookieTotals[hourIndex] = hourlyTotal;
      allDayCookieSales += hourlyTotal;
    });
  }

  // Render cookie sales data for the store in the sales table
  render(salesTableElement) {

    const row = document.createElement('tr');
    salesTableElement.appendChild(row);

    row.appendChild(createTableCell('th', this.name)); // Store Name

    this.cookiesBought.forEach(cookies => {
      row.appendChild(createTableCell('td', cookies));
    });

    row.appendChild(createTableCell('td', this.totalCookies, { id: 'total-cookies-perStore'}))
  }
}

// **************** EXECUTABLE CODE ****************

const franchiseData = [
  ['Seattle', 23, 65, 6.3],
  ['Tokyo', 3, 24, 1.2],
  ['Dubai', 11, 38, 3.7],
  ['Paris', 20, 38, 2.3],
  ['Lima', 2, 16, 4.6],
];

// Create franchise stores from franchiseData
franchiseData.forEach(([name, min, max, avg]) => {
  allFranchiseStores.push(new FranchiseStore(name, min, max, avg));
});

renderAllStores(); // Render initial table data

// 'Listen' to 'newStoreForm' for user input and and pass to event handler 'handSubmit' once user clicks 'Add Store'
// The event handler will render new store sales data to table and re-calculate the footer totals of the table
const newStoreForm = document.getElementById('newStoreForm');
newStoreForm.addEventListener('submit', handleSubmit);

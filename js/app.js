'use strict';


// ********** GLOBALS **************
//Creates window into HTML document to manipulate
let salesDataSection = document.getElementById('cookie-stands');
console.dir(salesDataSection);

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


// ********** HELPER FUNCTIONS/UTILITES *********
function randomNumCust(min,max){
  //Got this from MDN docs
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function cookiesBoughtPerCust(numCust, cookies){
  return numCust * cookies;
}


// ********** OBJECT LITERALS **********
// Seattle Location
let seattle = {
  name: 'Seattle',
  minCust: 23,
  maxCust: 65,
  numOfCust: 0,
  avgCookiesPerCust: 6.3,
  totalCookies: 0,
  //Creates array to store cookies per hour of operation
  cookiesBought: [],

  getCookiesBought: function() {

    for(let i = 0; i < hours.length; i++) {
      this.numOfCust = randomNumCust(this.minCust, this.maxCust);
      // Placeholder 'cookies' in order to be adding it to the running total of 'totalCookies, and calls helper function cookiesBoughtPerCust()
      // Got Math.round() from MDN docs, used in order to get rid of decimals
      let cookies = cookiesBoughtPerCust(this.numOfCust, Math.round(this.avgCookiesPerCust));
      this.cookiesBought.push(hours[i], cookies);
      this.totalCookies += cookies;
    }

  },

  //      ***** DOM MANIPULATION *****
  // Function to render to sales data page
  render: function () {

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
    for(let i = 0; i < this.cookiesBought.length; i+=2) {
      let liElem = document.createElement('li');
      liElem.textContent = `${this.cookiesBought[i]}: ${this.cookiesBought[i+1]}`;
      ulElem.appendChild(liElem);
    }

    // Create <p> element to display total of cookies
    let pElem = document.createElement('p');
    // Add text to <p> element containing total of cookies
    pElem.textContent = `Total: ${this.totalCookies}`;
    ulElem.appendChild(pElem);
  }

};

// Tokyo location
let tokyo = {
  name: 'Tokyo',
  minCust: 3,
  maxCust: 24,
  numOfCust: 0,
  avgCookiesPerCust: 1.2,
  totalCookies: 0,
  //Creates array to store cookies per hour of operation
  cookiesBought: [],

  getCookiesBought: function() {

    for(let i = 0; i < hours.length; i++) {
      this.numOfCust = randomNumCust(this.minCust, this.maxCust);
      // Placeholder 'cookies' in order to be adding it to the running total of 'totalCookies, and calls helper function cookiesBoughtPerCust()
      // Got Math.round() from MDN docs, used in order to get rid of decimals
      let cookies = cookiesBoughtPerCust(this.numOfCust, Math.round(this.avgCookiesPerCust));
      this.cookiesBought.push(hours[i], cookies);
      this.totalCookies += cookies;
    }

  },

  //      ***** DOM MANIPULATION *****
  // Function to render to sales data page
  render: function () {

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
    for(let i = 0; i < this.cookiesBought.length; i+=2) {
      let liElem = document.createElement('li');
      liElem.textContent = `${this.cookiesBought[i]}: ${this.cookiesBought[i+1]}`;
      ulElem.appendChild(liElem);
    }

    // Create <p> element to display total of cookies
    let pElem = document.createElement('p');
    // Add text to <p> element containing total of cookies
    pElem.textContent = `Total: ${this.totalCookies}`;
    ulElem.appendChild(pElem);
  }

};

// Dubai location
let dubai = {
  name: 'Dubai',
  minCust: 11,
  maxCust: 38,
  numOfCust: 0,
  avgCookiesPerCust: 3.7,
  totalCookies: 0,
  //Creates array to store cookies per hour of operation
  cookiesBought: [],

  getCookiesBought: function() {

    for(let i = 0; i < hours.length; i++) {
      this.numOfCust = randomNumCust(this.minCust, this.maxCust);
      // Placeholder 'cookies' in order to be adding it to the running total of 'totalCookies, and calls helper function cookiesBoughtPerCust()
      // Got Math.round() from MDN docs, used in order to get rid of decimals
      let cookies = cookiesBoughtPerCust(this.numOfCust, Math.round(this.avgCookiesPerCust));
      this.cookiesBought.push(hours[i], cookies);
      this.totalCookies += cookies;
    }

  },

  //      ***** DOM MANIPULATION *****
  // Function to render to sales data page
  render: function () {

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
    for(let i = 0; i < this.cookiesBought.length; i+=2) {
      let liElem = document.createElement('li');
      liElem.textContent = `${this.cookiesBought[i]}: ${this.cookiesBought[i+1]}`;
      ulElem.appendChild(liElem);
    }

    // Create <p> element to display total of cookies
    let pElem = document.createElement('p');
    // Add text to <p> element containing total of cookies
    pElem.textContent = `Total: ${this.totalCookies}`;
    ulElem.appendChild(pElem);
  }

};

// Paris location
let paris = {
  name: 'Paris',
  minCust: 20,
  maxCust: 38,
  numOfCust: 0,
  avgCookiesPerCust: 2.3,
  totalCookies: 0,
  //Creates array to store cookies per hour of operation
  cookiesBought: [],

  getCookiesBought: function() {

    for(let i = 0; i < hours.length; i++) {
      this.numOfCust = randomNumCust(this.minCust, this.maxCust);
      // Placeholder 'cookies' in order to be adding it to the running total of 'totalCookies, and calls helper function cookiesBoughtPerCust()
      // Got Math.round() from MDN docs, used in order to get rid of decimals
      let cookies = cookiesBoughtPerCust(this.numOfCust, Math.round(this.avgCookiesPerCust));
      this.cookiesBought.push(hours[i], cookies);
      this.totalCookies += cookies;
    }

  },

  //      ***** DOM MANIPULATION *****
  // Function to render to sales data page
  render: function () {

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
    for(let i = 0; i < this.cookiesBought.length; i+=2) {
      let liElem = document.createElement('li');
      liElem.textContent = `${this.cookiesBought[i]}: ${this.cookiesBought[i+1]}`;
      ulElem.appendChild(liElem);
    }

    // Create <p> element to display total of cookies
    let pElem = document.createElement('p');
    // Add text to <p> element containing total of cookies
    pElem.textContent = `Total: ${this.totalCookies}`;
    ulElem.appendChild(pElem);
  }

};

// Lima location
let lima = {
  name: 'Lima',
  minCust: 2,
  maxCust: 16,
  numOfCust: 0,
  avgCookiesPerCust: 4.6,
  totalCookies: 0,
  //Creates array to store cookies per hour of operation
  cookiesBought: [],

  getCookiesBought: function() {

    for(let i = 0; i < hours.length; i++) {
      this.numOfCust = randomNumCust(this.minCust, this.maxCust);
      // Placeholder 'cookies' in order to be adding it to the running total of 'totalCookies, and calls helper function cookiesBoughtPerCust()
      // Got Math.round() from MDN docs, used in order to get rid of decimals
      let cookies = cookiesBoughtPerCust(this.numOfCust, Math.round(this.avgCookiesPerCust));
      this.cookiesBought.push(hours[i], cookies);
      this.totalCookies += cookies;
    }

  },

  //      ***** DOM MANIPULATION *****
  // Function to render to sales data page
  render: function () {

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
    for(let i = 0; i < this.cookiesBought.length; i+=2) {
      let liElem = document.createElement('li');
      liElem.textContent = `${this.cookiesBought[i]}: ${this.cookiesBought[i+1]}`;
      ulElem.appendChild(liElem);
    }

    // Create <p> element to display total of cookies
    let pElem = document.createElement('p');
    // Add text to <p> element containing total of cookies
    pElem.textContent = `Total: ${this.totalCookies}`;
    ulElem.appendChild(pElem);
  }

};
//     This example will be useful when time comes to add image
//     let imgElem = document.createElement('img');
//     imgElem.src = this.photo;
//     imgElem.alt = `${this.name} is an adorable ${this.age} month old kitten.`;
//     articleElem.appendChild(imgElem);
//   }
// };


// ********** EXECUTABLE CODE **********
// Calls function to execute random number of customer * avg # of cookies bought, per hour, and stores total cookies
seattle.getCookiesBought();
seattle.render();

tokyo.getCookiesBought();
tokyo.render();

dubai.getCookiesBought();
dubai.render();

paris.getCookiesBought();
paris.render();

lima.getCookiesBought();
lima.render();

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
      console.log(this.numOfCust);
      // Placeholder 'cookies' in order to be adding it to the running total of 'totalCookies, and calls helper function cookiesBoughtPerCust()
      // Got Math.round() from MDN docs, used in order to get rid of decimals
      let cookies = cookiesBoughtPerCust(this.numOfCust, Math.round(this.avgCookiesPerCust));
      this.cookiesBought.push(hours[i], cookies);
      this.totalCookies += cookies;
    }

  },

  // Function to render to sales data page
  render: function () {
    // Create <article> element
    let articleElem = document.createElement('article');

    // Add <article> element to the DOM
    salesDataSection.appendChild(articleElem);

    // Create <h2> element
    let h2Elem = document.createElement('h2');
    // Add text to <h2> element
    h2Elem.textContent = this.name;
    // Attach <h2> element to <article> element
    articleElem.appendChild(h2Elem);

    // Create <ul> element
    let ulElem = document.createElement('ul');
    // Attach <ul> element to <h2> element
    h2Elem.appendChild(ulElem);

    //For loop to create and attach <li> elements from cookiesBought[] array
    for(let i = 0; i < this.cookiesBought.length; i+=2) {
      let liElem = document.createElement('li');
      liElem.textContent = `${this.cookiesBought[i]} ${this.cookiesBought[i+1]}`;
      ulElem.appendChild(liElem);
    }
  }

};

//   render: function(){ // This is the function to render to sales page, see example below
//      ***** DOM MANIPULATION *****

//     STEP 2: Create element
//     let articleElem = document.createElement('article');
//
//     STEP 3: Add it to the dom
//     kittenSection.appendChild(articleElem);

//     let h2Elem = document.createElement('h2');
//     h2Elem.textContent = this.name;
//     articleElem.appendChild(h2Elem);


//     //! USEFUL FOR LAB
//     let ulElem = document.createElement('ul');
//     articleElem.appendChild(ulElem);

//     for(let i = 0; i < this.interests.length; i++){
//       let liElem = document.createElement('li');
//       liElem.textContent = this.interests[i];
//       ulElem.appendChild(liElem);
//     }

//     let pElem = document.createElement('p');
//     pElem.textContent = this.age;
//     articleElem.appendChild(pElem);


//     let imgElem = document.createElement('img');
//     imgElem.src = this.photo;
//     imgElem.alt = `${this.name} is an adorable ${this.age} month old kitten.`;
//     articleElem.appendChild(imgElem);
//   }
// };


// ********** EXECUTABLE CODE **********
seattle.getCookiesBought();

for (let i = 0; i < seattle.cookiesBought.length - 1; i+=2) {
  console.log(seattle.cookiesBought[i], seattle.cookiesBought[i+1]);
}

console.log(seattle.totalCookies);

seattle.render();

// This is where you call the functions to execute the above code to the HTML page. See below example
// frankie.getAge();
// frankie.render();
// console.log(frankie);

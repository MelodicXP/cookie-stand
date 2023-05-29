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
// This is where you create your objects for each store
// Example:
// let seattle = {
//   name: 'Seattle',
//   minCust: 23,
//   maxCust: 65,
//   numOfCust: 0,
//   avgCookiesPerCust: 6.3,
//   cookiesBought: [],
//   getCust: function(){
//     this.numOfCust = randomNumCust(this.minCust, this.maxCust);
//   },
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
// This is where you call the functions to execute the above code to the HTML page. See below example
// frankie.getAge();
// frankie.render();
// console.log(frankie);

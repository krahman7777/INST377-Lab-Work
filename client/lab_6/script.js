/*
  Hook this script to index.html
  by adding `<script src="script.js">` just before your closing `</body>` tag
*/
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function injectHTML(list) {
  console.log('fired injection');
  const target = document.querySelector('#resturant_list');
  target.innerHTML = '';
  list.forEach((item,index) => {
    const str = `<li>${item.name}</li>`;
    target.innerHTML += str;
  });

}

function cutRestaurantList(list) {
  console.log('fired cut list')
  const range = [...Array(15).keys()];
 return newArray = range.map((item) => {
    const index = getRandomIntInclusive(0, list.length - 1);
    return list[index]
  })
}

/* A quick filter that will return something based on a matching input */
function filterList(list, query) {
  /*
    Using the .filter array method, 
    return a list that is filtered by comparing the item name in lower case
    to the query in lower case

    Ask the TAs if you need help with this
  */
  return list.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
}

async function mainEvent() { // the async keyword means we can make API requests
  const mainForm = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
  // Add a querySelector that targets your filter button here
  const filterButton = document.querySelector('#filter');
  const loadDataButton = document.querySelector('#load_data');
  const generateButton = document.querySelector('#generate');

  const loadAnimation = document.querySelector('#load_animation');
  loadAnimation.style.display = 'none';

  let currentList = []; // this is "scoped" to the main event function
  
  /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
  loadDataButton.addEventListener('click', async (submitEvent) => { // async has to be declared on every function that needs to "await" something 
  
    console.log('loading data'); 
    loadAnimation.style.display = 'inline-block';

    const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');

    // This changes the response from the GET into data we can use - an "object"
    currentList = await results.json();

    loadAnimation.style.display = 'none';
    console.table(currentList); 

  });


 filterButton.addEventListener('click', (event) => {
  console.log('clicked filter button');

  const formData = new FormData(mainForm);
  const formProps = Object.fromEntries(formData);

  console.log(formProps);

  const newList = filterList(currentList, formProps.resto);

  console.log(newList);
  injectHTML(newList);
 });

 generateButton.addEventListener('click', (event) => {
  console.log('generate list')
  const restaurantsList = cutRestaurantList(currentList);
  console.log(restaurantsList);
  injectHTML(restaurantsList);
 })
}

/*
  This adds an event listener that fires our main event only once our page elements have loaded
  The use of the async keyword means we can "await" events before continuing in our scripts
  In this case, we load some data when the form has submitted
*/
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests

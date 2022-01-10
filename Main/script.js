//Get Quotes From API

//creating constant global variables for the id's of the html elements we want to target
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

const loader = document.getElementById('loader');

//show that quotes are loading
function loading(){
  loader.hidden = false; //loader is now visible
  quoteContainer.hidden = true; //while our quote container is hidden
}

//hide loading
function complete(){
  quoteContainer.hidden = false;
  loader.hidden = true;
}

let apiQuotes = []; //we need to put this empty array up here so it can ben accessed by the whole script

//Show New Quote

function newQuote() {
  loading(); //when we press on new quote button we're bypassing function getQuotes, so we also have to call the function here, so if it takes time to fetch, it always has the option to load
  //pick random quote with math.floor and .random from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  console.log(quote); //test
  //Check if author is equal to null / doesn't exist
  if (!quote.author){ 
    authorText.textContent = 'Unknown'; //this will set the value of the text content of author to unkown it the author wasn't found
  }else{
    authorText.textContent = quote.author; //this will set the value of the text content of author to the author from the api
  }
  //Check if quote is too long to apply the css class called .long-quote which will reduce the font size
  if (quote.text.length > 100) {
    quoteText.classList.add('long-quote'); //smaller font size
  }else{
    quoteText.classList.remove('long-quote'); //normal font size
  }
  //Set Quote and hide Loader
  quoteText.textContent = quote.text; //this will set the value of the text content of the quote
  complete(); // now if everything works we'll make the quoteContainer appear and the loader disappear
}

async function getQuotes() {
  loading(); // to give our program time to fetch at the very beginning
  const apiURL = 'https://type.fit/api/quotes'; // a constant var with the url of our API
  try {                                               //try 
    const response = await fetch(apiURL); // this mean that constant response will not be populated until it has some data fethced from our API
    // we need to use async and await in this situation, or else it will try to set the response before it had the chance to fetch the data and that would cause an error
    apiQuotes = await response.json(); //the global variable will now wait till it gets the data and we decode it into json to make it readeble

    //console.log(apiQuotes)  //test all quotes
    //console.log(apiQuotes[12]) //test one specifec quote
    newQuote();


    } catch(error) {                                  //except
      alert(error)
      //catch error here
    }
}

// Tweet the Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; //we back ticks for a template string
  window.open(twitterUrl, '_blank') //this will open a new tab, because of the _blank
}

// now we need to add the eventlisteners to call the functions when one of the buttons are clicked

newQuoteBtn.addEventListener('click', newQuote); // this'll run the newQuote(), resulting a new random-chosen quote with its author
//                                                  and setting the values of the html quote & author element to this

twitterBtn.addEventListener('click', tweetQuote) // this'll run tweetQuote() when button is clicked


// on load

getQuotes();

//loading() //test

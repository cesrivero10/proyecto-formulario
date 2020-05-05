// Variables
const listaTweets = document.getElementById('lista-tweets');



// Event Listeners

eventListeners();

function eventListeners() {
    //Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    //Borrar Tweets
    listaTweets.addEventListener('click', borrarTweet);

    // Contenido cargado
    document.addEventListener('DOMcontentLoaded', localStorageListo());
}


//funciones


// Añadir tweet del formulario
function agregarTweet(e) {
    e.preventDefault();
    // Leer el valor del textarea
    const tweet = document.getElementById('tweet').value;
    //crear boton de eliminar 
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';


    // Crear elemento y añadir contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    // añade boton borrar a la lista
    li.appendChild(botonBorrar);
    // Añade el tweet a la lista
    listaTweets.appendChild(li);
    
    // Añadir a local storage
    agregarTweetLocalStorage(tweet);
}
// Eliminar el tweet de DOM
function borrarTweet(e) {
    e.preventDefault();
    if(e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}

// Mostrar datos de LocalStorage en la lista
function localStorageListo() {
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet){
        //crear boton de eliminar 
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';


        // Crear elemento y añadir contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        // añade boton borrar a la lista
        li.appendChild(botonBorrar);
        // Añade el tweet a la lista
        listaTweets.appendChild(li);
    });
}
//Agrega tweet a local storage
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
        // Añadir el nuevo tweet
        tweets.push(tweet);
        // Convertir de string a arreglo para local storage
        localStorage.setItem('tweets', JSON.stringify(tweets) );

}
// Comprobar que haan elementos en local storage
function obtenerTweetsLocalStorage() {
    let tweets;
    // Revisamos los valores de local storage
    if(localStorage.getItem('tweets') === null ) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets') );
    }
    return tweets;
}

// Eiminar tweet de Local Storage

function borrarTweetLocalStorage(tweet) {

    let tweets, tweetBorrar;
    // Elimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index) {
        if(tweetBorrar === tweet) {
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets) );
}
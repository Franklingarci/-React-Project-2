import {React, useState, useEffect} from 'react'
import Search from './components/Search'

//API - Appilcation Programming Interface - a set of rules that allows one software application to talk to another, we need to send a request that says like hey, give me a list of your most populat movies

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers:{             // all this can be found in documentation, but this is to set up a request in order to get data
    accept:'application/json', // API will send back a JSon object
    Authorization: `Bearer ${API_KEY}` // this is to authernticate the request, veries who is trying to get it
  }
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage ] = useState(''); // this is to show the error message in the browser

  const fetchMovies = async() => { // when fetching you want to do a try and catch so if the fetch fails it will go to teh catch
    try{
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc` // this will fetch all the movies
      const response = await fetch(endpoint, API_OPTIONS) // fetch is a built in JS function that allows us to make Http request, it slike sending a letter to a service and getting a replay
      if(!response.ok){ // this just says if the reponse is not good, then throw error
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json(); // this gets the response and formates it so we can see it
      
    }catch(error){
      console.error(` Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies')
    }
  }
  useEffect(() =>{
    fetchMovies();
  }, []) // this is to fetch the movies form the API, so it can load i the begining once it renders we do an emptry dependency array.
  return (
    <main>
      <div className='pattern'/>
       
       <div className='wrapper'>
        <header>
          <img src ="src\assets\hero.png" alt = "Hero Banner"/>
          <h1> Find <span className='text-gradient'>Movies </span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}/>
        </header>
        <section className='all=movies'>
        <h2> All Movies</h2>
        {errorMessage && <p className = "text-red-500"> {errorMessage}</p>}
        </section>
       </div>
    </main>
    // I am passing props above the state back to the component, dont ever pass a prop like this setSearchTerm(), or else it will be called as soon as the component renders
  )
}

export default App
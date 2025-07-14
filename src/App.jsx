import { useState, useEffect} from 'react'
import Search from './components/Search'
import Spinner from './components/spinner'
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';
import { updateSearchCount } from './appwrite.js';


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

  const [searchTerm, setSearchTerm] = useState(''); // we will use the fetchMovies() to implement search. track the changes in te searchterm state, and then recall teh api function with a different key to fetch the movie, we will make our fetch accpet a quary of search, in documentation
  const [errorMessage, setErrorMessage ] = useState(''); // this is to show the error message in the browser
  const [movieList, setMovieList] = useState([]); // this is to store all the movies we get from the API
  const[isLoading, setIsLoading] = useState(false); // it takes time to get data from an api so this is to show some sort of loading screen
  const[debouncedSearchTerm, setDebouncedSearchTerm] = useState(); // debounce is so the api doesnt get to many request, so each time i search somthing it wont search until i stop typing, increases proformancer


  //Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])
  
  const fetchMovies = async(query = '') => { // when fetching you want to do a try and catch so if the fetch fails it will go to teh catch
     setIsLoading(true); // this is when it first fetched it will have is loading as true
     setErrorMessage('');
    try{
      const endpoint =  query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` // this changes the enpoint so if there is a queary, a "search", then we change the APi fetch to that, the encodeURIComponent allows that no matter that is search the charcters will not affect the search
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;  // this will fetch all the movies
      const response = await fetch(endpoint, API_OPTIONS) // fetch is a built in JS function that allows us to make Http request, it slike sending a letter to a service and getting a replay
      if(!response.ok){ // this just says if the reponse is not good, then throw error
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json(); // this gets the response and formates it so we can see it
      if(data.Response === 'False'){
        setErrorMessage(data.Error || 'Failed to fecth Movies'); // somtimes somthing wrong can happen, this is to hgandle the error.
        setMovieList([])
        return;
      }
     

      setMovieList(data.results || []); // .results is the reuslt with all the movies in it

      if(query )// time in video 1:52:11!!!!
    }catch(error){
      console.error(` Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies')
    } finally{
      setIsLoading(false); // finally is the final clause to the try and catch, so no matter what happens we set the loading to false
    }
  }
  useEffect(() =>{
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]) // this is to fetch the movies form the API, so it can load i the begining once it renders we do an emptry dependency array. adding the searchTerm will recall on ethe searchterm changes
  return (
    <main>
      <div className='pattern'/>
       
       <div className='wrapper'>
        <header>
          <img src ="src\assets\hero.png" alt = "Hero Banner"/>
          <h1> Find <span className='text-gradient'>Movies </span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}/>
        </header>
        <section className='all-movies'>
        <h2 className = "mt-[20px] mb-[20px]"> All Movies</h2>
        {isLoading?(
          <Spinner/>                      /*  this is to render all the movies, first make a condtional rendering to check is theres
                                                                                  an error and if so then render the messag ein red and if not map the movielist array*/
        ): errorMessage?(
          <p className='text-red-500'>{errorMessage} </p>
        ):(
          <ul>
            {movieList.map((movie) =>( // () is imiditae return, when ever i am maping i should provide a key, so react always knows which one is which
            <li key={movie.id}>
             <MovieCard key={movie.id} movie = {movie}/>
              </li>
            ))}
          </ul>
        )}
        </section>
       </div>
    </main>
    // I am passing props above the state back to the component, dont ever pass a prop like this setSearchTerm(), or else it will be called as soon as the component renders
  )
}

export default App
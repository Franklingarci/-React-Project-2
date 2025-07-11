import React from 'react'


const Search = ({searchTerm, setSearchTerm}) => {               // I am destructing the object so i dont have to do props.searchTerm and i can just do searchTerm; never mutate state
//searchTerm = 'I am Batman Not' // state should never be changed by the child componenet 
  return ( // not good to create state here, only keeping track of search term not of movies, create a new state within the main appi
    <div className='search'>
        <div>
        <img src='src\assets\search.svg'/>
        <input
        type='text'
        placeholder='Search through thousands of movies'
        value = {searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // you type in your value and then, i dont manually every change the search term, the input had a handler for the specifrc type of event, 
                                                        // the onchange() is the handler and each time a key is pressed the event occurs. then you call the setSearchTerm
        />
        </div>
    </div>
  )
}

export default Search
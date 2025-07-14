import React from 'react'

const MovieCard = ({movie:{title, vote_average, poster_path, release_date, original_language}}) => { // passing props, and detstructing, that notation allows you to just say title and not movie.title
  return (
    <div className='movie-card'> 
        <img src={poster_path? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}/>
        
    

    <div className='mt-4'>
        <h3> {title? title:'No-Title yet'}</h3>

        <div className='content'>
            <div className='rating'>
                <img src='src\assets\star.svg'/>
                <p>{vote_average?vote_average.toFixed(1):"NA"} </p> 
            </div>
            <span>•</span>
            <p className='lang'>{original_language? original_language:"NA"}</p>

            <span>•</span>
            <p className='year'>{release_date?release_date.split('-')[0]: "NA"} </p> 
        </div>
    </div>
    </div>
    
  )
}

export default MovieCard

// toFixed() is a funcition that rounds down the average!!
//.split( is a function that will split the date into an array and we took the frist part which is the year and just left that)

// this is a presenational components, doesnt accpet any logic just components
import {React, useState} from 'react'
import Search from './components/Search'

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  return (
    <main>
      <div className='pattern'/>
       
       <div className='wrapper'>
        <header>
          <img src ="src\assets\hero.png" alt = "Hero Banner"/>
          <h1> Find <span className='text-gradient'>Movies </span> You'll Enjoy Without the Hassle</h1>
        </header>
        <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}/>
        <h1> {searchTerm}</h1>
       </div>
    </main>
    // I am passing props above the state back to the component, dont ever pass a prop like this setSearchTerm(), or else it will be called as soon as the component renders
  )
}

export default App
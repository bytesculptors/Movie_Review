import './App.css';
import { useState, useEffect } from 'react'
import Axios from 'axios'

function App() {
  const [movieName, setMovieName] = useState('')
  const [review, setReview] = useState('')
  const [movieList, setMovieList] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      // console.log(response.data);
      setMovieList(response.data)
    })
  })

  const handleSubmit = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName,
      review: review
    }).then(() => {
      alert('Insert successfully')
    })
  }

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className='form'>
        <label>Movie name:</label>
        <input 
          type='text' 
          name='movieName'
          onChange={(e) => {
            setMovieName(e.target.value)
          }}/>
        <label>Review:</label>
        <input 
          type='text' 
          name='review'
          onChange={(e) => {
            setReview(e.target.value)
          }}/>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {movieList.map((movie) => {
        return <h2>{movie.name} | {movie.review}</h2>
      })}
    </div>
  );
}

export default App;

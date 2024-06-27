import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../Pages/Home'
import MovieDetails from '../Pages/MovieDetails'
import WatchedMovies from '../Pages/WatchedMovies'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/:id" element={<MovieDetails/>} />
        <Route path="/watched" element={<WatchedMovies/>} />

    </Routes>
  )
}

export default AllRoutes
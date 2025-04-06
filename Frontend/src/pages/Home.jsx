import React from 'react'
import { BusList } from '../components/BusList'
import {Footer} from '../components/foot'
import {ReviewsSection} from '../components/reviews'

const Home = ({ buses, onBookSeat }) => {
  return (
    <div>
        
        <BusList buses={buses} onBookSeat={onBookSeat}/>
        <p>This is after the BusList</p>
        <ReviewsSection/>
        <Footer/>
    </div>
  )
}

export default Home
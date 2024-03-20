import React from 'react'
import './Footer.css'
import twitterLogo from '../assets/logos/twitter_logo.png'
import facebookLogo from '../assets/logos/facebook_logo.png'
import instaLogo from '../assets/logos/instagram_logo.png'
import linkedinLogo from '../assets/logos/linkedin_logo.png'

const Footer = () => {
  return (
    <footer>
        <div className='copyright-info'>© 2020 Nereus. All rights reserved</div>
        <div>
            <img src={twitterLogo} className='socials-link' height={"28px"}/>
            <img src={facebookLogo} className='socials-link' height={"28px"}/>
            <img src={instaLogo} className='socials-link' height={"28px"}/>
            <img src={linkedinLogo} className='socials-link' height={"28px"}/>
        </div>
    </footer>
  )
}

export default Footer
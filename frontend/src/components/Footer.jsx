import React from 'react'
import './Footer.css'
import twitterLogo from '../assets/logos/icons8-twitterx-64.png'
import facebookLogo from '../assets/logos/icons8-facebook-64.png'
import instaLogo from '../assets/logos/icons8-insta-64.png'
import linkedinLogo from '../assets/logos/icons8-linkedin-64.png'


const Footer = () => {
  return (
    <footer className='flex justify-around bg-highlight p-6'>
        <div className='content-center'>© 2020 Nereus. All rights reserved</div>
        <div className='flex '>
            <img src={twitterLogo} className='socials-link' />
            <img src={facebookLogo} className='socials-link w-10 h-10' />
            <img src={instaLogo} className='socials-link w-10 h-10' />
            <img src={linkedinLogo} className='socials-link w-10 h-10' />
            <div>
              
            </div>
        </div>
    </footer>
  )
}

export default Footer
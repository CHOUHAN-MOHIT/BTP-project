import React, {useEffect} from 'react'

const ContactUs = ({ setActiveTab }) => {
  useEffect(() => {
    setActiveTab('Contact');
  }, []);
  return (
    <div>ContactUs</div>
  )
}

export default ContactUs
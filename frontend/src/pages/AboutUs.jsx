import React , {useEffect}from 'react'

const AboutUs = ({ setActiveTab }) => {
  useEffect(() => {
    setActiveTab('About');
  }, []);
  return (
    <div>AboutUs</div>
  )
}

export default AboutUs
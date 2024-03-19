import React from 'react'
import './WeddingCard.css'

const Weddingcard = ({wedding}) => {
  const imageUrl = 'http://127.0.0.1:8000' + wedding.invitation_card;
  const styles = {
    backgroundImage: `url(${imageUrl})`,
  };
  console.log(wedding);
  return (
    <div className='wedding-card'>
        <div className='couple-img' style={styles}>{wedding.bride_name} & {wedding.groom_name}</div>
        <div className='wedding-details'>
            <div>{wedding.wedding_date}</div>
            <div>{wedding.city}</div>
        </div>
    </div>
  )
}
// {id, bride_name, bride_email, bride_phone, groom_phone, groom_email, groom_name, address, city, state, registration_date, wedding_date}

export default Weddingcard
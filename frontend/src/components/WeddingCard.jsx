import React from 'react'
import './WeddingCard.css'
import { Link } from 'react-router-dom';

const Weddingcard = ({wedding}) => {
  const imageUrl = 'http://127.0.0.1:8000' + wedding.invitation_card;
  const styles = {
    backgroundImage: `url(${imageUrl})`,
  };
  return (
    <Link to={`/wedding/${wedding.id}`}>
    <div className='wedding-card'>
        <div className='grid content-end w-64 h-80 bg-cover rounded-t-lg' style={styles}><h1 className='bg-gradient-to-b from-transparent to-[#ffffffcd] p-2 text-lg font-bold'>{wedding.bride_name} & {wedding.groom_name}</h1></div>
        <div className='flex m-1 items-center'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA+ElEQVR4nO2VOw6CUBBFDx0d7kNrcR/qHhTsLWywcyHGNaC1S/DHFtQtIOYl14SY8HtQWHiSSRjezNy8GTLAn4Y4QAAkwAvIapqJvQFz1SgkUEIMbBparFwjUkiiQFv2wLUsIAXWLQTWqlFI1pEVYg6PFv3fyI51BCLsiZoIuEAI+LnzKTDJ+b5iXBuBhfyH/EGux329e8oPbQR8Fd/K94AzcNKzYaeYoY2ADdFPCYzUY9MGQw+4qE1eFwKfId9LhtxYIL8qXC2/zwDRJzpusypuLZfdoWrZzXVFsxVXwLKmrVTc5M7KBByJXHXVrKalyplV/XD+8M0b/KGKVni3FLQAAAAASUVORK5CYII="/><span className='ml-2'>{wedding.wedding_date}</span></div>
        <div className='flex m-1'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABj0lEQVR4nOXUO2sVURTF8R8+rq9GrDSYaJtWCIoIaRQRBTFiqzYJ2goqfgUFK/0UYgpfjZWFhY+AFipoIyg+CoVIEEGJcmAFhmHm3om5heAfNty79trnzJm9z/A/sAfX8RILiRe4ht0rWXgLbuI3vmEWVxOz0UruRrzLYjve4DsuYEODp2gX43mdmk6sxxy+YqKDfyLep1jXZYPzOfrBrk+EQ6k5N8i4Gp9xqyE3hpnEaEP+Nj5iVb8N9uVJpmr6ZKWpS00vWpXjye3tt8FMTCM1/UnGdCxRfj+ueUZSO91vg0sx9Wr6Ai5X/l+JVqWX2rJGK2dj2tpygh2JV3jUcoIzXXpwrKZPYr7Sg/mGHkx16cGaTNGdhtxo3u90yxTdxaes0ZdyOxdxeJCxwpHUlFs/kF5u8heMd/CPxzvXMBytlO/Ku0TT61hiG97iA3ZaJrtyoZ5jc0O+aM/iKd6/Yj9+4CE2VfSN0UrugBVyFD9xP1/LtbiHXzhhSJzOlDxILEYbKqfwPo0/OezF/13+AGeRYfBGVSM9AAAAAElFTkSuQmCC"/><span className='ml-2'>{wedding.city}</span></div>
    </div>
    </Link>
  )
}
// {id, bride_name, bride_email, bride_phone, groom_phone, groom_email, groom_name, address, city, state, registration_date, wedding_date}

export default Weddingcard
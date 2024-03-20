import React , {useState , useEffect} from 'react'
import Weddingcard from '../components/WeddingCard';
import './WeddingList.css'

const WeddingList = ()  => {
    const [weddings, setWeddings] = useState([]);

    useEffect(() => {
    const fetchWeddings = async () => {
      try {
        const response = await fetch('http://localhost:8000/apis/weddings');
        if (!response.ok) {
          throw new Error(`Error fetching weddings: ${response.statusText}`);
        }
        const data = await response.json();
        setWeddings(data);
      } catch (error) {
        console.error('Error fetching weddings:', error);
      }
    };

    fetchWeddings();
  }, []);
  return (
    <div className='text-center' >
      <h1>Wedding List</h1>
      {weddings.length > 0 ? (
        <div className='list-container'>
          {weddings.map((wedding) => (
            <Weddingcard key={wedding.id} wedding={wedding}/>
          ))}
        </div>
      ) : (
        <p>No weddings found.</p>
      )}
    </div>
  )
}

export default WeddingList
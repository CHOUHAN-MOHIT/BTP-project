import React , {useState , useEffect} from 'react'
import Weddingcard from '../components/WeddingCard';
import './WeddingList.css'

const WeddingList = ({ setActiveTab })  => {
  useEffect(() => {
    
  }, []);
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
    setActiveTab('Weddings');
  }, []);
  return (
    <div className='text-center pt-16' >
      <h1>Wedding List</h1>
      {weddings.length > 0 ? (
        <div className='grid grid-cols-4 mx-32 gap-4'>
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
import React , {useState , useEffect} from 'react'
import Weddingcard from '../components/WeddingCard';
import './WeddingList.css'
import Pagination from '../components/Pagination';

const WeddingList = ({ setActiveTab })  => {
  const [weddings, setWeddings] = useState([]);
  const [currentPage , setCurrentPage] = useState(1);
  const [weddingsPerPage , setWeddingsPerPage] = useState(8);

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
  const handlePageChange =  (pageNumber) =>{ setCurrentPage(pageNumber);};

  //get current weddings
  const indexOfLastWedding = currentPage * weddingsPerPage;
  const indexOfFirstWedding = indexOfLastWedding -  weddingsPerPage;
  const currentWeddings = weddings.slice(indexOfFirstWedding , indexOfLastWedding);

  return (
    <>
    <div className='text-center pt-32 bg-gradient-to-b from-neutralAccent via-mutedAccent to-neutralAccent' >
      {weddings.length > 0 ? (
        <div className='grid grid-cols-4 mx-32 gap-4'>
          {currentWeddings.map((wedding) => (
            <Weddingcard key={wedding.id} wedding={wedding}/>
          ))}
        </div>
      ) : (
        <p>No weddings found.</p>
      )}
    </div>
    <Pagination
        weddingsPerPage={weddingsPerPage}
        totalWeddings={weddings.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  )
}

export default WeddingList
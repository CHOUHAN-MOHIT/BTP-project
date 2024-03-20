import React from 'react'
import { useParams } from 'react-router-dom';

const WeddingDetail = () => {
  const { id } = useParams();
  return (
    <div>WeddingDetail for id: {id}</div>
  )
}

export default WeddingDetail
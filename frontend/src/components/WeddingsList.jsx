import React from "react";
import './WeddingsList.css'

function WeddingCard(){
    return (
        <div className="card">
            <div className="card-img">Bride weds Groom</div>
            <div className="card-details">
                <h3>City, State</h3>
                Date from-to
            </div>
        </div>
    )
}

function WeddingsList(){
    return (
        <div>
            <WeddingCard/>
        </div>
    );
}

export default WeddingsList;
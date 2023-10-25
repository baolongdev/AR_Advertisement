import React from 'react'
import { toast } from 'react-toastify'

export default function CardView() {
  const handleDuplicateClick = () => {
    toast.success("Sao chép thành công!");
  };

  return (
    <div className='cardview'>
      <a href="" className='Panels'>
        <div className="cardImage" style={{ backgroundColor: "#fc91c1" }} />
        <div className="cardContent">
          <div className="textPart">
            <div className="cardTitleContainer">
              <h2 className="cardTitle">Time</h2>
            </div>
            <p className="cardText">Clock Widget </p>
            <p className="cardTextNonCap">Created: 2 days ago</p>
          </div>
          <div style={{ height: 40, width: 84 }} />
        </div>
      </a>

      <button className="deleteBtn">
        <i className="ri-close-circle-fill"></i>
      </button>
      <button className="duplicateButton"
        onClick={handleDuplicateClick}
      >
        <i className="ri-link-m"></i>
      </button>
    </div>
  )
}

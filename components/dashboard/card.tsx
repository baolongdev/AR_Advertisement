import React from 'react';
import { toast } from 'react-toastify';
import { copyCodeToClipboard } from '../utils/LinkToClipboad';

export default function CardView({ data, maxDescriptionLength = 20 }) {
  const handleDuplicateClick = ( content ) => {
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}/model/${key}`;
    copyCodeToClipboard(fullUrl)
  };
  const { key, created_at } = data
  const { title, description } = data.data;
  const truncatedDescription = description.length > maxDescriptionLength
    ? `${description.slice(0, maxDescriptionLength)}...`
    : description;

  const currentDate = new Date();
  const createdAtDate = new Date(created_at);
  const timeDifference = currentDate.getTime() - createdAtDate.getTime();

  // Calculate the number of days and weeks
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const weeksDifference = Math.floor(daysDifference / 7);

  // Display weeks if the difference is at least a week, otherwise display days
  const formattedTimeDifference = weeksDifference >= 1 ? `${weeksDifference} weeks` : `${daysDifference} days`;

  return (
    <div className="cardview">
      <a href={`/model/${key}`} className="Panels">
        <div className="cardImage" style={{ backgroundColor: '#fc91c1' }} />
        <div className="cardContent">
          <div className="textPart">
            <div className="cardTitleContainer">
              <h2 className="cardTitle">{title}</h2>
            </div>
            <p className="cardText">{description}</p>
            <p className="cardTextNonCap">Created: {formattedTimeDifference}</p>
          </div>
          <div style={{ height: 40, width: 84 }} />
        </div>
      </a>

      <button className="deleteBtn">
        <i className="ri-close-circle-fill"></i>
      </button>
      <button className="duplicateButton" onClick={() => handleDuplicateClick(`/model/${key}`)}>
        <i className="ri-link-m"></i>
      </button>
    </div>
  );
}

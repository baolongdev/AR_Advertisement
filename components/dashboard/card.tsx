import React from 'react';
import { toast } from 'react-toastify';
import { copyCodeToClipboard } from '../utils/LinkToClipboad';
import { deleteModelFromDatabase, deleteModelFromStorage } from '../utils/supabase-storage';
import { useRouter } from 'next/router';

export default function CardView({ data, maxDescriptionLength = 20, user_id="", updateCardData  }) {
  const router = useRouter();
  const { key, created_at } = data
  const { title, description, color } = data.data;

  const truncatedDescription = description.length > maxDescriptionLength
    ? `${description.slice(0, maxDescriptionLength)}...`
    : description;
  // copy link and go to analysis
  const handleDuplicateClick = (content) => {
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}/model/${key}`;
    copyCodeToClipboard(fullUrl)
    router.push(`/analysis/${key}`);
  };
  const handleDeleteClick = async () => {
    const confirmation = window.confirm("Bạn có chắc chắn muốn xóa mô hình này?");
    if (!confirmation) {
      return;
    }
    try {
      await deleteModelFromStorage(user_id, data.key)
      await deleteModelFromDatabase(data.key);
      console.log('Model deleted successfully');
      toast.success("Xóa thành công!");
      updateCardData((prevData) => prevData.filter((item) => item.key !== data.key));
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Đã xảy ra lỗi khi xóa!");
    }
  };
  
  function calculateTimeDifference(createdAt) {
    const currentDate = new Date();
    const createdAtDate = new Date(createdAt);
    const timeDifference = currentDate.getTime() - createdAtDate.getTime();
  
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const weeksDifference = Math.floor(daysDifference / 7);
  
    return weeksDifference >= 1 ? `${weeksDifference} weeks` : `${daysDifference} days`;
  }

  return (
    <div className="cardview">
      <a href={`/model/${key}`} className="Panels">
        <div className="cardImage" style={{ backgroundColor: color }} />
        <div className="cardContent">
          <div className="textPart">
            <div className="cardTitleContainer">
              <h2 className="cardTitle">{title}</h2>
            </div>
            <p className="cardText">{truncatedDescription}</p>
            <p className="cardTextNonCap">Created: {calculateTimeDifference(created_at)}</p>
          </div>
          <div style={{ height: 40, width: 84 }} />
        </div>
      </a>

      <button className="deleteBtn" onClick={() => handleDeleteClick()}>
        <i className="ri-close-circle-fill"></i>
      </button>
      <button className="duplicateButton" onClick={() => handleDuplicateClick(`/model/${key}`)}>
        <i className="ri-link-m"></i>
      </button>
    </div>
  );
}

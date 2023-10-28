import React, { useEffect, useState } from 'react';
import CardView from './card';
import AddCardView from './add-card';
import { getAllDataByUserId } from '../utils/supabase-storage';
import ConfirmationModal from '../utils/modal';
import { useSession } from '../../hooks/useSession';

export default function EmptyStates() {
    const [filterValue, setFilterValue] = useState('all');
    const [sortValue, setSortValue] = useState('date_created');
    const [cardData, setCardData] = useState([]);
    const [userId, setUserId] = useState(null);
    const { session, userId: userIdFromSession, email } = useSession();

    useEffect(() => {
        setUserId(userIdFromSession);
    }, [userIdFromSession]);

    useEffect(() => {
        if (userId) {
            getAllDataByUserId(userId).then((data) => {
                if (data) {
                    setCardData(data);
                }
            });
        }
    }, [session, userId, email]);

    const updateCardData = (newData) => {
        setCardData(newData);
    };

    const handleFilterChange = (e) => {
        setFilterValue(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortValue(e.target.value);
    };

    if (userId === null) {
        // Hiển thị một thông báo hoặc trạng thái tải dữ liệu khi userId chưa được thiết lập
        return <p>Loading...</p>;
    }

    return (
        <div className='content'>
            <div className="mb-10 flex justify-between items-center">
                <h3 className='sm:text-4xl text-2xl mb-0'>My Widgets</h3>
                <div className="filterSort">
                    <div className="filter">
                        <span>Filter by: </span>
                        <select value={filterValue} onChange={handleFilterChange}>
                            <option value="all">All</option>
                            <option value="clock">Clock</option>
                        </select>
                    </div>
                    <div className="filter">
                        <span>Sort by: </span>
                        <select value={sortValue} onChange={handleSortChange}>
                            <option value="date_created">Date Created</option>
                            <option value="last_viewed">Last Viewed</option>
                            <option value="alphabetical">Alphabetical (by Widget)</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {cardData.map((card, index) => (
                    <CardView key={index} data={card} user_id={userId} updateCardData={updateCardData} />
                ))}
                <AddCardView />
            </div>
        </div>
    );
}

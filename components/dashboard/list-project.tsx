import React, { useEffect, useState } from 'react'
import { useSession } from '../../hooks/useSession';
import { getAllDataByUserId } from '../utils/supabase-storage';
import CardView from './card';

export default function ListProject() {
    const [cardData, setCardData] = useState([]);
    const { session, userId, email } = useSession();
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

    return (
        <>
            {cardData.map((card, index) => (
                <CardView key={index} data={card} user_id={userId} updateCardData={updateCardData} />
            ))}
        </>
    )
}
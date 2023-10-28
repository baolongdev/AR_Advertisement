import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../components/misc/layout';
import ShowcaseCard from '../../components/showcase/showcase-card';
import { getAllDataByUserId } from '../../components/utils/supabase-storage';
import { useSession } from '../../hooks/useSession';

export default function Index() {

    const userIdRef = useRef("");
    const emailRef = useRef("");

    const [cardData, setCardData] = useState([]);
    const { session, userId, email } = useSession();

    useEffect(() => {
        userIdRef.current = userId
        emailRef.current = email
    }, [session, userId, email]);

    useEffect(() => {

        getAllDataByUserId(userId).then((data) => {
            if (data) {
                setCardData(data);
            }
        });

    }, [session, userId]);

    return (
        <Layout>
            <section id="showcase" className="section section--hero">
                <div className="content">
                    <h3 className="hero__heading text-center">
                        <div className='hero__h1-span1'>Community Showcase</div>
                    </h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {cardData.map((card, index) => (
                            <ShowcaseCard key={index} data={card} user_id={userId} />
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}

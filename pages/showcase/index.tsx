import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../components/misc/layout';
import ShowcaseCard from '../../components/showcase/showcase-card';
import { getAllData } from '../../components/utils/supabase-storage';
import { useSession } from '../../hooks/useSession';
import LoginPage from '../account';

export default function Index() {
    const [cardData, setCardData] = useState([]);
    
    useEffect(() => {
        getAllData().then((data) => {
            if (data) {
                setCardData(data);
            }
        });
    }, []);

    return (
        <Layout>
            <section id="showcase" className="section section--hero">
                <div className="content">
                    <h3 className="hero__heading text-center">
                        <div className='hero__h1-span1 text-5xl sm:text-6xl md:pt-12 xl:pt-0'>Community Showcase</div>
                    </h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {cardData.map((card, index) => (
                            <ShowcaseCard key={index} data={card} />
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    )
}

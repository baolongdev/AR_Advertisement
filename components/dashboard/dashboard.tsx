import React, { useEffect, useState } from 'react'
import Header from './header'
import Footer from '../misc/footer'
import EmptyStates from './empty-states';
import { useUserInfo } from '../../hooks/useSession';

export default function Dashboard({ session }) {
    const [userId, setUserId] = useState(null);
    const [email, setEmail] = useState(null);
    
    useEffect(() => {
        if (session && session.user) {
            const user_id = session.user.identities[0].user_id;
            const user_email = session.user.email;
            setUserId(user_id);
            setEmail(user_email);
        }
    }, [session]);
    return (
        <>
            <Header user_email={email} />
            <section id="dashboard" className="section section--hero">
                <EmptyStates session={session}/>
            </section>
            <Footer />
        </>
    )
}

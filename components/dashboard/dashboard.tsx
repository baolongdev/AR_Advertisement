import React, { useEffect, useState } from 'react'
import Header from './header'
import Footer from '../misc/footer'
import EmptyStates from './empty-states';
import { useSession, useUserInfo } from '../../hooks/useSession';
import Modal from 'react-modal';

export default function Dashboard() {
    const { session, email } = useSession();

    return (
        <>
            <Header user_email={email} />
            <section id="dashboard" className="section section--hero">
                <EmptyStates/>
            </section>
            {/* <Footer /> */}
        </>
    )
}

// hooks/useSession.js
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    "https://lklkryecbqvxxheajwly.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrbGtyeWVjYnF2eHhoZWFqd2x5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyODUzNTQsImV4cCI6MjA2MTg2MTM1NH0.pqMI33Z3ZDGJBDywMKs4mKEDK7g0ysa9AM2RrMkOVYc"
);

function getSession() {
    return supabase.auth.getSession().then(({ data: { session } }) => session);
}

export function useSession() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        getSession().then((session) => setSession(session));

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Derive userId and email from session
    const userId = session && session.user ? session.user.identities[0].user_id : null;
    const email = session && session.user ? session.user.email : null;
    return { session, userId, email };
}
export function useUserInfo(session) {
    const userId = session && session.user ? session.user.identities[0].user_id : null;
    const email = session && session.user ? session.user.email : null;
    return { userId, email };
}
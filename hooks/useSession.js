// hooks/useSession.js
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    "https://czicgxdmyyjpfkmjpfon.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6aWNneGRteXlqcGZrbWpwZm9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc4MTI4ODQsImV4cCI6MjAxMzM4ODg4NH0.OMLwrt4app9rG8FegOrn6wLqpbS-j76ZInLjSeU-7Fw"
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
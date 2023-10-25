import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import Dashboard from '../components/dashboard/dashboard';
import {useSession} from '../hooks/useSession'
const supabase = createClient(
    "https://czicgxdmyyjpfkmjpfon.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6aWNneGRteXlqcGZrbWpwZm9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc4MTI4ODQsImV4cCI6MjAxMzM4ODg4NH0.OMLwrt4app9rG8FegOrn6wLqpbS-j76ZInLjSeU-7Fw");

export default function LoginPage() {
    const {session} = useSession();   

    if (!session) {
        return (
            <section id="login" className="section">
                <div className="content">
                    <div className="py-6 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="flex justify-center pb-8">
                            <a href="/">
                                <img
                                    src="assets/logo.png"
                                    height={90}
                                    width={90}
                                    alt="Obsidian"
                                />
                            </a>
                        </div>
                        <Auth
                            supabaseClient={supabase}
                            appearance={{
                                extend: false,
                                className: {
                                    button: 'btn btn--hero w-button text-align-center w-full mb-5 py-4',
                                    container: 'flex flex-col justify-center',
                                    anchor: 'text-center text-muted flex text-gray-600 hover:text-gray-400',
                                    label: 'input-label',
                                    input: 'input w-input',
                                    message: 'bg-blue-500 text-white text-sm p-2 mt-2 block rounded-lg'
                                },
                            }}
                            providers={['google', 'facebook']}
                            localization={{
                                variables: {
                                    sign_in: {
                                        email_label: 'Your email address',
                                        password_label: 'Your strong password',
                                    },
                                },
                            }}
                        />

                    </div>
                </div>
            </section>
        )
    }
    else {
        return <Dashboard session={session} />;
    }
}
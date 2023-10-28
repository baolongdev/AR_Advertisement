import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import Dashboard from '../components/dashboard/dashboard';
import {useSession} from '../hooks/useSession'
import { supabase } from '../components/utils/supabase-storage';

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
                            // providers={['google', 'facebook']}
                            providers={[]}
                            localization={{
                                variables: {
                                    sign_up: {
                                        email_label: 'Địa chỉ Email',
                                        password_label: 'Mật khẩu',
                                        button_label: 'Đăng ký',
                                        loading_button_label: 'Đang thực hiện!',
                                        confirmation_text: 'Đăng ký thành công!',
                                    },
                                    sign_in: {
                                        email_label: 'Địa chỉ Email',
                                        password_label: 'Mật khẩu',
                                        button_label: 'Đăng nhập',
                                        loading_button_label:'Đang thực hiện!',
                                    },
                                    forgotten_password: {
                                        email_label: 'Địa chỉ Email',
                                        password_label: 'Mật khẩu',
                                        button_label: 'Quên mật khẩu',
                                        loading_button_label: 'Đang gửi!',
                                        confirmation_text: 'Vào mail để xác nhận!',
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
        return <Dashboard/>;
    }
}
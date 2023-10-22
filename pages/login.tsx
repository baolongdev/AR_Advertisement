
import { getCookie } from 'cookies-next';
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/misc/layout';

export default function LoginPage({ username }) {
    const router = useRouter()
    const { msg } = router.query
    return (
        <section id="login" className="section h-screen">
            <div className="content">
                <div className="py-6 sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* Logo */}
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
                    {/* Title */}
                    <h1 className="mb-6 text-center text-3xl font-medium">
                        Đăng nhập
                    </h1>
                    {/* message */}
                    <div className="message-container mb-2">
                        <div className="text-green-400 text-sm text-center p-2 rounded border border-green-900 bg-green-950" style={{ display: msg && !msg.includes("Error") ? "block" : "none" }}>
                            {msg}
                        </div>
                        <div className="text-red-400 text-sm text-center p-2 rounded border border-red-900 bg-red-950" style={{ display: msg && msg.includes("Error") ? "block" : "none" }}>
                            {msg}
                        </div>
                    </div>
                    {/* form */}
                    <form action='/api/login' method='POST'>
                        <div>
                            <label className="input-label" htmlFor="labeled-input-email">
                                Email
                            </label>
                            <input
                                className="block input w-full px-4"
                                name="email" 
                                id="email"
                                type="email"
                                placeholder='email'
                                required
                            />
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="input-label" htmlFor="labeled-input-password">
                                    Password
                                </label>
                                <span className="font-medium text-sm">
                                    <a href="#" className="text-accent text-violet-600" tabIndex={-1}>
                                        Forgot password?
                                    </a>
                                </span>
                            </div>
                            <input
                                className="block input w-full px-4"
                                name="password" 
                                id="password"
                                type="password"
                                placeholder='password'
                                required
                            />

                        </div>
                        <div className="pt-2">
                            <button type="submit" value="Login" className="btn btn--hero w-button text-align-center w-full">Đăng nhập</button>
                        </div>
                    </form>
                    {/*  */}
                    <div className="my-8 leading-6 font-medium text-sm">
                        <p className="text-center text-muted">
                            Không có tài khoảng?{" "}
                            <a href="#" className="text-violet-600">
                                Tạo tài khoản
                            </a>
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    var username = getCookie('username', { req, res });
    if (username != undefined) {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }
    return { props: { username: false } };
};
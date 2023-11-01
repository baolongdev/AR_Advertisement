import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { getDataDatabaseByKey, getSignedUrlFileStorageByKey } from '../../components/utils/supabase-storage';
import QRCode from 'react-qr-code';
import { copyCodeToClipboard } from '../../components/utils/LinkToClipboad';
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import { useSession } from '../../hooks/useSession';

export default function render() {
    const router = useRouter();
    const [url, setUrl] = useState(null)
    const [loading, setLoading] = useState(false);
    const { email } = useSession();
    const [post, setPost] = useState({
        url: "",
        title: "",
        description: "",
        color: "",
        placement: false,
        fileContent: false,
    });
    useEffect(() => {
        setUrl(window.location.href)
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            const key = router.query.slug;

            if (key) {
                const fileUrl = await getSignedUrlFileStorageByKey(key[0]); // Await the async function

                getDataDatabaseByKey(key[0]).then((data) => {
                    if (data) {
                        console.log(data);
                        setPost({ ...data, url: fileUrl }); // Set the 'url' property
                        setLoading(false);
                    } else {
                        setLoading(true);
                    }
                });
            }
        };

        fetchData();

    }, [router.query.slug]);

    return (
        <section id="modelview" className="section">
            <div className="content">
                {loading ? ( // Conditional rendering based on the loading state
                    <p>Loading...</p>
                ) : (
                    <div className='render' style={{ backgroundColor: post.color }}>
                        <model-viewer
                            src={post.url["signedUrl"]}
                            alt={post.description}
                            title={post.title}
                            ar-scale="auto"
                            camera-controls
                            touch-action="pan-y"
                            auto-rotate
                            shadow-intensity="1"
                            ar-modes="webxr scene-viewer quick-look ar"
                            ar
                        >
                            <slot
                                name="ar-button"
                                slot="ar-button"
                                className="absolute bg-white rounded-md border border-gray-300 px-3 py-1"
                            >
                                <a
                                    id="default-ar-button"
                                    className="fab"
                                    tabIndex={2}
                                    aria-label="View in your space"
                                >
                                    <svg
                                        version="1.1"
                                        id="view_x5F_in_x5F_AR_x5F_icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        x="0px"
                                        y="0px"
                                        width="24px"
                                        height="24px"
                                        viewBox="0 0 24 24"
                                        enableBackground="new 0 0 24 24"
                                        xmlSpace="preserve"
                                    >
                                        <rect id="Bounding_Box" x={0} y={0} fill="none" width={24} height={24} />
                                        <g id="Art_layer">
                                            <path d="M3,4c0-0.55,0.45-1,1-1h2V1H4C2.35,1,1,2.35,1,4v2h2V4z" />
                                            <path d="M20,3c0.55,0,1,0.45,1,1v2h2V4c0-1.65-1.35-3-3-3h-2v2H20z" />
                                            <path d="M4,21c-0.55,0-1-0.45-1-1v-2H1v2c0,1.65,1.35,3,3,3h2v-2H4z" />
                                            <path d="M20,21c0.55,0,1-0.45,1-1v-2h2v2c0,1.65-1.35,3-3,3h-2v-2H20z" />
                                            <g>
                                                <path
                                                    d="M18.25,7.6l-5.5-3.18c-0.46-0.27-1.04-0.27-1.5,0L5.75,7.6C5.29,7.87,5,8.36,5,8.9v6.35c0,0.54,0.29,1.03,0.75,1.3
                                                        l5.5,3.18c0.46,0.27,1.04,0.27,1.5,0l5.5-3.18c0.46-0.27,0.75-0.76,0.75-1.3V8.9C19,8.36,18.71,7.87,18.25,7.6z M7,14.96v-4.62
                                                        l4,2.32v4.61L7,14.96z M12,10.93L8,8.61l4-2.31l4,2.31L12,10.93z M13,17.27v-4.61l4-2.32v4.62L13,17.27z"
                                                />
                                            </g>
                                        </g>
                                    </svg>
                                </a>
                            </slot>
                            <div className="info_container">
                                <a
                                    // target="_blank"
                                    rel="noreferrer"
                                    className="info_textLink"
                                    href="#"
                                >
                                    {email && (
                                        <p className="info_text" style={{ background: "#ffffff", color: "#000000" }}>@{email.split('@')[0]}</p>
                                    )}
                                </a>
                            </div>
                            <div className="bottom-left-menu">
                                <p className="first">{post.title}</p>
                                <p className="second">{post.description}</p>
                            </div>
                        </model-viewer>

                        <a href="/" className="header__logo w-inline-block">
                            <img
                                src="/assets/Logo.png"
                                loading="eager"
                                alt=""
                                width={64}
                                className="logo-img"
                            />
                        </a>

                        <QRCode
                            className='qrcode'
                            size={100}
                            style={{ height: "auto", maxWidth: "86px", width: "86px" }}
                            value={url || ''}
                            viewBox={`0 0 86 86`}
                        />
                    </div>
                )}
            </div>
        </section>
    )
}

{/* <div className="visit__cards">
    <div className="visit__card mod--first">
        <div className="visit__card-title-over">
            <div>AR_Advertisement</div>
        </div>
        <div className="visit__card-play-wrap">
            {post.title}
            <img src="https://assets-global.website-files.com/651c348dccebd78124903fb3/651c348dccebd78124904042_ico_btn-play.svg" loading="lazy" alt="" className="visit__card-play" />
        </div>
        <div className='sm:flex items-center gap-4 pb-5'>
            <button className='btn btn--hero flex sm:text-sm text-xs mb-4 mt-5 py-0 pt-3 cursor-pointer select-none'
                onClick={() => copyCodeToClipboard(url)}
            >
                <p className="">
                    <code>{url}</code>
                    <i className="ri-share-line pl-4"></i>
                </p>
            </button>
            <QRCode
                size={100}
                style={{ height: "auto", maxWidth: "86px", width: "86px" }}
                value={url || ''}
                viewBox={`0 0 86 86`}
            />
        </div>

        <div className="visit__card-elements">
            <model-viewer
                src={post.url["signedUrl"]}
                alt={post.description}
                title={post.title}
                ar-scale="auto"
                camera-controls
                touch-action="pan-y"
                auto-rotate
                shadow-intensity="1"
                ar-modes="webxr scene-viewer quick-look ar"
                ar
            // poster="/assets/logo.png"
            >
            </model-viewer>
        </div>
        <div className="visit__card-desc">
            {post.description}
        </div>
    </div>
</div> */}
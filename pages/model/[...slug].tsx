import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { getDataDatabaseByKey, getSignedUrlFileStorageByKey } from '../../components/utils/supabase-storage';
import QRCode from 'react-qr-code';
import { copyCodeToClipboard } from '../../components/utils/LinkToClipboad';
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';

export default function render() {
    const router = useRouter();
    const [url, setUrl] = useState(null)
    const [loading, setLoading] = useState(false);
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
                    <div className='render' style={{backgroundColor:post.color}}>
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
                        <a href="/" className="header__logo w-inline-block">
                            <img
                                src="https://uploads-ssl.webflow.com/651c348dccebd78124903fb3/651c348dccebd78124904040_logo.svg"
                                loading="eager"
                                alt=""
                                className="logo-img"
                            />
                        </a>
                        <div className="bottom-left-menu">
                            <p className="first">{post.title}</p>
                            <p className="second">{post.description}</p>
                        </div>
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
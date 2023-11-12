import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getDataDatabaseByKey, getSignedUrlFileStorageByKey } from '../../components/utils/supabase-storage';
import InfoContainer from '../../components/model/info-container';
import QRCode from 'react-qr-code';

export default function Render() {
    const router = useRouter()
    const [url, setUrl] = useState(null)
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false)

    const [dataRender, setDataRender] = useState({
        url: "",
        title: "",
        description: "",
        color: "",
        email: "",
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
                        setDataRender({ ...data, url: fileUrl }); // Set the 'url' property
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
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className='render' style={{ backgroundColor: dataRender.color }}>
                        <model-viewer
                            src={dataRender.url["signedUrl"]}
                            alt={dataRender.description}
                            title={dataRender.title}
                            ar-scale="auto"
                            camera-controls
                            touch-action="pan-y"
                            auto-rotate
                            shadow-intensity="1"
                            ar-modes="webxr scene-viewer quick-look"
                            ar
                            autoplay
                        >
                        </model-viewer>
                        <div className='sm:block hidden'>
                            <div className="bottom-left-menu">
                                <p className="first">{dataRender.title}</p>
                                <p className="second">{dataRender.description}</p>
                            </div>
                        </div>
                        <div>

                            <InfoContainer email={dataRender.email} />
                            {/* Logo */}
                            <a href="/" className="header__logo w-inline-block">
                                <img
                                    height={67}
                                    width={67}
                                    src="../assets/Logo.svg"
                                    loading="eager"
                                    alt=""
                                    className="logo-img"
                                />
                            </a>
                            <QRCode
                                // onClick={() => setIsOpen(isOpen => !isOpen)}
                                className='qrcode cursor-pointer'
                                size={100}
                                style={{ height: "auto", maxWidth: "86px", width: "86px" }}
                                value={url || ''}
                                viewBox={`0 0 86 86`}
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

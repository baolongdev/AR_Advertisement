import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  getDataDatabaseByKey,
  getSignedUrlFileStorageByKey,
} from "../../components/utils/supabase-storage";
import InfoContainer from "../../components/model/info-container";
import QRCode from "react-qr-code";
import ModelViewer from "../../components/model/model-viewer";
import PluginControls from "../../components/model/plugin";

export default function Render() {
  const router = useRouter();
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [dataRender, setDataRender] = useState({
    url: "",
    title: "",
    description: "",
    color: "",
    email: "",
    hospots: [],
    placement: false,
    fileContent: false,
  });

  useEffect(() => {
    setUrl(window.location.href);
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

  useEffect(() => {
    PluginControls().renderHotspotsFromJSON(dataRender.hospots);
  }, [dataRender.hospots]);
  console.log(dataRender);

  return (
    <section id="modelview" className="section">
      <div className="content">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="render" style={{ backgroundColor: dataRender.color }}>
            <ModelViewer
              linkUrl={dataRender.url["signedUrl"]}
              title={dataRender.title}
              description={dataRender.description}
            />
            <div className="sm:block hidden">
              <div className="bottom-left-menu">
                <p className="first">{dataRender.title}</p>
                {/* <p className="second">{dataRender.description}</p> */}
                <div
                  className="second"
                  dangerouslySetInnerHTML={{ __html: dataRender.description }}
                />
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

              <div
                className={`sm:block hidden flex flex-col items-center gap-2 qrcode bg-white p-2 rounded ${isOpen ? "popupQr" : ""
                  }`}
                onClick={() => setIsOpen((isOpen) => !isOpen)}
              >
                <QRCode
                  //   onClick={() => setIsOpen((isOpen) => !isOpen)}
                  className={`cursor-pointer relative`}
                  size={100}
                  style={{ height: "auto", maxWidth: "86px", width: "86px" }}
                  value={url || ""}
                  viewBox={`0 0 86 86`}
                />
                <p className={`relative text-black text-center select-none ${isOpen ? "h3" : ""
                  }`}>Quét Mã</p>
                <div className="animate-ping w-5 h-5 rounded-full absolute bottom-0 right-0 bg-red-900" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

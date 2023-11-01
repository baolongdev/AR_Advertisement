import React, { useEffect, useState } from 'react'
import { getSignedUrlFileStorageByKey } from '../utils/supabase-storage';

export default function showcaseCard({ data, maxDescriptionLength = 20 }) {
  const { key, created_at } = data
  const { title, description, color, email } = data.data;
  const [src, setSrc] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const { signedUrl } = await getSignedUrlFileStorageByKey(key);
      setSrc(signedUrl);
    };
    fetchData();
  }, [key]);

  return (
    <div className='group relative flex w-full flex-col gap-3'>
      <div className="flex h-fit w-full flex-col gap-0 overflow-hidden rounded-lg border-[0.5px] transition duration-100 ease-out hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2">
        <div className='relative z-0 w-full overflow-hidden' style={{ backgroundColor: color }}>
          <model-viewer
            src={src}
            ar-scale="auto"
            camera-controls
            touch-action="pan-y"
            auto-rotate
            shadow-intensity="1"
          >
          </model-viewer>
          <div className="info_container">
            {email && (
              <p className="info_text" style={{ background: "#ffffff", color: "#000000" }}>@{"longle12@".split('@')[0]}</p>
            )}
          </div>
        </div>
      </div>
      <a href={`/model/${key}`}>
        <div className='title flex flex-col grow items-start gap-2'>
          <h4 className='text-white'>{title}</h4>
          <h4 className='text-white'>{description.length > 20 ? description.slice(0, 20) + '...' : description}</h4>
        </div>
      </a>
    </div>
  )
}

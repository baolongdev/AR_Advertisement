import React from 'react';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';

const AdvancedScripts = () => {
  return (
    <div>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/platform/1.3.5/platform.min.js" />
      <Script
        async
        strategy='afterInteractive'
        type='module'
        src='https://unpkg.com/@google/model-viewer@^2.1.1/dist/model-viewer.min.js'
      />
      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KFVFPMMQ"
          height="0" width="0" 
          className='hidden'>
        </iframe>
      </noscript>
    </div>
  );
};

export default AdvancedScripts;

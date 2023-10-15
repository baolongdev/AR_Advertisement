import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config';
import { AppProps } from 'next/app'
import '../styles/index.css'
import posthog from 'posthog-js';
import Script from 'next/script';

function setupPostHog() {
  // setup posthog
  const router = useRouter();
  useEffect(() => {
    // Init PostHog
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY, { api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST });

    // Track page views
    const handleRouteChange = () => posthog.capture('$pageview');
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

}

export default function MyApp({ Component, pageProps }: AppProps) {
  setupPostHog();
  return (
    <>
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/platform/1.3.5/platform.min.js"/>
    <Script
        async
        strategy='afterInteractive'
        type='module'
        src='https://unpkg.com/@google/model-viewer@^2.1.1/dist/model-viewer.min.js'
      />
      <DefaultSeo {...SEO}/>
      <Component {...pageProps} />
    </>
  )
}

import React from 'react';
import Head from 'next/head';
import {
  Placeholder,
  VisitorIdentification,
  getPublicUrl,
  LayoutServiceData,
} from '@sitecore-jss/sitecore-jss-nextjs';
// import Navigation from 'src/Navigation';

// Prefix public assets with a public URL to enable compatibility with Sitecore editors.
// If you're not supporting Sitecore editors, you can remove this.
const publicUrl = getPublicUrl();

interface LayoutProps {
  layoutData: LayoutServiceData;
}

const Layout = ({ layoutData }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;

  return (
    <>
      <Head>
        <title>{route?.fields?.pageTitle?.value || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
      </Head>

      {/*
        VisitorIdentification is necessary for Sitecore Analytics to determine if the visitor is a robot.
        If Sitecore XP (with xConnect/xDB) is used, this is required or else analytics will not be collected for the JSS app.
        For XM (CMS-only) apps, this should be removed.

        VI detection only runs once for a given analytics ID, so this is not a recurring operation once cookies are established.
      */}
      <VisitorIdentification />

      {/* <Navigation />
      {/* root placeholder for the app, which we add components to using route data */}
      {/* <main className="flex-shrink-0">
        {route && <Placeholder name="jss-main" rendering={route} />}
      </main>  */}
      <main className="flex-shrink-0">
        {route && <Placeholder name="headless-header" rendering={route} />}
        {route && <Placeholder name="headless-main" rendering={route} />}
      </main>
      <footer className="bg-dark py-4 mt-auto">
        {route && <Placeholder name="headless-footer" rendering={route} />}
      </footer>
    </>
  );
};

export default Layout;

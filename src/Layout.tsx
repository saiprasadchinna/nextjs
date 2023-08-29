import React from 'react';
import Head from 'next/head';
import {
  Placeholder,
  VisitorIdentification,
  getPublicUrl,
  LayoutServiceData,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Navigation from './Navigation';
// import Navigation from 'src/Navigation';

// Prefix public assets with a public URL to enable compatibility with Sitecore editors.
// If you're not supporting Sitecore editors, you can remove this.
const publicUrl = getPublicUrl();

interface LayoutProps {
  layoutData: LayoutServiceData;
}
const arr = {
  boilarIDs: {
    itemids: [
      'a60d8648-9101-57d0-a280-93df8eaf3a80',
      '6254e6fc-bac8-5a28-98fe-5c9a86910837',
      '9f6bbe49-a482-5760-81cf-06d9e302f88e',
    ],
  },
};
const Layout = ({ layoutData }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const IsBoilarItem = arr.boilarIDs.itemids.includes(route?.itemId as string);
  //console.log(route?.itemId);
  //console.log(arr.boilarIDs.itemids.includes('a60d8648-9101-57d0-a280-93df8eaf3a80'));
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
      {IsBoilarItem ? (
        <>
          <Navigation />
          <main className="flex-shrink-0">
            {route && <Placeholder name="jss-main" rendering={route} />}
          </main>
        </>
      ) : (
        <>
          <main className="flex-shrink-0">
            {route && <Placeholder name="headless-header" rendering={route} />}
            {route && <Placeholder name="headless-main" rendering={route} />}
          </main>
          <footer className="bg-dark py-4 mt-auto">
            {route && <Placeholder name="headless-footer" rendering={route} />}
          </footer>
        </>
      )}
    </>
  );
};

export default Layout;

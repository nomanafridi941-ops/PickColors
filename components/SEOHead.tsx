import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  jsonLd?: object | object[];
}

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, url, image, jsonLd }) => {
  const siteUrl = 'https://pickcolors.xyz';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const ogImage = image || `${siteUrl}/og-image.png`;

  return (
    <Helmet>
      <title>{title} | PickColors</title>
      <meta name="description" content={description} />
      <meta name="og:title" content={`${title} | PickColors`} />
      <meta name="og:description" content={description} />
      <meta name="og:url" content={fullUrl} />
      <meta name="og:image" content={ogImage} />
      <meta name="twitter:title" content={`${title} | PickColors`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <link rel="canonical" href={fullUrl} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;

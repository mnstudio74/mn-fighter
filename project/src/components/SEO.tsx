import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'MN STUDIO Quotes - Daily Inspiration & Motivational Quotes',
  description = 'Discover daily inspiration with MN STUDIO Quotes. Find motivational quotes, wisdom, and life lessons from great minds. Share, save, and get inspired every day.',
  keywords = 'quotes, motivation, inspiration, daily quotes, life quotes, success quotes, wisdom, motivational quotes',
  image = 'https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=1200',
  url = 'https://mnstudio-quotes.netlify.app',
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="MN STUDIO" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="en" />
      <meta name="theme-color" content="#1e3a8a" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="MN STUDIO Quotes" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "MN STUDIO Quotes",
          "description": description,
          "url": url,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${url}?search={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
import React from 'react';
import Header from '@/components/layout/default/header';
import Footer from '@/components/layout/default/footer';

const DefaultLayout = ({ children }) => {
  return (
    <html lang="ko">
      <body>
        <div className="wrapper">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default DefaultLayout;

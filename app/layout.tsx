import 'bootstrap/dist/css/bootstrap.css';
import './global.css';
import Script from 'next/script';

export default function RootLayout( {children} ) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Boostrap JS files */}
        <Script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"></Script>
      </body>
    </html>
  );
}

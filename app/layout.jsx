import 'bootstrap/dist/css/bootstrap.css';
import './global.css';
import BootstrapClient from './ui/BootstrapClient';

export default function RootLayout( {children} ) {
    return (
      <html lang="en">
        <body>
          {children}
          <BootstrapClient />
        </body>
      </html>
    );
}

"use client"
import { useEffect } from 'react';

export default function BootstrapClient() {
  // Adds the Bootstrap JS code to the client code after rendering
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return null;
}

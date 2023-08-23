// the plugin@name paradigm is used to create middleware
// in this case, we want to attach the CSP to every request in the app.

import type { RequestHandler } from '@builder.io/qwik-city';
import { isDev } from '@builder.io/qwik/build';
import crypto from 'crypto';

export const onRequest: RequestHandler = (event) => {
  if (isDev) return; // Will not return CSP headers in dev mode
  const nonce = crypto.randomBytes(16).toString('hex'); // Your custom nonce logic here
  event.sharedMap.set('@nonce', nonce);
  const csp = [
    `font-src 'self' https://fonts.gstatic.com`,
    `img-src 'self' https://res.cloudinary.com/dunbkcyqq/ data:`,
    `script-src 'self' http: https: 'unsafe-inline' 'nonce-${nonce}' 'strict-dynamic'`,
    `style-src 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net 'unsafe-inline'`,
    `connect-src 'self' https://vitals.vercel-insights.com https://vitals.vercel-analytics.com/v1/vitals`,
    `script-src-attr 'none'`,
    `frame-src 'self' 'nonce-${nonce}'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `frame-ancestors 'self'`,
    `upgrade-insecure-requests`,
    `require-trusted-types-for 'script'`,
  ];

  event.headers.set('Content-Security-Policy', csp.join('; '));
};

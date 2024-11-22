importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

if (workbox) {
  console.log('Workbox is loaded');
} else {
  console.error('Workbox failed to load');
}

workbox.core.clientsClaim();

// Precaching file statis
workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: null },
  { url: '/favicon.ico', revision: null },
  { url: '/logo192.png', revision: null },
  { url: '/logo512.png', revision: null },
  { url: '/manifest.json', revision: null },
  { url: '/offline.html', revision: null },
]);

// App Shell untuk SPA
workbox.routing.registerRoute(
  ({ request }) => request.mode === 'navigate',
  workbox.precaching.createHandlerBoundToURL('/index.html')
);

// Cache gambar
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// Fallback jika fetch gagal
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        })
      );
    })
  );
});

// Aktivasi dan membersihkan cache lama
self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['kelompok36w-cache-v1'];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

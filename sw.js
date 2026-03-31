const CACHE = 'gym-v6';
const BASE  = '/gym-app-muri';
const ASSETS = [
    BASE + '/',
    BASE + '/index.html',
    BASE + '/icon.png',
    BASE + '/muri.jpeg',
    BASE + '/manifest.json'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match(BASE + '/index.html')))
    );
});

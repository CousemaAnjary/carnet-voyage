/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'

const apiURL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8000';

declare let self: ServiceWorkerGlobalScope;

// self.__WB_MANIFEST is the default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old Workbox cached assets
cleanupOutdatedCaches();

let allowlist: RegExp[] | undefined;
// in dev mode, we disable precaching to avoid caching issues
if (import.meta.env.DEV) {
  allowlist = [/^\/$/];
}

// to allow work offline
registerRoute(
  new NavigationRoute(createHandlerBoundToURL('index.html'),{ allowlist },)
);

self.addEventListener('install', (event) => {
  console.log('Service Worker installé');
  event.waitUntil(self.skipWaiting()); 
});

self.addEventListener('activate', () => {
  console.log('Service Worker activé');
  clientsClaim(); 
});

self.addEventListener('fetch', (event) => {
  if(event.request.url.startsWith(apiURL) && event.request.method === 'GET') {
    event.respondWith(fetch(event.request)
      .then((apiResponse) => {
        const responseClone = apiResponse.clone();
        caches.open('api-res-cache').then(cache => cache.put(event.request, responseClone));
        return apiResponse;
      })
      .catch((error) => {
        return caches.match(event.request).then(cachedResponse => {
          return (cachedResponse || error)
        });
      })
    );
  }
});
/* eslint-disable  @typescript-eslint/no-explicit-any */
/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { VoyageType } from './features/api/types';

const cacheName = 'api-res-cache';
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
        caches.open(cacheName).then(cache => cache.put(event.request, apiResponse.clone()));
        saveTravelPhotosToCache(apiResponse.clone());
        return apiResponse;
      })
      .catch((error) => {
        return caches.match(event.request).then(cachedResponse => {
          return (cachedResponse || error);
        });
      })
    );
  }
});

async function saveTravelPhotosToCache(response: Response) {
  const responseClone = response.clone();
  const data : any = await responseClone.json();

  if (!data || !Array.isArray(data.travel)) return;
  const travels : VoyageType[] = data.travel;

  const cache = await caches.open(cacheName);

  travels.reverse().forEach(travel => {
    travel.days?.reverse().forEach(day => {
      day.day_photos?.forEach(async photo => {
        const cachedResponse = await cache.match(photo.photo_url);

        if (!cachedResponse) 
          await cache.add(photo.photo_url);
        });
    });
  });
}
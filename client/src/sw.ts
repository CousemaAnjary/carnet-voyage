/* eslint-disable  @typescript-eslint/no-explicit-any */
/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { VoyageType } from './features/api/types';

const cacheName = 'api-res-cache';
const apiURL = import.meta.env.VITE_BACKEND_API_URL;

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
  console.log('Service worker installé');
  event.waitUntil(self.skipWaiting()); 
});

self.addEventListener('activate', () => {
  console.log('Service Worker activé');
  clientsClaim();
});

const putInCahe = async (request: Request, response: Response) => {
  const cache = await caches.open(cacheName);
  await cache.put(request, response);
}

async function addInCahePhotos(response: Response) {
  const data = await response.json();

  if(!data.travels) {
    return;
  }

  const cache = await caches.open(cacheName);

  const travels = data.travels as VoyageType[];

  travels.reverse().forEach(travel => {
    travel.days?.reverse().forEach(day => {
      day.day_photos?.reverse().forEach(async photo => {
        const photoUrl = apiURL+photo.photo_url;
        
        const cachedPhotoUrl = await cache.match(photoUrl);

        if (!cachedPhotoUrl) {
          cache.add(photoUrl);
        }

      })  
    });
  });
}

self.addEventListener('fetch', (event) => {
  if(event.request.url.startsWith(apiURL) && event.request.method === 'GET') {
    event.respondWith(fetch(event.request)
      .then(async(responseFromNetword) => {
        const responseFromNetwordCopy = responseFromNetword.clone();

        putInCahe(event.request, responseFromNetwordCopy.clone());

        addInCahePhotos(responseFromNetwordCopy.clone());
        
        return responseFromNetword;
      })
      .catch((error) => {
        return caches.match(event.request).then(cachedResponse => {
          return (cachedResponse || error);
        });
      })
    );
  }
});
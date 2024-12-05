/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'

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
  console.log('Service Worker intercepte une requête', event.request.url);
  event.respondWith(fetch(event.request));
})






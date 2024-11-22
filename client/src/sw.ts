/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { fetchTraverls } from './sw-services'

declare let self: ServiceWorkerGlobalScope

// self.__WB_MANIFEST is the default injection point
precacheAndRoute(self.__WB_MANIFEST)

// clean old assets
cleanupOutdatedCaches()

let allowlist: RegExp[] | undefined
// in dev mode, we disable precaching to avoid caching issues
if (import.meta.env.DEV)
  allowlist = [/^\/$/]

// to allow work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL('index.html'),
  { allowlist },
))

const apiURL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8000' // URL de l'API

// get resquest management
self.addEventListener('fetch', async (event) => {
  const toCatchedUrl = apiURL + '/api/travel'
  // Intercepte les requestes GET vers l'API
  if(event.request.url.match(toCatchedUrl)
    && event.request.method === 'GET') 
  {
    event.respondWith(fetchTraverls(event))
  }
})

// self.addEventListener('fetch', async(event) => {
//   if(event.request.url.startsWith(apiURL)
//       && event.request.method !==  'GET')
//   {
//     event.respondWith(fetchApiDatabaseManagementRequest(event))
//   }
// })

self.skipWaiting()
clientsClaim()

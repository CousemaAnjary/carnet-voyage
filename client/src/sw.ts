/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'

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

self.addEventListener('fetch', (event) => {

  const apiURL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8000' // URL de l'API

  // Intercepte les requestes GET vers l'API
  if(event.request.url.startsWith(apiURL) && event.request.method === 'GET') 
  {
    // On vérifie si on a une connexion internet
    event.respondWith(
      fetch(event.request)
        .then((apiResponse) => {
          const responseClone = apiResponse.clone() // On clone la réponse pour la mettre en cache
          
          // On met en cache la réponse
          caches.open('api-cache').then((cache) => {
            cache.put(event.request, responseClone)
          })

          return apiResponse // On retourne la réponse au client
        })
        // Si on a pas de connexion internet
        .catch(() => {
          return caches.match(event.request).then((cachedResponse) => {
            return (
              // Si on a une réponse en cache, on la retourne
              cachedResponse || new Response(
                JSON.stringify({message :  'Pas de connexion internet, veuillez réessayer plus tard'}),
                { headers: { 'Content-Type': 'application/json' } }
              )
            )
          })
        })
    )
  }
})



self.skipWaiting()
clientsClaim()

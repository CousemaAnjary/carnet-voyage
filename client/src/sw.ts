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

// registerRoute(
//     ({ url, request }) =>request.method === 'POST' && url.pathname.startsWith('/api/auth'),
//     async ({ request }) => {
//         try {
//         // Envoie la requête réseau normalement
//         const networkResponse = await fetch(request)
//         // Vérifie si la réponse est OK
//         if (networkResponse && networkResponse.ok) {
//             // Vous pouvez gérer la réponse ici, par exemple, l'enregistrer dans un cache
//             return networkResponse
//         }
//         } catch (error) {
//         // Optionnel : Gestion des erreurs, comme retourner une réponse en cache ou un message
//         console.error("Failed to fetch:", error)
//         }
//         // Par défaut, renvoie une réponse d'erreur si la requête réseau échoue
//         return new Response(JSON.stringify({ error: "Network error" }), {
//         headers: { 'Content-Type': 'application/json' }
//         })
//     },
//     'POST'
// )



self.skipWaiting()
clientsClaim()

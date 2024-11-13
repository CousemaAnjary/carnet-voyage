import { folderVoyageType } from "@/modules/carnet-voyage/carnetVoyageType"

let db: IDBDatabase | null = null

// Fonction pour ouvrir la base de données (seulement une fois)
const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        if (db) {
            // Si la base de données est déjà ouverte, on la retourne directement
            return resolve(db)
        }

        const request = indexedDB.open('voyages', 1)

        request.onupgradeneeded = () => {
            db = request.result
            const voyagesStore = db.createObjectStore('voyages', { keyPath: 'id' })
            voyagesStore.createIndex('name', 'name', { unique: false })
            voyagesStore.createIndex('country', 'country', { unique: false })
            voyagesStore.createIndex('city', 'city', { unique: false })
            voyagesStore.createIndex('beginning_at', 'beginning_at', { unique: false })
            voyagesStore.createIndex('ended_at', 'ended_at', { unique: false })
        }

        request.onsuccess = () => {
            db = request.result
            console.log('Database ouvert')
            resolve(db)
        }

        request.onerror = () => {
            console.error('Erreur lors de l\'ouverture de la base de données')
            reject('Erreur lors de l\'ouverture de la base de données')
        }
    })
}

// Fonction pour sauvegarder les voyages dans la base de données
export const saveVoyages = async (voyages: folderVoyageType[]) => {
    const db = await openDB()

    const transaction = db.transaction('voyages', 'readwrite')
    const voyagesStore = transaction.objectStore('voyages')

    try {
        voyages.forEach(voyage => {
            voyagesStore.put(voyage)
        })
    } catch (error) {
        transaction.abort()
        console.error('Erreur lors de la sauvegarde des voyages', error)
    }
}

// Fonction pour récupérer les voyages depuis la base de données
export const getVoyages = async (): Promise<folderVoyageType[]> => {
    const db = await openDB()

    const transaction = db.transaction('voyages', 'readonly')
    const voyagesStore = transaction.objectStore('voyages')
    const request = voyagesStore.getAll()

    return new Promise<folderVoyageType[]>((resolve, reject) => {
        request.onsuccess = () => {
            resolve(request.result)
        }

        request.onerror = () => {
            reject('Erreur lors de la récupération des voyages')
        }
    })
}
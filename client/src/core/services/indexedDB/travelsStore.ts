export interface TravelData {
    id: string | number
    name: string
    city: string
    country: string
    beginning_at: string
    ended_at?: string 
    uploaded?: boolean
}


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
            voyagesStore.createIndex('name', 'name', { unique: true })
            voyagesStore.createIndex('country', 'country', { unique: false })
            voyagesStore.createIndex('city', 'city', { unique: false })
            voyagesStore.createIndex('beginning_at', 'beginning_at', { unique: true })
            voyagesStore.createIndex('ended_at', 'ended_at', { unique: false })
            voyagesStore.createIndex('contents', 'contents', { unique: true })
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
export const saveVoyages = async (voyages: TravelData[]) => {
    const db = await openDB()

    const transaction = db.transaction('voyages', 'readwrite')
    const voyagesStore = transaction.objectStore('voyages')

    voyages.forEach(voyage => {
        voyagesStore.put(voyage)
    })
}

// Fonction pour récupérer les voyages depuis la base de données
export const getVoyages = async (): Promise<TravelData[]> => {
    const db = await openDB()

    const transaction = db.transaction('voyages', 'readonly')
    const voyagesStore = transaction.objectStore('voyages')
    const request = voyagesStore.getAll()

    return new Promise<TravelData[]>((resolve, reject) => {
        request.onsuccess = () => resolve(request.result)

        request.onerror = () => reject('Erreur lors de la récupération des voyages.')
    })
}

let db: IDBDatabase | null = null

// Fonction pour ouvrir la base de données (seulement une fois)
const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        if (db) {
            // Si la base de données est déjà ouverte, on la retourne directement
            return resolve(db)
        }

        const request = indexedDB.open('unsed-requests', 1)

        request.onupgradeneeded = () => {
            db = request.result
            const requestsStore = db.createObjectStore('unsed-requests', { keyPath: 'id', autoIncrement: true })
            requestsStore.createIndex('headers', 'headers', { unique: false })
            requestsStore.createIndex('method', 'method', { unique: false })
            requestsStore.createIndex('url', 'url', { unique: false })
            requestsStore.createIndex('body', 'body', { unique: true })
            requestsStore.createIndex('timestamp', 'timestamp', { unique: true })
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

export const saveRequest = async (request: Request) => {
    const headersObj: { [key: string]: string } = {};
    for (const [key, value] of request.headers) {
        headersObj[key] = value;
    }
    const requestData =  {
        headers: headersObj,
        method: request.method,
        url: request.url,
        body: await request.json(),
        timestamp: Date.now()
    }

    const db = await openDB()
    const transaction = db.transaction('unsed-requests', 'readwrite')
    const requestsStore = transaction.objectStore('unsed-requests')

    requestsStore.put(requestData)
}
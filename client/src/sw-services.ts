import { getVoyages, saveVoyages, TravelData } from "./core/services/indexedDB/travelsStore"

export async function fetchTraverls(event: FetchEvent) {
    try {
        const apiResponse = await fetch(event.request) // Send client request to the server
        
        const apiResponseClone = apiResponse.clone()
        if(apiResponseClone.ok) { // return true id http status code is in range 200-299
            const data = await apiResponseClone.json() // get the response body
            data.travels.forEach((travel:TravelData) => {
                travel.uploaded = true
            });
            await saveVoyages(data.travels) // save the response in indexedDB
        }

        return apiResponse

    } catch (error) { // no internet connexion
        const voyagesFromIndexedDB = await getVoyages() // get the data from indexedDB

        // return the data from indexedDB
        return new Response(
            JSON.stringify({ 'travels':voyagesFromIndexedDB }), 
            { headers: { 'Content-Type': 'application/json' } }
        )
    }
}

export async function fetchApiDatabaseManagementRequest(event: FetchEvent) {
    try {
        return await fetch(event.request)
    } catch( error) {
        return new Response(
            JSON.stringify(
                { 
                    'api_error' : "can't connect to api server, please check your internet connection." 
                }),
            { headers: { 'Content-Type': 'application/json' } }
        )
    }
}
import { Client, ID, Query, Databases } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1')// similar to how we did out movie API, we pointed to thier servers
.setProject(PROJECT_ID)

const database = new Databases(client);

export const updateSearchCount = async(searchTerm, movie) =>{
    //1. Use APPwrite SDK to check if the search term exist in the database

    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
           Query.equal('searchTerm', searchTerm) 
        ])
        
    //2. if it does, update the count
        if(result.documents.length >0){
            const doc = result.documents[0];
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count:doc.count+1,
            })
            //3. if it doesn't, create a new document with the search  term and count as 1
        }else{
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count:1,
                movie_id:movie.id,
                poster_url:`https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            })
        }
    } catch(error){
        console.log(error)
    }
    


}
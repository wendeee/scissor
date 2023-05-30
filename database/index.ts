import { startPostgresDB } from "./postgresDB";

//function that starts the DB
export async function startDB(){
    try{
        await startPostgresDB();
        return Promise.resolve(true)
    }catch(err){
        throw new Error(err);
    }
}
import { startPostgresDB } from "./postgresDB";
import { connectToRedis } from "./redisDB/redis.config";
//function that starts the DB
export async function startDB(){
    try{
        await startPostgresDB();
        await connectToRedis()
        return Promise.resolve(true)
    }catch(err){
        throw new Error(err);
    }
}
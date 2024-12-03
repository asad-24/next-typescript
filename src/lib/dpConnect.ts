import { error } from "console";
import mongoose from "mongoose";

type ConnectionObject={
    isConnected?: number
}

const connection :ConnectionObject={}


async function dbConnect():Promise<void>{

if (connection.isConnected){
    console.log("Already connected to the database")
    return;
}

try{
const dp = await mongoose.connect(process.env.MONGODB_UR || "",{})
connection.isConnected=dp.connections[0].readyState
console.log("DB connecte succesfully")
}catch(error){
    console.log("database connection fail ", error)
 process.exit(1)
}
}

export default dbConnect;
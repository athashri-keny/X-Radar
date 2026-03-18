import mongoose from "mongoose";


type ConnectionObject = {
    isConnected?: number
}



const connection: ConnectionObject = {}


async function DBConnect(): Promise<void> {

    if (connection.isConnected) {
        console.log("Already connected to dataabse")
        return
    }
    try {
    const db = await mongoose.connect(process.env.MONGODB_URL || "")
    connection.isConnected = db.connections[0].readyState
    console.log("connected to database sucessfully!")
    } catch (error) {
        console.log("Error while connecting to db" , error)
          throw error;
    }
}

export default DBConnect
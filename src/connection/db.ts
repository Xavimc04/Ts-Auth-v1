import * as mongoose from "mongoose"; 
import { ConnectOptions } from "mongoose";

const RegisterDatabaseConnection = async (Config:any) => { 
    await mongoose.connect(Config.connectionString, {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    } as ConnectOptions)
    .then(db => console.log('Database connection stablished.'))
}

export default RegisterDatabaseConnection
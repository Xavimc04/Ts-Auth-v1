import express from 'express'; 
import Config from './config';  
import RegisterDatabaseConnection from './connection/db'; 
import TsFunctions from './classes'; 
import cors from 'cors'

const Interactions = new TsFunctions()
const App = express()

App.use(cors()) // Enable CORS.
App.use(express.json()) // Enable send Array in POST method. 
App.use(express.urlencoded({ extended: true })) // Enable send data in POST. 

App.post('/api/users', (request, response) => {   
    if(request.body) { 
        if(request.body.action == 'validate'){
            return Interactions.ValidateUser(request, response, request.body)
        } else if(request.body.action == 'create') {
            return Interactions.RegisterUser(request, response, request.body)
        }
    }
})

RegisterDatabaseConnection(Config) 

App.listen(Config.serverPort, () => {  
    console.log(`Server running on port: ${Config.serverPort}`)
})
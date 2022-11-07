/*
    Headers: 
    
    - 200: All right!
    - 500: Internal server error. 
*/

import UserSchema from "./schemas/user.schema"; 
import users from './models/user.model'
import { IncomingMessage } from "http";

export default class TsFunctions {
    RegisterUser(request: IncomingMessage, response: any, userData: UserSchema) { 
        users.find({ username: userData.username }, (error:any, data:any) => {
            if(data){
                if(data.length == 0){
                    users.create({
                        username: userData.username, 
                        password: userData.password,
                        mail: '', 
                        phone: 0,  
                        profilePicture: '', 
                    }, (error, data) => {
                        if(error){   
                            this.SendResponse(200, request, response, {
                                created: false,
                                message: `User ${userData.username} can't be created, an internal error has been appeared.`,
                            }) 
                        } else {   
                            this.SendResponse(200, request, response, {
                                created: true,
                                message: `User ${userData.username} has been registered.`,
                            }) 
                        }
                    }) 
                } else {  
                    this.SendResponse(200, request, response, {
                        created: false,
                        message: `User ${userData.username} can't be registered because this username is already in use.`,
                    }) 
                }
            }
        })
    } 

    ValidateUser(request: IncomingMessage, response: any, userCredentials:any) { 
        users.find({ username: userCredentials.username, password: userCredentials.password }, (error:any, data:any) => {
            if(data){
                if(data.length == 1){
                    this.SendResponse(200, request, response, { correct: true, userData: data })
                } else {
                    this.SendResponse(200, request, response, { correct: false, message: "Login failed, this user or password does not exist." })
                }
            }
        })
    }

    SendResponse(statusCode:number, request: IncomingMessage, response: any, formatedTable:object) {
        response.writeHead(statusCode, { "Content-Type": "application/json" });   
        response.end(
            JSON.stringify(formatedTable)
        );
    }
} 
import {Request,Response,Router} from 'express';
const expressRouter = Router();
import {Database} from '../models/database';
import {ObjectID} from 'mongodb';

// Validations Middleware
import {ValidationTodos,ValidationErrorHandlder} from '../middleware';

export class ApiTodos{
    
    dataRouter: any;

    constructor(){
        this.dataRouter = expressRouter;

        this.dataRouter.post("/create", 
        ValidationTodos.createTodos(), 
        ValidationErrorHandlder.handleErrors, 
        async (req:Request, res:Response) => {
            
            let dat = req.body;
            dat.user_id = new ObjectID(req.body.user_id);
            dat.created_at = new Date();

            const writeParams = {
                collection      : "todos",
                criteria        : dat,
                projection      : {}
            }
            try{
                const docs: any = await new Database().write(writeParams);
                res.send(docs)
            } catch(e){
                res.status(500).send(`${e.message}-${e.stack}`);
            }
        });

        this.dataRouter.put("/update/:id", 
        ValidationTodos.updateTodos(), 
        ValidationErrorHandlder.handleErrors, 
        async (req:Request, res:Response) => {            
            try{
                let dat = { $set: {
                            'title' : req.body.title,
                            'description' : req.body.description,
                            'updated_at' : new Date()
                        } 
                };
                const updateParams = {
                    collection      : "todos",
                    criteria        : { "_id": new ObjectID(req.params.id) },
                    data            : dat
                }
                const docs: any = await new Database().update(updateParams);
                res.send(docs);
            } catch(e){
                res.status(500).send(`${e.message}-${e.stack}`);
            }   
        });

        this.dataRouter.get("/get/:id", 
        ValidationTodos.getTodo(), 
        ValidationErrorHandlder.handleErrors, 
        async (req:Request, res:Response) => {          
            try{
                const readParams = {
                    collection      : "todos",
                    criteria        : { "_id": new ObjectID(req.params.id) },
                    projection      : {}
                }
                const docs:any = await new Database().readOne(readParams);
                if(docs !== null){
                    res.send(docs);
                } else {
                    throw new Error('Todo does not exist.');
                }
            } catch(e){
                res.status(500).send(`${e.message}-${e.stack}`);
            } 
        });

        this.dataRouter.get("/get", 
        async (req:Request, res:Response) => {          
            try{
                const readParams = {
                    collection      : "todos",
                    criteria        : {},
                    projection      : {}
                }
                const docs:any = await new Database().read(readParams);
                if(docs !== null){
                    res.send(docs);
                } else {
                    throw new Error('Todo does not exist.');
                }
            } catch(e){
                res.status(500).send(`${e.message}-${e.stack}`);
            } 
        });

        this.dataRouter.delete("/delete/:id", 
        ValidationTodos.getTodo(), 
        ValidationErrorHandlder.handleErrors, 
        async (req:Request, res:Response) => {          
            try{
                const readParams = {
                    collection      : "todos",
                    criteria        : { "_id": new ObjectID(req.params.id) },
                    projection      : {}
                }
                const docs:any = await new Database().delete(readParams);
                if(docs !== null){
                    res.send(docs);
                } else {
                    throw new Error('Todo does not exist.');
                }
            } catch(e){
                res.status(500).send(`${e.message}-${e.stack}`);
            } 
        });


    }
}
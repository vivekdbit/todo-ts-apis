import {MongoClient} from 'mongodb';

export class Database {

    client:MongoClient;
    db:string;

    constructor(){
        const url = 'mongodb://localhost:27017';
        this.client = new MongoClient(url, { useNewUrlParser: true })
        this.db = "todos"
    }

    async write(writeParams:any) {
        try{
            const conn = await this.client.connect();
            const db = conn.db(this.db);
            const collection = db.collection(writeParams.collection);
            const docs = await collection.insertOne(writeParams.criteria,writeParams.projection);
            return docs;
        } catch (e){
            throw e;
        }
    }

    async read(readParams:any){
        try{
            const conn = await this.client.connect();
            const db = conn.db(this.db);
            const collection = db.collection(readParams.collection);
            const docs = await collection
                               .find(readParams.criteria,readParams.projection)
                               .toArray();
            return docs;
        } catch (e){
            throw(e);
        }
    }

    async readOne(readParams:any){
        try{
            const conn = await this.client.connect();
            const db = conn.db(this.db);
            const collection = db.collection(readParams.collection);
            const docs = await collection
                               .findOne(readParams.criteria,readParams.projection);
            return docs;
        } catch (e){
            throw e;
        }
    }

    async update(updateParams:any) {
        try{
            const conn = await this.client.connect();
            const db = conn.db(this.db);
            const collection = db.collection(updateParams.collection);
            const docs = await collection.updateOne(updateParams.criteria, updateParams.data, updateParams.projection);
            return docs;
        } catch (e){
            throw(e);
        }
    }

    async delete(deleteParams:any) {
        try{
            const conn = await this.client.connect();
            const db = conn.db(this.db);
            const collection = db.collection(deleteParams.collection);
            const docs = await collection.deleteOne(deleteParams.criteria);
            return docs;
        } catch (e){
            throw(e);
        }
    }

}
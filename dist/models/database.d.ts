import { MongoClient } from 'mongodb';
export declare class Database {
    client: MongoClient;
    db: string;
    constructor();
    write(writeParams: any): Promise<void>;
    read(readParams: any): Promise<any[]>;
    readOne(readParams: any): Promise<void>;
    update(updateParams: any): Promise<void>;
    delete(deleteParams: any): Promise<import("mongodb").DeleteWriteOpResultObject>;
}

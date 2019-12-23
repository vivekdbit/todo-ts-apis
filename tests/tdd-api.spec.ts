// Pointy-haired-boss wants to be more organized.  
//So, he wants a web application where he can
// login and get all the TODOs he has created.  Pointy-haired-boss also wants to be able to 
// update and delete the TODOs.
// The frontend will be built by someone else.
// Technical Requirement
// Please create the following:

// - REST APIs
//   - API to authenticate
//   - APIs for TODO CRUD
// - Protect the API using JWT
// - Persist TODOs
// - Must have unit test cases

import * as request from 'supertest';
import {app} from '../src/app'
let token = "";

describe("TODO Application",()=>{

    beforeAll( async done=>{
        const response = await request(app).post('/auth/login').send({
            "email" : "vivek001@gmail.com",
            "password" : "12345"
        });
        const {body} = response;
        token = body.data;    
        done();
    })

    it("/auth/login should get status 200 ",async done=>{
        const response = await request(app).post('/auth/login').send({
            "email" : "vivek001@gmail.com",
            "password" : "12345"
        });
        const {status,text,body} = response;
        
        // Checking status flag
        expect(body.status).toBeTruthy();

        // Cheking valid JWT string
        const JWT_REGEX = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
        expect(body.data).toMatch(JWT_REGEX);
        
        // Checking HTTP status
        expect(status).toBe(200);
        done();
    })

    it("/auth/login invalid credentials failed ",async done=>{
        const response = await request(app).get('/auth/login').send({
            "email" : "vivek001@gmail.com",
            "password" : "123456"
        });
        const {status,body} = response;
        
        // Checking HTTP status
        expect(status).toBe(401);
        done();
    })

    it('jwt received should be valid', async done=>{
        const response = await request(app).get('/api/verify').set({
            'token':token
        });
        const {status} = response;

        // Checking HTTP status to be 200
        expect(status).toBe(200);
        done();
    })

    it('/api/todo/create should get status 200', async done=>{
        const response = await request(app).post('/api/todo/create').set({
            'token':token
        }).send({
            "title" : "TDD Assignment Title",
            "description"	 : "Assignment Description",
            "user_id"	: "5df6073e660ece18a7519037"
        });
        const {status,body} = response;

        // Checking HTTP status to be 200
        expect(status).toBe(200);

        done();
    })

    it('/api/todo/update/xxx should get status 200 and update only one document', async done=>{
        const response = await request(app).put('/api/todo/update/5dff52a617c712302e162109').set({
            'token':token
        }).send({
            "title" : "TDD Assignment Title Update",
            "description"	 : "Assignment Description Updated"
        });
        const {status,body} = response;
        
        // Checking HTTP status to be 200
        expect(status).toBe(200);

        // modified count shold be greater than one
        expect(body.modifiedCount).toBe(1);

        done();
    })

    it('/api/todo/get should get status 200', async done=>{
        const response = await request(app).get('/api/todo/get').set({
            'token':token
        }).send();
        const {status} = response;
        
        // Checking HTTP status to be 200
        expect(status).toBe(200);
        done();
    })

    it('/api/todo/delete/xxx should get status 200', async done=>{
        const response = await request(app).delete('/api/todo/delete/5dff52c47876573071f67eda').set({
            'token':token
        }).send();
        const {status} = response;
        
        // Checking HTTP status to be 200
        expect(status).toBe(200);
        done();
    })

})
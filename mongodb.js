
const { MongoClient, ObjectID} = require('mongodb');


const connectionURL = "mongodb://127.0.0.1:27017";

const databaseName = "task-manager";

const id = new ObjectID();

console.log(id);
console.log(id.getTimestamp());


MongoClient.connect(connectionURL,{useNewUrlParser:true, useUnifiedTopology:true }, (error, client)=> {
    if (error) {
        return console.log("cant connect things went wrongly");
    }
    else{
        console.log('connected correctly');
        const db = client.db(databaseName);

        //  


        db.collection('users').find({age:23}).count((error, count) =>{
            if(error){
               return console.log("Unable to Find Document"); 
            }
            console.log(count);
        })
        // db.collection('users').insertOne({
        //     name: "dolad",
        //     age : 25,
        // })

        // db.collection('users').insertMany([
        //     {
        //         name:"ola",
        //         age : 23
        //     },
        //     {
        //         name: "dolad",
        //         age: 15,
        //     }
        // ], (error, result )=>{
        //     if(error){
        //        return console.log('Unable to insert documents');
        //     }
        //     console.log(result.ops);
        // });

        // db.collection('role').insertMany([
        //     {
        //      status: 'admin',
        //      source: 'suspended'                
        //     },
        //     {
        //         status: 'user',
        //         source: 'active'                     
        //     },
        //     {
        //         status: 'superuser',
        //         source: 'active'                     
        //     },

        // ],(error, result)=>{
        //     if(error){
        //        return console.log('Unable to insert to row'); 
        //     }
        //     else{
        //         console.log(result.ops);
        //     }
        // });


    }
});
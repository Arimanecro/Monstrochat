/* eslint-disable prefer-const */

import {CRUD} from '../interfaces';

export const IndexedDB:CRUD = class {

    static create(email:string){
        let request = indexedDB.open("Chat");
        request.onupgradeneeded = function() { 
            let db = request.result;
            let objStore = db.createObjectStore("User", { keyPath: 'email' });
            objStore.add({email, time: Date.now()});
          };
    }

    static read(email:string){
        let request = indexedDB.open("Chat");
        
        request.onsuccess = () => {

        let db = request.result;
        let transaction = db.transaction(["User"]);
        let objectStore = transaction.objectStore("User");
        let objectStoreRequest = objectStore.get(email);

        objectStoreRequest.onsuccess = (e) => (e.target as IDBOpenDBRequest).result;
        objectStoreRequest.onerror = (e) => console.error((e.target as IDBOpenDBRequest).result);
}; 
    }
    
    static delete(nameDB: string){
  
        let DBDeleteRequest = indexedDB.deleteDatabase(nameDB);

        DBDeleteRequest.onerror = function(event) {
            console.log("Error deleting database.");
          };
           
        DBDeleteRequest.onsuccess = function(event) {
            console.log("Database deleted successfully");
              
          };
    }
}
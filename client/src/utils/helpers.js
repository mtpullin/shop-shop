export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject)=>{
    //open connection to database 'shop-shop' with version of 1
    const request = window.indexedDB.open('shop-shop', 1);

    //create cariables to hold reference to database, transaction, and store
    let db, tx, store;

    //if version changes (or if this is the fist time using database), run method and creat three object stores
    request.onupgradeneeded = function(e){
      const db = request.result;
      //create object store for each type of data and set 'primary' key index to be the '_id' of the data
      db.createObjectStore('products', {keyPath:'_id'});
      db.createObjectStore('categories',{keyPath:'_id'});
      db.createObjectStore('cart',{keyPath:'_id'})
    }

    //error handling
    request.onerror = function(e){
      console.log('There was an error')
    }
    //on database open success
    request.onsuccess = function(e){
      //save a reference of the database to the 'db' variable
      db= request.result;
      //open a transaction do whatever we pass into 'storename' must match an object store name
      tx = db.transaction(storeName, 'readwrite')
      //save a reference to that object store
      store = tx.objectStore(storeName)

      //if there are errors, let us know
      db.onerror = function(e){
        console.log('error', e)
      }
      switch(method){
        case 'put':
          store.put(object);
          resolve(object)
          break
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result)
          }
          break
        case 'delete':
          store.delete(object._id)
          break;
        default:
          console.log('No valid method')
          break
      }
      //when transaction complete, close connection
      tx.oncomplete = function(){
        db.close()
      }
    }
  })
}
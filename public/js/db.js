
var dbPromised = idb.open("AISBDB", 1, function(upgradeDb) {
  if (!upgradeDb.objectStoreNames.contains("Tim")) {
    upgradeDb.createObjectStore("Tim")
  }
  if (!upgradeDb.objectStoreNames.contains("Pemain")) {
    upgradeDb.createObjectStore("Pemain")
  }
  if (!upgradeDb.objectStoreNames.contains("Pertandiangan")) {
    upgradeDb.createObjectStore("Pertandingan")
  }
});

//add Pemain
function addTeam({id,name,logo}){
  dbPromised
  .then(function(db) {
      var tx = db.transaction('Tim', 'readwrite');
      var store = tx.objectStore('Tim');
      var item = {
          id: id,
          name: name,
          logo: logo
      };
      store.put(item, id);
      return tx.complete;
  })
  .then(function(){
    console.log('Berhasil Menyimpan Tim',name)
  })
  .catch(function(){
    console.log('Gagal Menyimpan Tim')
  });
}

//add Player
function addPemain({id,name,position,negaralahir,negara,tanggallahir}){
  dbPromised
  .then(function(db) {
      var tx = db.transaction('Pemain', 'readwrite');
      var store = tx.objectStore('Pemain');
      var item = {
          id: id,
          name: name,
          position: position,
          negaralahir: negaralahir,
          negara: negara,
          tanggallahir:tanggallahir

      };
      store.put(item, id);
      return tx.complete;
  })
  .then(function(){
    console.log('Berhasil Menyimpan Pemain',name)
  })
  .catch(function(){
    console.log('Gagal Menyimpan Pemain')
  });
}

//add Jadwal
function addJadwal({id,matchday,hometim,awaytim,tanggal}){
  dbPromised
  .then(function(db) {
      var tx = db.transaction('Pertandingan', 'readwrite');
      var store = tx.objectStore('Pertandingan');
      var item = {
          id: id,
          matchday: matchday,
          hometim: hometim,
          awaytim: awaytim,
          tanggal: tanggal
      };
      store.put(item, id);
      return tx.complete;
  })
  .then(function(){
    console.log('Berhasil Menyimpan Tim',name)
  })
  .catch(function(){
    console.log('Gagal Menyimpan Tim')
  });
}
//Selesai ADD

//Get Data
//Data Tim
function getTim(){
  return new Promise(function(resolve, reject) {
  return dbPromised
  .then(function(db){
      var tx = db.transaction('Tim','readonly')
      var store = tx.objectStore('Tim')
      return store.getAll()
  })
  .then(function(tim){
    resolve(tim);
  });
});
}

//Data Pemain
function getPemain(){
  return new Promise(function(resolve, reject) {
  return dbPromised
  .then(function(db){
      var tx = db.transaction('Pemain','readonly')
      var store = tx.objectStore('Pemain')
      return store.getAll()
  })
  .then(function(data){
    resolve(data);
  });
});
}

//Data Match
function getMatch(){
  return new Promise(function(resolve, reject) {
  return dbPromised
  .then(function(db){
      var tx = db.transaction('Pertandingan','readonly')
      var store = tx.objectStore('Pertandingan')
      return store.getAll()
  })
  .then(function(data){
    resolve(data);
  });
});
}
//Selesai Get Data

//Delete Data
//delete tim
function deleteTim(id){
  dbPromised
  .then(function(db){
      var tx = db.transaction('Tim', 'readwrite')
      var store = tx.objectStore('Tim')
      store.delete(id)
      return tx.complete
  })
  .then(function(){
    console.log('Item Hapus')
  });
}
//delete Pemain
function deletePemain(id){
  dbPromised
  .then(function(db){
      var tx = db.transaction('Pemain', 'readwrite')
      var store = tx.objectStore('Pemain')
      store.delete(id)
      return tx.complete
  })
  .then(function(){
    console.log('Item Hapus')
  });
}
//delete Match
function deleteJadwal(id){
  dbPromised
  .then(function(db){
      var tx = db.transaction('Pertandingan', 'readwrite')
      var store = tx.objectStore('Pertandingan')
      store.delete(id)
      return tx.complete
  })
  .then(function(){
    console.log('Item Hapus')
  });
}
//selesai

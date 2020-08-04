
function getAllTim(){
    //get all data tim di database
    getTim()
    .then(function (data){
      console.log(data);
        let DataTimGetHTML = ''
        data.forEach(function(team){
            DataTimGetHTML +=
            `
            <div class="col s12 m6">
              <div class="card">
                <div class="card-image waves-block waves-light">
                  <img width="250px" height="250px" src=${team.logo}>
                </div>
                <div class="card-content">
                  <h5><b>${team.name}</b></h5> 
                  <p>
                  <a class="waves-effect waves-light btn modal-trigger" href="./detailtim.html?id=${team.id}">Klik Disini</a>
                  <button onclick="DeleteTimFav(${team.id},'${team.name}')" class="btn modal-trigger"><i id="iconFav" class="large material-icons">delete</i>Favorit</button>
                  </p>
                </div>
              </div>
            </div>
            <!-- batas -->
            `
        })
                   if(data.length == 0) DataTimGetHTML += '<h5 class="center-align">Tidak ada data Tim favorit!</h5>'
             //insert All Team in Database to DOM
            document.getElementById('Favorit').innerHTML = DataTimGetHTML
        })
}
function DeleteTimFav(id,name) {
  let imSure = confirm(`Apakah ingin Menghapus ${name} dari Daftar Favorit ?`)
  if(imSure){
  deleteTim(id)
  getAllTim()
  M.toast({html: `Berhasil Menghapus ${name} dari Daftar Favorit`});
  PushNotifDelTim(`Berhasil Menghapus ${name} dari Daftar Favorit`)
}
}

function getAllPemain(){
  //get all data player di database
  getPemain()
  .then(function (data){
    console.log(data);
      let DataPemainGetHTML = ''
      data.forEach(function(player){
          DataPemainGetHTML  +=
          `
          <div class="col s12 m6">
      <div class="card">
        <div class="card-content">
          <h5><b>${player.name}</b></h5><br>    
          <table>
            <tbody>
              <tr>
                <td>Position:</td>
                <td>${player.position}</td>
              </tr>
              <tr>
                <td>Negara:</td>
                <td>${player.negara}</td>
              </tr>
              <tr>
                <td>Negara Lahir:</td>
                <td>${player.negaralahir}</td>
              </tr>
              <tr>
                <td>Tanggal Lahir:</td>
                <td>${player.tanggallahir}</td>
              </tr>
            </tbody>
          </table>
          <p>
          <button onclick="deletePemainFav(${player.id},'${player.name}')" class="btn modal-trigger"><i id="iconFav" class="large material-icons">delete</i>Favorit</button>
          </p>
        </div>
      </div>
</div>
          <!-- batas -->
          `
      })
                 if(data.length == 0) DataPemainGetHTML += '<h5 class="center-align">Tidak ada data Pemain favorit!</h5>'
           //insert All Team in Database to DOM
          document.getElementById('Favorit').innerHTML = DataPemainGetHTML  
      })
}
function deletePemainFav(id,name) {
let imSure = confirm(`Apakah ingin Menghapus ${name} dari Daftar Favorit ?`)
if(imSure){
deletePemain(id)
getAllPemain()
M.toast({html: `Berhasil Menghapus ${name} dari Daftar Favorit`});
PushNotifDelPemain(`Berhasil Menghapus ${name} dari Daftar Favorit`)
}
}

//JadwalMatch
function getAllMatch(){
  //get all data tim di database
  getMatch()
  .then(function (data){
    console.log(data);
      let DataMatchGetHTML = ''
      data.forEach(function(match){
          DataMatchGetHTML  +=
          `
          <div class="col s12 m6">
              <div class="card">
                <div class="card-content">
                <span class="card-title">Match Day:<b>${match.matchday}</b></span>
                  <p class="center-align">${match.hometim}</p><br>
                  <p class="center-align">VS</p><br>
                  <p class="center-align">${match.awaytim}</p><br>
                  <p class="center-align">Tanggal: ${match.tanggal}</p><br>
                </div>
                  <div class="card-action">
                  <button onclick="DeleteJadwalFav(${match.id},'${match.hometim}','${match.awaytim}')" class="btn modal-trigger"><i id="iconFav" class="large material-icons">delete</i>Favorit</button>
                  </div>
                </div>
              </div>
            </div>
          `
      })
                 if(data.length == 0) DataMatchGetHTML += '<h5 class="center-align">Tidak ada data jadwal favorit!</h5>'
           //insert All Team in Database to DOM
          document.getElementById('Favorit').innerHTML = DataMatchGetHTML
      })
}

function DeleteJadwalFav(id,awaytim,hometim) {
let imSure = confirm(`Apakah ingin menghapus Pertandingan ${hometim} VS ${awaytim} dari daftar Favorit ?`)
if(imSure){
deleteJadwal(id)
getAllMatch()
M.toast({html: `Berhasil Dihapus $Pertandingan ${hometim} VS ${awaytim} dari daftar Favorit ?`});
PushNotifDelJad(`Berhasil Dihapus $Pertandingan ${hometim} VS ${awaytim} dari daftar Favorit ?`)
}
}

//notifhapus
function PushNotifDelPemain(msg) {
  const title = 'Daftar Favorit';
  const options = {
      'body': msg,
      'icon': '/image/notif.jpg',
      'badge': '/image/notif.jpg'
  };
  if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification(title, options);
      });
  } else {
      console.error('Fitur notifikasi tidak diijinkan.');
  }
}
function PushNotifDelTim(msg) {
  const title = 'Daftar Favorit';
  const options = {
      'body': msg,
      'icon': '/image/notif.jpg',
      'badge': '/image/notif.jpg'
  };
  if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification(title, options);
      });
  } else {
      console.error('Fitur notifikasi tidak diijinkan.');
  }
}
function PushNotifDelJad(msg) {
  const title = 'Daftar Favorit';
  const options = {
      'body': msg,
      'icon': '/image/notif.jpg',
      'badge': '/image/notif.jpg'
  };
  if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification(title, options);
      });
  } else {
      console.error('Fitur notifikasi tidak diijinkan.');
  }
}

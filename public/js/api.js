const base_url = "https://api.football-data.org/v2/";

var fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': '9b22a81779c747e984a896b5e600f84d'
    }
  });
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Data Klasemen
function getKlasemen(idLeague) {
  return new Promise(function (resolve, reject) {
    var id = idLeague;
  if ('caches' in window) {
    caches.match(base_url+'competitions/'+id+'/standings?standingType=TOTAL').then(function (response) {
      if (response) {
        response.json().then(function (data) {
          // console.dir("getKlasemenLiga " + data);
          console.log(data)
          resultKlasemenJSON(data)
          resultTimJSON(data)
        });
      }
    });
  }

  fetchApi(base_url+'competitions/'+id+'/standings?standingType=TOTAL')
    .then(status)
    .then(json)
    .then(function (data) {
      resultKlasemenJSON(data)
      resultTimJSON(data)
    })
    .catch(error);
  });
}

//Data Detail Klub
function getKlubDetailId() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    
    if ("caches" in window) {
      caches.match(base_url+'teams/' + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            // Objek JavaScript dari response.json() masuk lewat variabel data.
            // console.log(data)
            // Menyusun komponen card artikel secara dinamis
            resultDetailTimKlubJSON(data)
            squadtim(data);
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            // resolve(data);
          });
        }
      });
    }

    fetchApi(base_url+'teams/' + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        // Obje k JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        resultDetailTimKlubJSON(data)
        squadtim(data);
      })
      .catch(error);
  });
}


//Data Jadwal Liga
function getJadwalByIdLeague(LeagueId) {
  return new Promise(function (resolve, reject) {
// Ambil nilai query parameter (?id=)
var url = new URLSearchParams(window.location.search);
var id = LeagueId;
    if ('caches' in window) {
      caches.match(base_url+'competitions/'+id+'/matches?status=SCHEDULED').then(function (response) {
        if (response) {
          response.json().then(function (data) {
            console.log(data)
            resultJadwalJSON(data);
            resolve(data);
          });
        }
      });
    }

    fetchApi(base_url+'competitions/'+id+'/matches?status=SCHEDULED')
      .then(status)
      .then(json)
      .then(function (data) {
        console.log(data)
        resultJadwalJSON(data);
        resolve(data);
      })
      .catch(error);
  });
}



//function
//convert
var convertUTCDate = date => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];

  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()} ${formatAMPM(date)}`
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}


function HideHtml(){
 document.getElementById("Load").style.display = 'none';
}
function ShowHtml(){
  document.getElementById("Load").style.display = 'block';
}
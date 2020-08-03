//squadtim
function squadtim(data){
    var dataPosition=''
    var dataSquadTimHTML = ''
    var tabelSquadTimHTML = ''
    data.squad.forEach(function (squad, index) {
        dataSquadJSON = squad;
        console.log(squad)
        if(squad.position==null){
          dataPosition=squad.role
        }else{
          dataPosition=squad.position
        }
        dataSquadTimHTML += `
        <li>
          <div class="collapsible-header">
            <i class="material-icons">sports_soccer</i>${squad.name}(${dataPosition})
          </div>
          <div class="collapsible-body"><span>Nama: ${squad.name}</span><br>
            <span>Position: ${dataPosition}</span><br>
            <span>Tanggal Lahir: ${convertUTCDate(new Date(squad.dateOfBirth))}</span><br>
            <span>Negara Lahir: ${squad.countryOfBirth}</span><br>
            <span>Nasional: ${squad.nationality}</span><br>
            <span>Sebagai: ${squad.role}</span><br>
            <button onclick="addPemainFav(${squad.id},'${squad.name}','${squad.position}','${squad.countryOfBirth}','${squad.nationality}','${convertUTCDate(new Date(squad.dateOfBirth))}')" 
class="btn btn-large green"><i id="iconFav" class="large material-icons">add</i></button>
          </div>
        </li>
        `
      });
      tabelSquadTimHTML += dataSquadTimHTML

      document.getElementById("squadTim").innerHTML = tabelSquadTimHTML;
}
//Hasil Klasemen
function resultKlasemenJSON(data) {
    var resultklasemen = ''
    data.standings.forEach(function (klasemen) {
      var dataklasemen = ''
      //console.log("cek panjang klasemen table: " + klasemen.table.length)
  
      klasemen.table.forEach(function (club) {
        club = JSON.parse(JSON.stringify(club).replace(/http:/g, 'https:'));
  
        dataklasemen += `
  
                  <tr>
                  <td class="center-align">${club.position}</td>
                  <td>
                  <p class="hide-on-small-only">
                  <img class = "show-on-medium-and-up show-on-medium-and-down" src=${club.team.crestUrl}  alt="logo club" style="float:left;width:22px;height:22px;margin-right:20px">
                  ${club.team.name}
                  </p>
                  <p class="hide-on-med-and-up">
                  <img src=${club.team.crestUrl}  alt="logo club" style="float:left;width:22px;height:22px;margin-right:20px">
                  </p>
                  </td>
                  <td class="center-align">${club.playedGames}</td>
                  <td class="center-align">${club.won}</td>
                  <td class="center-align">${club.draw}</td>
                  <td class="center-align">${club.lost}</td>
                  <td class="center-align">${club.goalsFor}</td>
                  <td class="center-align">${club.goalsAgainst}</td>
                  <td class="center-align">${club.goalDifference}</td>
                  <td class="center-align">${club.points}</td>
                </tr>
              
  `})
  resultklasemen += `
    
        <div class="row">
        <div class="col s12 m12">
        <div class="card">
        <div class="card-content">
          <table class="responsive-table highlight" >
            <thead>
              <tr>
                <th class="center-align">Position</th>
                <th>Team</th>
                <th class="center-align">Played</th>
                <th class="center-align">Won</th>
                <th class="center-align">Draw</th>
                <th class="center-align">Lost</th>
                <th class="center-align">GF</th>
                <th class="center-align">GA</th>
                <th class="center-align">GD</th>
                <th class="center-align">Points</th>
              </tr>
            </thead>
              <tbody> 
        `+ dataklasemen +`
        </tbody>
          </table>
          </div>
          </div>
        </div>
      </div>
        
      `
    });
    // Sisipkan komponen card ke dalam elemen dengan id tabelKlasemen
    document.getElementById("tabelKlasemenLiga").innerHTML = resultklasemen;
  }
  
  //Hasil Teams
  function resultTimJSON(data) {
    var tabelTIMHtml = ''
    data.standings.forEach(function (klasemen) {
      var dataTIM = ''
      //console.log("cek panjang klasemen table: " + klasemen.table.length)
  
      klasemen.table.forEach(function (club) {
        club = JSON.parse(JSON.stringify(club).replace(/http:/g, 'https:'));
  
        // console.log("cek url logo club: " + club.team.crestUrl)
        dataTIM += `
        <div class="col s12 m6">
          <div class="card">
            <div class="card-image waves-block waves-light">
              <img width="250px" height="250px" src=${club.team.crestUrl}>
            </div>
            <div class="card-content">
              <h5><b>${club.team.name}</b></h5> 
              <p>
              <a class="waves-effect waves-light btn modal-trigger" href="./detailtim.html?id=${club.team.id}">Klik Disini</a>
              <button onclick="addTeamFav(${club.team.id},'${club.team.name}','${club.team.crestUrl}')" class="btn modal-trigger"><i id="iconFav" class="large material-icons">add</i>Favorit</button>
              </p>
            </div>
          </div>
    </div>
  `
  
      })
  
      tabelTIMHtml += `     
        <div class="row">
        `+ dataTIM +`
        
      </div>
      `
  
    });
  
    // Sisipkan komponen card ke dalam elemen dengan id tabelKlasemen
    document.getElementById("tabelTIM").innerHTML = tabelTIMHtml;
  }
  
  //Hasil Match
  function resultJadwalJSON(data) {
    var dataJadwalHtml = '';
    var match = data.matches;
    var DataMax = match.length;
    console.log(data)
    if (match.length > 1) {
      var dataJadwal ='';
      for (let i = 0; i < DataMax; i++) {
        dataJadwal += `
      <tr>
        <td class="center-align">${match[i].matchday}</td>
        <td class="center-align">${convertUTCDate(new Date(match[i].utcDate))}</td>
        <td class="center-align">${match[i].homeTeam.name}</td>
        <td class="center-align">VS</td>
        <td class="center-align">${match[i].awayTeam.name}</td>
        <td>
        <button onclick="addJadwalFav(${match[i].id},'${match[i].matchday}','${match[i].homeTeam.name}','${match[i].awayTeam.name}','${convertUTCDate(new Date(match[i].utcDate))}')" 
        class="btn-floating btn-large green">+</button>
      </td>
      </tr>`
      }
      
      dataJadwalHtml += `
      
      <div class="row">
      <div class="col s12 m12">
      <div class="card">
      <div class="card-content">
        <table class="responsive-table highlight" >
          <thead>
            <tr>
              <th class="center-align">Matchday</th>
              <th class="center-align">Kick Off</th>
              <th class="center-align">Home Tim</th>
              <th class="center-align"></th>
              <th class="center-align">Away Team</th>
              <th class="center-align">Favorit</th>
            </tr>
          </thead>
            <tbody> 
      `+ dataJadwal +`
      </tbody>
        </table>
        </div>
        </div>
      </div>
    </div>
      
    `
    }else if(match.length == 0){
      dataJadwalHtml += `
      <div class="col s12 m12 l6">
        <div class="card">
        <div class="card-content">
        <div center-align>
          <div class="row" style="margin:20px">
          <h5>Anda Belom Memilih Liga/Data Pertandingan Tidak ada</h5>
          </div>
        </div>
        </div>
        </div>
      </div>
          `  
    }

    // Sisipkan komponen card ke dalam elemen
    document.getElementById("JadwalLiga").innerHTML = dataJadwalHtml;
  }
  //Data Pemain
  function resultDetailTimKlubJSON(data) {
    var DataDetailTim =''
    var DetailTim=''
    data = JSON.parse(JSON.stringify(data).replace(/http:/g, 'https:'));
    // console.log("cek logo detail tim : " + data.crestUrl)
    DataDetailTim+=`
    <div class="card">
    <div class="card-image waves-light">
      <img src="${data.crestUrl}" width="250px" height="250px">
    </div>
    <div class="card-content">
      <p><h4>${data.name}</h4></p>
    </div>
    <div class="card-tabs">`
    document.getElementById("View_Klub").innerHTML=DataDetailTim;
    DetailTim+=`
    <table class="responsive-table striped">
      <tbody>
        <tr>
          <td>Nama :</td>
          <td>${data.name}</td>
        </tr>
        <tr>
          <td>Nama Pendek :</td>
          <td>${data.shortName}</td>
        </tr>
        <tr>
          <td>Tla :</td>
          <td>${data.tla}</td>
        </tr>
        <tr>
          <td>Alamat :</td>
          <td>${data.address}</td>
        </tr>
        <tr>
          <td>No Telepon :</td>
          <td>${data.phone}</td>
        </tr>
        <tr>
          <td>Website :</td>
          <td><a href="${data.website}">${data.website}</a></td>
        </tr>
        <tr>
          <td>Email :</td>
          <td>${data.email}</td>
        </tr>
        <tr>
          <td>Founded :</td>
          <td>${data.founded}</td>
        </tr>
        <tr>
          <td>Club Colors :</td>
          <td>${data.clubColors}</td>
        </tr>
        <tr>
          <td>Venue :</td>
          <td>${data.venue}</td>
        </tr>
      </tbody>
    </table>
    `
    document.getElementById("View_Detail_Klub").innerHTML=DetailTim;
  }

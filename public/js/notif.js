function PushNotifJad(msg) {
    const title = 'Daftar Favorit';
    const options = {
        'body': msg,
        'icon': '/images/notif.jpg',
        'badge': '/images/notif.jpg'
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('Fitur notifikasi tidak diijinkan.');
    }
}
function PushNotifJad(msg) {
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
      function PushNotifADD(msg,url) {
    const title = 'Daftar Favorit';
    const options = {
        'body': msg,
        'icon': '/image/notif.jpg',
        'image': url,
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
    function addTeamFav(id,name,logo) {
      let imSure = confirm(`Apakah ingin menambahkan ${name} ke Daftar Favorit ?`)
      if(imSure){
      addTeam({id,name,logo});
      M.toast({html: `Berhasil Favorit ${name}`});
      PushNotifADD(`Berhasil Menambahkan Ke Favorit ${name}`,`${logo}`)
    }
}
function addJadwalFav(id,matchday,hometim,awaytim,tanggal) {
      let imSure = confirm(`Apakah Ingin menambahkan jadwal ${hometim} vs ${awaytim}`)
      if(imSure){
      addJadwal({id,matchday,hometim,awaytim,tanggal});
      M.toast({html: `Berhasil Favorit jadwal ${hometim} vs ${awaytim}`});
      PushNotifJad(`Berhasil Menambahkan Ke Favorit Jadwal ${hometim} Vs ${awaytim}`)
    }
}
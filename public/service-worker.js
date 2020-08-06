importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if(workbox){

workbox.precaching.precacheAndRoute([
  { url: '/', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/detailtim.html', revision: '1' },
  { url: '/push.js', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: '/css/materialize.css', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/convert.js', revision: '1' },
  { url: '/js/db.js', revision: '1' },
  { url: '/js/functionapi.js', revision: '1' },
  { url: '/js/getdeletefav.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/jquery.js', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/materialize.js', revision: '1' },
  { url: '/js/mtz.min.js', revision: '1' },
  { url: '/js/nav.js', revision: '1' },
  { url: '/js/notif.js', revision: '1' },
  { url: '/js/regisdetail.js', revision: '1' },
  { url: '/js/script.js', revision: '1' },
  { url: '/js/sw.js', revision: '1' },
  { url: '/pages/about.html', revision: '1' },
  { url: '/pages/contact.html', revision: '1' },
  { url: '/pages/home.html', revision: '1' },
  { url: '/pages/jadwalFav.html', revision: '1' },
  { url: '/pages/pemainFav.html', revision: '1' },
  { url: '/pages/saved.html', revision: '1' },
  { url: '/pages/timFav.html', revision: '1' },
  { url: '/image/1.png', revision: '1' },
  { url: '/image/2.png', revision: '1' },
  { url: '/image/3.png', revision: '1' },
  { url: '/image/4.jpg', revision: '1' },
  { url: '/image/5.png', revision: '1' },
  { url: '/image/6.png', revision: '1' },
  { url: '/image/7.png', revision: '1' },
  { url: '/image/8.png', revision: '1' },
  { url: '/image/notif.png', revision: '1' },
  { url: '/icon192.png', revision: '1' },
  { url: '/icon512.png', revision: '1' },
],{
ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
  workbox.strategies.cacheFirst({
      cacheName: 'imagescache',
      plugins: [
      new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
      ]
  })
  );

  workbox.routing.registerRoute(
    new RegExp('/pages/'),
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'page'
      })
  );

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/'),
  workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'resources',
  })
);



workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
  })
);

// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
          new workbox.cacheableResponse.Plugin({
              statuses: [0, 200],
          }),
          new workbox.expiration.Plugin({
              maxAgeSeconds: 60 * 60 * 24 * 365,
              maxEntries: 30,
          }),
      ],
  })
);
workbox.routing.registerRoute(
  new RegExp('.*\.css'),
  workbox.strategies.cacheFirst()
);


workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.cacheFirst()
);
workbox.routing.registerRoute(
  new RegExp('.*\.png'),
  workbox.strategies.cacheFirst()
);
workbox.routing.registerRoute(
  new RegExp('.*\.jpg'),
  workbox.strategies.cacheFirst()
);


}else{
  console.log("WorkBox Gagal");
}



self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'image/1.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
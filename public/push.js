var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BNctIVdg_kQfHq2sqOibV8urZeTDibK2IThXp50Go8OgysJz3uxTaW8lPAT5JgyrZs4cV2kAIyAOkLp0CPGppQU",
   "privateKey": "An0OXWH9nm7hjVg2T9oNZrENQfbzO7mK2a9xKXVMA7E"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cro6JGu5t6k:APA91bE7ZjUDG89ZP1LtLyujOxWatzy_FsQUHQM8xHIgJzoUPiuI6N9krW2p1DMw5Y5IPK_7kxTHT5exwCWD8eKKvxDZbjiiA-QfYt9WpKiuMvylOWNkGNrXIzIV97viQBc16Vcv86jD",
   "keys": {
       "p256dh": "BJKROdi1NGzXvKNJn3XBC4ZKxVJmnPcVpMn5abIx/nnBJWo2dlC8Cbv84ynKUm5XOpVowLiHA4Zr6iw+gr4QDXw=",
       "auth": "9Kd7x7U8s3CI0Yx1U6hQZA=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '1094875115569',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
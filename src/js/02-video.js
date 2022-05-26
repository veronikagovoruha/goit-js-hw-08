import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const onTimeUpdate = throttle(data => {
  localStorage.setItem('videoplayer-current-time', data['seconds']);
}, 1000);

player.on('timeupdate', onTimeUpdate);

player.setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0);

import Player from '@vimeo/player';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const onTimeUpdate = function (data) {
  // _.throttle(() => {
  //     console.log("Scroll handler call every 300ms");
  //   }, 300)
  localStorage.setItem('videoplayer-current-time', data['seconds']);
};

player.on('timeupdate', onTimeUpdate);

player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('#vimeo-player');

const player = new Player(iframe);

const savedTime = localStorage.getItem(STORAGE_KEY);

if (savedTime) {
  player.setCurrentTime(savedTime);
}

player.on(
  'timeupdate',
  throttle(function (data) {
    const videoTime = data.seconds;

    localStorage.setItem(STORAGE_KEY, videoTime);
  }, 1000)
);

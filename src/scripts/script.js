const allSongs = [ 
  { id: 0, title: "Scratching The Surface", artist: "Quincy Larson", duration: "4:25", src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/scratching-the-surface.mp3", },
  { id: 1, title: "Can&#39t Stay Down", artist: "Quincy Larson", duration: "4:15", src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stay-down.mp3", }, 
  { id: 2, title: "Still Learning", artist: "Quincy Larson", duration: "3:51", src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/still-learning.mp3", }, 
  { id: 3, title: "Cruising for a Musing", artist: "Quincy Larson", duration: "3:34", src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cruising-for-a-musing.mp3", }, 
  { id: 4, title: "Never Not Favored", artist: "Quincy Larson", duration: "3:35", src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/never-not-favored.mp3", }, 
  { id: 5, title: "From the Ground Up", artist: "Quincy Larson", duration: "3:12", src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/from-the-ground-up.mp3", }, 
  { id: 6, title: "Walking on Air", artist: "Quincy Larson", duration: "3:25", src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/walking-on-air.mp3", }, 
  { id: 7, title: "Can&#39t Stop Me. Can&#39t Even Slow Me Down.", artist: "Quincy Larson", duration: "3:52", src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stop-me-cant-even-slow-me-down.mp3", }, 
  { id: 8, title: "The Surest Way Out is Through", artist: "Quincy Larson", duration: "3:10", src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/the-surest-way-out-is-through.mp3", }, 
  { id: 9, title: "Chasing That Feeling", artist: "Quincy Larson", duration: "2:43", src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/chasing-that-feeling.mp3", }, 
];

const playlistElement = document.querySelector('.playlist')
const trackElement = document.querySelector('.track')
const artistElement = document.querySelector('.artist')
const currentTimeElement = document.querySelector('.currentTime');
const durationElement = document.querySelector('.duration');
const progressBarElement = document.querySelector('.progressBarInput');
const playPauseElement = document.querySelector('.playButton img');
const nextElement = document.querySelector(".rightButton img");
const prevElement = document.querySelector(".leftButton img");
const shuffleElement = document.querySelector(".shuffle img");
let currentSong = null;

const audio = new Audio();

let isPlaying = false;

const handleSongDelete = (id) => {
  const index = allSongs.findIndex(song => song.id === id)
  allSongs.splice(index, 1)
  renderSongs(allSongs)
}

const selectCurrentSong = (song, currentElement) => {
  currentSong = song;
  trackElement.innerHTML = song.title;
  artistElement.innerHTML = song.artist;
  audio.src = song.src;
  
  audioUpdateHandler(currentSong);

  if (isPlaying){
    audio.pause();
    isPlaying = false;
    playPauseElement.src = 'https://cdn.icon-icons.com/icons2/1747/PNG/512/playbutton_113628.png'
  }
  
  if (currentElement) {
    const selectedSongElements = document.getElementsByClassName('song selected');
    if (selectedSongElements[0]) {
      selectedSongElements[0].classList.remove('selected');
    }
    if (currentElement.tagName === 'P') {
      currentElement.parentElement.classList.add('selected');
    } else {
      currentElement.classList.add('selected');
    }
  }
}

const renderSongs = () => {
  playlistElement.innerHTML = '';
  allSongs.forEach((song) => {
    const songDiv = document.createElement('div');
    songDiv.classList.add('song');
    
    songDiv.innerHTML = `
      <p>${song.title}</p>
      <p>${song.artist}</p>
      <p>${song.duration}</p>
      <img onclick='handleSongDelete(${song.id})' src="./images/delete.png" alt=""/>
    `;

    songDiv.addEventListener('click', (event) => selectCurrentSong(song, event.target));
    songDiv.addEventListener('dblclick', () => {
      selectCurrentSong(song);
      audio.play();
      isPlaying = true;
      playPauseElement.src = 'https://cdn.icon-icons.com/icons2/1933/PNG/512/iconfinder-pause-stop-button-player-music-4593160_122283.png'; // Изменить изображение кнопки
    });

    playlistElement.appendChild(songDiv);
  });
};


 //todo: 
 // 1. Find song in array
 // 2. Set src and title for audio element
 // 3. if new song selected then clear current playback time
 // 4. if the same song is played then start from the same position
 // 5. Update play button to pause button
 // 6. start playing the audio using the audio api

  //todo: 
  // 1. Remember current position when playing the file
  // 2. Update pause button to play button
  // 3. pause the audio using the audio api

const togglePlayPause = () => {
  if (isPlaying){
    audio.pause();
    isPlaying = false;
    playPauseElement.src = 'https://cdn.icon-icons.com/icons2/1747/PNG/512/playbutton_113628.png'
  } else {
    audio.play();
    isPlaying = true;
    playPauseElement.src = 'https://cdn.icon-icons.com/icons2/1933/PNG/512/iconfinder-pause-stop-button-player-music-4593160_122283.png'
  } 
  if(!currentSong) {
    const songElements = document.getElementsByClassName('song');
    selectCurrentSong(allSongs[0], songElements[0]);
    audio.play();
    isPlaying = true;
    playPauseElement.src = 'https://cdn.icon-icons.com/icons2/1933/PNG/512/iconfinder-pause-stop-button-player-music-4593160_122283.png'
  } 
  audioUpdateHandler(currentSong);
}

const audioUpdateHandler = ({duration} ) => {
  durationElement.innerHTML = duration;
  const toMinAndSec = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
  
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  
    return `${minutes}:${formattedSeconds}`;
  }

  audio.addEventListener('timeupdate', ({target}) => {
    const {currentTime, duration} = target;
    
    currentTimeElement.innerHTML =  toMinAndSec(currentTime);
    progressBarElement.value = (currentTime / duration) * 100;
  });
  progressBarElement.addEventListener('mousedown', () => {
    progressBarElement.setAttribute('data-mousedown', 'true');
  });

  progressBarElement.addEventListener('mouseup', (event) => {
    const duration = audio.duration;
    const newTime = (event.target.value / 100) * duration; 
    audio.currentTime = newTime; 
    progressBarElement.removeAttribute('data-mousedown');
  });

}
progressBarElement.addEventListener('input', (event) => {
  const value = event.target.value;
  const duration = audio.duration;
  audio.currentTime = (value / 100) * duration;
});

const handleNextSong = () => {
  if(!currentSong) {
    selectCurrentSong(allSongs[0]);
    return;
  }
  const currentSongIndex = allSongs.findIndex(song => song.id === currentSong.id);
  const nextSongIndex = currentSongIndex + 1 === allSongs.length ? 0 : currentSongIndex + 1;
  selectCurrentSong(allSongs[nextSongIndex]);
  audioUpdateHandler(currentSong);

}
const handlePrevSong = () => {
  if(!currentSong) {
    selectCurrentSong(allSongs[0]);
    return;
  }
  const currentSongIndex = allSongs.findIndex(song => song.id === currentSong.id);
  const previousSongIndex = currentSongIndex - 1 < 0 ? allSongs.length - 1 : currentSongIndex - 1;
  selectCurrentSong(allSongs[previousSongIndex]);
  audioUpdateHandler(currentSong);
}

const handleShuffle = () => {
    for (let i = allSongs.length -1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [allSongs[i], allSongs[j]] = [allSongs[j], allSongs[i]];
    }
  renderSongs();
}
const handlePlayer = () => {
  nextElement.addEventListener("click", handleNextSong);
  prevElement.addEventListener("click", handlePrevSong);
  playPauseElement.addEventListener("click", togglePlayPause);
  shuffleElement.addEventListener("click", handleShuffle);
}

renderSongs()
handlePlayer()





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
const currentTimeElement = document.querySelector('currentTime');
const durationElement = document.querySelector('duration');
const progressBarElement = document.querySelector('progressBar');
const playPauseElement = document.querySelector('playPause');
const audio = new Audio();

let isPlaying = false;

const handleSongDelete = (id) => {
  const index = allSongs.findIndex(song => song.id === id)
  allSongs.splice(index, 1)
  renderSongs(allSongs)
}

const selectCurrentSong = (song) => {
  currentSong = song;
  trackElement.innerHTML = song.title;
  artistElement.innerHTML = song.artist;
  //todo: set current audio for the song to play when user presses on play button
  audio.src = song.src;
  audio.currentTime = 0;
  updateTimeAndDuration();
  playSong();
}

const renderSongs = () => {
  const songsList = allSongs.map((song) => {
    return `
      <div class="song" onclick='selectCurrentSong(${JSON.stringify(song)})'>
        <p>${song.title}</p>
        <p>${song.artist}</p>
        <p>${song.duration}</p>
        <img onclick='handleSongDelete(${song.id})' src="./images/delete.png" alt=""/>
      </div>
    `
  })
  playlistElement.innerHTML = songsList
}

const playSong =  () => {
  if(currentSong){
    audio.play();
    isPlaying = true;
    audioPlayer.addEventListener('timeupdate', updateProgress);
  }
  
 //todo: 
 // 1. Find song in array
 // 2. Set src and title for audio element
 // 3. if new song selected then clear current playback time
 // 4. if the same song is played then start from the same position
 // 5. Update play button to pause button
 // 6. start playing the audio using the audio api
}

const pauseSong = () => {
  if(currentSong){
    audio.pause();
    isPlaying = false;

  }
  //todo: 
  // 1. Remember current position when playing the file
  // 2. Update pause button to play button
  // 3. pause the audio using the audio api
}
const togglePlayPause = (playPauseElement) => {
  if (isPlaying){
    pauseSong();
    playPauseElement.src = 'https://cdn.icon-icons.com/icons2/1747/PNG/512/playbutton_113628.png'
  } else {
    playSong();
    playPauseElement.src = 'https://cdn.icon-icons.com/icons2/1132/PNG/512/1486348534-music-pause-stop-control-play_80459.png'
  }
}

//todo: add event listeners for playSong and pauseSong

renderSongs()





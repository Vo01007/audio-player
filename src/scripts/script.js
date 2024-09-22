const allSongs = [ 
  { id: 0, title: "Scratching The Surface", artist: "Quincy Larson", duration: "4:25", src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/scratching-the-surface.mp3", },
  { id: 1, title: "Can't Stay Down", artist: "Quincy Larson", duration: "4:15", src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stay-down.mp3", }, 
  { id: 2, title: "Still Learning", artist: "Quincy Larson", duration: "3:51", src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/still-learning.mp3", }, 
  { id: 3, title: "Cruising for a Musing", artist: "Quincy Larson", duration: "3:34", src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cruising-for-a-musing.mp3", }, 
  { id: 4, title: "Never Not Favored", artist: "Quincy Larson", duration: "3:35", src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/never-not-favored.mp3", }, 
  { id: 5, title: "From the Ground Up", artist: "Quincy Larson", duration: "3:12", src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/from-the-ground-up.mp3", }, 
  { id: 6, title: "Walking on Air", artist: "Quincy Larson", duration: "3:25", src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/walking-on-air.mp3", }, 
  { id: 7, title: "Can't Stop Me. Can't Even Slow Me Down.", artist: "Quincy Larson", duration: "3:52", src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stop-me-cant-even-slow-me-down.mp3", }, 
  { id: 8, title: "The Surest Way Out is Through", artist: "Quincy Larson", duration: "3:10", src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/the-surest-way-out-is-through.mp3", }, 
  { id: 9, title: "Chasing That Feeling", artist: "Quincy Larson", duration: "2:43", src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/chasing-that-feeling.mp3", }, 
];

let audio = new Audio();
let song = document.querySelector('.song');
let index = 0; // трек по умолчанию

// Function to handle track selection (next/previous)
function selectingTrack(direction) {
    index += direction;
    if (index >= allSongs.length) index = 0;
    if (index < 0) index = allSongs.length - 1;
    playTrack(index);
    playPause.src = 'https://cdn.icon-icons.com/icons2/1132/PNG/512/1486348534-music-pause-stop-control-play_80459.png';
    audio.play();
}

// Function to play the selected track
function playTrack(ind) {
    let selectedTrack = allSongs[ind];
    image.src = `path/to/your/image/${selectedTrack.id}.jpg`;  // Add your image logic here
    document.querySelector('.track').innerText = selectedTrack.title;
    document.querySelector('.artist').innerText = selectedTrack.artist;
    audio.src = selectedTrack.src;
    audio.onloadedmetadata = function() {
        duration.innerText = formatTime(this.duration);
    };
}

// Play/Pause toggle
function togglePlayPause(e) {
    if (audio.paused) {
        audio.play();
        e.src = 'https://cdn.icon-icons.com/icons2/1132/PNG/512/1486348534-music-pause-stop-control-play_80459.png';
    } else {
        audio.pause();
        e.src = 'https://cdn.icon-icons.com/icons2/1132/PNG/512/1486348532-music-play-pause-control-go-arrow_80458.png';
    }
}

// Update the progress bar and current time
audio.ontimeupdate = function() {
    song.value = audio.currentTime / audio.duration * 100;
    currentTime.innerText = formatTime(audio.currentTime);
}

// Format time from seconds to MM:SS
function formatTime(time) {
    let s = Math.floor(time % 60);
    return Math.floor(time / 60) + ':' + (s < 10 ? '0' + s : s);
}

// Play the next track when the current one ends
audio.onended = function() {
    selectingTrack(1);
}

// Update the current time when seeking
song.oninput = function() {
    audio.currentTime = this.value / 100 * audio.duration;
}

song.value = 0;
currentTime.innerText = formatTime(audio.currentTime);

// Play the default track
playTrack(index);





// let audio = new Audio();
// let index = 0;

// // Инициализация DOM-элементов
// let image = document.querySelector('.image');
// let track = document.querySelector('.track');
// let artist = document.querySelector('.artist');
// let song = document.querySelector('.song');
// let currentTime = document.querySelector('.current-time');
// let duration = document.querySelector('.duration');
// let volume = document.querySelector('.volume');
// let playButton = document.querySelector('.playButton img'); // Кнопка Play
// let pauseButton = document.querySelector('.pauseButton img'); // Кнопка Pause

// function selectingTrack(direction) {
//   index += direction;
//   if (index >= allSongs[0].length) index = 0;
//   if (index < 0) index = allSongs[0].length - 1;
//   playTrack(index);
//   audio.play();
//   togglePlayPauseButtons();
// }

// function playTrack(ind) {
//   image.src = allSongs[0][ind];
//   track.innerText = allSongs[1][ind];
//   artist.innerText = allSongs[2][ind];
//   audio.src = allSongs[3][ind];
  
//   // Обновляем продолжительность трека, когда он загружен
//   audio.onloadeddata = function() {
//     duration.innerText = formatingTime(this.duration);
//   };
// }

// // Функция для обработки нажатий кнопок Play и Pause
// function playAudio() {
//   audio.play();
//   togglePlayPauseButtons(); // Скрываем Play, показываем Pause
// }

// function pauseAudio() {
//   audio.pause();
//   togglePlayPauseButtons(); // Скрываем Pause, показываем Play
// }

// // Смена видимости кнопок Play и Pause
// function togglePlayPauseButtons() {
//   if (audio.paused) {
//     playButton.style.display = 'inline';  // Показываем Play
//     pauseButton.style.display = 'none';   // Скрываем Pause
//   } else {
//     playButton.style.display = 'none';    // Скрываем Play
//     pauseButton.style.display = 'inline'; // Показываем Pause
//   }
// }

// audio.ontimeupdate = function() {
//   song.value = (audio.currentTime / audio.duration) * 100;
//   currentTime.innerText = formatingTime(audio.currentTime);
// }

// function formatingTime(time) {
//   let s = Math.floor(time % 60);
//   return Math.floor(time / 60) + ':' + (s < 10 ? '0' + s : s);
// }

// // Следующий трек по окончании текущего
// audio.onended = function() {
//   selectingTrack(1);
// }

// // Перемотка трека
// song.oninput = function() {
//   audio.currentTime = (this.value / 100) * audio.duration;
// }

// // Устанавливаем громкость
// volume.value = 80;
// volume.oninput = function() {
//   audio.volume = this.value / 100;
// }

// // Инициализация времени и трека
// song.value = 0;
// currentTime.innerText = formatingTime(audio.currentTime);
// playTrack(index);
// togglePlayPauseButtons(); // Изначально показываем Play


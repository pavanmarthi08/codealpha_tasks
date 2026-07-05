const songs = [
    {
        title: "Life of Ram",
        artist: "Pradeep Kumar, Shakthisree Gopalan",
        src: "Life Of Ram.m4a",
        cover: "life of ram.jpg"
    },
    {
        title: "Samjhawan",
        artist: "Arijit Singh, Shreya Ghoshal",
        src: "Samjhawan.mp3",
        cover: "samjhawan.jfif"
    },
    {
        title: "Raalin Oligal",
        artist: "Govind Vasantha, Shakthisree Gopalan",
        src: "Railin Oligal.m4a",
        cover: "Railin oligal.jpg"
    },
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        src: "Blinding Lights.mp3",
        cover: "blinding lights.jpg"
    },
    {
        title: "Darshana",
        artist: "Hesham Abdul Wahab",
        src: "Darshana.mp3",
        cover: "darshana.jpg"
    }
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const albumArt = document.querySelector(".album-art");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playlist = document.getElementById("playlist");
const playlistOverlay = document.getElementById("playlist-overlay");
const playlistToggle = document.getElementById("playlist-toggle");
const playlistClose = document.getElementById("playlist-close");

let currentSong = 0;

function loadSong(index) {
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    audio.src = songs[index].src;
    cover.src = songs[index].cover;

    document.querySelectorAll(".playlist-overlay li").forEach((li, i) => {
        li.classList.toggle("active", i === index);
    });
}

function playSong() {
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function pauseSong() {
    audio.pause();
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}

playBtn.addEventListener("click", () => {
    if (audio.paused) playSong();
    else pauseSong();
});

nextBtn.addEventListener("click", () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    playSong();
});

prevBtn.addEventListener("click", () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    playSong();
});

audio.addEventListener("timeupdate", () => {
    if (!isNaN(audio.duration)) {
        progress.max = audio.duration;
        progress.value = audio.currentTime;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationEl.textContent = formatTime(audio.duration);
    }
});

progress.addEventListener("input", () => {
    audio.currentTime = progress.value;
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    playSong();
});

function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

// Build playlist
songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} — ${song.artist}`;
    li.addEventListener("click", () => {
        currentSong = index;
        loadSong(index);
        playSong();
    });
    playlist.appendChild(li);
});

playlistToggle.addEventListener("click", () => {
    playlistOverlay.classList.add("active");
});

playlistClose.addEventListener("click", () => {
    playlistOverlay.classList.remove("active");
});

loadSong(currentSong);
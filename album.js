const idAlbum = new URLSearchParams(window.location.search).get("ID");
const URL = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "651cf5041amsha070be4788391ebp1fedabjsn85b40c8818c5",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

window.onload = async () => {
  const resp = await fetch(URL + idAlbum, options);
  const album = await resp.json();

  const min = (album.duration / 60).toFixed();
  const sec = (album.duration / 60).toFixed(2).toString().split(".")[1];

  const container = document.getElementById("albumHeader");
  const tracks = document.getElementById("albumTracks");
  const foot = document.getElementById("albumFooter");

  container.innerHTML = `<img  class="me-4 album-img shadow" src="${album.cover_medium}" alt="">
  <div class="flex-grow-1 ">
    <div class="d-flex justify-content-between align-items-center">
<p class="m-0 text-capitalize fw-bold">${album.type}</p>

    </div>
    <h1 class="titleAlbum ">${album.title}</h1>
    <div class="d-flex align-items-center mt-5">
    <img class="rounded-circle img-artist shadow" src="${album.artist.picture_small}"/>
    <p class="m-0 info truncate"><a class="text-decoration-none text-white mx-1" href="./artist.html?ID=${
      album.artist.id
    }">${album.artist.name}</a>
    • ${album.release_date.split("-")[0]} • ${album.nb_tracks} brani,
    <span class="text-secondary"> ${min} min ${sec} sec.</span></p>
    </div>
  </div>`;

  const songs = album.tracks.data;
  const audio = new Audio();
  songs.forEach((song, index) => {
    const minSong = (song.duration / 60).toFixed(2).split(".").join(":");
    const trackDiv = document.createElement("div");
    trackDiv.classList.add("row", "gy-2");
    trackDiv.innerHTML += `<div class="col-8 col-md-6 d-flex align-items-center cursor">
    <button id="play-${index}" class="btnPlay text-secondary">${index + 1}</button>
      <div>
<p class="ms-3 mb-0 truncate">${song.title}</p>
<p class="ms-3 mb-0 info "><a class="text-decoration-none text-secondary" href="./artist.html?ID=${song.artist.id}">${
      song.artist.name
    }</a>
</p></div></div>
<div class="col-md-4 d-none d-md-block "> <p class="text-secondary">${song.rank}</p></div>
<div class="col-4 col-md-2 text-end"><p class="me-5 text-secondary"> ${minSong}</p></div>`;

    tracks.appendChild(trackDiv);

    trackDiv.addEventListener("click", () => {
      audio.src = song.preview;
      const imgPlayer = document.getElementById("imgPlayer");
      const namePlayer = document.getElementById("namePlayer");
      const authorPlayer = document.getElementById("authorPlayer");
      namePlayer.classList.add("truncate");
      imgPlayer.src = song.album.cover_small;

      namePlayer.innerText = song.title;
      authorPlayer.innerText = song.artist.name;

      controlPlayer(audio);
    });
  });

  foot.innerHTML = ` 
  <p class="m-0 ms-4 text-secondary info">${album.release_date}</p>
  <p class="m-0 ms-4 text-secondary info">©${album.label}</p>`;
};

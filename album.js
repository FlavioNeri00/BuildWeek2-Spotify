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

  container.innerHTML = `<img  class="me-4 album-img" src="${album.cover_medium}" alt="">
  <div class="flex-grow-1 ">
    <div class="d-flex justify-content-between align-items-center">
<p class="m-0 text-capitalize ">${album.type}</p>

    </div>
    <h1 class="titleAlbum ">${album.title}</h1>
    <div class="d-flex align-items-center mt-5">
    <img class="rounded-circle img-artist" src="${album.artist.picture_small}"/>
    <p class="m-0 info truncate"><a class="text-decoration-none text-white mx-1 fw-bold " href="./artist.html?ID=${
      album.artist.id
    }">${album.artist.name}</a>
    • ${album.release_date.split("-")[0]} • ${album.nb_tracks} brani,
    <span class="text-secondary"> ${min} min ${sec} sec.</span></p>
    </div>
  </div>`;

  const songs = album.tracks.data;
  songs.forEach((song, index) => {
    const minSong = (song.duration / 60).toFixed(2);
    tracks.innerHTML += `<div class=" col-8 col-md-6 d-flex align-items-center">
      <span class="text-secondary">${index + 1}</span>
      <div>
<p class="ms-3 mb-0 truncate">${song.title}</p>
<p class="ms-3 mb-0 info "><a class="text-decoration-none text-secondary" href="./artist.html?ID=${song.artist.id}">${
      song.artist.name
    }</a>
</p></div></div>
<div class="col-md-4 d-none d-md-block "> <p class="text-secondary">${song.rank}</p></div>
<div class="col-4 col-md-2 text-end"><p class="me-5 text-secondary"> ${minSong}</p></div>`;
  });

  foot.innerHTML = ` 
  <p class="m-0 ms-4 text-secondary info">${album.release_date}</p>
  <p class="m-0 ms-4 text-secondary info">©${album.label}</p>`;
};

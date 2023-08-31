const URL = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "651cf5041amsha070be4788391ebp1fedabjsn85b40c8818c5",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

const search = async () => {
  const inputSearch = document.getElementById("inputSearch");
  const query = inputSearch.value;

  const resp = await fetch(URL + query, options);
  const src = await resp.json();
  console.log(src);
  const srcArr = src.data;
  console.log(srcArr);
  const mainArtist = document.getElementById("searchMainArtist");
  const mainTracks = document.getElementById("searchMainTracks");
  const mainAlbums = document.getElementById("searchMainAlbums");

  mainArtist.innerHTML = `<h5 class="fw-bold">Risultato più rilevante</h5>
  <div class="bg-secondary shadow p-3 rounded mt-4">
  <a href=./artist.html?ID=${srcArr[0].artist.id} class="text-decoration-none text-white"><img src="${srcArr[0].artist.picture}" class="rounded-circle shadow"/>
  <h3 class="mt-2">${srcArr[0].artist.name} </h3>
  <button type="button"  class="btn btn-dark ms-1 mt-2 py-0 px-4 rounded-pill shadow"><span class="info">Artista</span></button></a>
  </div>`;

  mainTracks.innerHTML = `<h5 class="fw-bold">Brani</h5>`;

  const audio = new Audio();
  for (let i = 0; i < 4; i++) {
    const divTracks = document.createElement("div");
    divTracks.classList.add("mt-4");
    const minTrack = (srcArr[i].duration / 60).toFixed(2).split(".").join(":");
    divTracks.innerHTML += `<div class="cursor d-flex justify-content-between mb-3">
    <div class="d-flex align-items-center">
    <img style="width: 50px" class="me-3" src="${srcArr[i].album.cover_small}"/>
    <div>
    <p class="m-0 truncate">${srcArr[i].title}</p>
    <a href=./artist.html?ID=${srcArr[i].artist.id} class="text-decoration-none text-white">
    <p class="info m-0 text-secondary fw-bold">${srcArr[i].artist.name}</p>
    </a>
     </div>
     </div>
     <p class="info opacity-50 me-5 ">${minTrack}</p>
     </div>`;
    mainTracks.appendChild(divTracks);

    divTracks.addEventListener("click", () => {
      audio.src = srcArr[i].preview;
      const imgPlayer = document.getElementById("imgPlayer");
      const namePlayer = document.getElementById("namePlayer");
      const authorPlayer = document.getElementById("authorPlayer");
      namePlayer.classList.add("truncate");
      imgPlayer.src = srcArr[i].album.cover_small;
      namePlayer.innerText = srcArr[i].title;
      authorPlayer.innerText = srcArr[i].artist.name;

      controlPlayer(audio);
    });
  }

  mainAlbums.innerHTML = `<h5 class="fw-bold">Album</h5>`;

  for (let i = 0; i < 5; i++) {
    mainAlbums.innerHTML += `<div class="col ">
    <div class="card bg-black p-2" style="min-height:300px">
    <img src="${srcArr[i].album.cover}" class="card-img-top" alt="...">
    <div class="card-body d-flex flex-column">
    <a href="./album.html?ID=${srcArr[i].album.id}" class="text-decoration-none">
    <p class="text-white fw-bold m-0 fs-6 truncate">${srcArr[i].album.title}</p></a>
      <a href="./artist.html?ID=${srcArr[i].artist.id}" class="mb-auto mt-1 text-decoration-none text-secondary"> ${srcArr[i].artist.name}</a>
    </div>
  </div>
  </div>`;
  }
};

const searchIcon = document.getElementById("searchIcon");
searchIcon.onclick = search;

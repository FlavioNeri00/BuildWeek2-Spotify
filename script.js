const albumsArr = [75621062, 315282, 14879699, 262078, 110565, 11205658];
const UrlAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const spotArr = [479652325, 463340305, 164132222];
const mixArr = [1262266, 940071, 116975, 708674, 144718432];
const forYouArr = [2795561, 173465852, 239959, 339096, 6958728];
const recentsArr = [208761542, 323847, 1440805, 480749945, 10339618];
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "651cf5041amsha070be4788391ebp1fedabjsn85b40c8818c5",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

window.onload = async () => {
  const hpAlbums = document.getElementById("innerHpAlbums");
  const spot = document.getElementById("adv");

  // SEZIONE PUBBLICITA

  const indexSpot = Math.floor(Math.random() * 3);
  const respSpot = await fetch(UrlAlbum + spotArr[indexSpot], options);
  const albumSpot = await respSpot.json();
  spot.innerHTML = `<img  class="me-4" src="${albumSpot.cover_medium}" alt="">
  <div class="flex-grow-1 ">
    <div class="d-flex justify-content-between align-items-center">
<p class="m-0 text-capitalize">${albumSpot.type}</p>
<button id="btn-Spot" type="button" class="btn btn-secondary">Nascondi Annuncio</button>
    </div>
    <a class="text-decoration-none text-white" href="./album.html?ID=${albumSpot.id}"><h2>${albumSpot.title}</h2></a>
    <a class="text-decoration-none text-white" href="./artist.html?ID=${albumSpot.artist.id}"><p>Ascolta il nuovo album di: ${albumSpot.artist.name}</p></a>
  </div>`;
  const btnSpot = document.getElementById("btn-Spot");
  btnSpot.onclick = spotHidden;

  // SEZIONE ALBUM SALUTI

  albumsArr.forEach(async element => {
    const resp = await fetch(UrlAlbum + element, options);
    const album = await resp.json();
    console.log(album);
    hpAlbums.innerHTML += ` <div class="col">
    <div class=" d-flex align-items-center bg-secondary">
    <img class="img-size me-2" src="${album.cover_small}" alt="">
    <p class="fw-bold m-0 fs-6 truncate  "><a class="text-decoration-none text-white " href="./album.html?ID=${album.id}">${album.title}</a></p>
  </div>
  </div>`;
  });

  //SEZIONE MIX
  const mix = document.getElementById("mix");
  fill(mixArr, mix);
  //SEZIONE FOR YOU
  const forYou = document.getElementById("forYou");
  fill(forYouArr, forYou);
  //SEZIONE RECENTS
  const recents = document.getElementById("recents");
  fill(recentsArr, recents);
};

const spotHidden = e => {
  const spot = document.getElementById("adv");
  spot.remove();
};

const fill = (arr, nodo) => {
  arr.forEach(async id => {
    const resp = await fetch(UrlAlbum + id, options);
    const album = await resp.json();
    nodo.innerHTML += `
    <div class="col ">
    <div class="card bg-black p-2" style="min-height:300px">
    <img src="${album.cover_medium}" class="card-img-top" alt="...">
    <div class="card-body d-flex flex-column">
    <a href="./album.html?ID=${album.id}" class="text-decoration-none"><p class="text-white fw-bold m-0 fs-6 truncate">${album.title}</p></a>
      <a href="./artist.html?ID=${album.artist.id}" class="mb-auto mt-1 text-decoration-none text-secondary"> ${album.artist.name}</a>
    </div>
  </div>
  </div>`;
  });
};

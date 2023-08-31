const idArtist = new URLSearchParams(window.location.search).get("ID");
const URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const query = "/top?limit=10";
const query2 = "/top?index=5";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "651cf5041amsha070be4788391ebp1fedabjsn85b40c8818c5",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    "Content-Type": "application/json",
  },
};

window.onload = async () => {
  const resp = await fetch(URL + idArtist, options);
  const artist = await resp.json();
  console.log("id", idArtist);

  const artistHeader = document.getElementById("artistHeader");
  const bkImg = document.getElementById("bkImg");
  bkImg.style.backgroundImage = `url(` + artist.picture_xl + `)`;
  artistHeader.innerHTML += ` <div class="mt-5  " >
  <div class="d-flex">
<i class="bi bi-patch-check-fill text-primary "></i> <p class="ms-2 info">Artista Verificato</p>
</div>
<h1 class="titleAlbum ">${artist.name}</h1>
<p class="mt-4 info">${artist.nb_fan} ascoltatori mensili
</p></div>`;

  const containerTop = document.getElementById("topBrani");

  const resp2 = await fetch(URL + idArtist + query, options);
  const topTracks = await resp2.json();
  const trackArr = topTracks.data;
  const audio = new Audio();

  trackArr.forEach((track, index) => {
    const minTrack = (track.duration / 60).toFixed(2).split(".").join(":");
    const trackDiv = document.createElement("div");
    trackDiv.classList.add("col-6", "d-flex", "cursor");

    trackDiv.innerHTML = `
    <button id="play-${index}" class="btnPlay"> ${index + 1}</button>
    <img
      class="ms-3"
      src="${track.album.cover_small}"
      alt=""
      style="width: 40px; height: 40px"
    />
    <p class="ms-3 flex-grow-1 truncate">${track.title}</p>
  `;

    const col4 = document.createElement("div");
    col4.classList.add("col-4");
    col4.innerHTML = `<p class="flex-grow-1 text-secondary">${track.rank}</p>`;

    const col2 = document.createElement("div");
    col2.classList.add("col-2");
    col2.innerHTML = `<p class="flex-grow-1 text-secondary">${minTrack}</p>`;

    containerTop.appendChild(trackDiv);
    containerTop.appendChild(col4);
    containerTop.appendChild(col2);

    trackDiv.addEventListener("click", () => {
      audio.src = track.preview;
      const imgPlayer = document.getElementById("imgPlayer");
      const namePlayer = document.getElementById("namePlayer");
      const authorPlayer = document.getElementById("authorPlayer");
      imgPlayer.src = track.album.cover_small;
      namePlayer.innerText = track.title;
      authorPlayer.innerText = track.artist.name;
      audio.play();
    });
  });

  const likeIt = document.getElementById("love");
  const nblike = Math.floor(Math.random() * artist.nb_album);
  likeIt.innerHTML = ` <img
  class="me-3"
  src="${artist.picture_small}"
  alt=""
  style="width: 50px; height: 50px; border-radius: 50%"
/>
<p>Hai messo mi piace a ${nblike} brani</p>`;
};

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
<i class="bi bi-patch-check-fill"></i> <p class="ms-2 ">Artista Verificato</p>
</div>
<h2>${artist.name}</h2>
<p class="mt-4 info">${artist.nb_fan} ascoltatori mensili
</p></div>`;

  const containerTop = document.getElementById("topBrani");

  const resp2 = await fetch(URL + idArtist + query, options);
  const topTracks = await resp2.json();

  const trackArr = topTracks.data;
  trackArr.forEach((track, index) => {
    const minTrack = (track.duration / 60).toFixed(2).split(".").join(":");
    containerTop.innerHTML += ` <div class="col-6 d-flex"><span class="ms-3">${index + 1}</span>
    <img
      class="ms-3"
      src="${track.album.cover_small}"
      alt=""
      style="width: 40px; height: 40px"
    />
    <p class="ms-3 flex-grow-1 truncate">${track.title}</p>
    </div>
    <div class="col-4">
    <p class="flex-grow-1 text-secondary">${track.rank}</p>
    </div>
    <div class="col-2">
    <p class="flex-grow-1 text-secondary">${minTrack}</p>
    </div>`;
  });
};

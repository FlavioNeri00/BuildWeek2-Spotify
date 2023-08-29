const idArtist = new URLSearchParams(window.location.search).get("ID");
const URL = "https://deezerdevs-deezer.p.rapidapi.com/artist/";
const query = "/top?limit=10";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "651cf5041amsha070be4788391ebp1fedabjsn85b40c8818c5",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};
window.onload = async () => {
  const resp = await fetch(URL + idArtist, options);
  const artist = await resp.json();
  const artistHeader = document.getElementById("artistHeader");

  artistHeader.innerHTML += ` <div style=“background-image:url(“${artist.picture_xl}”)”>
<i class="bi bi-patch-check-fill"></i> <p>Artista Verificato</p>
<h2>${artist.name}</h2>
<p class=“${artist.fan} ascoltatori mensili”
</p></div>`;
};

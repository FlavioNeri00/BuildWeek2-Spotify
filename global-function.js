document.getElementById("btn-fw").addEventListener("click", (e) => {
  history.forward();
});
document.getElementById("btn-back").addEventListener("click", (e) => {
  history.back();
});

const controlPlayer = (audio) => {
  const btnplay = document.getElementById("playerBtnPlay");
  const myAudioOnPlaying = () => {
    isPlaying = true;
    audio.play();
    btnplay.innerHTML = `<i class="bi bi-pause-circle-fill fs-3 text-white m-1"></i>`;
  };
  const myAudioOnPause = () => {
    isPlaying = false;
    audio.pause();
    btnplay.innerHTML = `<i class="bi bi-play-circle-fill fs-3 text-white m-1"></i`;
  };
  let isPlaying = true;
  btnplay.addEventListener("click", () => {
    isPlaying ? myAudioOnPause() : myAudioOnPlaying();
  });

  myAudioOnPlaying();
};

const friendShow = document.getElementById("friends");
const friendDiv = document.getElementById("friendsDiv");
const friendsExit = document.getElementById("friendsExit");

friendShow.onclick = () => friendDiv.classList.remove("d-none");
friendsExit.onclick = () => friendDiv.classList.add("d-none");

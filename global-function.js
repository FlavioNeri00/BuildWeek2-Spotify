document.getElementById("btn-fw").addEventListener("click", (e) => {
  history.forward();
});
document.getElementById("btn-back").addEventListener("click", (e) => {
  history.back();
});
let ID = null;
const controlPlayer = (audio) => {
  let counter = 0;
  let second = counter / 60;
  const btnplay = document.getElementById("playerBtnPlay");
  const btnRandom = document.getElementById("playRandom");
  const span = document.getElementById("seconds");
  const myAudioOnPlaying = () => {
    clearInterval(ID);
    isPlaying = true;
    audio.play();
    btnplay.innerHTML = `<i class="bi bi-pause-circle-fill fs-3 text-white m-1"></i>`;
    if (btnRandom) {
      btnRandom.innerHTML = `<i class="bi bi-pause-circle-fill m-3 fs-1"></i>`;
    }
    ID = setInterval(() => {
      if (second < 10) {
        second = "0" + second;
        console.log(second);
        span.innerText = second;
      }
      span.innerText = second;
      second++;
      if (second >= 30) {
        myAudioOnPause();
        span.innerText = "00";
        second = 0;
      }
    }, 1000);
  };
  const myAudioOnPause = () => {
    isPlaying = false;
    audio.pause();
    clearInterval(ID);
    btnplay.innerHTML = `<i class="bi bi-play-circle-fill fs-3 text-white m-1"></i>`;
    if (btnRandom) {
      btnRandom.innerHTML = ` <i class="bi bi-play-circle-fill m-3 fs-1"></i>`;
    }
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

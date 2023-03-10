import { connect, play } from "./networking.js";
import { startRendering, stopRendering } from "./render.js";
import { startCapturingInput, stopCapturingInput } from "./input.js";
import { downloadAssets } from "./assets.js";
import { initState } from "./state.js";
import { setLeaderboardHidden } from "./leaderboard.js";

// I'm using a tiny subset of Bootstrap here for convenience - there's some wasted CSS,
// but not much. In general, you should be careful using Bootstrap because it makes it
// easy to unnecessarily bloat your site.
import "./css/bootstrap-reboot.css";
import "./css/main.css";

const playMenu = document.getElementById("play-menu");
const playButton = document.getElementById("play-button");
const usernameInput = document.getElementById("username-input");

Promise.all([
  connect(onGameOver),
  downloadAssets(),
]).then(() => {
  playMenu.classList.remove("hidden");
  usernameInput.focus();
  playButton.onclick = () => {
    // Play!
    play(usernameInput.value);
    playMenu.classList.add("hidden");
    initState();
    startCapturingInput();
    startRendering();
    setLeaderboardHidden(false);
  };
}).catch(console.error);

function onGameOver() {
  stopCapturingInput();
  stopRendering();
  playMenu.classList.remove("hidden");
  setLeaderboardHidden(true);
}

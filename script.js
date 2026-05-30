const questionScreen = document.getElementById("questionScreen");
const yesScreen = document.getElementById("yesScreen");
const messageText = document.getElementById("messageText");
const catWrap = document.getElementById("catWrap");
const catCaption = document.getElementById("catCaption");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const restartBtn = document.getElementById("restartBtn");
const confetti = document.getElementById("confetti");

const pleas = [
  {
    message: "Okay, I deserve that. But please look at this tiny sad face and think once more?",
    caption: "The cat is getting emotional."
  },
  {
    message: "I promise I will do better. Can your angry heart give me one small chance?",
    caption: "One tear has officially fallen."
  },
  {
    message: "No? Then I am sending extra sorry, extra care, and extra hugs through this page.",
    caption: "The cat says: please forgive this human."
  },
  {
    message: "I cannot force you, but I can keep asking sweetly because you matter so much to me.",
    caption: "The cat is now in dramatic crying mode."
  },
  {
    message: "Last try before the cat writes a sad poem. Will you forgive me now?",
    caption: "Even the No button is losing confidence."
  }
];

let noCount = 0;

function handleNo() {
  const plea = pleas[Math.min(noCount, pleas.length - 1)];

  messageText.textContent = plea.message;
  catCaption.textContent = plea.caption;
  catWrap.classList.remove("sad", "very-sad");
  void catWrap.offsetWidth;
  catWrap.classList.add(noCount > 1 ? "very-sad" : "sad");

  const scale = Math.min(1 + (noCount + 1) * 0.16, 1.9);
  yesBtn.style.setProperty("--yes-scale", scale);

  if (noCount >= 2) {
    moveNoButton();
    noBtn.textContent = noCount > 4 ? "Still no?" : "No";
  }

  noCount += 1;
}

function moveNoButton() {
  const actionBox = noBtn.parentElement.getBoundingClientRect();
  const buttonBox = noBtn.getBoundingClientRect();
  const maxX = Math.max(actionBox.width - buttonBox.width, 0);
  const maxY = Math.max(actionBox.height - buttonBox.height, 0);

  noBtn.classList.add("runaway");
  noBtn.style.left = `${Math.random() * maxX}px`;
  noBtn.style.top = `${Math.random() * maxY}px`;
}

function sayYes() {
  questionScreen.classList.add("hidden");
  yesScreen.classList.remove("hidden");
  launchConfetti();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function launchConfetti() {
  confetti.innerHTML = "";
  const colors = ["#f45b7a", "#ff7b68", "#ffbd59", "#7cc9ff", "#ffffff"];

  for (let index = 0; index < 90; index += 1) {
    const piece = document.createElement("span");
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.animationDelay = `${Math.random() * 1.2}s`;
    piece.style.animationDuration = `${2.4 + Math.random() * 1.8}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    confetti.appendChild(piece);
  }
}

function restart() {
  noCount = 0;
  messageText.textContent = "I know I made you angry, and I am really sorry. I made this little page because you deserve effort, sweetness, and the biggest apology from my heart.";
  catCaption.textContent = "This cat believes in us.";
  catWrap.classList.remove("sad", "very-sad");
  yesBtn.style.setProperty("--yes-scale", 1);
  noBtn.classList.remove("runaway");
  noBtn.removeAttribute("style");
  noBtn.textContent = "No";
  yesScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  confetti.innerHTML = "";
}

noBtn.addEventListener("click", handleNo);
yesBtn.addEventListener("click", sayYes);
restartBtn.addEventListener("click", restart);

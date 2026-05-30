const introScreen = document.getElementById("introScreen");
const questionScreen = document.getElementById("questionScreen");
const yesScreen = document.getElementById("yesScreen");
const nameForm = document.getElementById("nameForm");
const nameInput = document.getElementById("nameInput");
const questionTitle = document.getElementById("questionTitle");
const messageText = document.getElementById("messageText");
const catWrap = document.getElementById("catWrap");
const catCaption = document.getElementById("catCaption");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const restartBtn = document.getElementById("restartBtn");
const shareBtn = document.getElementById("shareBtn");
const shareStatus = document.getElementById("shareStatus");
const musicToggle = document.getElementById("musicToggle");
const confetti = document.getElementById("confetti");
const heartStage = document.getElementById("heartStage");
const yesTitle = document.getElementById("yesTitle");
const yesMessage = document.getElementById("yesMessage");
const letterGreeting = document.getElementById("letterGreeting");
const letterBody = document.getElementById("letterBody");

let herName = "my love";
let noCount = 0;
let typeTimer = 0;
let audioContext = null;
let musicTimer = null;
let musicOn = false;

function apologyIntro() {
  return `${herName}, I know I made you angry, and I am really sorry. I made this little page because you deserve effort, sweetness, and the biggest apology from my heart.`;
}

function getPleas() {
  return [
    {
      message: `Okay ${herName}, I deserve that. But please look at this tiny sad face and think once more?`,
      caption: "The cat is getting emotional."
    },
    {
      message: `I promise I will do better, ${herName}. Can your angry heart give me one small chance?`,
      caption: "One tear has officially fallen."
    },
    {
      message: `No? Then I am sending extra sorry, extra care, and extra hugs to you, ${herName}.`,
      caption: "The cat says: please forgive this human."
    },
    {
      message: `I cannot force you, but I can keep asking sweetly because you matter so much to me, ${herName}.`,
      caption: "The cat is now in dramatic crying mode."
    },
    {
      message: `Last try before the cat writes a sad poem. ${herName}, will you forgive me now?`,
      caption: "Even the No button is losing confidence."
    }
  ];
}

function typeMessage(text) {
  window.clearInterval(typeTimer);
  messageText.textContent = "";

  let index = 0;
  typeTimer = window.setInterval(() => {
    messageText.textContent += text.charAt(index);
    index += 1;

    if (index >= text.length) {
      window.clearInterval(typeTimer);
    }
  }, 22);
}

function startApology(event) {
  event.preventDefault();
  herName = cleanName(nameInput.value);
  questionTitle.textContent = `${herName}, will you forgive me and love me again?`;
  introScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  resetQuestionState();
  typeMessage(apologyIntro());
}

function cleanName(value) {
  const trimmed = value.trim().replace(/\s+/g, " ");
  return trimmed || "my love";
}

function handleNo() {
  const pleas = getPleas();
  const plea = pleas[Math.min(noCount, pleas.length - 1)];

  typeMessage(plea.message);
  catCaption.textContent = plea.caption;
  catWrap.classList.remove("sad", "very-sad");
  void catWrap.offsetWidth;
  catWrap.classList.add(noCount > 1 ? "very-sad" : "sad");

  const scale = Math.min(1 + (noCount + 1) * 0.15, 1.85);
  yesBtn.style.setProperty("--yes-scale", scale);

  if (noCount >= 1) {
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
  burstHeartsFromButton();
  window.setTimeout(() => {
    questionScreen.classList.add("hidden");
    yesScreen.classList.remove("hidden");
    yesTitle.textContent = `${herName}, thank you for giving me another chance.`;
    yesMessage.textContent = `I am sorry for hurting you, ${herName}. I do not want to win an argument more than I want to protect your smile. I promise to listen better, speak softer, and choose you with more care.`;
    letterGreeting.textContent = `My favorite ${herName},`;
    letterBody.textContent = `You are precious to me. Your laugh, your mood, your little angry face, and your soft heart all matter to me. I made this page because I never want you to feel ordinary in my life.`;
    launchConfetti();
    launchHeartExplosion(window.innerWidth / 2, Math.min(window.innerHeight * 0.38, 330), 48);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 520);
}

function burstHeartsFromButton() {
  const box = yesBtn.getBoundingClientRect();
  const x = box.left + box.width / 2;
  const y = box.top + box.height / 2;
  launchHeartExplosion(x, y, 34);
}

function launchHeartExplosion(x, y, count) {
  const colors = ["#f25578", "#ff7967", "#ffb0c0", "#ffffff", "#ffd1dc"];

  for (let index = 0; index < count; index += 1) {
    const heart = document.createElement("span");
    const angle = (Math.PI * 2 * index) / count;
    const distance = 70 + Math.random() * 150;
    const size = 10 + Math.random() * 16;

    heart.className = "burst-heart";
    heart.style.setProperty("--x", `${x}px`);
    heart.style.setProperty("--y", `${y}px`);
    heart.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    heart.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
    heart.style.setProperty("--size", `${size}px`);
    heart.style.setProperty("--color", colors[index % colors.length]);
    heart.style.animationDelay = `${Math.random() * 90}ms`;
    heartStage.appendChild(heart);

    window.setTimeout(() => heart.remove(), 1200);
  }
}

function launchConfetti() {
  confetti.innerHTML = "";
  const colors = ["#f25578", "#ff7967", "#ffbd59", "#7cc9ff", "#ffffff"];

  for (let index = 0; index < 96; index += 1) {
    const piece = document.createElement("span");
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.animationDelay = `${Math.random() * 1.1}s`;
    piece.style.animationDuration = `${2.5 + Math.random() * 1.8}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    confetti.appendChild(piece);
  }
}

function resetQuestionState() {
  noCount = 0;
  catCaption.textContent = "This cat believes in us.";
  catWrap.classList.remove("sad", "very-sad");
  yesBtn.style.setProperty("--yes-scale", 1);
  noBtn.classList.remove("runaway");
  noBtn.removeAttribute("style");
  noBtn.textContent = "No";
}

function restart() {
  yesScreen.classList.add("hidden");
  introScreen.classList.remove("hidden");
  questionScreen.classList.add("hidden");
  confetti.innerHTML = "";
  heartStage.innerHTML = "";
  shareStatus.textContent = "";
  nameInput.focus();
}

async function sharePage() {
  const shareData = {
    title: `${herName}, please forgive me`,
    text: `A little apology page made with love for ${herName}.`,
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      shareStatus.textContent = "Shared with love.";
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    shareStatus.textContent = "Link copied.";
  } catch (error) {
    shareStatus.textContent = "Share was cancelled.";
  }
}

function toggleMusic() {
  if (musicOn) {
    stopMusic();
  } else {
    startMusic();
  }
}

function startMusic() {
  audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  musicOn = true;
  musicToggle.textContent = "Music ON";
  musicToggle.classList.add("is-on");
  musicToggle.setAttribute("aria-pressed", "true");
  playMelody();
  musicTimer = window.setInterval(playMelody, 7200);
}

function stopMusic() {
  musicOn = false;
  window.clearInterval(musicTimer);
  musicToggle.textContent = "Music OFF";
  musicToggle.classList.remove("is-on");
  musicToggle.setAttribute("aria-pressed", "false");
}

function playMelody() {
  if (!audioContext || !musicOn) {
    return;
  }

  const now = audioContext.currentTime;
  const notes = [523.25, 659.25, 783.99, 659.25, 587.33, 523.25, 440, 523.25];
  notes.forEach((frequency, index) => {
    playNote(frequency, now + index * 0.42, 0.36);
  });
}

function playNote(frequency, startTime, duration) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(0.045, startTime + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.04);
}

nameForm.addEventListener("submit", startApology);
noBtn.addEventListener("click", handleNo);
yesBtn.addEventListener("click", sayYes);
restartBtn.addEventListener("click", restart);
shareBtn.addEventListener("click", sharePage);
musicToggle.addEventListener("click", toggleMusic);

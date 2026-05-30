const imageUrls = {
  intro: "PASTE_DIRECT_IMAGE_URL_HERE",
  normal: "PASTE_DIRECT_IMAGE_URL_HERE",
  sad: "PASTE_DIRECT_IMAGE_URL_HERE",
  crying: "PASTE_DIRECT_IMAGE_URL_HERE",
  sorry: "PASTE_DIRECT_IMAGE_URL_HERE",
  forgive: "PASTE_DIRECT_IMAGE_URL_HERE",
  happy: "PASTE_DIRECT_IMAGE_URL_HERE",
  sign: "PASTE_DIRECT_IMAGE_URL_HERE"
};

const introScreen = document.getElementById("introScreen");
const questionScreen = document.getElementById("questionScreen");
const yesScreen = document.getElementById("yesScreen");

const introCat = document.getElementById("introCat");
const happyCat = document.getElementById("happyCat");
const letterCat = document.getElementById("letterCat");

const nameForm = document.getElementById("nameForm");
const nameInput = document.getElementById("nameInput");
const nameError = document.getElementById("nameError");

const questionTitle = document.getElementById("questionTitle");
const messageText = document.getElementById("messageText");
const catImage = document.getElementById("catImage");
const catCaption = document.getElementById("catCaption");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const restartBtn = document.getElementById("restartBtn");
const shareBtn = document.getElementById("shareBtn");
const shareStatus = document.getElementById("shareStatus");

const musicToggle = document.getElementById("musicToggle");
const confetti = document.getElementById("confetti");

const yesTitle = document.getElementById("yesTitle");
const yesMessage = document.getElementById("yesMessage");
const letterGreeting = document.getElementById("letterGreeting");
const letterBody = document.getElementById("letterBody");

let herName = "my love";
let noCount = 0;
let typeTimer = null;
let audioContext = null;
let musicTimer = null;
let musicOn = false;

const catStates = [
  {
    image: imageUrls.sad,
    caption: "The cat is getting emotional.",
    message: () => `Okay ${herName}, I deserve that. But please look at this sad face and think once more?`
  },
  {
    image: imageUrls.crying,
    caption: "One tear has officially fallen.",
    message: () => `I promise I will do better, ${herName}. Can your angry heart give me one small chance?`
  },
  {
    image: imageUrls.sorry,
    caption: "The cat says: please forgive this human.",
    message: () => `No? Then I am sending extra sorry, extra care, and extra hugs to you, ${herName}.`
  },
  {
    image: imageUrls.forgive,
    caption: "Even the cat is begging now.",
    message: () => `${herName}, even this tiny cat is asking you to forgive me. Please?`
  },
  {
    image: imageUrls.sign,
    caption: "Last emotional attack.",
    message: () => `Last try before I become fully dramatic. ${herName}, will you forgive me now?`
  }
];

function setupImages() {
  introCat.src = imageUrls.intro;
  catImage.src = imageUrls.normal;
  happyCat.src = imageUrls.happy;
  letterCat.src = imageUrls.sign;
}

function cleanName(value) {
  return value.trim().replace(/\s+/g, " ");
}

function apologyIntro() {
  return `${herName}, I know I made you angry, and I am really sorry. I made this page because you deserve effort, sweetness, and the biggest apology from my heart.`;
}

function showOnly(screenToShow) {
  introScreen.classList.add("hidden");
  questionScreen.classList.add("hidden");
  yesScreen.classList.add("hidden");

  screenToShow.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function typeMessage(text) {
  clearInterval(typeTimer);
  messageText.textContent = "";

  let index = 0;

  typeTimer = setInterval(() => {
    messageText.textContent += text.charAt(index);
    index += 1;

    if (index >= text.length) {
      clearInterval(typeTimer);
    }
  }, 22);
}

function resetQuestionState() {
  noCount = 0;
  catImage.src = imageUrls.normal;
  catCaption.textContent = "This cat believes in us.";
  yesBtn.style.setProperty("--yes-scale", 1);
  noBtn.classList.remove("runaway");
  noBtn.removeAttribute("style");
  noBtn.textContent = "No";
}

function startApology(event) {
  event.preventDefault();

  const submittedName = cleanName(nameInput.value);

  if (!submittedName) {
    nameError.textContent = "Please enter her name";
    nameInput.focus();
    return;
  }

  herName = submittedName;
  nameError.textContent = "";

  questionTitle.textContent = `${herName}, will you forgive me and love me again?`;

  resetQuestionState();
  showOnly(questionScreen);
  typeMessage(apologyIntro());
}

function handleNo() {
  const state = catStates[Math.min(noCount, catStates.length - 1)];

  catImage.src = state.image;
  catCaption.textContent = state.caption;
  typeMessage(state.message());

  const scale = Math.min(1 + (noCount + 1) * 0.16, 1.9);
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
  yesTitle.textContent = `${herName}, thank you for giving me another chance.`;

  yesMessage.textContent =
    `I am sorry for hurting you, ${herName}. I do not want to win an argument more than I want to protect your smile. I promise to listen better, speak softer, and choose you with more care.`;

  letterGreeting.textContent = `My favorite ${herName},`;

  letterBody.textContent =
    "You are precious to me. Your laugh, your mood, your little angry face, and your soft heart all matter to me. I made this page because I never want you to feel ordinary in my life.";

  showOnly(yesScreen);
  launchConfetti();
}

function launchConfetti() {
  confetti.innerHTML = "";

  const colors = ["#f25578", "#ff7967", "#ffbd59", "#7cc9ff", "#ffffff"];

  for (let i = 0; i < 100; i += 1) {
    const piece = document.createElement("span");

    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 1.2}s`;
    piece.style.animationDuration = `${2.4 + Math.random() * 1.8}s`;

    confetti.appendChild(piece);
  }
}

function restart() {
  confetti.innerHTML = "";
  shareStatus.textContent = "";
  nameInput.value = "";
  nameError.textContent = "";
  resetQuestionState();
  showOnly(introScreen);
  nameInput.focus();
}

async function sharePage() {
  const shareData = {
    title: `A little sorry for ${herName}`,
    text: `I made this cute apology page for ${herName}.`,
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      shareStatus.textContent = "Shared successfully.";
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    shareStatus.textContent = "Link copied.";
  } catch {
    shareStatus.textContent = "Could not share now. Try copying the link manually.";
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

  playMelody();
  musicTimer = setInterval(playMelody, 7200);
}

function stopMusic() {
  musicOn = false;
  clearInterval(musicTimer);
  musicToggle.textContent = "Music OFF";
  musicToggle.classList.remove("is-on");
}

function playMelody() {
  if (!audioContext || !musicOn) return;

  const now = audioContext.currentTime;
  const notes = [659.25, 783.99, 880, 783.99, 659.25, 587.33, 659.25, 523.25];

  notes.forEach((frequency, index) => {
    playNote(frequency, now + index * 0.42, 0.34);
  });
}

function playNote(frequency, startTime, duration) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(frequency, startTime);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(0.035, startTime + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.05);
}

setupImages();

nameForm.addEventListener("submit", startApology);
noBtn.addEventListener("click", handleNo);
yesBtn.addEventListener("click", sayYes);
restartBtn.addEventListener("click", restart);
shareBtn.addEventListener("click", sharePage);
musicToggle.addEventListener("click", toggleMusic);

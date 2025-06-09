// ==== Combined JS from index.js and dawuy.js ====

// ----- Index page JS -----
const correctPass = "11";

function appendNum(num) {
  const input = document.getElementById('pass');
  if (input.value.length < 6) input.value += num;
}

function clearPass() {
  document.getElementById('pass').value = '';
}

function submitPass() {
  const pass = document.getElementById('pass').value;
  if (pass === correctPass) {
    showDawuyPage();
  } else {
    alert('Sai mất rùi 😊');
  }
}

window.onload = () => {
  document.body.classList.remove('hidden');
};

// ----- Dawuy page JS -----

// Variables for dawuy page functionality
const message = "Chúc mừng sinh nhật người con gái tuyệt vời nhất cuộc đời anh! Anh mong em luôn mạnh khỏe, luôn rạng rỡ và hạnh phúc. Anh sẽ luôn cố gắng để mang đến cho em những điều đẹp nhất, vì em xứng đáng được yêu thương trọn vẹn.";
let idx = 0;

function type() {
  if (idx < message.length) {
    document.getElementById("typing").textContent += message[idx++];
    setTimeout(type, 45);
  }
}

const colors = ['#ffb6c1', '#ffd1dc', '#ff69b4', '#ffc0cb', '#ff77aa'];
const balloonsCount = 25;
let balloons = [];

function createBalloons() {
  // Clear old balloons if any
  balloons.forEach(b => b.remove());
  balloons = [];

  for (let i = 0; i < balloonsCount; i++) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.left = Math.random() * 100 + "vw";
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.animationDelay = (Math.random() * 10) + "s";
    balloon.style.animationDuration = (7 + Math.random() * 8) + "s";
    balloon.style.bottom = "-60px";
    document.body.appendChild(balloon);
    balloons.push(balloon);
  }
}

const musicBtn = document.getElementById('musicBtn');
const scPlayer = document.getElementById('sc-player');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    // Mute music (not changing src, just change the volume to 0)
    scPlayer.contentWindow.postMessage('{"method":"setVolume","value":0}', '*');
    musicBtn.textContent = "🔇";
    isPlaying = false;
  } else {
    // Unmute music (not changing src, just change the volume to 100)
    scPlayer.contentWindow.postMessage('{"method":"setVolume","value":100}', '*');
    musicBtn.textContent = "🔈";
    isPlaying = true;
  }
});

const cake = document.getElementById('cake');
const photoUrls = [
  "images/1.png",
  "images/2.png",
  "images/3.png",
  "images/4.png",
  "images/1.png"
];

document.getElementById("giftBtn").addEventListener("click", () => {
  cake.style.top = '50vh';
  cake.style.opacity = 1;
  setTimeout(() => {
    showConfetti();
    showFirework();
    spawnHeartPhotosCentered();
  }, 1500);
});

function showConfetti() {
  const confettiColors = ['#ff6f91', '#ff9671', '#ffc75f', '#f9f871', '#ff3c78'];
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    confetti.style.setProperty('--x', (Math.random() * 400 - 200) + 'px');
    confetti.style.setProperty('--y', (Math.random() * -400) + 'px');
    confetti.style.left = (window.innerWidth / 2) + 'px';
    confetti.style.top = (window.innerHeight / 2) + 'px';
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 1000);
  }
}

function showFirework() {
  const container = document.getElementById('fireworkContainer');
  container.innerHTML = '';
  container.style.opacity = 1;
  for (let i = 0; i < 30; i++) {
    const fw = document.createElement('div');
    fw.className = 'firework';
    fw.style.transform = `rotate(${i * 12}deg) translateY(-40px)`;
    container.appendChild(fw);
  }
  setTimeout(() => container.style.opacity = 0, 1000);
}

function createHeartPhotoCentered(idx, total) {
  const photo = document.createElement('img');
  photo.src = photoUrls[idx % photoUrls.length];
  photo.className = 'photo';
  document.body.appendChild(photo);

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const t = Math.PI * 2 * (idx / total);

  let scale = 22;
  if(window.innerWidth <= 480) {
    scale = 14;
  }

  const targetX = scale * 16 * Math.pow(Math.sin(t), 3);
  const targetY = -scale * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));

  photo.style.left = centerX + 'px';
  photo.style.top = centerY + 'px';
  photo.style.opacity = '1';
  photo.style.pointerEvents = 'auto';

  let progress = 0;
  const steps = 100;

  function animate() {
    if (progress <= steps) {
      const curX = centerX + (targetX * progress / steps);
      const curY = centerY + (targetY * progress / steps);
      photo.style.left = curX + 'px';
      photo.style.top = curY + 'px';
      progress++;
      requestAnimationFrame(animate);
    } else {
      photo.style.left = (centerX + targetX) + 'px';
      photo.style.top = (centerY + targetY) + 'px';
    }
  }
  animate();
}

function spawnHeartPhotosCentered() {
  const totalPhotos = 30;
  for (let i = 0; i < totalPhotos; i++) {
    setTimeout(() => createHeartPhotoCentered(i, totalPhotos), i * 70);
  }
}

// ----- Page switching -----

const pageIndex = document.getElementById('page-index');
const pageDawuy = document.getElementById('page-dawuy');

function showDawuyPage() {
  // Hide index page
  pageIndex.style.display = 'none';

  // Show dawuy page and apply dawuy body style
  pageDawuy.style.display = 'block';
  document.body.classList.add('dawuy-body');

  // Start dawuy page animations and effects
  idx = 0;
  document.getElementById("typing").textContent = "";
  type();
  createBalloons();

  // Reset music button and iframe muted state
  isPlaying = false;
  musicBtn.textContent = "🔈";
  if(scPlayer.src.indexOf('muted=false') !== -1) {
    scPlayer.src = scPlayer.src.replace('muted=false', 'muted=true');
  } else if(scPlayer.src.indexOf('muted=true') === -1) {
    // Add muted=true if missing
    scPlayer.src += (scPlayer.src.indexOf('?') === -1 ? '?' : '&') + 'muted=true';
  }
}

// Initially, dawuy page is hidden, index page is shown
// All event handlers are set up via inline handlers or here

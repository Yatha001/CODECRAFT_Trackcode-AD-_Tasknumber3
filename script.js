let timer = null;
let startTime = 0;
let running = false;
let elapsed = 0;

function updateDisplay() {
  const now = Date.now();
  const diff = elapsed + (running ? now - startTime : 0);

  const minutes = String(Math.floor(diff / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
  const milliseconds = String(diff % 1000).padStart(3, '0');

  document.getElementById('display').textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function startPauseTimer() {
  if (!running) {
    startTime = Date.now();
    timer = setInterval(updateDisplay, 10);
    running = true;
    document.getElementById('startPauseBtn').textContent = 'Pause';
  } else {
    elapsed += Date.now() - startTime;
    clearInterval(timer);
    running = false;
    document.getElementById('startPauseBtn').textContent = 'Start';
  }
}

function resetTimer() {
  clearInterval(timer);
  startTime = 0;
  elapsed = 0;
  running = false;
  document.getElementById('display').textContent = '00:00:000';
  document.getElementById('startPauseBtn').textContent = 'Start';
}

function addMinute() {
  elapsed += 60000; // 1 minute = 60000 ms
  updateDisplay();
}

document.getElementById('startPauseBtn').addEventListener('click', startPauseTimer);

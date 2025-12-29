/* ================= AUDIO + MÀU NỀN + HIỆU ỨNG ================= */

const playlist = [
    { src: "mp3/nhac1.mp3", bg: "#0f2a44", effect: "snow" },
    { src: "mp3/nhac2.mp3", bg: "#9999FF", effect: "mix" },
    { src: "mp3/nhac3.mp3", bg: "#FF99FF", effect: "heart" }
];

let currentTrack = 0;
const audio = document.getElementById("music");

function playTrack(index) {
    audio.src = playlist[index].src;
    document.body.style.backgroundColor = playlist[index].bg;

    if (playlist[index].effect === "snow") {
        createParticles("snow");
    } else if (playlist[index].effect === "mix") {
        createParticles("snow");
        setTimeout(() => createParticles("flower"), 1000);
    } else if (playlist[index].effect === "heart") {
        createParticles("snow");       // snow vẫn rơi
        setTimeout(() => createParticles("heart"), 500);
    }

    audio.play();
}

audio.addEventListener("ended", () => {
    currentTrack++;
    if (currentTrack >= playlist.length) currentTrack = 0;
    playTrack(currentTrack);
});

/* ================= TYPEWRITER THEO DÒNG ================= */

function typeLines(container, speed = 300, delay = 500) {
    const lines = container.querySelectorAll(".line");
    let lineIndex = 0;

    lines.forEach(line => {
        line.dataset.text = line.textContent;
        line.textContent = "";
    });

    function typeLine() {
        if (lineIndex >= lines.length) return;

        const line = lines[lineIndex];
        const text = line.dataset.text;
        let charIndex = 0;

        const timer = setInterval(() => {
            line.textContent += text[charIndex];
            charIndex++;

            if (charIndex >= text.length) {
                clearInterval(timer);
                lineIndex++;
                setTimeout(typeLine, delay);
            }
        }, 40);
    }

    typeLine();
}

/* ================= CLICK BẮT ĐẦU ================= */

document.addEventListener("click", () => {
    const envelope = document.getElementById("envelope");
    const letter = document.getElementById("letter");

    playTrack(0); // bài 1 + màu nền 1

    envelope.classList.add("open");

    setTimeout(() => {
        letter.classList.add("show");
        typeLines(document.getElementById("code"), 300, 500);
    }, 600);

}, { once: true });

/* ================= TUYẾT + HOA ĐÀO + HEART ================= */

const canvas = document.getElementById("effect");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

function createParticles(type) {
    particles = [];
    let count = 100;

    if (type === "snow") count = 120;
    else if (type === "flower") count = 80;
    else if (type === "heart") count = 60;

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 3 + 1,
            speed: Math.random() * 0.6 + 0.2,
            angle: Math.random() * Math.PI * 2,
            rotate: Math.random() * 0.02,
            type
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        if (p.type === "snow") {
            ctx.fillStyle = "rgba(255,255,255,0.45)";
            ctx.beginPath();
            ctx.arc(0, 0, p.r, 0, Math.PI * 2);
            ctx.fill();
        } else if (p.type === "flower") {
            ctx.fillStyle = "rgba(255,182,193,0.65)";
            ctx.beginPath();
            ctx.ellipse(0, 0, p.r + 2, p.r, 0, 0, Math.PI * 2);
            ctx.fill();
        } else if (p.type === "heart") {
            ctx.fillStyle = "rgba(255,80,120,0.7)";
            ctx.font = (p.r * 6) + "px Arial";
            ctx.fillText("❤", -p.r*3, p.r*3);
        }

        ctx.restore();

        p.y += p.speed;
        p.x += Math.sin(p.angle) * 0.3;
        p.angle += p.rotate;

        if (p.y > canvas.height) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(drawParticles);
}

/* gọi ban đầu: TUYẾT */
window.onload = () => {
    createParticles("snow");  // gọi snow đầu tiên
    drawParticles();           // chạy animation
};


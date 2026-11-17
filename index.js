let boxs = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".resetbtn");
let newgamebtn = document.querySelector(".newgamebtn");
let msgcontainer = document.querySelector(".msgcontainer");
let massage = document.querySelector("#massage");
let msgcard = document.querySelector("#msgcard");
let msgicon1 = document.querySelector("#msgicon1");
let msgicon2 = document.querySelector("#msgicon2");
let turnBadge = document.querySelector("#turn-badge");
let turnDot = document.querySelector("#turn-dot");
let turnText = document.querySelector("#turn-text");

let turnO = true;

let winptrn = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Clean scalable vector graphics (SVG) to replace raw emojis
const SVG_TROPHY = `<svg class="w-6 h-6 sm:w-7 sm:h-7 text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V19H7v2h10v-2h-4v-3.1c1.6-.41 2.96-1.54 3.61-3.06C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
</svg>`;

const SVG_SPARKLE = `<svg class="w-6 h-6 sm:w-7 sm:h-7 text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    <path d="M20 3v4M22 5h-4M4 17v2M5 18H3"/>
</svg>`;

const SVG_HANDSHAKE = `<svg class="w-6 h-6 sm:w-7 sm:h-7 text-slate-300 drop-shadow-[0_0_10px_rgba(203,213,225,0.6)] shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
    <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0l-1.4 1.4"/>
    <path d="m18 10 1.4-1.4a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0L14 6"/>
    <path d="M2 13.3V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.3"/>
    <path d="M8.5 14.5 7 16a2.12 2.12 0 0 1-3 0 2.12 2.12 0 0 1 0-3l4.5-4.5"/>
    <path d="m15.5 8.5 2 2"/>
</svg>`;

const SVG_SWORDS = `<svg class="w-6 h-6 sm:w-7 sm:h-7 text-slate-300 drop-shadow-[0_0_10px_rgba(203,213,225,0.6)] shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
    <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/>
    <line x1="13" y1="19" x2="19" y2="13"/>
    <line x1="16" y1="16" x2="20" y2="20"/>
    <line x1="19" y1="21" x2="21" y2="19"/>
    <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/>
    <line x1="5" y1="14" x2="9" y2="18"/>
    <line x1="7" y1="17" x2="4" y2="20"/>
    <line x1="3" y1="19" x2="5" y2="21"/>
</svg>`;

// Update turn badge display with Neon gaming styles
const updateTurnIndicator = () => {
    if (turnO) {
        turnDot.className = "w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)] animate-pulse";
        turnText.innerHTML = `Turn: <strong class="text-cyan-300 font-extrabold text-sm sm:text-base drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]">Player O</strong>`;
    } else {
        turnDot.className = "w-2.5 h-2.5 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,0.9)] animate-pulse";
        turnText.innerHTML = `Turn: <strong class="text-fuchsia-300 font-extrabold text-sm sm:text-base drop-shadow-[0_0_8px_rgba(232,121,249,0.7)]">Player X</strong>`;
    }
};

// Confetti burst for winner celebration
const triggerConfetti = () => {
    if (typeof confetti === "function") {
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { x: 0.2, y: 0.6 },
            colors: ['#22d3ee', '#e879f9', '#fbbf24', '#ffffff']
        });
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { x: 0.8, y: 0.6 },
            colors: ['#22d3ee', '#e879f9', '#fbbf24', '#ffffff']
        });
    }
};

const resetgame = () => {
    turnO = true;
    enableleboxs();
    msgcontainer.classList.add("hidden");
    msgcontainer.classList.remove("flex");

    // Restore turn badge
    turnBadge.classList.remove("hidden");
    turnBadge.classList.add("flex");
    updateTurnIndicator();
};

boxs.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO === true) {
            box.innerText = "O";
            box.classList.add("text-cyan-400", "drop-shadow-[0_0_16px_rgba(34,211,238,0.9)]");
            turnO = false;
        } else {
            box.innerText = "X";
            box.classList.add("text-fuchsia-400", "drop-shadow-[0_0_16px_rgba(232,121,249,0.9)]");
            turnO = true;
        }
        box.disabled = true;

        updateTurnIndicator();
        cheakwinner();
    });
});

const desibleboxs = () => {
    for (let box of boxs) {
        box.disabled = true;
    }
};

const enableleboxs = () => {
    for (let box of boxs) {
        box.disabled = false;
        box.innerText = "";
        box.className = "box aspect-square w-full h-full bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700/70 hover:border-cyan-400/50 rounded-xl sm:rounded-2xl text-4xl sm:text-6xl md:text-7xl font-black shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-[1.03] active:scale-95 transition-all duration-150 flex items-center justify-center cursor-pointer touch-manipulation";
    }
};

const showwinner = (Winner, winningPattern) => {
    massage.innerHTML = `Winner is <span class="${Winner === 'O' ? 'text-cyan-400' : 'text-fuchsia-400'}">${Winner}</span>`;
    msgicon1.innerHTML = SVG_SPARKLE;
    msgicon2.innerHTML = SVG_TROPHY;
    
    // Golden celebratory card style
    msgcard.className = "w-full bg-amber-400/20 border-2 border-amber-300/80 backdrop-blur-xl rounded-2xl px-5 py-3 shadow-[0_0_35px_rgba(251,191,36,0.5)] flex items-center justify-center gap-3 animate-glow";

    // Highlight the winning row/column/diagonal with glowing border
    if (winningPattern) {
        winningPattern.forEach((index) => {
            boxs[index].classList.add(
                "bg-amber-400/25",
                "!border-amber-400",
                "ring-4",
                "ring-amber-400/70",
                "shadow-[0_0_30px_rgba(251,191,36,0.7)]",
                "scale-105"
            );
        });
    }

    // Hide turn badge and show winner banner
    turnBadge.classList.add("hidden");
    turnBadge.classList.remove("flex");
    msgcontainer.classList.remove("hidden");
    msgcontainer.classList.add("flex");

    triggerConfetti();
    desibleboxs();
};

const showdraw = () => {
    massage.innerText = "Match Draw! Nobody won.";
    msgicon1.innerHTML = SVG_HANDSHAKE;
    msgicon2.innerHTML = SVG_SWORDS;

    // Cool cyberpunk slate/metallic style for draw
    msgcard.className = "w-full bg-slate-900/90 border-2 border-slate-600/80 backdrop-blur-xl rounded-2xl px-5 py-3 shadow-[0_0_25px_rgba(148,163,184,0.3)] flex items-center justify-center gap-3";

    // Hide turn badge and show draw banner
    turnBadge.classList.add("hidden");
    turnBadge.classList.remove("flex");
    msgcontainer.classList.remove("hidden");
    msgcontainer.classList.add("flex");

    desibleboxs();
};

const cheakwinner = () => {
    let hasWinner = false;
    for (let pattern of winptrn) {
        let position1 = boxs[pattern[0]].innerText;
        let position2 = boxs[pattern[1]].innerText;
        let position3 = boxs[pattern[2]].innerText;

        if (position1 !== "" && position2 !== "" && position3 !== "") {
            if (position1 === position2 && position2 === position3) {
                showwinner(position1, pattern);
                hasWinner = true;
                return;
            }
        }
    }

    // Check for draw (all 9 boxes filled and no winner)
    let isDraw = true;
    boxs.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });

    if (isDraw && !hasWinner) {
        showdraw();
    }
};

newgamebtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);

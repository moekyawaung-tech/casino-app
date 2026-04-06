let balance = 5000;
let isSpinning = false;
let autoInterval = null;

const symbols = ['🍒', '🍋', '🍊', '⭐', '💎', '7️⃣', '🍉'];
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const balanceEl = document.getElementById('balance');
const resultEl = document.getElementById('result');
const spinBtn = document.getElementById('spinBtn');

function updateBalance() {
    balanceEl.textContent = balance;
}

function spin() {
    if (isSpinning || balance < 50) return;
    
    const bet = 50;
    balance -= bet;
    updateBalance();
    isSpinning = true;
    resultEl.textContent = "Spinning...";
    spinBtn.disabled = true;

    let spins = 0;
    const interval = setInterval(() => {
        reel1.textContent = symbols[Math.floor(Math.random()*symbols.length)];
        reel2.textContent = symbols[Math.floor(Math.random()*symbols.length)];
        reel3.textContent = symbols[Math.floor(Math.random()*symbols.length)];
        spins++;
        
        if (spins > 15) {
            clearInterval(interval);
            finishSpin();
        }
    }, 80);
}

function finishSpin() {
    const final = [
        symbols[Math.floor(Math.random()*symbols.length)],
        symbols[Math.floor(Math.random()*symbols.length)],
        symbols[Math.floor(Math.random()*symbols.length)]
    ];
    
    reel1.textContent = final[0];
    reel2.textContent = final[1];
    reel3.textContent = final[2];

    // Win condition
    if (final[0] === final[1] && final[1] === final[2]) {
        const win = 500;
        balance += win;
        resultEl.innerHTML = `🎉 JACKPOT! +${win} Kyats`;
        resultEl.style.color = "gold";
    } else if (final[0] === final[1] || final[1] === final[2]) {
        const win = 100;
        balance += win;
        resultEl.innerHTML = `✅ Win +${win} Kyats`;
        resultEl.style.color = "#0f0";
    } else {
        resultEl.textContent = "😢 Try again";
        resultEl.style.color = "#fff";
    }

    updateBalance();
    isSpinning = false;
    spinBtn.disabled = false;
}

// Event Listeners
spinBtn.addEventListener('click', spin);
updateBalance();

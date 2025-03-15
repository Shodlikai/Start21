const words = [
    { word: "see", translation: "ko‘rmoq" },
    { word: "meat", translation: "go‘sht" },
    { word: "sea", translation: "dengiz" },
    { word: "meet", translation: "uchrashmoq" },
    { word: "ill", translation: "kasal" },
    { word: "fill", translation: "to‘ldirmoq" },
    { word: "fist", translation: "musht" },
    { word: "list", translation: "ro‘yxat" },
    { word: "far", translation: "uzoq" },
    { word: "bar", translation: "bar, mayxona" },
    { word: "but", translation: "lekin" },
    { word: "nut", translation: "yong‘oq" },
    { word: "sore", translation: "og‘riq" },
    { word: "pot", translation: "qozon" },
    { word: "dot", translation: "nuqta" },
    { word: "fog", translation: "tuman (ob-havoga oid)" },
    { word: "food", translation: "ovqat, ozuqa" },
    { word: "soup", translation: "sho‘rva" },
    { word: "moon", translation: "oy" },
    { word: "noon", translation: "peshin vaqti, tushlik vaqti" },
    { word: "put", translation: "qo‘ymoq" },
    { word: "full", translation: "to‘la, liq" },
    { word: "bull", translation: "buqa, ho‘kiz" },
    { word: "net", translation: "to‘r, tarmoq" },
    { word: "pet", translation: "uy hayvoni" },
    { word: "set", translation: "joylamoq, o‘rnatmoq" },
    { word: "get", translation: "olmoq" },
    { word: "turn", translation: "aylanmoq, burilmoq" },
    { word: "earn", translation: "pul ishlab topmoq" },
    { word: "burn", translation: "yonmoq, yoqmoq" },
    { word: "along", translation: "bo‘ylab, yoqalab" },
    { word: "mad", translation: "telba, jinni" },
    { word: "rat", translation: "kalamush" },
    { word: "cry", translation: "yig‘lamoq" },
    { word: "toy", translation: "o‘yinchoq" },
    { word: "poor", translation: "kamabag‘al" },
    { word: "hear", translation: "eshitmoq" },
    { word: "hair", translation: "soch" },
    { word: "air", translation: "havo" },
    { word: "wind", translation: "shamol" },
    { word: "van", translation: "furgon (kichik yuk mashinasi)" },
    { word: "vast", translation: "katta" },
    { word: "thin", translation: "orq, ingichka" },
    { word: "thirsty", translation: "chanqagan" },
    { word: "choose", translation: "tanlamoq" },
    { word: "show", translation: "ko‘rsatmoq" },
    { word: "jump", translation: "sakramoq" },
    { word: "yard", translation: "hovli, maydon" },
    { word: "bring", translation: "olib kelmoq" },
    { word: "boring", translation: "zerikarli" }
];

let remainingWords = shuffleArray([...words]); // So‘zlar random tartibda
let currentWord = null;
let totalAttempts = 0;
let correctAnswers = 0;
let timeLeft = 15;
let timer;
let timeMode = false;
let attemptsLeft = 2;
let audioCache = {}; // Saqlangan audio fayllar

// **Saqlangan audiolarni yuklash**
function loadCachedAudio() {
    for (let i = 0; i < localStorage.length; i++) {
        let word = localStorage.key(i);
        let audioURL = localStorage.getItem(word);
        let audio = new Audio(audioURL);
        audioCache[word] = audio;
    }
}

// **So‘zni yuklash**
function loadWord() {
    clearInterval(timer);

    if (remainingWords.length === 0) {
        remainingWords = shuffleArray([...words]); // So‘zlar tugasa, qayta aralashtiramiz
    }

    currentWord = remainingWords.pop();
    attemptsLeft = 2;

    document.getElementById("question").innerText = `"${currentWord.translation}" so‘zining inglizchasini yozing`;
    document.getElementById("answer").value = "";
    document.getElementById("result").innerText = "";

    playAudio(currentWord.word); // So‘zni eshittirish

    updateStats();

    if (timeMode) startTimer();
}

// **Taymer boshlash**
function startTimer() {
    timeLeft = 15;
    document.getElementById("timer").innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            showCorrectAnswer();
        }
    }, 1000);
}

// **Enter bosilganda javobni tekshirish**
document.getElementById("answer").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

// **Javobni tekshirish**
function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
    totalAttempts++;

    if (userAnswer === currentWord.word) {
        correctAnswers++;
        document.getElementById("result").innerText = "✅ To‘g‘ri!";
        document.getElementById("result").style.color = "green";

        updateStats();
        setTimeout(() => {
            loadWord();
        }, 1000);
    } else {
        attemptsLeft--;

        if (attemptsLeft > 0) {
            document.getElementById("result").innerText = `❌ Xato! Yana urinib ko‘ring (${attemptsLeft} ta imkoniyat qoldi)`;
            document.getElementById("result").style.color = "red";
        } else {
            showCorrectAnswer();
        }
    }
}

// **To‘g‘ri javobni ko‘rsatish**
function showCorrectAnswer() {
    clearInterval(timer);
    document.getElementById("result").innerText = `ℹ️ To‘g‘ri javob: ${currentWord.word}`;
    document.getElementById("result").style.color = "blue";

    setTimeout(() => {
        loadWord();
    }, 2000);
}

// **Statistikani yangilash**
function updateStats() {
    let percentage = totalAttempts > 0 ? ((correctAnswers / totalAttempts) * 100).toFixed(2) : 0;
    document.getElementById("attempts").innerText = totalAttempts;
    document.getElementById("correct").innerText = correctAnswers;
    document.getElementById("percentage").innerText = percentage + "%";
}

// **So‘zning audio faylini o‘qib berish**
function playAudio(word) {
    if (audioCache[word]) {
        audioCache[word].play();
    } else {
        let savedAudio = localStorage.getItem(word);

        if (savedAudio) {
            let audio = new Audio(savedAudio);
            audioCache[word] = audio;
            audio.play();
        } else {
            responsiveVoice.speak(word, "UK English Male", {
                onend: function () {
                    saveAudio(word);
                }
            });
        }
    }
}

// **Audio faylni saqlash**
function saveAudio(word) {
    let audio = new Audio();
    let audioURL = `https://code.responsivevoice.org/getvoice.php?t=${word}&tl=en-GB&key=ftro4Sxr`;

    audio.src = audioURL;
    audioCache[word] = audio;

    // Local Storage-ga saqlash
    localStorage.setItem(word, audioURL);
}

// **Tasodifiy aralashtirish funksiyasi**
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// **Time Mode toggleni sozlash**
document.getElementById("toggleMode").addEventListener("click", function () {
    timeMode = !timeMode;
    const elements = document.getElementById("timeModeElements");

    if (timeMode) {
        elements.style.display = "block";
        this.innerText = "⏳ Time Mode: Yoqilgan";
    } else {
        elements.style.display = "none";
        this.innerText = "⏳ Time Mode: O‘chiq";
    }
});

// **Sahifa yuklanganda saqlangan audiolarni yuklash**
window.addEventListener("load", loadCachedAudio);

// **O‘yinni boshlash**
loadWord();
const words = [
  { "word": "name", "translation": "ism" },
  { "word": "room", "translation": "xona" },
  { "word": "grandmother", "translation": "buvijon" },
  { "word": "grandfather", "translation": "bobo" },
  { "word": "wheel", "translation": "g‘ildirak" },
  { "word": "ear", "translation": "quloq" },
  { "word": "dog", "translation": "it" },
  { "word": "emperor", "translation": "imperator" },
  { "word": "report", "translation": "hisobot" },
  { "word": "suitcase", "translation": "chamadon" },
  { "word": "member", "translation": "a’zo" },
  { "word": "pencil", "translation": "qalam" },
  { "word": "bathroom", "translation": "hojatxona" },
  { "word": "bike", "translation": "velosiped" },
  { "word": "elephant", "translation": "fil" },
  { "word": "phone", "translation": "telefon" },
  { "word": "flower", "translation": "gul" },
  { "word": "temperature", "translation": "harorat" },
  { "word": "cow", "translation": "sigir" },
  { "word": "land", "translation": "yer" },
  { "word": "cat", "translation": "mushuk" },
  { "word": "horse", "translation": "ot" },
  { "word": "egg", "translation": "tuxum" },
  { "word": "bird", "translation": "qush" },
  { "word": "history", "translation": "tarix" },
  { "word": "owner", "translation": "egasi" },
  { "word": "chair", "translation": "stul" },
  { "word": "owl", "translation": "boyo‘g‘li" },
  { "word": "worker", "translation": "ishchi" },
  { "word": "rabbit", "translation": "quyon" },
  { "word": "lion", "translation": "sher" },
  { "word": "crocodile", "translation": "timsoh" },
  { "word": "fox", "translation": "tulki" },
  { "word": "location", "translation": "joylashuv" },
  { "word": "wolf", "translation": "bo‘ri" },
  { "word": "monkey", "translation": "maymun" },
  { "word": "capital", "translation": "poytaxt" },
  { "word": "headquarters", "translation": "bosh qarorgoh" },
  { "word": "currency", "translation": "valyuta" },
  { "word": "area", "translation": "hudud" },
  { "word": "mountain", "translation": "tog‘" },
  { "word": "hospital", "translation": "kasalxona" },
  { "word": "travel", "translation": "sayohat" },
  { "word": "bus", "translation": "avtobus" },
  { "word": "movie", "translation": "kino" },
  { "word": "screen", "translation": "ekran" },
  { "word": "task", "translation": "vazifa" },
  { "word": "war", "translation": "urush" },
  { "word": "income", "translation": "daromad" },
  { "word": "party", "translation": "partiya" }
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
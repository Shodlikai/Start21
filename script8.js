const card = document.querySelector('.card');
const word = document.querySelector('.word');
const type = document.querySelector('.type');
const slider = document.querySelector('.slider input[type="range"]');
const sliderValue = document.getElementById('slider-value');
const sliderMax = document.getElementById('slider-max');
const nextButton = document.getElementById('next-button');
const audioButton = document.getElementById('audio-button');
const frontImage = document.getElementById('front-image');
const backImage = document.getElementById('back-image');
const pronunciationElement = document.querySelector('.pronunciation');
const PIXABAY_API_KEY = "49146347-e05e26bd1aae0010e8163774c";
const learnedWords = []; // Yodlangan so'zlar ro'yxati
let words = [
  { "english": "play", "uzbek": "o‘ynamoq", "type": "fe’l", "pronunciation": "/pleɪ/" },
  { "english": "rain", "uzbek": "yomg‘ir yog‘moq", "type": "fe’l", "pronunciation": "/reɪn/" },
  { "english": "run", "uzbek": "yugurmoq", "type": "fe’l", "pronunciation": "/rʌn/" },
  { "english": "sleep", "uzbek": "uxlamoq", "type": "fe’l", "pronunciation": "/sliːp/" },
  { "english": "come", "uzbek": "kelmoq", "type": "fe’l", "pronunciation": "/kʌm/" },
  { "english": "learn", "uzbek": "o‘rganmoq", "type": "fe’l", "pronunciation": "/lɜːrn/" },
  { "english": "wait", "uzbek": "kutmoq", "type": "fe’l", "pronunciation": "/weɪt/" },
  { "english": "bark", "uzbek": "vovullamoq, akillamoq", "type": "fe’l", "pronunciation": "/bɑːrk/" },
  { "english": "drink", "uzbek": "ichmoq", "type": "fe’l", "pronunciation": "/drɪŋk/" },
  { "english": "shout", "uzbek": "qichqirmoq", "type": "fe’l", "pronunciation": "/ʃaʊt/" },
  { "english": "dance", "uzbek": "raqsga tushmoq", "type": "fe’l", "pronunciation": "/dæns/" },
  { "english": "call", "uzbek": "qo‘ng‘iroq qilmoq", "type": "fe’l", "pronunciation": "/kɔːl/" },
  { "english": "visit", "uzbek": "tashrif buyurmoq", "type": "fe’l", "pronunciation": "/ˈvɪzɪt/" },
  { "english": "driver", "uzbek": "haydovchi", "type": "ot", "pronunciation": "/ˈdraɪvər/" },
  { "english": "drive", "uzbek": "haydamoq", "type": "fe’l", "pronunciation": "/draɪv/" },
  { "english": "sit", "uzbek": "o‘tirmoq", "type": "fe’l", "pronunciation": "/sɪt/" },
  { "english": "clean", "uzbek": "tozalamoq", "type": "fe’l", "pronunciation": "/kliːn/" },
  { "english": "swim", "uzbek": "suzmoq", "type": "fe’l", "pronunciation": "/swɪm/" },
  { "english": "people", "uzbek": "odamlar", "type": "ot", "pronunciation": "/ˈpiːpəl/" },
  { "english": "study", "uzbek": "ta’lim olmoq", "type": "fe’l", "pronunciation": "/ˈstʌdi/" },
  { "english": "employer", "uzbek": "ish beruvchi", "type": "ot", "pronunciation": "/ɪmˈplɔɪər/" },
  { "english": "walk", "uzbek": "yurmoq", "type": "fe’l", "pronunciation": "/wɔːk/" },
  { "english": "ask", "uzbek": "so‘ramoq", "type": "fe’l", "pronunciation": "/æsk/" },
  { "english": "sing", "uzbek": "kuylamoq", "type": "fe’l", "pronunciation": "/sɪŋ/" },
  { "english": "listen", "uzbek": "tinglamoq", "type": "fe’l", "pronunciation": "/ˈlɪsən/" },
  { "english": "pupil", "uzbek": "o‘quvchi", "type": "ot", "pronunciation": "/ˈpjuːpəl/" },
  { "english": "answer", "uzbek": "javob bermoq", "type": "fe’l", "pronunciation": "/ˈænsər/" },
  { "english": "parrot", "uzbek": "to‘tiqush", "type": "ot", "pronunciation": "/ˈpærət/" },
  { "english": "speak", "uzbek": "gapirmoq", "type": "fe’l", "pronunciation": "/spiːk/" },
  { "english": "watch", "uzbek": "tomosha qilmoq", "type": "fe’l", "pronunciation": "/wɒtʃ/" },
  { "english": "enter", "uzbek": "kirmoq", "type": "fe’l", "pronunciation": "/ˈɛntər/" },
  { "english": "fly", "uzbek": "uchmoq", "type": "fe’l", "pronunciation": "/flaɪ/" },
  { "english": "correct", "uzbek": "to‘g‘rilamoq", "type": "fe’l", "pronunciation": "/kəˈrɛkt/" },
  { "english": "employee", "uzbek": "xodim", "type": "ot", "pronunciation": "/ɪmˈplɔɪiː/" },
  { "english": "enjoy", "uzbek": "rohatlanmoq", "type": "fe’l", "pronunciation": "/ɪnˈdʒɔɪ/" },
  { "english": "air-conditioner", "uzbek": "konditsioner", "type": "ot", "pronunciation": "/ˈɛr kənˌdɪʃənər/" },
  { "english": "work", "uzbek": "ishlamoq", "type": "fe’l", "pronunciation": "/wɜːrk/" },
  { "english": "cool", "uzbek": "sovitmoq, sovuqmoq", "type": "fe’l", "pronunciation": "/kuːl/" },
  { "english": "help", "uzbek": "yordam bermoq", "type": "fe’l", "pronunciation": "/hɛlp/" },
  { "english": "pedestrian", "uzbek": "piyoda", "type": "ot", "pronunciation": "/pəˈdɛstriən/" },
  { "english": "stop", "uzbek": "to‘xtamoq, to‘xtatmoq", "type": "fe’l", "pronunciation": "/stɒp/" },
  { "english": "whistle", "uzbek": "hushtak chalmoq", "type": "fe’l", "pronunciation": "/ˈwɪsəl/" },
  { "english": "open", "uzbek": "ochmoq", "type": "fe’l", "pronunciation": "/ˈoʊpən/" },
  { "english": "do", "uzbek": "bajarmoq", "type": "fe’l", "pronunciation": "/duː/" },
  { "english": "go", "uzbek": "bormoq", "type": "fe’l", "pronunciation": "/ɡoʊ/" },
  { "english": "win", "uzbek": "g‘alaba qozonmoq", "type": "fe’l", "pronunciation": "/wɪn/" },
  { "english": "lose", "uzbek": "yo‘qotmoq", "type": "fe’l", "pronunciation": "/luːz/" },
  { "english": "begin", "uzbek": "boshlanmoq", "type": "fe’l", "pronunciation": "/bɪˈɡɪn/" },
  { "english": "finish", "uzbek": "tugamoq", "type": "fe’l", "pronunciation": "/ˈfɪnɪʃ/" }
];
// **So‘zlarni har safar yangi tartibda aralashtirish**
function shuffleWords() {
    words = words.sort(() => Math.random() - 0.5);
}
shuffleWords();

let currentIndex = 0;

// **Slayderni moslashtirish**
slider.max = words.length;
slider.value = 1;
sliderMax.textContent = words.length;

// **So‘zga tegishli rasmni Pixabay’dan olish**
async function getPixabayImage(query) {
    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${query}&image_type=photo`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return (data.hits.length > 0) ? data.hits[0].webformatURL : "placeholder.png";
    } catch (error) {
        console.error("Pixabay API error:", error);
        return "placeholder.png";
    }
}

// **Kartani yangilash va ekranga chiqarish**
async function updateCard(index) {
    word.textContent = words[index].english;
    pronunciationElement.textContent = words[index].pronunciation;
    type.textContent = words[index].type;
    document.querySelector('.card-back .word').textContent = words[index].uzbek;
    document.querySelector('.card-back .type').textContent = words[index].type;

    slider.value = index + 1; // Sliderni yangilash
    sliderValue.textContent = `${index + 1} / ${words.length}`; // So‘z tartib raqami
    currentIndex = index;

    // **Rasmni yuklash**
    const imageUrl = await getPixabayImage(words[index].english);
    backImage.src = imageUrl;

    // **Audio mavjudligini tekshirish**
    checkAndDownloadAudio(words[index].audio);
}

// **Audio mavjudligini tekshirish va yuklash**
async function checkAndDownloadAudio(audioFile) {
    if (localStorage.getItem(audioFile)) {
        console.log("Saqlangan audio ishlatilmoqda:", audioFile);
    } else {
        console.log("Audio yuklanmoqda:", audioFile);
        try {
            const response = await fetch(`audios/${audioFile}`);
            if (response.ok) {
                const blob = await response.blob();
                const reader = new FileReader();
                reader.onloadend = function () {
                    localStorage.setItem(audioFile, reader.result);
                };
                reader.readAsDataURL(blob);
            } else {
                console.error("Audio topilmadi:", audioFile);
            }
        } catch (error) {
            console.error("Audio yuklashda xatolik:", error);
        }
    }
}

// **Kartani bosganda ovoz chiqarish**
card.addEventListener('click', function () {
    this.classList.toggle('flipped');
    if (this.classList.contains('flipped')) {
        speak(words[currentIndex].english);
    }
});

// **Sliderni boshqarish**
slider.addEventListener('input', function () {
    updateCard(this.value - 1);
});

// **Keyingi so‘zga o‘tish**
nextButton.addEventListener('click', function () {
    currentIndex++;
    if (currentIndex >= words.length) {
        shuffleWords(); // So‘zlar yana aralashtiriladi
        currentIndex = 0;
    }
    updateCard(currentIndex);
});

// **Ovoz chiqarish**
function speak(text) {
    const audioFile = words[currentIndex].audio;
    const storedAudio = localStorage.getItem(audioFile);

    if (storedAudio) {
        const audio = new Audio(storedAudio);
        audio.play();
    } else {
        console.warn("Audio fayli yo‘q, text-to-speech ishlatilmoqda.");
        responsiveVoice.speak(text, "US English Male", { rate: 0.9 });
    }
}

// **Audio tugmasi bosilganda ovoz chiqarish**
audioButton.addEventListener('click', function () {
    speak(words[currentIndex].english);
});
// Surish (swipe) funksiyasi
card.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

card.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const deltaX = endX - startX;
    if (deltaX > 50) { // O'ngga surish
        card.classList.add('swiping-right');
        setTimeout(() => {
            currentIndex++;
            if (currentIndex >= words.length) {
                currentIndex = 0;
            }
            updateCard(currentIndex);
            card.classList.remove('swiping-right');
            card.style.left = '';
            card.style.transform = '';
        }, 300);
    } else if (deltaX < -50) { // Chapga surish
        const learnedWord = words.splice(currentIndex, 1)[0];
        learnedWords.push(learnedWord);
        console.log("Yodlangan so'zlar:", learnedWords);

        if (currentIndex >= words.length) {
            currentIndex = 0;
        }
        updateCard(currentIndex);

        card.classList.add('swiping-left');
        setTimeout(() => {
            card.classList.remove('swiping-left');
            card.style.left = '';
            card.style.transform = '';
        }, 300);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const nextButton = document.getElementById("next-button");
    const modal = document.getElementById("instruction-modal");
    const closeModal = document.getElementById("close-modal");

    // "Keyingi" tugmasi bosilganda modal chiqsin
    nextButton.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    // "Tushunarli" tugmasi bosilganda modal yopilsin
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });
});
// **Ilk so‘zni ekranga chiqarish**
updateCard(0);
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
  { "english": "bag", "uzbek": "sumka", "type": "ot", "pronunciation": "/bæɡ/" },
  { "english": "laboratory", "uzbek": "laboratoriya", "type": "ot", "pronunciation": "/ləˈbɒrətəri/" },
  { "english": "box", "uzbek": "quti", "type": "ot", "pronunciation": "/bɒks/" },
  { "english": "classroom", "uzbek": "sinf xonasi", "type": "ot", "pronunciation": "/ˈklɑːsruːm/" },
  { "english": "glass", "uzbek": "shisha, stakan", "type": "ot", "pronunciation": "/ɡlɑːs/" },
  { "english": "orange", "uzbek": "apelsin", "type": "ot", "pronunciation": "/ˈɒrɪndʒ/" },
  { "english": "table", "uzbek": "stol", "type": "ot", "pronunciation": "/ˈteɪbl/" },
  { "english": "picture", "uzbek": "rasm", "type": "ot", "pronunciation": "/ˈpɪktʃər/" },
  { "english": "ceiling", "uzbek": "shift, potolok", "type": "ot", "pronunciation": "/ˈsiːlɪŋ/" },
  { "english": "cup", "uzbek": "chashka, kubok", "type": "ot", "pronunciation": "/kʌp/" },
  { "english": "floor", "uzbek": "pol, etaj", "type": "ot", "pronunciation": "/flɔːr/" },
  { "english": "shoes", "uzbek": "poyabzal", "type": "ot", "pronunciation": "/ʃuːz/" },
  { "english": "hat", "uzbek": "shlyapa", "type": "ot", "pronunciation": "/hæt/" },
  { "english": "head", "uzbek": "bosh", "type": "ot", "pronunciation": "/hed/" },
  { "english": "bin", "uzbek": "axlat qutisi", "type": "ot", "pronunciation": "/bɪn/" },
  { "english": "treasure", "uzbek": "xazina", "type": "ot", "pronunciation": "/ˈtrɛʒər/" },
  { "english": "ground", "uzbek": "yer", "type": "ot", "pronunciation": "/ɡraʊnd/" },
  { "english": "stairs", "uzbek": "zinalar", "type": "ot", "pronunciation": "/steərz/" },
  { "english": "blanket", "uzbek": "adyol", "type": "ot", "pronunciation": "/ˈblæŋkɪt/" },
  { "english": "pillow", "uzbek": "yostiq", "type": "ot", "pronunciation": "/ˈpɪləʊ/" },
  { "english": "ball", "uzbek": "to‘p", "type": "ot", "pronunciation": "/bɔːl/" },
  { "english": "couch", "uzbek": "divan", "type": "ot", "pronunciation": "/kaʊtʃ/" },
  { "english": "office", "uzbek": "idora", "type": "ot", "pronunciation": "/ˈɒfɪs/" },
  { "english": "bridge", "uzbek": "ko‘prik", "type": "ot", "pronunciation": "/brɪdʒ/" },
  { "english": "shop", "uzbek": "do‘kon", "type": "ot", "pronunciation": "/ʃɒp/" },
  { "english": "bakery", "uzbek": "novvoyxona", "type": "ot", "pronunciation": "/ˈbeɪkəri/" },
  { "english": "policeman", "uzbek": "politsiyachi", "type": "ot", "pronunciation": "/pəˈliːsmən/" },
  { "english": "desk", "uzbek": "yozuv stoli, parta", "type": "ot", "pronunciation": "/desk/" },
  { "english": "curtain", "uzbek": "parda", "type": "ot", "pronunciation": "/ˈkɜːtən/" },
  { "english": "playground", "uzbek": "o‘yin maydonchasi", "type": "ot", "pronunciation": "/ˈpleɪɡraʊnd/" },
  { "english": "sofa", "uzbek": "divan", "type": "ot", "pronunciation": "/ˈsəʊfə/" },
  { "english": "police station", "uzbek": "politsiya mahkamasi", "type": "ot", "pronunciation": "/pəˈliːs ˈsteɪʃən/" },
  { "english": "mall", "uzbek": "yirik savdo markazi", "type": "ot", "pronunciation": "/mɔːl/" },
  { "english": "firefighter", "uzbek": "o‘t o‘chiruvchi", "type": "ot", "pronunciation": "/ˈfaɪəfaɪtər/" },
  { "english": "apartment", "uzbek": "xonadon", "type": "ot", "pronunciation": "/əˈpɑːtmənt/" },
  { "english": "bus stop", "uzbek": "avtobus bekati", "type": "ot", "pronunciation": "/bʌs stɒp/" },
  { "english": "path", "uzbek": "yo‘lak, yo‘lka", "type": "ot", "pronunciation": "/pɑːθ/" },
  { "english": "fireplace", "uzbek": "kamin", "type": "ot", "pronunciation": "/ˈfaɪəpleɪs/" },
  { "english": "building", "uzbek": "bino", "type": "ot", "pronunciation": "/ˈbɪldɪŋ/" },
  { "english": "market", "uzbek": "bozor, do‘kon", "type": "ot", "pronunciation": "/ˈmɑːkɪt/" },
  { "english": "mosque", "uzbek": "masjid", "type": "ot", "pronunciation": "/mɒsk/" },
  { "english": "charger", "uzbek": "quvvatlagich, zaryadnik", "type": "ot", "pronunciation": "/ˈtʃɑːrdʒər/" },
  { "english": "basket", "uzbek": "savat", "type": "ot", "pronunciation": "/ˈbɑːskɪt/" },
  { "english": "chicken", "uzbek": "tovuq", "type": "ot", "pronunciation": "/ˈtʃɪkɪn/" },
  { "english": "store", "uzbek": "do‘kon", "type": "ot", "pronunciation": "/stɔːr/" },
  { "english": "painting", "uzbek": "rasm", "type": "ot", "pronunciation": "/ˈpeɪntɪŋ/" },
  { "english": "station", "uzbek": "vokzal, bekat", "type": "ot", "pronunciation": "/ˈsteɪʃən/" },
  { "english": "mirror", "uzbek": "oyna, ko‘zg‘u", "type": "ot", "pronunciation": "/ˈmɪrər/" },
  { "english": "shelf", "uzbek": "tokcha", "type": "ot", "pronunciation": "/ʃɛlf/" },
  { "english": "post office", "uzbek": "pochta idorasi", "type": "ot", "pronunciation": "/ˈpoʊst ˌɒfɪs/" }
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
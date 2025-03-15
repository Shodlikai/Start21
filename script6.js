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
  { "english": "wall", "uzbek": "devor", "type": "ot", "pronunciation": "/wɔːl/" },
  { "english": "great", "uzbek": "buyuk", "type": "sifat", "pronunciation": "/ɡreɪt/" },
  { "english": "high", "uzbek": "baland, yuqori", "type": "sifat", "pronunciation": "/haɪ/" },
  { "english": "famous", "uzbek": "mashhur", "type": "sifat", "pronunciation": "/ˈfeɪməs/" },
  { "english": "artist", "uzbek": "rassom", "type": "ot", "pronunciation": "/ˈɑːtɪst/" },
  { "english": "universe", "uzbek": "koinot", "type": "ot", "pronunciation": "/ˈjuːnɪvɜːs/" },
  { "english": "earth", "uzbek": "yer", "type": "ot", "pronunciation": "/ɜːθ/" },
  { "english": "planet", "uzbek": "sayyora", "type": "ot", "pronunciation": "/ˈplænɪt/" },
  { "english": "thrilling", "uzbek": "hayajonli, zavqli", "type": "sifat", "pronunciation": "/ˈθrɪlɪŋ/" },
  { "english": "chess", "uzbek": "shaxmat", "type": "ot", "pronunciation": "/ʧɛs/" },
  { "english": "continent", "uzbek": "qit'a", "type": "ot", "pronunciation": "/ˈkɒntɪnənt/" },
  { "english": "pleasant", "uzbek": "yoqimli", "type": "sifat", "pronunciation": "/ˈplɛzənt/" },
  { "english": "animal", "uzbek": "hayvon", "type": "ot", "pronunciation": "/ˈænɪməl/" },
  { "english": "cunning", "uzbek": "ayyor", "type": "sifat", "pronunciation": "/ˈkʌnɪŋ/" },
  { "english": "edition", "uzbek": "nashr", "type": "ot", "pronunciation": "/ɪˈdɪʃən/" },
  { "english": "rotten", "uzbek": "chirigan", "type": "sifat", "pronunciation": "/ˈrɒtən/" },
  { "english": "vehicle", "uzbek": "transport vositasi", "type": "ot", "pronunciation": "/ˈviːɪkl/" },
  { "english": "ring", "uzbek": "uzuk", "type": "ot", "pronunciation": "/rɪŋ/" },
  { "english": "lazy", "uzbek": "dangasa", "type": "sifat", "pronunciation": "/ˈleɪzi/" },
  { "english": "wide", "uzbek": "keng", "type": "sifat", "pronunciation": "/waɪd/" },
  { "english": "sad", "uzbek": "g‘amgin, hafa", "type": "sifat", "pronunciation": "/sæd/" },
  { "english": "deaf", "uzbek": "kar", "type": "sifat", "pronunciation": "/dɛf/" },
  { "english": "cautious", "uzbek": "ehtiyotkor", "type": "sifat", "pronunciation": "/ˈkɔːʃəs/" },
  { "english": "blind", "uzbek": "ko‘r", "type": "sifat", "pronunciation": "/blaɪnd/" },
  { "english": "grateful", "uzbek": "minnatdor, mamnun", "type": "sifat", "pronunciation": "/ˈɡreɪtfʊl/" },
  { "english": "wise", "uzbek": "dono", "type": "sifat", "pronunciation": "/waɪz/" },
  { "english": "powerful", "uzbek": "kuchli", "type": "sifat", "pronunciation": "/ˈpaʊəfʊl/" },
  { "english": "stupid", "uzbek": "ahmoq", "type": "sifat", "pronunciation": "/ˈstjuːpɪd/" },
  { "english": "mean", "uzbek": "yovuz, pastkash", "type": "sifat", "pronunciation": "/miːn/" },
  { "english": "experienced", "uzbek": "tajribali", "type": "sifat", "pronunciation": "/ɪkˈspɪərɪənst/" },
  { "english": "energetic", "uzbek": "baquvvat, serg‘ayrat", "type": "sifat", "pronunciation": "/ˌɛnəˈʤɛtɪk/" },
  { "english": "valley", "uzbek": "vodiy", "type": "ot", "pronunciation": "/ˈvæli/" },
  { "english": "grey", "uzbek": "kulrang", "type": "sifat", "pronunciation": "/ɡreɪ/" },
  { "english": "lamp", "uzbek": "chiroq", "type": "ot", "pronunciation": "/læmp/" },
  { "english": "broken", "uzbek": "sinqan, buzilgan", "type": "sifat", "pronunciation": "/ˈbrəʊkən/" },
  { "english": "scary", "uzbek": "qo‘rqinchli", "type": "sifat", "pronunciation": "/ˈskɛəri/" },
  { "english": "roof", "uzbek": "tom", "type": "ot", "pronunciation": "/ruːf/" },
  { "english": "church", "uzbek": "cherkov", "type": "ot", "pronunciation": "/ʧɜːʧ/" },
  { "english": "torn", "uzbek": "yirtilgan", "type": "sifat", "pronunciation": "/tɔːn/" },
  { "english": "handsome", "uzbek": "kelishgan (erkak uchun)", "type": "sifat", "pronunciation": "/ˈhænsəm/" },
  { "english": "plane", "uzbek": "samolyot", "type": "ot", "pronunciation": "/pleɪn/" },
  { "english": "wing", "uzbek": "qanot", "type": "ot", "pronunciation": "/wɪŋ/" },
  { "english": "slippery", "uzbek": "silliq", "type": "sifat", "pronunciation": "/ˈslɪpəri/" },
  { "english": "sky", "uzbek": "osmon", "type": "ot", "pronunciation": "/skaɪ/" },
  { "english": "blue", "uzbek": "ko'k", "type": "sifat", "pronunciation": "/bluː/" },
  { "english": "star", "uzbek": "yulduz", "type": "ot", "pronunciation": "/stɑː/" },
  { "english": "relaxing", "uzbek": "dam oluvchi", "type": "sifat", "pronunciation": "/rɪˈlæksɪŋ/" },
  { "english": "pole", "uzbek": "ustun", "type": "ot", "pronunciation": "/pəʊl/" },
  { "english": "exciting", "uzbek": "hayajonli", "type": "sifat", "pronunciation": "/ɪkˈsaɪtɪŋ/" },
  { "english": "cycling", "uzbek": "velosport", "type": "ot", "pronunciation": "/ˈsaɪklɪŋ/" }
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
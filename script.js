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
    { english: "hard working", uzbek: "tirishqoq, mehnatsevar", type: "sifat", audio: "hard_working.mp3", pronunciation: "/hɑrd ˈwɜrkɪŋ/" }, 
    { english: "clever", uzbek: "aqlli", type: "sifat", audio: "clever.mp3", pronunciation: "/ˈklevər/" }, 
    { english: "smart", uzbek: "ziyrak, uddaburon", type: "sifat", audio: "smart.mp3", pronunciation: "/smɑrt/" }, 
    { english: "silly", uzbek: "ahmoq", type: "sifat", audio: "silly.mp3", pronunciation: "/ˈsɪli/" }, 
    { english: "reliable", uzbek: "ishonchli", type: "sifat", audio: "reliable.mp3", pronunciation: "/rɪˈlaɪəbəl/" }, 
    { english: "butcher", uzbek: "qassob", type: "ot", audio: "butcher.mp3", pronunciation: "/ˈbʊtʃər/" }, 
    { english: "serious", uzbek: "jiddiy", type: "sifat", audio: "serious.mp3", pronunciation: "/ˈsɪriəs/" }, 
    { english: "beautiful", uzbek: "chiroyli", type: "sifat", audio: "beautiful.mp3", pronunciation: "/ˈbjuːtɪfəl/" }, 
    { english: "patient", uzbek: "sabrli", type: "sifat", audio: "patient.mp3", pronunciation: "/ˈpeɪʃənt/" }, 
    { english: "lucky", uzbek: "omadli", type: "sifat", audio: "lucky.mp3", pronunciation: "/ˈlʌki/" }, 
    { english: "weather", uzbek: "ob-havo", type: "ot", audio: "weather.mp3", pronunciation: "/ˈweðər/" }, 
    { english: "frozen", uzbek: "muzlagan", type: "sifat", audio: "frozen.mp3", pronunciation: "/ˈfroʊzən/" }, 
    { english: "milky", uzbek: "sutli", type: "sifat", audio: "milky.mp3", pronunciation: "/ˈmɪlki/" }, 
    { english: "mood", uzbek: "kayfiyat", type: "ot", audio: "mood.mp3", pronunciation: "/muːd/" }, 
    { english: "cold", uzbek: "sovuq", type: "sifat", audio: "cold.mp3", pronunciation: "/koʊld/" }, 
    { english: "friendly", uzbek: "do‘stona", type: "sifat", audio: "friendly.mp3", pronunciation: "/ˈfrɛndli/" }, 
    { english: "honest", uzbek: "vijdonli", type: "sifat", audio: "honest.mp3", pronunciation: "/ˈɑnɪst/" }, 
    { english: "bright", uzbek: "yorqin", type: "sifat", audio: "bright.mp3", pronunciation: "/braɪt/" }, 
    { english: "angry", uzbek: "badjahldor", type: "sifat", audio: "angry.mp3", pronunciation: "/ˈæŋɡri/" }, 
    { english: "short", uzbek: "qisqa", type: "sifat", audio: "short.mp3", pronunciation: "/ʃɔrt/" }, 
    { english: "pure", uzbek: "sof, toza", type: "sifat", audio: "pure.mp3", pronunciation: "/pjʊər/" }, 
    { english: "winner", uzbek: "g‘olib", type: "ot", audio: "winner.mp3", pronunciation: "/ˈwɪnər/" }, 
    { english: "talkative", uzbek: "sergap", type: "sifat", audio: "talkative.mp3", pronunciation: "/ˈtɔːkətɪv/" }, 
    { english: "happy", uzbek: "baxtli, xursand", type: "sifat", audio: "happy.mp3", pronunciation: "/ˈhæpi/" }, 
    { english: "interesting", uzbek: "qiziqarli", type: "sifat", audio: "interesting.mp3", pronunciation: "/ˈɪntrəstɪŋ/" }, 
    { english: "popular", uzbek: "ommabop, mashhur", type: "sifat", audio: "popular.mp3", pronunciation: "/ˈpɑːpjələr/" }, 
    { english: "windy", uzbek: "shamolli", type: "sifat", audio: "windy.mp3", pronunciation: "/ˈwɪndi/" }, 
    { english: "rainy", uzbek: "yomg‘irli", type: "sifat", audio: "rainy.mp3", pronunciation: "/ˈreɪni/" }, 
    { english: "foggy", uzbek: "tumanli", type: "sifat", audio: "foggy.mp3", pronunciation: "/ˈfɔːɡi/" }, 
    { english: "snowy", uzbek: "qorli", type: "sifat", audio: "snowy.mp3", pronunciation: "/ˈsnoʊi/" }, 
    { english: "frosty", uzbek: "ayozli", type: "sifat", audio: "frosty.mp3", pronunciation: "/ˈfrɔːsti/" }, 
    { english: "cloudy", uzbek: "bulutli", type: "sifat", audio: "cloudy.mp3", pronunciation: "/ˈklaʊdi/" }, 
    { english: "damp", uzbek: "nam", type: "sifat", audio: "damp.mp3", pronunciation: "/dæmp/" }, 
    { english: "stormy", uzbek: "bo‘ronli", type: "sifat", audio: "stormy.mp3", pronunciation: "/ˈstɔːrmi/" }, 
    { english: "sunny", uzbek: "quyoshli", type: "sifat", audio: "sunny.mp3", pronunciation: "/ˈsʌni/" }, 
    { english: "breezy", uzbek: "shabadali", type: "sifat", audio: "breezy.mp3", pronunciation: "/ˈbriːzi/" }, 
    { english: "prime minister", uzbek: "bosh vazir", type: "ot", audio: "prime_minister.mp3", pronunciation: "/praɪm ˈmɪnɪstər/" }, 
    { english: "neighbor", uzbek: "qo‘shni", type: "ot", audio: "neighbor.mp3", pronunciation: "/ˈneɪbər/" }, 
    { english: "seller", uzbek: "sotuvchi", type: "ot", audio: "seller.mp3", pronunciation: "/ˈsɛlər/" }, 
    { english: "wedding", uzbek: "to‘y", type: "ot", audio: "wedding.mp3", pronunciation: "/ˈwɛdɪŋ/" }, 
    { english: "meeting", uzbek: "uchrashuv", type: "ot", audio: "meeting.mp3", pronunciation: "/ˈmiːtɪŋ/" }, 
    { english: "grave", uzbek: "qabr", type: "ot", audio: "grave.mp3", pronunciation: "/ɡreɪv/" }, 
    { english: "cobbler", uzbek: "kosib", type: "ot", audio: "cobbler.mp3", pronunciation: "/ˈkɒblər/" }, 
    { english: "turtle", uzbek: "toshbaqa", type: "ot", audio: "turtle.mp3", pronunciation: "/ˈtɜːrtəl/" }, 
    { english: "hairdresser", uzbek: "sartarosh", type: "ot", audio: "hairdresser.mp3", pronunciation: "/ˈherˌdrɛsər/" }
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


// **Ilk so‘zni ekranga chiqarish**
updateCard(0);
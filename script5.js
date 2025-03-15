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
    { english: "Bodyguard", uzbek: "Tanosuvchi", type: "ot", audio: "bodyguard.mp3", pronunciation: "/ˈbɒdɪɡɑːd/" },
    { english: "Tall", uzbek: "Novcha, baland bo‘yli", type: "sifat", audio: "tall.mp3", pronunciation: "/tɔːl/" },
    { english: "Princess", uzbek: "Malika", type: "ot", audio: "princess.mp3", pronunciation: "/ˈprɪnsɛs/" },
    { english: "Strong", uzbek: "Kuchli", type: "sifat", audio: "strong.mp3", pronunciation: "/strɒŋ/" },
    { english: "Bread", uzbek: "Non", type: "ot", audio: "bread.mp3", pronunciation: "/brɛd/" },
    { english: "Water", uzbek: "Suv", type: "ot", audio: "water.mp3", pronunciation: "/ˈwɔːtər/" },
    { english: "Cheap", uzbek: "Arzon", type: "sifat", audio: "cheap.mp3", pronunciation: "/tʃiːp/" },
    { english: "Cheese", uzbek: "Pishloq", type: "ot", audio: "cheese.mp3", pronunciation: "/tʃiːz/" },
    { english: "Salt", uzbek: "Tuz", type: "ot", audio: "salt.mp3", pronunciation: "/sɔːlt/" },
    { english: "Sugar", uzbek: "Shakar", type: "ot", audio: "sugar.mp3", pronunciation: "/ˈʃʊɡər/" },
    { english: "Co-worker", uzbek: "Hamkasb", type: "ot", audio: "co_worker.mp3", pronunciation: "/ˌkoʊˈwɜrkər/" },
    { english: "Breakfast", uzbek: "Nonushta", type: "ot", audio: "breakfast.mp3", pronunciation: "/ˈbrɛkfəst/" },
    { english: "Lunch", uzbek: "Tushlik", type: "ot", audio: "lunch.mp3", pronunciation: "/lʌntʃ/" },
    { english: "Delicious", uzbek: "Mazali", type: "sifat", audio: "delicious.mp3", pronunciation: "/dɪˈlɪʃəs/" },
    { english: "Dinner", uzbek: "Kechki ovqat", type: "ot", audio: "dinner.mp3", pronunciation: "/ˈdɪnər/" },
    { english: "Annual", uzbek: "Yillik", type: "sifat", audio: "annual.mp3", pronunciation: "/ˈænjuəl/" },
    { english: "Brunch", uzbek: "O‘rta ovqat (nonushta va tushlik orasidagi taom)", type: "ot", audio: "brunch.mp3", pronunciation: "/brʌntʃ/" },
    { english: "Supper", uzbek: "Kechki ovqat", type: "ot", audio: "supper.mp3", pronunciation: "/ˈsʌpər/" },
    { english: "Author", uzbek: "Muallif", type: "ot", audio: "author.mp3", pronunciation: "/ˈɔːθər/" },
    { english: "Outgoing", uzbek: "Kirishimli, chiqishuvchan", type: "sifat", audio: "outgoing.mp3", pronunciation: "/ˈaʊtˌɡoʊɪŋ/" },
    { english: "Patient", uzbek: "Bemor", type: "ot", audio: "patient.mp3", pronunciation: "/ˈpeɪʃənt/" },
    { english: "Old", uzbek: "Eski", type: "sifat", audio: "old.mp3", pronunciation: "/oʊld/" }, 
    { english: "Dentist", uzbek: "Tish shifokori", type: "ot", audio: "dentist.mp3", pronunciation: "/ˈdɛntɪst/" },
    { english: "Scientist", uzbek: "Olim", type: "ot", audio: "scientist.mp3", pronunciation: "/ˈsaɪəntɪst/" },
    { english: "Banker", uzbek: "Bankir", type: "ot", audio: "banker.mp3", pronunciation: "/ˈbæŋkər/" },
    { english: "Gypsy", uzbek: "Lo‘li", type: "ot", audio: "gypsy.mp3", pronunciation: "/ˈʤɪpsi/" },
    { english: "Team", uzbek: "Jamoa", type: "ot", audio: "team.mp3", pronunciation: "/tiːm/" },
    { english: "Big", uzbek: "Katta", type: "sifat", audio: "big.mp3", pronunciation: "/bɪɡ/" },
    { english: "Parliament", uzbek: "Parlament", type: "ot", audio: "parliament.mp3", pronunciation: "/ˈpɑːləmənt/" },
    { english: "Businessman", uzbek: "Tadbirkor", type: "ot", audio: "businessman.mp3", pronunciation: "/ˈbɪznɪsmən/" },
    { english: "Chef", uzbek: "Oshpaz", type: "ot", audio: "chef.mp3", pronunciation: "/ʃɛf/" },
    { english: "Earthquake", uzbek: "Zilzila", type: "ot", audio: "earthquake.mp3", pronunciation: "/ˈɜːrθkweɪk/" },
    { english: "Architect", uzbek: "Arxitektor", type: "ot", audio: "architect.mp3", pronunciation: "/ˈɑːrkɪtɛkt/" },
    { english: "Accountant", uzbek: "Hisobchi, buxgalter", type: "ot", audio: "accountant.mp3", pronunciation: "/əˈkaʊntənt/" },
    { english: "Heir", uzbek: "Voris", type: "ot", audio: "heir.mp3", pronunciation: "/ɛr/" },
    { english: "Address", uzbek: "Manzil", type: "ot", audio: "address.mp3", pronunciation: "/əˈdrɛs/" },
    { english: "Umbrella", uzbek: "Soyabon", type: "ot", audio: "umbrella.mp3", pronunciation: "/ʌmˈbrɛlə/" },
    { english: "MP (Members of Parliament)", uzbek: "Parlament a’zosi", type: "ot", audio: "mp.mp3", pronunciation: "/ɛmˈpiː/" },
    { english: "Actor", uzbek: "Aktor", type: "ot", audio: "actor.mp3", pronunciation: "/ˈæktər/" },
    { english: "Actress", uzbek: "Aktrisa", type: "ot", audio: "actress.mp3", pronunciation: "/ˈæktrɪs/" },
    { english: "Wife", uzbek: "Xotin", type: "ot", audio: "wife.mp3", pronunciation: "/waɪf/" },
    { english: "Economist", uzbek: "Iqtisodchi", type: "ot", audio: "economist.mp3", pronunciation: "/ɪˈkɒnəmɪst/" },
    { english: "VIP (Very Important Person)", uzbek: "Juda muhim shaxs", type: "ot", audio: "vip.mp3", pronunciation: "/ˌviː.aɪˈpiː/" },
    { english: "Man", uzbek: "Kishi (erkak)", type: "ot", audio: "man.mp3", pronunciation: "/mæn/" },
    { english: "Editor", uzbek: "Muharrir", type: "ot", audio: "editor.mp3", pronunciation: "/ˈɛdɪtər/" },
    { english: "Electrician", uzbek: "Elektrchi, elektrik", type: "ot", audio: "electrician.mp3", pronunciation: "/ɪˌlɛkˈtrɪʃən/" },
    { english: "City", uzbek: "Shahar", type: "ot", audio: "city.mp3", pronunciation: "/ˈsɪti/" }, 
    { english: "Doctor", uzbek: "Shifokor", type: "ot", audio: "doctor.mp3", pronunciation: "/ˈdɒktər/" },
    { english: "Pilot", uzbek: "Uchuvchi", type: "ot", audio: "pilot.mp3", pronunciation: "/ˈpaɪlət/" },
    { english: "Nurse", uzbek: "Hamshira", type: "ot", audio: "nurse.mp3", pronunciation: "/nɜːrs/" }
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
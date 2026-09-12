// Variabel untuk menyimpan data pengguna
let userGender = "";
let userNeed = "";

// Data Pengetahuan Pakar (Knowledge Base)
const productRecommendations = {
    skincare: {
        kering: [
            "Cleanser: Gunakan pembersih wajah bertekstur krim atau lotion yang tidak berbusa banyak (Gentle Cleanser).",
            "Toner: Pilih Hydrating Toner dengan kandungan Hyaluronic Acid atau Glycerin.",
            "Moisturizer: Gunakan pelembap bertekstur krim tebal (mengandung Ceramide).",
            "Sunscreen: Pilih sunscreen dengan hasil akhir dewy atau melembapkan."
        ],
        kombinasi: [
            "Cleanser: Gunakan pembersih wajah gel yang gentle.",
            "Toner: Gunakan Hydrating Toner di area pipi, dan BHA Toner di area T-Zone (dahi, hidung, dagu).",
            "Moisturizer: Gunakan pelembap bertekstur lotion atau gel-cream yang ringan.",
            "Sunscreen: Pilih sunscreen bertekstur gel atau cair."
        ],
        berminyak: [
            "Cleanser: Gunakan pembersih wajah bertekstur gel (kandungan Salicylic Acid bagus untuk mengontrol minyak).",
            "Toner: Gunakan Exfoliating Toner ringan atau toner penyeimbang sebum.",
            "Moisturizer: Wajib gunakan pelembap, pilih yang bertekstur gel ringan (Oil-free/Non-comedogenic).",
            "Sunscreen: Pilih sunscreen dengan hasil akhir matte."
        ]
    },
    makeup: {
        kering: [
            "Primer: Gunakan Hydrating Primer agar makeup tidak *crack* atau pecah.",
            "Complexion: Pilih Foundation/Cushion dengan hasil akhir Dewy atau Radiant.",
            "Blush/Contour: Sangat disarankan menggunakan tekstur Cream atau Liquid.",
            "Setting: Gunakan Hydrating Setting Spray. Hindari bedak tabur (powder) berlebih."
        ],
        kombinasi: [
            "Primer: Gunakan Mattifying/Pore-blurring primer HANYA di area T-Zone, dan Hydrating primer di area pipi.",
            "Complexion: Pilih Foundation dengan hasil akhir Satin atau Natural (Semi-matte).",
            "Setting: Aplikasikan bedak tabur tipis (baking) hanya pada area yang mudah berminyak (T-Zone)."
        ],
        berminyak: [
            "Primer: Gunakan Mattifying Primer atau Pore-blurring primer di seluruh wajah.",
            "Complexion: Pilih Foundation/Cushion dengan hasil akhir Matte dan Oil-Control.",
            "Blush/Contour: Disarankan menggunakan tekstur Powder (Bedak) agar lebih tahan lama.",
            "Setting: Set seluruh wajah dengan Translucent Setting Powder dan kunci dengan Matte Setting Spray."
        ]
    }
};

// Fungsi Navigasi
function hide(id) { document.getElementById(id).classList.add('hidden'); }
function show(id) { document.getElementById(id).classList.remove('hidden'); }

// Alur 1: Pilih Gender
function setGender(gender) {
    userGender = gender;
    hide('section-gender');

    if (gender === 'laki-laki') {
        userNeed = 'skincare'; // Laki-laki otomatis ke skincare
        show('section-assessment');
    } else {
        show('section-need'); // Perempuan diarahkan ke pilihan makeup/skincare
    }
}

// Alur 2: Pilih Kebutuhan (Khusus Perempuan)
function setNeed(need) {
    userNeed = need;
    hide('section-need');
    show('section-assessment');
}

// Alur 3: Hitung Kondisi Kulit
function calculateSkinType() {
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');

    if (!q1 || !q2) {
        alert("Harap jawab semua pertanyaan terlebih dahulu!");
        return;
    }

    // Kalkulasi sederhana ala Certainty Factor / Forward Chaining
    // 1 = Kering, 2 = Kombinasi, 3 = Berminyak
    const score = parseInt(q1.value) + parseInt(q2.value);
    let skinType = "";

    if (score <= 2) {
        skinType = "kering";
    } else if (score >= 3 && score <= 4) {
        skinType = "kombinasi";
    } else {
        skinType = "berminyak";
    }

    displayResult(skinType);
}

// Alur 4: Tampilkan Hasil
function displayResult(skinType) {
    hide('section-assessment');
    show('section-result');

    // Isi Teks Hasil
    document.getElementById('res-skin-type').innerText = skinType;
    document.getElementById('res-need').innerText = userNeed;

    // Ambil data rekomendasi dari Knowledge Base
    const products = productRecommendations[userNeed][skinType];
    const ul = document.getElementById('res-products');
    ul.innerHTML = ""; // Bersihkan list sebelumnya

    products.forEach(item => {
        let li = document.createElement('li');
        li.style.marginBottom = "8px";
        li.innerText = item;
        ul.appendChild(li);
    });
}
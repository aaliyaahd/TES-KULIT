let userGender = "";
let userNeed = "";
let finalSkinType = "";

// Knowledge Base
const productRecommendations = {
    skincare: {
        kering: [
            "Cleanser: Gunakan Gentle Cleanser (krim/lotion) yang tidak berbusa banyak dan hindari scrub kasar.",
            "Toner: Wajib pakai Hydrating Toner (Glycerin, Hyaluronic Acid) hingga 2-3 layer.",
            "Serum: Pilih serum melembapkan atau anti-aging yang kaya akan Ceramide.",
            "Moisturizer: Gunakan pelembap bertekstur krim tebal untuk mengunci air di kulit.",
            "Sunscreen: Pilih sunscreen dengan hasil akhir dewy/glowing."
        ],
        kombinasi: [
            "Cleanser: Gunakan pembersih wajah gel yang gentle (pH balance).",
            "Toner: Aplikasikan Hydrating Toner di pipi, dan BHA Exfoliating Toner tipis di area T-Zone.",
            "Serum: Niacinamide sangat bagus untuk menyeimbangkan produksi sebum tanpa mengeringkan.",
            "Moisturizer: Gunakan pelembap bertekstur gel-lotion yang ringan namun tetap menghidrasi.",
            "Sunscreen: Pilih sunscreen bertekstur lotion atau cair (water-based)."
        ],
        berminyak: [
            "Cleanser: Gunakan facial wash gel dengan kandungan Salicylic Acid/Tea Tree.",
            "Toner: Rutin gunakan Exfoliating Toner (BHA/AHA) 2-3 kali seminggu untuk membersihkan pori.",
            "Serum: Hindari serum berbahan dasar minyak (oil-based). Gunakan serum pengontrol sebum.",
            "Moisturizer: Wajib pakai pelembap! Pilih tekstur watery-gel ringan (Oil-free/Non-comedogenic).",
            "Sunscreen: Gunakan sunscreen dengan hasil akhir matte agar tidak kusam di siang hari."
        ]
    },
    makeup: {
        kering: [
            "Primer: Gunakan Hydrating Primer berbahan dasar air/silikon ringan agar makeup tidak crack.",
            "Complexion: Pilih Foundation/Cushion dengan hasil akhir Dewy atau Radiant.",
            "Blush/Contour: Gunakan tekstur Cream/Liquid (cair) agar menyatu dengan kulit dan tampak natural.",
            "Setting: Semprotkan Hydrating Setting Spray. Hindari pemakaian bedak tabur tebal."
        ],
        kombinasi: [
            "Primer: Gunakan Pore-blurring primer HANYA di area T-Zone (hidung, dahi), dan Hydrating primer di pipi.",
            "Complexion: Pilih Foundation dengan hasil akhir Satin atau Semi-matte.",
            "Setting: Lakukan teknik 'baking' dengan bedak tabur tipis hanya pada area yang mudah berminyak."
        ],
        berminyak: [
            "Primer: Wajib gunakan Mattifying Primer atau Pore-blurring primer di seluruh wajah.",
            "Complexion: Pilih Foundation/Cushion dengan formula Matte dan Full Oil-Control.",
            "Blush/Contour: Sangat disarankan menggunakan tekstur Powder (Bedak) agar tidak mudah bergeser.",
            "Setting: Set seluruh wajah dengan Translucent Setting Powder, lalu kunci dengan Matte Setting Spray."
        ]
    }
};

// Fungsi Utility Navigasi
function hide(id) { document.getElementById(id).classList.add('hidden'); }
function show(id) { document.getElementById(id).classList.remove('hidden'); }

// Alur 1: Gender
function setGender(gender) {
    userGender = gender;
    hide('section-gender');

    if (gender === 'laki-laki') {
        userNeed = 'skincare'; // Otomatis ke skincare
        show('section-assessment');
    } else {
        show('section-need'); // Perempuan diarahkan ke pilihan
    }
}

// Alur 2: Kebutuhan
function setNeed(need) {
    userNeed = need;
    hide('section-need');
    show('section-assessment');
}

// Alur 3: Hitung Nilai dari 10 Pertanyaan
function calculateSkinType() {
    let totalScore = 0;
    let answered = 0;

    // Loop 10 pertanyaan
    for (let i = 1; i <= 10; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer) {
            totalScore += parseInt(answer.value);
            answered++;
        }
    }

    if (answered < 10) {
        alert("Harap jawab ke-10 pertanyaan agar hasil diagnosis akurat!");
        return;
    }

    // Sistem Forward Chaining & CF (Skor 10-30)
    // Jawaban A=1 (Kering), B=2 (Kombinasi), C=3 (Berminyak)
    // Total 10-16 = Kering, 17-23 = Kombinasi, 24-30 = Berminyak
    
    if (totalScore <= 16) {
        finalSkinType = "kering";
    } else if (totalScore >= 17 && totalScore <= 23) {
        finalSkinType = "kombinasi";
    } else {
        finalSkinType = "berminyak";
    }

    displayDiagnosis();
}

// Alur 4: Tampilkan Diagnosis Saja (Tanya Rekomendasi)
function displayDiagnosis() {
    hide('section-assessment');
    show('section-diagnosis');

    document.getElementById('diagnosis-skin-type').innerText = finalSkinType;
    document.getElementById('diagnosis-need').innerText = userNeed;
}

// Alur 5: Jika "Ya", Tampilkan Daftar Produk
function showRecommendations() {
    hide('section-diagnosis');
    show('section-recommendation');

    document.getElementById('res-need-title').innerText = userNeed;

    const products = productRecommendations[userNeed][finalSkinType];
    const ul = document.getElementById('res-products');
    ul.innerHTML = ""; 

    products.forEach(item => {
        let li = document.createElement('li');
        li.innerText = item;
        ul.appendChild(li);
    });
}

// Alur 6: Jika "Tidak", Tampilkan Penutup Estetik
function showClosing() {
    hide('section-diagnosis');
    show('section-closing');
}
let chartInstance = null;

// Format titik Rupiah otomatis saat mengetik nominal budget
const inputBudget = document.getElementById("inputBudget");
inputBudget.addEventListener("input", (e) => {
    const angka = e.target.value.replace(/\D/g, "");
    e.target.value = angka ? Number(angka).toLocaleString("id-ID") : "";
});

// --- 1. Logika Simulasi Perencanaan Anggaran ---
document.getElementById("formEstimasi").addEventListener("submit", (e) => {
    e.preventDefault();

    const alertBox = document.getElementById("estimasiAlert");
    const hasilKosong = document.getElementById("hasilKosong");
    const hasilLoading = document.getElementById("hasilLoading");
    const hasilKonten = document.getElementById("hasilKonten");

    const rawBudget = Number(inputBudget.value.replace(/\D/g, ""));
    const luas = Number(document.getElementById("inputLuas").value) || 45;
    const lantai = document.getElementById("inputLantai").value;
    const kualitas = document.getElementById("inputKualitas").value;

    alertBox.classList.add("d-none");

    // Validasi input kosong atau terlalu kecil
    if (!rawBudget || rawBudget < 25000000) {
        alertBox.textContent = "Masukkan nominal anggaran yang valid (minimal Rp25.000.000).";
        alertBox.classList.remove("d-none");
        return;
    }

    hasilKosong.classList.add("d-none");
    hasilKonten.classList.add("d-none");
    hasilLoading.classList.remove("d-none");

    // Simulasi jeda perhitungan sebelum digabung ke API ML & Gemini di Minggu ke-3
    setTimeout(() => {
        const alokasi = [
            { komponen: "Persiapan & Pondasi", persentase: 15, nominal: Math.round(rawBudget * 0.15) },
            { komponen: "Struktur (Beton & Dinding)", persentase: 35, nominal: Math.round(rawBudget * 0.35) },
            { komponen: "Arsitektur, Atap & Finishing", persentase: 35, nominal: Math.round(rawBudget * 0.35) },
            { komponen: "Mekanikal, Elektrikal & Plumbing", persentase: 10, nominal: Math.round(rawBudget * 0.10) },
            { komponen: "Biaya Cadangan / Tak Terduga", persentase: 5, nominal: Math.round(rawBudget * 0.05) }
        ];

        // Tampilkan daftar pembagian biaya secara vertikal
        const listEl = document.getElementById("listAlokasi");
        listEl.innerHTML = alokasi.map(item => `
            <div class="d-flex justify-content-between align-items-center py-2 border-bottom border-light border-opacity-25 small">
                <span>${item.komponen} (${item.persentase}%)</span>
                <strong class="text-warning">Rp${item.nominal.toLocaleString("id-ID")}</strong>
            </div>
        `).join("");

        // Render grafik donut
        const ctx = document.getElementById("chartAnggaran").getContext("2d");
        if (chartInstance) chartInstance.destroy();
        chartInstance = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: alokasi.map(a => a.komponen),
                datasets: [{
                    data: alokasi.map(a => a.persentase),
                    backgroundColor: ["#FFC600", "#38BDF8", "#34D399", "#FB923C", "#CBD5E1"],
                    borderWidth: 0
                }]
            },
            options: {
                plugins: { legend: { display: false } }
            }
        });

        // Teks penjelasan simulasi
        document.getElementById("teksPenjelasanAI").textContent =
            `Dengan anggaran Rp${rawBudget.toLocaleString("id-ID")} untuk rencana luas ${luas} m² (${lantai} lantai, material ${kualitas}), porsi terbesar diarahkan pada struktur dan finishing agar rumah kokoh dan rapi. Hasil ini adalah gambaran awal sebelum penyusunan RAB resmi bersama Pak Arpi.`;

        // Otomatis isi pesan WhatsApp sesuai budget yang dihitung
        const pesanWa = encodeURIComponent(
            `Halo Pak Arpi, saya baru mencoba simulasi anggaran di website Marga Kontraktor dengan budget Rp${rawBudget.toLocaleString("id-ID")} (${luas} m², ${lantai} lantai). Saya ingin berkonsultasi lebih lanjut.`
        );
        document.getElementById("btnWaHasil").href = `https://wa.me/6287736467413?text=${pesanWa}`;

        hasilLoading.classList.add("d-none");
        hasilKonten.classList.remove("d-none");
    }, 450);
});

// --- 2. Logika Formulir Konsultasi ---
document.getElementById("formKonsultasi").addEventListener("submit", (e) => {
    e.preventDefault();

    const alertEl = document.getElementById("konsulAlert");
    const nama = document.getElementById("konsulNama").value.trim();
    const wa = document.getElementById("konsulWa").value.trim();
    const pesan = document.getElementById("konsulPesan").value.trim();

    alertEl.className = "alert small py-2 mt-3 mb-0";

    if (!nama || !wa || !pesan) {
        alertEl.classList.add("alert-danger");
        alertEl.textContent = "Mohon lengkapi nama, nomor WhatsApp, dan kebutuhan Anda terlebih dahulu.";
        return;
    }

    alertEl.classList.add("alert-success");
    alertEl.textContent = `Terima kasih, ${nama}! Permintaan konsultasi Anda sudah tercatat.`;
    e.target.reset();
});

// --- 3. Logika Widget Chatbot AI (Mode Front-End Murni) ---
const chatBox = document.getElementById("chatBox");
const chatMessages = document.getElementById("chatMessages");
const inputChat = document.getElementById("inputChat");

const toggleChat = () => {
    chatBox.classList.toggle("d-none");
    if (!chatBox.classList.contains("d-none")) {
        inputChat.focus();
    }
};

document.getElementById("btnToggleChat").addEventListener("click", toggleChat);
document.getElementById("btnOpenChatMobile").addEventListener("click", toggleChat);
document.getElementById("btnCloseChat").addEventListener("click", toggleChat);

function appendBubble(text, sender) {
    const div = document.createElement("div");
    div.className = `chat-bubble ${sender}`;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function balasPertanyaanSimulasi(pertanyaan) {
    const t = pertanyaan.toLowerCase();

    if (t.includes("layanan") || t.includes("jasa") || t.includes("desain") || t.includes("bangun")) {
        return "Marga Kontraktor melayani 4 layanan utama: konsultasi konsep desain, pembuatan gambar teknis & struktur, penyusunan RAB transparan, serta pelaksanaan pembangunan rumah tinggal.";
    }
    if (t.includes("budget") || t.includes("biaya") || t.includes("harga") || t.includes("rab") || t.includes("estimasi")) {
        return "Anda bisa langsung mencoba fitur Simulasi Perencanaan Anggaran di halaman ini untuk mendapatkan gambaran awal pembagian biaya. Untuk RAB final yang rinci, silakan konsultasi langsung dengan Pak Arpi.";
    }
    if (t.includes("progres") || t.includes("laporan") || t.includes("pantau") || t.includes("alur")) {
        return "Selama pembangunan berjalan, Marga Kontraktor rutin mengirimkan laporan progres mingguan yang berisi perkembangan pekerjaan, dokumentasi foto lapangan, dan rincian penggunaan biaya.";
    }
    if (t.includes("kontak") || t.includes("wa") || t.includes("whatsapp") || t.includes("arpi") || t.includes("hubungi")) {
        return "Anda dapat menghubungi Bapak Arpi Setiawan langsung melalui WhatsApp di +62 877-3646-7413 atau melalui Formulir Konsultasi di bagian bawah halaman ini.";
    }

    // Penolakan sopan untuk pertanyaan di luar cakupan layanan Marga Kontraktor
    return "Maaf, saya hanya dapat membantu pertanyaan seputar layanan desain, penyusunan RAB, dan pembangunan rumah di Marga Kontraktor. Untuk pembahasan lebih lanjut, silakan hubungi Pak Arpi langsung via WhatsApp di +62 877-3646-7413.";
}

function kirimPesanChat(teks) {
    const pesanBersih = teks.trim();
    if (!pesanBersih) return;

    appendBubble(pesanBersih, "user");
    inputChat.value = "";

    setTimeout(() => {
        const balasan = balasPertanyaanSimulasi(pesanBersih);
        appendBubble(balasan, "bot");
    }, 350);
}

document.getElementById("formChat").addEventListener("submit", (e) => {
    e.preventDefault();
    kirimPesanChat(inputChat.value);
});

// Event untuk tombol pertanyaan cepat
document.querySelectorAll(".chat-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
        kirimPesanChat(chip.getAttribute("data-question"));
    });
});
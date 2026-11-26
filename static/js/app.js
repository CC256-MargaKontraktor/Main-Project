let chartInstance = null;

// --- 1. Tab Perbandingan Desain 3D vs Realisasi (Aktif di index.html) ---
const compareTabs = document.querySelectorAll(".btn-compare-tab");
const compareBeforeImg = document.getElementById("compareBeforeImg");
const compareAfterImg = document.getElementById("compareAfterImg");

if (compareTabs.length > 0 && compareBeforeImg && compareAfterImg) {
    const dataPerbandingan = {
        "proyek-2": {
            before: "static/img/proyek-2/3d-fasad.webp",
            after: "static/img/proyek-2/finishing-fasad.webp",
            afterPos: "center 48%",
            trimBefore: false,
            judul: "Rumah 2 Lantai Modern Industrial",
            desc: "Fasad monokrom gelap, plafon motif kayu, dinding roster, pilar batu alam, dan bukaan bulat pagar depan sesuai rancangan 3D.",
            link: "portofolio.html?proyek=proyek-2"
        },
        "proyek-1": {
            before: "static/img/proyek-1/3d-fasad.webp",
            after: "static/img/proyek-1/finishing-fasad.webp",
            afterPos: "center 42%",
            trimBefore: true,
            judul: "Hunian 1 Lantai + Mezzanine",
            desc: "Menara roster, plafon motif kayu dengan lampu warm white, hingga jendela bulat terealisasi persis mengikuti desain 3D.",
            link: "portofolio.html?proyek=proyek-1"
        }
    };

    compareTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const item = dataPerbandingan[tab.dataset.compareTarget];
            if (!item) return;

            compareTabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");

            compareBeforeImg.src = item.before;
            compareBeforeImg.classList.toggle("trim-edge", item.trimBefore);
            compareAfterImg.src = item.after;
            compareAfterImg.style.objectPosition = item.afterPos;

            document.getElementById("compareTitle").textContent = item.judul;
            document.getElementById("compareDesc").textContent = item.desc;
            document.getElementById("compareLink").href = item.link;
        });
    });
}

// --- 2. Logika Filter, Galeri Slider & Modal Portofolio (Aktif di portofolio.html) ---
const portfolioGrid = document.getElementById("portfolioGrid");
const carouselEl = document.getElementById("carouselProyek");

if (portfolioGrid && carouselEl) {
    const galeriProyek = {
        "proyek-1": [
            {
                src: "static/img/proyek-1/3d-fasad.webp",
                tahap: "Desain 3D",
                ket: "Visualisasi 3D fasad depan dengan jendela bulat dan menara roster."
            },
            {
                src: "static/img/proyek-1/3d-interior.webp",
                tahap: "Desain 3D",
                ket: "Visualisasi 3D ruang dalam, taman tengah, dan tangga putar."
            },
            {
                src: "static/img/proyek-1/finishing-fasad.webp",
                tahap: "Tahap Finishing",
                ket: "Realisasi fasad depan malam hari sesuai konsep desain 3D."
            },
            {
                src: "static/img/proyek-1/finishing-courtyard-malam.webp",
                tahap: "Tahap Finishing",
                ket: "Realisasi taman dalam, pintu kaca lipat, dan tangga putar ke mezzanine."
            },
            {
                src: "static/img/proyek-1/finishing-courtyard-siang.webp",
                tahap: "Tahap Finishing",
                ket: "Tampilan siang area bukaan pintu kaca dan dinding courtyard."
            },
            {
                src: "static/img/proyek-1/progres-depan.webp",
                tahap: "Progres Lapangan",
                ket: "Dokumentasi pengerjaan struktur dinding dan fasad depan."
            },
            {
                src: "static/img/proyek-1/progres-dalam.webp",
                tahap: "Progres Lapangan",
                ket: "Dokumentasi pekerjaan struktur ruang dalam oleh tim teknis."
            }
        ],
        "proyek-2": [
            {
                src: "static/img/proyek-2/3d-fasad.webp",
                tahap: "Desain 3D",
                ket: "Visualisasi 3D rumah 2 lantai modern industrial dengan aksen kayu dan tanaman balkon."
            },
            {
                src: "static/img/proyek-2/finishing-fasad.webp",
                tahap: "Tahap Finishing",
                ket: "Realisasi fasad 2 lantai lengkap dengan roster, pilar batu alam, plafon kayu, dan bukaan bulat."
            },
            {
                src: "static/img/proyek-2/progres-struktur.webp",
                tahap: "Progres Lapangan",
                ket: "Tahap pekerjaan struktur beton bertulang dan pasangan dinding bata 2 lantai."
            },
            {
                src: "static/img/proyek-2/progres-pengecoran.webp",
                tahap: "Progres Lapangan",
                ket: "Proses pengecoran dak lantai 2 menggunakan pompa beton (concrete pump)."
            }
        ],
        "proyek-3": [
            {
                src: "static/img/proyek-3/hasil-utama.webp",
                tahap: "Hasil Akhir",
                ket: "Hasil renovasi eksterior 2 lantai lengkap dengan railing balkon, pilar batu alam, teras, dan taman depan."
            },
            {
                src: "static/img/proyek-3/hasil-carport.webp",
                tahap: "Hasil Akhir",
                ket: "Detail finishing pilar batu alam hitam, pola keramik carport, dan teras depan."
            },
            {
                src: "static/img/proyek-3/hasil-railing.webp",
                tahap: "Hasil Akhir",
                ket: "Detail pemasangan railing balkon besi minimalis hitam di lantai 2."
            },
            {
                src: "static/img/proyek-3/progres-carport.webp",
                tahap: "Progres Lapangan",
                ket: "Dokumentasi pengerjaan struktur kanopi carport dan pemasangan batu alam pada pilar."
            },
            {
                src: "static/img/proyek-3/progres-teras.webp",
                tahap: "Progres Lapangan",
                ket: "Tahap pemasangan keramik teras dan persiapan lahan sebelum penataan taman depan."
            }
        ],
        "proyek-4": [
            {
                src: "static/img/proyek-4/finishing-fasad.webp",
                tahap: "Tahap Finishing",
                ket: "Tampak fasad modern minimalis 2 lantai + semi-basement dengan kombinasi panel motif garis vertikal dan aksen gelap."
            },
            {
                src: "static/img/proyek-4/finishing-penuh.webp",
                tahap: "Tahap Finishing",
                ket: "Tampak penuh bangunan hingga atap miring dengan bukaan kaca atas (clerestory) untuk pencahayaan alami."
            },
            {
                src: "static/img/proyek-4/detail-batu-alam.webp",
                tahap: "Detail Material",
                ket: "Detail pemasangan batu alam hitam bertekstur pada dinding depan dipadukan panel vertikal abu-abu."
            },
            {
                src: "static/img/proyek-4/detail-tangga-masuk.webp",
                tahap: "Detail Arsitektur",
                ket: "Area tangga akses masuk dari carport semi-basement menuju lantai utama dengan desain geometris bersih."
            },
            {
                src: "static/img/proyek-4/progres-fasad.webp",
                tahap: "Progres Lapangan",
                ket: "Dokumentasi pengerjaan struktur dinding bata ringan dan penyelesaian fasad bangunan."
            }
        ],
        "proyek-5": [
            {
                src: "static/img/proyek-5/finishing-fasad.webp",
                tahap: "Tahap Finishing",
                ket: "Tampak fasad rumah 2 lantai dengan dinding batu alam abu-abu, plafon motif kayu, pencahayaan downlight, dan bukaan jendela lebar."
            },
            {
                src: "static/img/proyek-5/finishing-kanopi.webp",
                tahap: "Tahap Finishing",
                ket: "Detail kanopi carport dengan bukaan skylight pencahayaan alami, pilar batu alam, dan pintu kayu utama."
            },
            {
                src: "static/img/proyek-5/progres-pengukuran.webp",
                tahap: "Progres Lapangan",
                ket: "Pengecekan presisi ukuran di lapangan bersama tim teknis mengacu pada gambar kerja."
            },
            {
                src: "static/img/proyek-5/progres-rangka.webp",
                tahap: "Progres Lapangan",
                ket: "Tahap pemasangan rangka plafon kanopi, profil batu alam fasad, dan penyelesaian area balkon lantai 2."
            },
            {
                src: "static/img/proyek-5/progres-struktur.webp",
                tahap: "Progres Lapangan",
                ket: "Tahap awal struktur dak beton carport, plesteran dinding fasad, dan pemasangan kusen pintu utama."
            }
        ],
        "proyek-6": [
            {
                src: "static/img/proyek-6/hasil-carport.webp",
                tahap: "Hasil Akhir",
                ket: "Carport dak beton luas dengan 6 pilar batu alam, plafon skylight 4 kotak, lampu downlight, dan balkon lantai 2."
            },
            {
                src: "static/img/proyek-6/hasil-tampak-depan.webp",
                tahap: "Hasil Akhir",
                ket: "Tampak depan menyeluruh memperlihatkan pola keramik carport diagonal, railing besi cokelat, dan fasad 2 lantai."
            },
            {
                src: "static/img/proyek-6/detail-pilar-skylight.webp",
                tahap: "Detail Finishing",
                ket: "Detail kerapian pemasangan batu alam pada deretan pilar, dinding batu sikat abu-abu, dan lisplang cokelat."
            },
            {
                src: "static/img/proyek-6/detail-balkon-kanopi.webp",
                tahap: "Detail Finishing",
                ket: "Area balkon lantai 2 dilengkapi kanopi kaca rangka besi cokelat, lampu dinding, dan aksen dinding batu alam."
            },
            {
                src: "static/img/proyek-6/progres-kanopi.webp",
                tahap: "Progres Lapangan",
                ket: "Tahap finishing pemasangan dan pengecekan kanopi transparan di area balkon lantai 2."
            }
        ]
    };

    // Filter kategori
    const filterButtons = document.querySelectorAll(".btn-filter");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");
            portfolioItems.forEach((item) => {
                const category = item.getAttribute("data-category");
                item.classList.toggle("d-none", filter !== "semua" && filter !== category);
            });
        });
    });

    // Modal & Carousel Galeri
    let activeSlides = [];
    const carouselInner = document.getElementById("modalCarouselInner");
    const thumbsEl = document.getElementById("modalThumbs");
    const btnPrev = document.getElementById("btnPrevSlide");
    const btnNext = document.getElementById("btnNextSlide");

    function updateGalleryMeta(index) {
        const slide = activeSlides[index];
        if (!slide) return;

        document.getElementById("captionTahap").textContent = slide.tahap;
        document.getElementById("captionTeks").textContent = slide.ket;
        document.getElementById("captionCounter").textContent = `${index + 1} / ${activeSlides.length}`;

        thumbsEl.querySelectorAll(".gallery-thumb").forEach((thumb, i) => {
            thumb.classList.toggle("active", i === index);
        });
    }

    carouselEl.addEventListener("slid.bs.carousel", (e) => {
        updateGalleryMeta(e.to);
    });

    document.querySelectorAll(".btn-detail-proyek").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const judul = btn.dataset.judul;

            document.getElementById("modalProyekLabel").textContent = judul;
            document.getElementById("modalGaya").textContent = btn.dataset.gaya;
            document.getElementById("modalLuas").textContent = btn.dataset.luas;
            document.getElementById("modalLantai").textContent = btn.dataset.lantai;
            document.getElementById("modalDurasi").textContent = btn.dataset.durasi;
            document.getElementById("modalDeskripsi").textContent = btn.dataset.deskripsi;

            const specs = btn.dataset.spesifikasi.split("|");
            document.getElementById("modalSpesifikasi").innerHTML = specs.map((item) => `<li>${item}</li>`).join("");

            const existingCarousel = bootstrap.Carousel.getInstance(carouselEl);
            if (existingCarousel) {
                existingCarousel.dispose();
            }

            activeSlides = galeriProyek[id] || [
                { src: btn.dataset.gambar, tahap: "Ilustrasi", ket: judul }
            ];

            carouselInner.innerHTML = activeSlides
                .map(
                    (item, idx) => `
                    <div class="carousel-item ${idx === 0 ? "active" : ""}">
                        <img src="${item.src}" onerror="this.onerror=null;this.src='static/img/placeholder.svg';" alt="${item.ket}" decoding="async" />
                    </div>`
                )
                .join("");

            const carouselInstance = new bootstrap.Carousel(carouselEl, {
                ride: false,
                interval: false
            });

            const multi = activeSlides.length > 1;
            btnPrev.classList.toggle("d-none", !multi);
            btnNext.classList.toggle("d-none", !multi);
            thumbsEl.classList.toggle("d-none", !multi);

            if (multi) {
                thumbsEl.innerHTML = activeSlides
                    .map(
                        (item, idx) => `
                        <button type="button" class="gallery-thumb ${idx === 0 ? "active" : ""}" data-slide-index="${idx}" aria-label="Foto ${idx + 1}">
                            <img src="${item.src}" onerror="this.onerror=null;this.src='static/img/placeholder.svg';" alt="Thumbnail ${idx + 1}" width="72" height="54" decoding="async" />
                        </button>`
                    )
                    .join("");

                thumbsEl.querySelectorAll(".gallery-thumb").forEach((thumb) => {
                    thumb.addEventListener("click", () => {
                        const idx = Number(thumb.dataset.slideIndex);
                        carouselInstance.to(idx);
                    });
                });
            } else {
                thumbsEl.innerHTML = "";
            }

            updateGalleryMeta(0);

            const pesanWa = encodeURIComponent(
                `Halo Pak Arpi, saya tertarik dengan portofolio "${judul}" di website Marga Kontraktor. Boleh konsultasi untuk konsep rumah serupa?`
            );
            document.getElementById("modalBtnWa").href = `https://wa.me/6287736467413?text=${pesanWa}`;
        });
    });

    // Buka modal otomatis jika diakses dari kartu Beranda (?proyek=proyek-1 s/d proyek-6)
    const urlParams = new URLSearchParams(window.location.search);
    const proyekId = urlParams.get("proyek");
    if (proyekId) {
        const targetBtn = document.querySelector(`.btn-detail-proyek[data-id="${proyekId}"]`);
        if (targetBtn) {
            targetBtn.click();
        }
    }
}

// --- 3. Logika Simulasi Perencanaan Anggaran (Aktif di simulasi.html) ---
const formEstimasi = document.getElementById("formEstimasi");
const inputBudget = document.getElementById("inputBudget");

if (formEstimasi && inputBudget) {
    inputBudget.addEventListener("input", (e) => {
        const angka = e.target.value.replace(/\D/g, "");
        e.target.value = angka ? Number(angka).toLocaleString("id-ID") : "";
    });

    formEstimasi.addEventListener("submit", (e) => {
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

        if (!rawBudget || rawBudget < 25000000) {
            alertBox.textContent = "Masukkan nominal anggaran yang valid (minimal Rp25.000.000).";
            alertBox.classList.remove("d-none");
            return;
        }

        if (luas < 18 || luas > 1000) {
            alertBox.textContent = "Masukkan luas bangunan antara 18 m² hingga 1.000 m².";
            alertBox.classList.remove("d-none");
            return;
        }

        hasilKosong.classList.add("d-none");
        hasilKonten.classList.add("d-none");
        hasilLoading.classList.remove("d-none");

        // Simulasi perhitungan awal (nantinya akan memanggil API ML & Gemini)
        setTimeout(() => {
            const alokasi = [
                { komponen: "Persiapan & Pondasi", persentase: 15, nominal: Math.round(rawBudget * 0.15) },
                { komponen: "Struktur (Beton & Dinding)", persentase: 35, nominal: Math.round(rawBudget * 0.35) },
                { komponen: "Arsitektur, Atap & Finishing", persentase: 35, nominal: Math.round(rawBudget * 0.35) },
                { komponen: "Mekanikal, Elektrikal & Plumbing", persentase: 10, nominal: Math.round(rawBudget * 0.10) },
                { komponen: "Biaya Cadangan / Tak Terduga", persentase: 5, nominal: Math.round(rawBudget * 0.05) }
            ];

            const rataPerMeter = Math.round(rawBudget / luas);
            const badgePerMeter = document.getElementById("badgePerMeter");
            if (badgePerMeter) {
                badgePerMeter.textContent = `± Rp${rataPerMeter.toLocaleString("id-ID")} / m²`;
            }

            const listEl = document.getElementById("listAlokasi");
            listEl.innerHTML = alokasi
                .map(
                    (item) => `
                <div class="d-flex justify-content-between align-items-center py-2 border-bottom border-light border-opacity-25 small">
                    <span>${item.komponen} (${item.persentase}%)</span>
                    <strong class="text-warning">Rp${item.nominal.toLocaleString("id-ID")}</strong>
                </div>`
                )
                .join("");

            const ctx = document.getElementById("chartAnggaran").getContext("2d");
            if (chartInstance) chartInstance.destroy();
            chartInstance = new Chart(ctx, {
                type: "doughnut",
                data: {
                    labels: alokasi.map((a) => a.komponen),
                    datasets: [
                        {
                            data: alokasi.map((a) => a.persentase),
                            backgroundColor: ["#FFC600", "#38BDF8", "#34D399", "#FB923C", "#CBD5E1"],
                            borderWidth: 0
                        }
                    ]
                },
                options: {
                    plugins: { legend: { display: false } }
                }
            });

            document.getElementById("teksPenjelasanAI").textContent =
                `Dengan anggaran Rp${rawBudget.toLocaleString("id-ID")} untuk luas ${luas} m² (${lantai} lantai, material ${kualitas}), estimasi rata-ratanya sekitar Rp${rataPerMeter.toLocaleString("id-ID")}/m². Porsi terbesar diarahkan ke struktur dan finishing agar bangunan kokoh serta rapi. Hasil ini adalah gambaran awal sebelum penyusunan RAB resmi bersama Pak Arpi.`;

            const pesanWa = encodeURIComponent(
                `Halo Pak Arpi, saya baru mencoba simulasi anggaran di website Marga Kontraktor dengan budget Rp${rawBudget.toLocaleString("id-ID")} (${luas} m², ${lantai} lantai, material ${kualitas}). Saya ingin berkonsultasi lebih lanjut.`
            );
            document.getElementById("btnWaHasil").href = `https://wa.me/6287736467413?text=${pesanWa}`;

            hasilLoading.classList.add("d-none");
            hasilKonten.classList.remove("d-none");
        }, 450);
    });
}

// --- 4. Logika Formulir Konsultasi (Aktif di kontak.html) ---
const formKonsultasi = document.getElementById("formKonsultasi");

if (formKonsultasi) {
    formKonsultasi.addEventListener("submit", (e) => {
        e.preventDefault();

        const alertEl = document.getElementById("konsulAlert");
        const btnLanjutWa = document.getElementById("btnLanjutWa");
        const nama = document.getElementById("konsulNama").value.trim();
        const wa = document.getElementById("konsulWa").value.trim();
        const layanan = document.getElementById("konsulLayanan").value;
        const pesan = document.getElementById("konsulPesan").value.trim();

        alertEl.className = "alert small py-2 mt-3 mb-0";

        if (!nama || !wa || !pesan) {
            alertEl.classList.add("alert-danger");
            alertEl.textContent = "Mohon lengkapi nama, nomor WhatsApp, dan kebutuhan Anda terlebih dahulu.";
            btnLanjutWa?.classList.add("d-none");
            return;
        }

        if (wa.replace(/\D/g, "").length < 9) {
            alertEl.classList.add("alert-danger");
            alertEl.textContent = "Format nomor WhatsApp belum valid (minimal 9 digit angka).";
            btnLanjutWa?.classList.add("d-none");
            return;
        }

        alertEl.classList.add("alert-success");
        alertEl.textContent = `Terima kasih, ${nama}! Permintaan konsultasi Anda sudah tercatat. Anda juga dapat langsung melanjutkan chat ke WhatsApp Pak Arpi.`;

        if (btnLanjutWa) {
            const teksWa = encodeURIComponent(
                `Halo Pak Arpi, saya ${nama} (${wa}). Saya tertarik dengan layanan "${layanan}". Detail rencana: ${pesan}`
            );
            btnLanjutWa.href = `https://wa.me/6287736467413?text=${teksWa}`;
            btnLanjutWa.classList.remove("d-none");
        }

        e.target.reset();
    });
}
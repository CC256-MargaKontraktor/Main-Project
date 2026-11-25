(function () {
    // Deteksi halaman yang sedang dibuka (aman untuk lokal maupun GitHub Pages)
    const path = window.location.pathname.split("/").pop();
    const currentPage = path === "" ? "index.html" : path;

    const isActive = (file) => (currentPage === file ? "active" : "");

    // 1. Render Header & Navbar
    const headerEl = document.getElementById("site-header");
    if (headerEl) {
        headerEl.innerHTML = `
        <header class="sticky-top">
            <nav class="navbar navbar-expand-lg navbar-dark shadow-sm">
                <div class="container">
                    <a href="index.html" class="navbar-brand d-flex align-items-center py-0">
                        <img src="static/img/LOGO.PNG" alt="Marga Kontraktor" class="brand-logo" />
                    </a>

                    <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#tabMenu" aria-label="Buka Menu">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="tabMenu">
                        <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-3 pt-3 pt-lg-0">
                            <li class="nav-item">
                                <a href="index.html" class="nav-link ${isActive("index.html")}">Beranda</a>
                            </li>
                            <li class="nav-item">
                                <a href="layanan.html" class="nav-link ${isActive("layanan.html")}">Profil &amp; Layanan</a>
                            </li>
                            <li class="nav-item">
                                <a href="portofolio.html" class="nav-link ${isActive("portofolio.html")}">Portofolio</a>
                            </li>
                            <li class="nav-item">
                                <a href="simulasi.html" class="nav-link ${isActive("simulasi.html")}">Simulasi Biaya</a>
                            </li>
                            <li class="nav-item mt-2 mt-lg-0">
                                <a href="kontak.html" class="btn btn-brand-yellow fw-semibold px-3">Konsultasi &amp; FAQ</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>`;
    }

    // 2. Render Footer, Navigasi Bawah HP, & Widget Chatbot
    const footerEl = document.getElementById("site-footer");
    if (footerEl) {
        footerEl.innerHTML = `
        <footer class="footer-section text-white pt-5 pb-4 pb-mobile-nav">
            <div class="container">
                <div class="row g-4 pb-4 border-bottom border-light border-opacity-25">
                    <div class="col-lg-5">
                        <img src="static/img/LOGO.PNG" alt="Marga Kontraktor" class="brand-logo mb-3" />
                        <p class="small text-light opacity-75 mb-0" style="max-width: 380px;">
                            Jasa desain arsitektur, penyusunan RAB transparan, dan pembangunan rumah tinggal milik Bapak Arpi Setiawan dengan laporan progres mingguan.
                        </p>
                    </div>

                    <div class="col-6 col-lg-3">
                        <h6 class="fw-bold text-warning mb-3">Menu Cepat</h6>
                        <ul class="list-unstyled small d-flex flex-column gap-2 mb-0">
                            <li><a href="index.html" class="footer-link">Beranda</a></li>
                            <li><a href="layanan.html" class="footer-link">Profil &amp; Layanan</a></li>
                            <li><a href="portofolio.html" class="footer-link">Portofolio Proyek</a></li>
                            <li><a href="simulasi.html" class="footer-link">Simulasi Anggaran</a></li>
                            <li><a href="kontak.html" class="footer-link">Konsultasi &amp; FAQ</a></li>
                        </ul>
                    </div>

                    <div class="col-6 col-lg-4">
                        <h6 class="fw-bold text-warning mb-3">Kontak Langsung</h6>
                        <ul class="list-unstyled small d-flex flex-column gap-2 mb-0">
                            <li>
                                <a href="https://wa.me/6287736467413" target="_blank" class="footer-link">
                                    <i class="bi bi-whatsapp text-warning me-2"></i>+62 877-3646-7413
                                </a>
                            </li>
                            <li class="text-light opacity-75">
                                <i class="bi bi-envelope text-warning me-2"></i>arpisetiawan41@gmail.com
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="pt-3 text-center small text-light opacity-75">
                    &copy; 2026 Marga Kontraktor. Dikembangkan oleh Tim Capstone A26-CS256.
                </div>
            </div>
        </footer>

        <!-- Navigasi Bawah Khusus HP -->
        <nav class="mobile-bottom-nav d-lg-none shadow-lg">
            <a href="index.html" class="nav-item-mobile">
                <i class="bi bi-house-door-fill"></i>
                <span>Beranda</span>
            </a>
            <a href="portofolio.html" class="nav-item-mobile">
                <i class="bi bi-grid-fill"></i>
                <span>Proyek</span>
            </a>
            <a href="simulasi.html" class="nav-item-mobile">
                <i class="bi bi-calculator-fill"></i>
                <span>Anggaran</span>
            </a>
            <button type="button" id="btnOpenChatMobile" class="nav-item-mobile border-0 bg-transparent fw-bold">
                <i class="bi bi-chat-dots-fill text-kuning-gelap"></i>
                <span>Tanya AI</span>
            </button>
        </nav>

        <!-- Widget Chatbot AI -->
        <button type="button" id="btnToggleChat" class="chat-fab btn btn-brand-yellow shadow-lg d-none d-lg-flex align-items-center gap-2 fw-bold">
            <i class="bi bi-chat-dots-fill fs-5"></i>
            <span>Tanya AI</span>
        </button>

        <div id="chatBox" class="chat-box shadow-lg d-none">
            <div class="chat-header bg-biru text-white d-flex justify-content-between align-items-center p-3">
                <div class="d-flex align-items-center gap-2">
                    <div class="chat-avatar">
                        <i class="bi bi-robot"></i>
                    </div>
                    <div>
                        <div class="fw-bold small">Asisten Marga Kontraktor</div>
                        <small class="text-warning d-block" style="font-size: 0.72rem;">Konsultasi Awal Layanan</small>
                    </div>
                </div>
                <button type="button" id="btnCloseChat" class="btn btn-sm btn-outline-light border-0" aria-label="Tutup Chat">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>

            <div id="chatMessages" class="chat-messages p-3">
                <div class="chat-bubble bot">
                    Halo! Saya asisten virtual Marga Kontraktor. Ada yang ingin ditanyakan seputar layanan desain, penyusunan RAB, atau pembangunan rumah tinggal?
                </div>
                <div class="d-flex flex-wrap gap-1 mt-1" id="quickQuestions">
                    <button type="button" class="btn btn-sm chat-chip" data-question="Apa saja layanan Marga Kontraktor?">Layanan apa saja?</button>
                    <button type="button" class="btn btn-sm chat-chip" data-question="Bagaimana cara menghitung estimasi biaya?">Cara hitung budget?</button>
                    <button type="button" class="btn btn-sm chat-chip" data-question="Bagaimana sistem laporan progres pembangunan?">Laporan progres?</button>
                </div>
            </div>

            <form id="formChat" class="chat-input p-2 border-top bg-white d-flex gap-2">
                <input type="text" id="inputChat" class="form-control form-control-sm" placeholder="Ketik pertanyaan seputar layanan..." autocomplete="off" />
                <button type="submit" class="btn btn-brand-yellow btn-sm fw-bold px-3" aria-label="Kirim Pesan">
                    <i class="bi bi-send-fill"></i>
                </button>
            </form>
        </div>`;
    }

    // 3. Logika Chatbot AI (Aktif di Semua Halaman)
    const chatBox = document.getElementById("chatBox");
    const chatMessages = document.getElementById("chatMessages");
    const inputChat = document.getElementById("inputChat");

    if (!chatBox) return;

    const toggleChat = () => {
        chatBox.classList.toggle("d-none");
        if (!chatBox.classList.contains("d-none")) {
            inputChat.focus();
        }
    };

    document.getElementById("btnToggleChat")?.addEventListener("click", toggleChat);
    document.getElementById("btnOpenChatMobile")?.addEventListener("click", toggleChat);
    document.getElementById("btnCloseChat")?.addEventListener("click", toggleChat);

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
            return "Anda bisa mencoba menu Simulasi Biaya untuk melihat gambaran awal pembagian anggaran. Untuk RAB final yang rinci, silakan konsultasi langsung dengan Pak Arpi.";
        }
        if (t.includes("progres") || t.includes("laporan") || t.includes("pantau") || t.includes("alur")) {
            return "Selama pembangunan berjalan, Marga Kontraktor rutin mengirimkan laporan progres mingguan berisi perkembangan pekerjaan, dokumentasi foto lapangan, dan rincian biaya.";
        }
        if (t.includes("kontak") || t.includes("wa") || t.includes("whatsapp") || t.includes("arpi") || t.includes("hubungi")) {
            return "Anda dapat menghubungi Bapak Arpi Setiawan melalui WhatsApp di +62 877-3646-7413 atau lewat halaman Konsultasi & FAQ.";
        }
        return "Maaf, saya hanya dapat membantu pertanyaan seputar layanan desain, penyusunan RAB, dan pembangunan rumah di Marga Kontraktor. Silakan hubungi Pak Arpi via WhatsApp di +62 877-3646-7413 untuk pembahasan lebih lanjut.";
    }

    function kirimPesanChat(teks) {
        const pesanBersih = teks.trim();
        if (!pesanBersih) return;

        appendBubble(pesanBersih, "user");
        inputChat.value = "";

        setTimeout(() => {
            appendBubble(balasPertanyaanSimulasi(pesanBersih), "bot");
        }, 350);
    }

    document.getElementById("formChat").addEventListener("submit", (e) => {
        e.preventDefault();
        kirimPesanChat(inputChat.value);
    });

    document.querySelectorAll(".chat-chip").forEach((chip) => {
        chip.addEventListener("click", () => {
            kirimPesanChat(chip.getAttribute("data-question"));
        });
    });
})();
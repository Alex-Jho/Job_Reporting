const SUPABASE_URL   = "https://ngzozvuzflstatqpqfwp.supabase.co";
const SUPABASE_KEY   = "sb_publishable_y6xzWLcwJ__0imKfvVKkBw_7FRWUuTo";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* ============================================================
    ELEMENT
============================================================ */

const form         = document.getElementById("workForm");
const submitButton = document.getElementById("submitButton");
const statusBox    = document.getElementById("statusBox");

/* ============================================================
       STATUS
============================================================ */

function showStatus(message, type) {
    statusBox.textContent = message;
    statusBox.className   = "status-box status-" + type;
}

function clearStatus() {
    statusBox.textContent = "";
    statusBox.className   = "status-box";
}

/* ============================================================
    TANGGAL DEFAULT = HARI INI
============================================================ */

const tanggalInput = document.getElementById("tanggal");
function getLocalDateString() {
    const now   = new Date();
    const year  = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day   = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

tanggalInput.value = getLocalDateString();

/* ============================================================
    UPPERCASE
============================================================ */

document
    .querySelectorAll(
        'input[type="text"], textarea'
    )
    .forEach(input => {
        input.addEventListener(
            "input",
            function() {
                this.value = this.value.toUpperCase();
            }
        );

    });

/* ============================================================
    FACTORY - LAINNYA
============================================================ */

const factorySelect = document.getElementById("factory");
const factoryOther  = document.getElementById("factoryOther");
factorySelect.addEventListener("change",
    function() {
        if (this.value === "LAINNYA") {
            factoryOther.style.display = "block";
            factoryOther.required = true;
        } else {
            factoryOther.style.display = "none";
            factoryOther.required = false;
            factoryOther.value = "";
        }
    }
);

/* ============================================================
    AREA FILTER BERDASARKAN FACTORY
============================================================ */

const areaSelect = document.getElementById("area");
const areaOther  = document.getElementById("areaOther");
const areaList   = {
    "PLANT A": [
        "CUTTING",
        "SEWING",
        "MCC",
        "CCS"
    ],

    "UPS PLANT A": [
        "NOSEW",
        "UPS CUTTING",
        "LCA",
        "CCS"
    ],

    "PLANT B": [
        "CUTTING",
        "SEWING",
        "MCC",
        "CCS",
        "CUT STROBLE"
    ],

    "UPS PLANT B": [
        "HF WELDING",
        "SCREEN PRINTING",
        "CCS",
        "EMBROIDERY"
    ],

    "WAREHOUSE": [
        "LAMINATING"
    ],

    "PLANT C": [
        "CCS",
        "CUT STROBLE",
        "CUTTING",
        "EMBROIDERY",
        "HF WELDING",
        "LAMINATING",
        "LCA",
        "MCC",
        "NOSEW",
        "SCREEN PRINTING",
        "SEWING",
        "UPS CUTTING"
    ],

    "UPS PLANT C": [
        "CCS",
        "CUT STROBLE",
        "CUTTING",
        "EMBROIDERY",
        "HF WELDING",
        "LAMINATING",
        "LCA",
        "MCC",
        "NOSEW",
        "SCREEN PRINTING",
        "SEWING",
        "UPS CUTTING"
    ],

    "PLANT D": [
        "CCS",
        "CUT STROBLE",
        "CUTTING",
        "EMBROIDERY",
        "HF WELDING",
        "LAMINATING",
        "LCA",
        "MCC",
        "NOSEW",
        "SCREEN PRINTING",
        "SEWING",
        "UPS CUTTING"
    ],

    "UPS PLANT D": [
        "CCS",
        "CUT STROBLE",
        "CUTTING",
        "EMBROIDERY",
        "HF WELDING",
        "LAMINATING",
        "LCA",
        "MCC",
        "NOSEW",
        "SCREEN PRINTING",
        "SEWING",
        "UPS CUTTING"
    ]
};

/* ============================================================
    FUNCTION UPDATE AREA
============================================================ */

function updateAreaOptions(factory) {

    // Bersihkan pilihan Area sebelumnya
    areaSelect.innerHTML = "";

    // Reset input Area Lainnya
    areaOther.style.display = "none";
    areaOther.required      = false;
    areaOther.value         = "";

    // Jika Factory belum dipilih
    if (!factory) {

        const defaultOption       = document.createElement("option");
        defaultOption.value       = "";
        defaultOption.textContent = "Pilih Factory terlebih dahulu";

        defaultOption.disabled = true;
        defaultOption.selected = true;

        areaSelect.appendChild(defaultOption);

        return;
    }

    // Ambil daftar area berdasarkan Factory
    const areas = areaList[factory] || [];

    // Default option
    const defaultOption = document.createElement("option");

    defaultOption.value = "";
    defaultOption.textContent = "Pilih Area";

    defaultOption.disabled = true;
    defaultOption.selected = true;

    areaSelect.appendChild(defaultOption);

    // Masukkan area ke dropdown
    areas.forEach(function(area) {

        const option = document.createElement("option");

        option.value = area;
        option.textContent = area;

        areaSelect.appendChild(option);

    });

    // Tambahkan pilihan Lainnya
    const otherOption = document.createElement("option");
    otherOption.value = "LAINNYA";
    otherOption.textContent = "LAINNYA";
    areaSelect.appendChild(otherOption);
}

/* ============================================================
    FACTORY CHANGE
============================================================ */

factorySelect.addEventListener("change",
    function() {
        const factory = this.value;
        // Logic Factory Lainnya
        if (factory === "LAINNYA") {
            factoryOther.style.display = "block";
            factoryOther.required = true;
        } else {
            factoryOther.style.display = "none";
            factoryOther.required = false;
            factoryOther.value = "";
        }

        // Update Area
        updateAreaOptions(factory);
    }
);

/* ============================================================
    AREA - LAINNYA
============================================================ */

areaSelect.addEventListener("change",
    function() {
        if (this.value === "LAINNYA") {
            areaOther.style.display = "block";
            areaOther.required = true;
        } else {
            areaOther.style.display = "none";
            areaOther.required = false;
            areaOther.value = "";
        }
    }
);

/* ============================================================
    PEKERJAAN - LAINNYA
============================================================ */

const pekerjaanSelect = document.getElementById("pekerjaan");
const pekerjaanOther  = document.getElementById("pekerjaanOther");
pekerjaanSelect.addEventListener("change",
    function() {
        if (this.value === "LAINNYA") {
            pekerjaanOther.style.display = "block";
            pekerjaanOther.required = true;
        } else {
            pekerjaanOther.style.display = "none";
            pekerjaanOther.required = false;
            pekerjaanOther.value = "";
        }
    }
);

/* ============================================================
    CEK NIK KE SUPABASE
============================================================ */

const nikCache = {};

async function cekNik(nikId, namaId, statusId) {
    const nikInput  = document.getElementById(nikId);
    const namaInput = document.getElementById(namaId);
    const status    = document.getElementById(statusId);
    nikInput.classList.remove(
        "nik-checking",
        "nik-success",
        "nik-error"
    );

    const nik = nikInput.value.trim();
    namaInput.value = "";
    status.textContent = "";
    status.className = "employee-status";

    if (!nik) {
        return null;
    }

      /*
        Jika NIK sudah pernah dicari,
        gunakan cache agar tidak query berulang.
      */
    if (nikCache[nik]) {
        namaInput.value = nikCache[nik];
        status.textContent = "✓ Nama Karyawan ditemukan";
        status.className = "employee-status status-success";

        // Border hijau
        nikInput.classList.remove("nik-error");
        nikInput.classList.add("nik-success");

        return nikCache[nik];
    }

    status.textContent = "🔄 Mencari data karyawan...";
    status.className = "employee-status checking";
    nikInput.classList.add("nik-checking");
    try {
        const {
            data,
            error
        } = await supabaseClient
          .from("Karyawan")
          .select("nik, nama")
          .eq("nik", nik)
          .maybeSingle();

        if (error) {
            console.error("Error mencari NIK:", error);
            status.textContent = "Gagal menghubungi database.";
            status.className = "employee-status status-error";
            nikInput.classList.add("nik-error");

            return null;
        }

        if (data) {
            nikCache[nik] = data.nama;
            namaInput.value = data.nama;
            status.textContent = "✓ Nama Karyawan ditemukan";
            status.className = "employee-status status-success";

            // Border hijau
            nikInput.classList.remove("nik-error");
            nikInput.classList.add("nik-success");

            return data.nama;
        }

        status.textContent = "✕ Nama Karyawan tidak ditemukan.";
        status.className = "employee-status status-error";

        // Border merah
        nikInput.classList.remove("nik-success");
        nikInput.classList.add("nik-error");

        return null;
    }

    catch (error) {
        console.error("Error koneksi Supabase:", error);
        status.textContent = "Gagal terhubung ke database.";
        status.className = "employee-status status-error";
        nikInput.classList.add("nik-error");

        return null;
    }
}

/* ============================================================
    PROGRESSIVE DISCLOSURE - PIC
============================================================ */

const btnTambahPIC2 = document.getElementById("btnTambahPIC2");
const btnTambahPIC3 = document.getElementById("btnTambahPIC3");
const picBox2 = document.getElementById("picBox2");
const picBox3 = document.getElementById("picBox3");

/* TAMBAH PIC 2 */

btnTambahPIC2.addEventListener("click",
    function() {
        picBox2.style.display = "block";
        btnTambahPIC2.style.display = "none";
        btnTambahPIC3.style.display = "block";
        document
          .getElementById("nik2")
          .focus();
    }
);

/* TAMBAH PIC 3 */

btnTambahPIC3.addEventListener("click",
    function() {
        picBox3.style.display = "block";
        btnTambahPIC3.style.display = "none";
        document
          .getElementById("nik3")
          .focus();
    }
);

/* ============================================================
    HAPUS PIC 2
============================================================ */

const btnHapusPIC2 = document.getElementById("btnHapusPIC2");
const btnHapusPIC3 = document.getElementById("btnHapusPIC3");
btnHapusPIC2.addEventListener("click",
    function() {

        /* Kosongkan data PIC 2 */
        document.getElementById("nik2").value = "";
        document.getElementById("nama2").value = "";
        document.getElementById("nikStatus2").textContent = "";

        /* Sembunyikan PIC 2 */
        picBox2.style.display = "none";

        /* Kembalikan tombol Tambah PIC 2 */
        btnTambahPIC2.style.display = "block";

        /* PIC 3 juga disembunyikan */
        document.getElementById("nik3").value = "";
        document.getElementById("nama3").value = "";

        document.getElementById("nikStatus3").textContent = "";

        picBox3.style.display = "none";

        btnTambahPIC3.style.display = "none";
    }
);

/* ============================================================
    HAPUS PIC 3
============================================================ */

btnHapusPIC3.addEventListener("click",
    function() {

        /* Kosongkan data PIC 3 */
        document.getElementById("nik3").value = "";
        document.getElementById("nama3").value = "";

        document.getElementById("nikStatus3").textContent = "";

        /* Sembunyikan PIC 3 */
        picBox3.style.display = "none";

        /* Kembalikan tombol Tambah PIC 3 */
        btnTambahPIC3.style.display = "block";

    }
);

/* ============================================================
    EVENT NIK
============================================================ */

function setupNikInput(nikId, namaId, statusId) {
    const nikInput = document.getElementById(nikId);

    if (!nikInput) return;

    nikInput.addEventListener("input",
        function() {

            // ======================================================
            // 1. HANYA IZINKAN ANGKA
            // ======================================================

            this.value = this.value.replace(/\D/g, "");
            const nik = this.value.trim();
            const namaInput = document.getElementById(namaId);
            const status = document.getElementById(statusId);

            // ======================================================
            // 2. RESET NAMA DAN STATUS
            // ======================================================

            namaInput.value = "";
            status.textContent = "";
            status.className = "employee-status";

            // Reset warna border input NIK
            nikInput.classList.remove(
                "nik-success",
                "nik-error"
            );

            // ======================================================
            // 3. BELUM 5 DIGIT
            // ======================================================

            if (nik.length < 5) {
                return;
            }

            // ======================================================
            // 4. NIK SUDAH CUKUP → TAMPILKAN STATUS
            // ======================================================

            status.textContent = "🔄 Mencari data karyawan...";
            status.className = "employee-status checking";

            // ======================================================
            // 5. CEK DATABASE
            // ======================================================

            cekNik(nikId, namaId, statusId);
        }
    );
}

/* ============================================================
   AKTIFKAN UNTUK PIC 1, PIC 2, PIC 3
============================================================ */

setupNikInput(
  "nik1",
  "nama1",
  "nikStatus1"
);

setupNikInput(
  "nik2",
  "nama2",
  "nikStatus2"
);

setupNikInput(
  "nik3",
  "nama3",
  "nikStatus3"
);

/* ============================================================
    DURASI
============================================================ */

function calculateDuration() {
    const mulai   = document.getElementById("mulai").value;
    const selesai = document.getElementById("selesai").value;

    if (!mulai || !selesai) {
        document.getElementById(
            "durasi"
        ).textContent = "-";

        return null;
    }

    const [
        startHour,
        startMinute
      ] = mulai
          .split(":")
          .map(Number);

    const [
        endHour,
        endMinute
    ] = selesai
        .split(":")
        .map(Number);

    const start = startHour * 60 + startMinute;
    const end   = endHour * 60 + endMinute;

    if (end <= start) {
        document.getElementById("durasi").textContent = "Waktu tidak valid";

        return null;
    }

    const duration = end - start;
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    let result = "";

    if (hours > 0) {
        result += `${hours} Jam`;
    }

    if (minutes > 0) {
        
        if (result !== "") {
            result += " ";
        }

        result += `${minutes} Menit`;
    }

    if (!result) {
        result = "0 Menit";
    }

    document.getElementById("durasi").textContent = result;

    return duration;
}

document
    .getElementById("mulai")
    .addEventListener("change",
        calculateDuration
    );

document
    .getElementById("selesai")
    .addEventListener("change",
        calculateDuration
    );

/* ============================================================
    FOTO
============================================================ */

let fotoSebelumFile = null;
let fotoSesudahFile = null;

/* ============================================================
    PREVIEW FOTO
============================================================ */

function tampilkanPreview(file, previewId, namaId) {
    const preview = document.getElementById(previewId);
    const nama = document.getElementById(namaId);

    if (!file) {
        preview.style.display = "none";
        preview.src = "";
        nama.textContent = "Belum ada foto dipilih";

        return;
    }

    if (!file.type.startsWith("image/")) {
        alert("File harus berupa gambar.");

        return;
    }

    nama.textContent = file.name;
    const reader = new FileReader();
    reader.onload =
        function(event) {
            preview.src = event.target.result;
            preview.style.display = "block";
        };

    reader.readAsDataURL(file);
}

/* ============================================================
    KAMERA / GALERI FOTO SEBELUM
============================================================ */

document
.getElementById("btnKameraSebelum")
.addEventListener("click",
    function() {
        document
        .getElementById(
            "kameraSebelum"
        )
        .click();
    }
);

document
.getElementById("btnGaleriSebelum")
.addEventListener("click",
    function() {
        document
        .getElementById(
            "galeriSebelum"
        )
        .click();
    }
);

document
.getElementById("kameraSebelum")
.addEventListener("change",
    function() {
        if (this.files.length > 0) {
            fotoSebelumFile = this.files[0];
            tampilkanPreview(
                fotoSebelumFile,
                "previewSebelum",
                "namaFotoSebelum"
            );
        }
    }
);

document
.getElementById("galeriSebelum")
.addEventListener("change",
    function() {
        if (this.files.length > 0) {
            fotoSebelumFile = this.files[0];
            tampilkanPreview(
                fotoSebelumFile,
                "previewSebelum",
                "namaFotoSebelum"
            );
        }
    }
);

/* ============================================================
    KAMERA / GALERI FOTO SESUDAH
============================================================ */

document
.getElementById("btnKameraSesudah")
.addEventListener("click",
    function() {
        document
        .getElementById(
            "kameraSesudah"
        )
        .click();
    }
);

document
.getElementById("btnGaleriSesudah")
.addEventListener("click",
    function() {
        document
        .getElementById(
            "galeriSesudah"
        )
        .click();
    }
);

document
.getElementById("kameraSesudah")
.addEventListener("change",
    function() {
        if (this.files.length > 0) {
            fotoSesudahFile = this.files[0];
            tampilkanPreview(
                fotoSesudahFile,
                "previewSesudah",
                "namaFotoSesudah"
            );

        }
    }
);

document
.getElementById("galeriSesudah")
.addEventListener("change",
    function() {
        if (this.files.length > 0) {
            fotoSesudahFile = this.files[0];
            tampilkanPreview(
                fotoSesudahFile,
                "previewSesudah",
                "namaFotoSesudah"
            );
        }
    }
);

/* ============================================================
    BARCODE / QR SCANNER
============================================================ */

let html5QrCode = null;
let scannerRunning = false;

const scanButton = document.getElementById("scanButton");
const scannerContainer = document.getElementById("scannerContainer");

const closeScannerButton = document.getElementById("closeScannerButton");
const idMesinInput = document.getElementById("idMesin");
const scanResult = document.getElementById("scanResult");
const scanResultText = document.getElementById("scanResultText");

/* ============================================================
    BUKA SCANNER
============================================================ */

scanButton.addEventListener("click",
    async function() {
        scannerContainer.style.display = "block";
        scanResult.style.display = "none";
        scanButton.disabled = true;

        try {
            html5QrCode = new Html5Qrcode("reader");
            const config = {
                fps: 10,
                qrbox: {
                    width: 250,
                    height: 150
                },

                aspectRatio: 1.777778
            };

            await html5QrCode.start(
                {facingMode: "environment"},
                config, onScanSuccess, onScanFailure
            );

            scannerRunning = true;
        }

        catch (error) {
            console.error(
                "Scanner Error:", error
            );

            alert(
                "Kamera tidak dapat dibuka.\n\n" +
                "Pastikan browser memiliki izin menggunakan kamera."
            );

            scannerContainer.style.display = "none";
            scanButton.disabled = false;
        }
    }
);

/* ============================================================
    BERHASIL SCAN
============================================================ */

async function onScanSuccess(decodedText, decodedResult) {
    console.log("Barcode:", decodedText);
    idMesinInput.value = decodedText.toUpperCase();
    scanResultText.textContent = decodedText;
    scanResult.style.display = "block";

    await stopScanner();
}

/* ============================================================
    SCAN GAGAL
============================================================ */

function onScanFailure(errorMessage) {
    // Scanner tetap berjalan.
}

/* ============================================================
    TUTUP SCANNER
============================================================ */

closeScannerButton.addEventListener("click",
    async function() {
        await stopScanner();
    }
);

/* ============================================================
    STOP SCANNER
============================================================ */

async function stopScanner() {
    if (html5QrCode && scannerRunning) {
        try {
          await html5QrCode.stop();
          html5QrCode.clear();
        }

        catch (error) {
            console.error("Gagal menghentikan scanner:", error);
        }
    }

    scannerRunning = false;
    scannerContainer.style.display = "none";
    scanButton.disabled = false;
}

/* ============================================================
    FOLDER ID
       
    FORMAT: DDMMYYYYHHmm
    Contoh: 280820261436
============================================================ */

function generateFolderId() {
    const now    = new Date();
    const day    = String(now.getDate()).padStart(2, "0");
    const month  = String(now.getMonth() + 1).padStart(2, "0");
    const year   = now.getFullYear();
    const hour   = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");

    return (`${day}${month}${year}${hour}${minute}`);
}

/* ============================================================
    TIMESTAMP CREATED_AT
       
    Menggunakan waktu lokal Indonesia
    dengan timezone +07:00
============================================================ */

function generateCreatedAt() {
    const now    = new Date();

    now.setHours(now.getHours() + 7);

    const year   = now.getFullYear();
    const month  = String(now.getMonth() + 1).padStart(2, "0");
    const day    = String(now.getDate()).padStart(2, "0");
    const hour   = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    const second = String(now.getSeconds()).padStart(2, "0");
      
    return (`${year}-${month}-${day}` + `T${hour}:${minute}:${second}+07:00`);
}

/* ============================================================
    EXTENSION FILE
============================================================ */

function getFileExtension(file) {
    if (!file) {
        return "jpg";
    }

    const extension = file.name
        .split(".")
        .pop()
        .toLowerCase();

    if (extension === "jpeg" || extension === "jpg" || extension === "png" || extension === "webp") {
        return extension;
    }

    return "jpg";

}

/* ============================================================
    UPLOAD FOTO KE SUPABASE STORAGE
============================================================ */

async function uploadPhoto(file, folderId, prefix) {
    if (!file) {
        return null;
    }

    const extension = getFileExtension(file);
    const filePath = `${folderId}/${prefix}.${extension}`;
    const {data, error} = await supabaseClient
    .storage
    .from("laporan-kerja")
    .upload(
        filePath,
        file,
        {
            upsert: false,
            contentType: file.type
        }
    );

    if (error) {
        console.error(
            "Upload foto gagal:", error
        );

        throw error;
    }

    console.log("Foto berhasil diupload:", data);

    return filePath;

}

/* ============================================================
    RESET FOTO
============================================================ */

function resetPhotos() {
    fotoSebelumFile = null;
    fotoSesudahFile = null;
    document.getElementById("kameraSebelum").value = "";
    document.getElementById("galeriSebelum").value = "";

    document.getElementById("kameraSesudah").value = "";
    document.getElementById("galeriSesudah").value = "";

    document.getElementById("previewSebelum").style.display = "none";
    document.getElementById("previewSebelum").src = "";

    document.getElementById("previewSesudah").style.display = "none";
    document.getElementById("previewSesudah").src = "";

    document.getElementById("namaFotoSebelum").textContent =
        "Belum ada foto dipilih";
    document.getElementById("namaFotoSesudah").textContent =
        "Belum ada foto dipilih";
}

/* ============================================================
    RESET FORM
============================================================ */

function resetForm() {
    form.reset();
    updateAreaOptions("");
    document.getElementById("factoryOther").style.display = "none";
    document.getElementById("areaOther").style.display = "none";
    document.getElementById("pekerjaanOther").style.display = "none";
    document.getElementById("factoryOther").required = false;
    document.getElementById("areaOther").required = false;
    document.getElementById("pekerjaanOther").required = false;
    document.getElementById("nikStatus1").textContent = "";
    document.getElementById("nikStatus2").textContent = "";
    document.getElementById("nikStatus3").textContent = "";
    document.getElementById("durasi").textContent = "-";
    document.getElementById("scanResult").style.display = "none";

    resetPhotos();

    tanggalInput.value = getLocalDateString();
}

/* ============================================================
    SUBMIT FORM
============================================================ */

form.addEventListener("submit",
    async function(e) {
        e.preventDefault();

        if (submitButton.disabled) {
            return;
        }

        clearStatus();

        /* ========================================
           VALIDASI FACTORY
        ======================================== */

        let factory = factorySelect.value;

        if (factory === "LAINNYA") {
            factory = factoryOther.value.trim();
            if (!factory) {
                alert("Silakan masukkan nama Factory.");
                factoryOther.focus();

                return;

            }
        }

        /* ========================================
           VALIDASI AREA
        ======================================== */

        let area = areaSelect.value;

        if (area === "LAINNYA") {
            area = areaOther.value.trim();
            if (!area) {
                alert("Silakan masukkan nama Area.");
                areaOther.focus();

                return;
            }
        }

        /* ========================================
           VALIDASI LINE
        ======================================== */

        const line = document.getElementById("line").value.trim();

        if (!line) {
            alert("Silakan masukkan Line.");
            document.getElementById("line").focus();

            return;
        }

        /* ========================================
           VALIDASI PEKERJAAN
        ======================================== */

        let pekerjaan = pekerjaanSelect.value;

        if (pekerjaan === "LAINNYA") {
            pekerjaan = pekerjaanOther.value.trim();

            if (!pekerjaan) {
                alert("Silakan masukkan pekerjaan / aktivitas.");
                pekerjaanOther.focus();

                return;
            }
        }

        /* ========================================
           VALIDASI PIC 1
        ======================================== */

        const nik1  = document.getElementById("nik1").value.trim();
        const nama1 = document.getElementById("nama1").value.trim();

        if (!nik1) {
            alert("NIK PIC 1 wajib diisi.");
            return;
        }

        if (!nama1) {
            alert("NIK PIC 1 tidak ditemukan di database.");
            return;
        }

        /* ========================================
           VALIDASI PIC 2
        ======================================== */

        const nik2  = document.getElementById("nik2").value.trim();
        const nama2 = document.getElementById("nama2").value.trim();

        if (nik2 && !nama2) {
            alert("NIK PIC 2 tidak ditemukan di database.");
            return;
        }

        /* ========================================
           VALIDASI PIC 3
        ======================================== */

        const nik3  = document.getElementById("nik3").value.trim();
        const nama3 = document.getElementById("nama3").value.trim();

        if (nik3 && !nama3) {
            alert("NIK PIC 3 tidak ditemukan di database.");
            return;
        }

        /* ========================================
           VALIDASI WAKTU
        ======================================== */

        const mulai   = document.getElementById("mulai").value;
        const selesai = document.getElementById("selesai").value;
        const durasi  = calculateDuration();

        if (durasi === null) {
            alert("Waktu selesai harus lebih besar dari waktu mulai.");
            return;
        }

        /* ========================================
           FOTO
        ======================================== */

        if (!fotoSebelumFile) {
            alert("Foto Sebelum wajib dipilih.");
            return;
        }

        if (!fotoSesudahFile) {
            alert("Foto Sesudah wajib dipilih.");
            return;
        }

        /* ========================================
           ID MESIN OPSIONAL
        ======================================== */

        const idMesin = document.getElementById("idMesin").value.trim();

        /* ========================================
           TANGGAL
        ======================================== */

        const tanggal = tanggalInput.value;

        /* ========================================
           FOLDER ID
           
           Contoh:
           280820261436
        ======================================== */

        const folderId = generateFolderId();

        /* ========================================
           CREATED AT
        ======================================== */

        const createdAt = generateCreatedAt();

        /* ========================================
           DISABLE BUTTON
        ======================================== */

        submitButton.disabled = true;

        submitButton.querySelector(".submit-icon").textContent = "⏳";
        submitButton.querySelector(".submit-text").textContent =
          "MENGIRIM LAPORAN...";

        try {

            /* ======================================
                UPLOAD FOTO SEBELUM
            ====================================== */

            showStatus(
                "Mengupload Foto Sebelum...",
                "loading"
            );

            const fotoSebelumPath = await uploadPhoto
            (
                fotoSebelumFile,
                folderId,
                "before"
            );

            /* ======================================
                UPLOAD FOTO SESUDAH
            ====================================== */

            showStatus(
                "Mengupload Foto Sesudah...",
                "loading"
            );


            const fotoSesudahPath = await uploadPhoto
            (
                fotoSesudahFile,
                folderId,
                "after"
            );

            /* ======================================
                SIMPAN KE DATABASE
            ====================================== */

            showStatus(
                "Menyimpan laporan...",
                "loading"
            );

            const {
                data,
                error
            } = await supabaseClient
                .from("laporan_kerja")
                .insert([{
                    tanggal: tanggal,
                    nik1: nik1,
                    nik2: nik2 || null,
                    nik3: nik3 || null,
                    pekerjaan: pekerjaan,
                    id_mesin: idMesin || null,
                    mulai: mulai,
                    selesai: selesai,
                    durasi: durasi,
                    foto_sebelum: fotoSebelumPath,
                    foto_sesudah: fotoSesudahPath,
                    created_at: createdAt,
                    factory: factory,
                    area: area,
                    line: line
                }])

            // .select()
            // .single();

            if (error) {
                console.error(
                    "Database Error:", error
                );

                throw error;
            }

            console.log(
                "Laporan berhasil:", data
            );

            /* ======================================
                BERHASIL
            ====================================== */

            showStatus(
                "✓ Laporan berhasil dikirim.",
                "success"
            );

            alert(
                "LAPORAN BERHASIL DIKIRIM\n\n" +
                "Folder Foto: " +
                folderId
            );

            /* ======================================
                RESET FORM
            ====================================== */

            resetForm();
        }

        catch (error) {
            console.error(
                "Error:", error
            );

            showStatus(
                "Laporan gagal dikirim: " +
                (error.message || error), "error"
            );

            alert(
                "LAPORAN GAGAL DIKIRIM\n\n" +
                (error.message || error)
            );
        }

        finally {
            submitButton.disabled = false;

            submitButton.querySelector(".submit-icon").textContent = "✓";
            submitButton.querySelector(".submit-text").textContent =
                "KIRIM LAPORAN";

        }
    }
);
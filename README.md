# Sepuluh — TTS Harian

Teka-teki silang bahasa Indonesia: tepat 10 soal pengetahuan umum per hari. Semua pemain mendapat papan yang sama. Pergantian hari pukul 00.00 Asia/Jakarta (WIB). Progres disimpan di localStorage browser, bukan akun.

## Stok awal
100 soal unik untuk 10 tanggal: 30 Oktober–8 November 2026. Setiap soal dan jawaban digunakan satu kali dalam stok ini. Stok terbatas, bukan generator AI tanpa batas. Setelah stok habis permainan menampilkan pemberitahuan; tidak mengulang papan lama.

Tidak membutuhkan API key, server berbayar, atau proses penjadwalan. Browser memilih puzzle yang telah disiapkan berdasarkan tanggal WIB. GitHub Pages meng-host file statis.

## Menambah stok
Tambahkan pasangan jawaban/petunjuk yang sudah diverifikasi ke tools/bank.cjs (jangan mengubah urutan soal lama karena ID mengikuti urutan). Jalankan `node tools/extend-stock.cjs`, periksa hasil, commit lalu push. Script menambah tanggal setelah tanggal terakhir tanpa mengubah puzzle yang sudah terbit dan mengecualikan ID/jawaban yang telah digunakan. Tambahkan minimal 10 soal yang dapat saling bersilangan; idealnya sediakan lebih banyak kandidat.

## Kontrol
Klik kotak atau petunjuk, ketik A–Z, Spasi/ganti arah pada persilangan, panah berpindah, Backspace menghapus, Tab petunjuk berikutnya. Periksa jawaban menandai huruf yang salah tanpa membocorkan jawaban. Bagikan hasil tidak menyertakan solusi. Reset meminta konfirmasi.

File jawaban tersedia di sumber statis sebagaimana permainan teka-teki publik lainnya. Progres hanya tersedia pada browser/perangkat yang sama.

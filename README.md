# FOREKES

Gerçek oynanabilir online top-down arena. Düz renkli, gradientsiz modern arayüz.

## Özellikler

- **3 harita**: Simetrik / Kapalı / Açık — parti ve tek oyuncuda seçilebilir
- **Maç sistemi**: süre (2/5/8 dk/süresiz) ve skor hedefi (10/20/30 kill) seçimi; maç sonunda sıralama ekranı
- **Tek Oyuncu**: botlara karşı antrenman (tamamen istemci tarafında çalışır), 3 zorluk seviyesi
- **Hızlı Oyna**: boş bir maça anında düş (rastgele harita + 5dk)
- **Parti**: oda kodu ile arkadaş toplulukları, lider maçı başlatır
- **Sohbet**: çok oyunculuda sağdaki panel (Enter ile açılır), emoji ile kışkırtma
- **Duvar fiziği**: oyuncular duvarlardan geçemez, mermiler duvara çarpar ve yok olur
- **3 silah**: Tabanca, Pompalı (saçma), Bazuka (roket + alan hasarı)
- **Bazuka fiziği**: roket engele/düşmana çarpınca orada patlar; çarpmazsa menzil sonunda patlar
- **ESC menüsü**: tek oyuncuda duraklatır + zorluk seçimi; online'da oyun arkada devam eder; ses seviyesi ayarı
- **Ping göstergesi**: HUD'da canlı ping
- **Silah sistemi**: silah başına menzil/şarjör/atış hızı + değiştirme cooldown'u
- **Sprint**: Shift ile koş, dayanıklılık barı
- **Skinler**: 10 skin, kupalarla açılan kilitler
- **Kupa sistemi**: eleme +1, ölüm -1; kalıcı sunucu veritabanı
- **Arkadaşlar**: çevrimiçi durum + tek tuşla katılma

## Kontroller

- WASD: hareket
- Mouse: nişan
- Sol tık: ateş
- 1 / 2 / 3 veya tekerlek: silah değiştir (Tabanca / Pompalı / Bazuka)
- R: şarjör değiştir
- Shift: koş (dayanıklılık barı, bitince koşamazsın)
- Enter: sohbet aç/kapat (çok oyunculu)
- ESC: menüyü aç/kapat (tek oyuncuda duraklatır)
- 10 oyuncuya kadar oda

## Çalıştırma

Node.js kurulu olmalı.

```bash
npm install
npm start
```

Sonra: http://localhost:3000

## GitHub Pages (statik, yalnız tek oyunculu)

Repo'nun kökündeki `index.html`, `client/` klasörüne yönlendirir. GitHub Pages'te sunucu olmadığı için oyun otomatik olarak **statik moda** geçer: yalnızca **Tek Oyuncu** çalışır, çok oyunculu butonları devre dışı kalır. Harita verisi istemciye gömülüdür.

Çok oyunculu için Node sunucusu zorunludur (aşağıya bak).

## Online yayınlama

Bu proje sürekli çalışan Node.js + Socket.IO server kullandığı için Node serverı çalıştırabilen bir platforma deploy edilmelidir (Render, Railway, Fly.io, kendi VPS'in).

Başlangıç komutu:

```bash
npm start
```

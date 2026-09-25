# Telefon Rehberi

Tarayıcıda çalışan, sunucu gerektirmeyen kişisel telefon rehberi. rehber.html dosyasını indirip tarayıcıda açın. Kişiler, o dosyayı açtığınız tarayıcının yerel depolamasında tutulur; farklı cihazlara veya tarayıcılara otomatik eşitlenmez.

## Özellikler

- Kişi ekleme, düzenleme, silme, ada göre sıralama ve arama.
- Şirkete göre filtreleme, sayfalama ve seçili kişileri toplu silme.
- Dar ekranlarda uyarlanan işlem düğmeleri ve yatay kaydırılabilir kişi tablosu.
- Aynı normalize edilmiş telefon numarasını taşıyan kayıtları görüntüleme, seçerek birleştirme veya tek kaydı koruma.
- UTF-8 CSV ve vCard 3.0 VCF içe/dışa aktarma.

## Kullanım

1. rehber.html dosyasını tarayıcıda açın.
2. Yeni kişi ekleyin veya Dosya Yükle üzerinden CSV/VCF dosyası seçin.
3. Önemli işlemlerden önce CSV veya VCF yedeği indirin. Tarayıcı verilerini temizlemek rehberi de silebilir.

CSV için başlık satırı zorunludur. Desteklenen başlıklar: Ad, Soyad, Telefon1, Telefon2, Email, Sirket; yaygın İngilizce karşılıkları da tanınır. Virgül içeren değerleri çift tırnak içine alın. VCF için FN/N, TEL, EMAIL ve ORG alanları okunur; ilk iki telefon numarası ve ilk e-posta saklanır. Çok alanlı veya özel kodlanmış vCard dosyalarında içe aktarma öncesi yedek ve örnek kayıt kontrolü yapın.

Eski VCF dosyalarındaki Quoted-Printable kodlanmış adlar UTF-8 veya belirtilen karakter kümesiyle çözülür. Önceki sürümün kodlu biçimde kaydettiği alanlar açılışta onarılır; ham verilerin kopyası tarayıcı depolamasında `contacts_backup_before_qp_repair` anahtarı altında tutulur. Onarımdan önce ayrıca CSV/VCF yedeği alın. İndirilen `rehber.html` dosyası kendiliğinden güncellenmez: yeni sürümü aynı dosya yoluna koyup yeniden açın; farklı dosya yolu/tarayıcı profilinde yerel rehber görünmeyebilir.

CSV dışa aktarımında elektronik tablo formülü olarak çalışabilecek alanlara apostrof eklenir. Dosyayı tekrar içe aldığınızda apostrof metnin parçası olabilir. VCF dışa aktarımı satırları CRLF ile yazar ve özel karakterleri kaçırır.

Tekrar edenler ekranında birleştirme, seçtiğiniz ilk kişinin dolu alanlarını korur; diğer kişilerden eksik alanları tamamlar. İkiden fazla farklı numara varsa işlem iptal edilir. Kişi silme ve birleştirme işlemlerinde onay istenir.

Arayüzdeki isteğe bağlı ikonlar ve Roboto fontu CDN üzerinden gelir; bunlar yüklenmese de temel rehber işlemleri çevrimdışı çalışır. Tarayıcınızın localStorage kotası dolarsa kaydetme uyarısı gösterilir.

## Test

Node.js yüklüyse depoda şu komutla ayrıştırıcı ve mükerrer kayıt testleri çalıştırılabilir:

    node tests/rehber.test.js

Bu proje Java gerektirmez; saf HTML, CSS ve JavaScript kullanır.

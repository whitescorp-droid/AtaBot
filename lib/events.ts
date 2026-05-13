export interface HistoricalEvent {
  date: string;
  title: string;
  description: string;
  imageUrl: string;
}

export const MILI_MUCADELE_EVENTS: HistoricalEvent[] = [
  {
    date: "19 Mayıs 1919",
    title: "Atatürk'ün Samsun'a Çıkışı",
    description: "Milli Mücadele'nin fiilen başladığı gün. Mustafa Kemal Paşa, Dokuzuncu Ordu Müfettişi olarak Bandırma Vapuru ile Samsun'a ayak bastı.",
    imageUrl: "https://picsum.photos/seed/samsun/800/600"
  },
  {
    date: "22 Haziran 1919",
    title: "Amasya Genelgesi",
    description: "'Vatanın bütünlüğü, milletin bağımsızlığı tehlikededir.' kararıyla Milli Mücadele'nin amacı, gerekçesi ve yöntemi dünyaya ilan edildi.",
    imageUrl: "https://picsum.photos/seed/amasya/800/600"
  },
  {
    date: "23 Temmuz 1919",
    title: "Erzurum Kongresi",
    description: "Milli sınırlar içinde vatanın bir bütün olduğu ve parçalanamayacağı ilk kez bu kongrede karara bağlandı.",
    imageUrl: "https://picsum.photos/seed/erzurum/800/600"
  },
  {
    date: "4 Eylül 1919",
    title: "Sivas Kongresi",
    description: "Tüm milli cemiyetler 'Anadolu ve Rumeli Müdafaa-i Hukuk Cemiyeti' adı altında birleştirildi, manda ve himaye kesin olarak reddedildi.",
    imageUrl: "https://picsum.photos/seed/sivas/800/600"
  },
  {
    date: "27 Aralık 1919",
    title: "Temsil Heyeti'nin Ankara'ya Gelişi",
    description: "Mustafa Kemal ve Temsil Heyeti, Milli Mücadele'nin merkezi olarak seçilen Ankara'ya coşkulu bir kalabalık eşliğinde ulaştı.",
    imageUrl: "https://picsum.photos/seed/ankara/800/600"
  },
  {
    date: "23 Nisan 1920",
    title: "TBMM'nin Açılışı",
    description: "Ankara'da Büyük Millet Meclisi açıldı. Egemenliğin kayıtsız şartsız millette olduğu tüm dünyaya ilan edildi.",
    imageUrl: "https://picsum.photos/seed/tbmm/800/600"
  },
  {
    date: "23 Ağustos 1921",
    title: "Sakarya Meydan Muharebesi",
    description: "22 gün 22 gece süren, tarihin en kanlı savaşlarından biri. 'Hattı müdafaa yoktur, sathı müdafaa vardır' emriyle zafer kazanıldı.",
    imageUrl: "https://picsum.photos/seed/sakarya/800/600"
  },
  {
    date: "26 Ağustos 1922",
    title: "Büyük Taarruz",
    description: "Kocatepe'den başlayan genel taarruz ile işgalci kuvvetlere son darbe vurulması amaçlandı.",
    imageUrl: "https://picsum.photos/seed/taarruz/800/600"
  },
  {
    date: "30 Ağustos 1922",
    title: "Zafer Bayramı",
    description: "Dumlupınar'da Başkomutanlık Meydan Muharebesi neticesinde büyük zafer kazanıldı ve Anadolu düşman işgalinden temizlendi.",
    imageUrl: "https://picsum.photos/seed/victory/800/600"
  },
  {
    date: "29 Ekim 1923",
    title: "Cumhuriyetin İlanı",
    description: "'Efendiler, yarın Cumhuriyeti ilan edeceğiz.' Milli Mücadele'nin taçlandığı, modern Türkiye'nin temellerinin atıldığı büyük gün.",
    imageUrl: "https://picsum.photos/seed/republic/800/600"
  }
];

/**
 * MEB Eğitim-Öğretim Takvimi Merkezi Veri Modülü
 * Türkiye Milli Eğitim Bakanlığı takvim yapısına uygun olarak düzenlenmiştir.
 * Yeni eğitim yılları bu nesneye kolayca eklenebilir veya tarihler güncellenebilir.
 */

export const SCHOOL_CALENDARS = {
    "2024-2025": {
        academicYear: "2024-2025",
        title: "2024 - 2025 Eğitim Öğretim Yılı",
        events: [
            {
                id: "school-start-24",
                key: "schoolStart",
                title: "Okulların Açılışı (1. Dönem)",
                shortTitle: "Okul Açılışı",
                date: "2024-09-09T08:30:00+03:00",
                endDate: null,
                icon: "🎒",
                type: "opening",
                description: "1. Dönem ders zili çalıyor ve yeni eğitim yılı başlıyor."
            },
            {
                id: "break-1-24",
                key: "firstBreak",
                title: "1. Dönem Ara Tatili",
                shortTitle: "1. Ara Tatil",
                date: "2024-11-11T00:00:00+03:00",
                endDate: "2024-11-15T23:59:59+03:00",
                resumeDate: "2024-11-18T08:30:00+03:00",
                icon: "🍂",
                type: "break",
                description: "Kasım ayı 1. ara tatili (Öğrenciler için ilk mola)."
            },
            {
                id: "semester-end-24",
                key: "firstSemesterEnd",
                title: "1. Dönem Sonu (Yarıyıl Tatili)",
                shortTitle: "1. Dönem Karneleri",
                date: "2025-01-17T17:00:00+03:00",
                endDate: "2025-01-31T23:59:59+03:00",
                resumeDate: "2025-02-03T08:30:00+03:00",
                icon: "📜",
                type: "semester_break",
                description: "1. Dönem karneleri dağıtılıyor ve 15 tatil başlıyor."
            },
            {
                id: "semester-start-25",
                key: "secondSemesterStart",
                title: "2. Dönem Başlangıcı",
                shortTitle: "2. Dönem Başlangıcı",
                date: "2025-02-03T08:30:00+03:00",
                endDate: null,
                icon: "📚",
                type: "semester_start",
                description: "Sömestr tatili bitti, 2. dönem dersleri başlıyor."
            },
            {
                id: "break-2-25",
                key: "secondBreak",
                title: "2. Dönem Ara Tatili",
                shortTitle: "2. Ara Tatil",
                date: "2025-03-31T00:00:00+03:00",
                endDate: "2025-04-04T23:59:59+03:00",
                resumeDate: "2025-04-07T08:30:00+03:00",
                icon: "🌸",
                type: "break",
                description: "Bahar ara tatili."
            },
            {
                id: "school-end-25",
                key: "schoolEnd",
                title: "Okulların Kapanışı (Yaz Tatili)",
                shortTitle: "Yaz Tatili",
                date: "2025-06-20T17:00:00+03:00",
                endDate: "2025-09-07T23:59:59+03:00",
                resumeDate: "2025-09-08T08:30:00+03:00",
                icon: "🌴",
                type: "closing",
                description: "Yıl sonu karneleri alınıyor ve büyük yaz tatili başlıyor!"
            }
        ]
    },
    "2025-2026": {
        academicYear: "2025-2026",
        title: "2025 - 2026 Eğitim Öğretim Yılı",
        events: [
            {
                id: "school-start-25",
                key: "schoolStart",
                title: "Okulların Açılışı (1. Dönem)",
                shortTitle: "Okul Açılışı",
                date: "2025-09-08T08:30:00+03:00",
                endDate: null,
                icon: "🎒",
                type: "opening",
                description: "2025-2026 Eğitim Öğretim Yılı 1. Dönemi başlıyor."
            },
            {
                id: "break-1-25",
                key: "firstBreak",
                title: "1. Dönem Ara Tatili",
                shortTitle: "1. Ara Tatil",
                date: "2025-11-10T00:00:00+03:00",
                endDate: "2025-11-14T23:59:59+03:00",
                resumeDate: "2025-11-17T08:30:00+03:00",
                icon: "🍂",
                type: "break",
                description: "1. Dönem Kasım ara tatili."
            },
            {
                id: "semester-end-25",
                key: "firstSemesterEnd",
                title: "1. Dönem Sonu (Yarıyıl Tatili)",
                shortTitle: "1. Dönem Karneleri",
                date: "2026-01-16T17:00:00+03:00",
                endDate: "2026-01-30T23:59:59+03:00",
                resumeDate: "2026-02-02T08:30:00+03:00",
                icon: "📜",
                type: "semester_break",
                description: "Yarıyıl (sömestr) tatili başlıyor."
            },
            {
                id: "semester-start-26",
                key: "secondSemesterStart",
                title: "2. Dönem Başlangıcı",
                shortTitle: "2. Dönem Başlangıcı",
                date: "2026-02-02T08:30:00+03:00",
                endDate: null,
                icon: "📚",
                type: "semester_start",
                description: "2. Dönem ders zili çalıyor."
            },
            {
                id: "break-2-26",
                key: "secondBreak",
                title: "2. Dönem Ara Tatili",
                shortTitle: "2. Ara Tatil",
                date: "2026-04-13T00:00:00+03:00",
                endDate: "2026-04-17T23:59:59+03:00",
                resumeDate: "2026-04-20T08:30:00+03:00",
                icon: "🌸",
                type: "break",
                description: "Nisan ayı 2. ara tatili."
            },
            {
                id: "school-end-26",
                key: "schoolEnd",
                title: "Okulların Kapanışı (Yaz Tatili)",
                shortTitle: "Yaz Tatili",
                date: "2026-06-19T17:00:00+03:00",
                endDate: "2026-09-13T23:59:59+03:00",
                resumeDate: "2026-09-14T08:30:00+03:00",
                icon: "🌴",
                type: "closing",
                description: "Karneler dağıtılıyor ve yaz tatili başlıyor!"
            }
        ]
    },
    "2026-2027": {
        academicYear: "2026-2027",
        title: "2026 - 2027 Eğitim Öğretim Yılı",
        events: [
            {
                id: "school-start-26",
                key: "schoolStart",
                title: "Okulların Açılışı (1. Dönem Başlangıcı)",
                shortTitle: "Okul Açılışı",
                date: "2026-09-14T08:30:00+03:00",
                endDate: null,
                icon: "🎒",
                type: "opening",
                description: "2026-2027 Eğitim Öğretim Yılı 1. Dönemi ilk ders zili çalıyor (14 Eylül 2026 Pazartesi)."
            },
            {
                id: "break-1-26",
                key: "firstBreak",
                title: "1. Dönem Ara Tatili",
                shortTitle: "1. Ara Tatil",
                date: "2026-11-16T00:00:00+03:00",
                endDate: "2026-11-20T23:59:59+03:00",
                resumeDate: "2026-11-23T08:30:00+03:00",
                icon: "🍂",
                type: "break",
                description: "1. Dönem ara tatili: 16 Kasım 2026 Pazartesi - 20 Kasım 2026 Cuma (Dersler 23 Kasım'da başlar)."
            },
            {
                id: "semester-end-26",
                key: "firstSemesterEnd",
                title: "1. Dönem Sonu (Karnelerin Verilmesi)",
                shortTitle: "1. Dönem Sonu",
                date: "2027-01-22T17:00:00+03:00",
                endDate: "2027-02-05T23:59:59+03:00",
                resumeDate: "2027-02-08T08:30:00+03:00",
                icon: "📜",
                type: "semester_break",
                description: "1. Dönemin sona ermesi: 22 Ocak 2027 Cuma karneler dağıtılıyor."
            },
            {
                id: "semester-break-27",
                key: "semesterBreak",
                title: "Yarıyıl Tatili (Sömestr - 15 Tatil)",
                shortTitle: "Yarıyıl Tatili",
                date: "2027-01-25T00:00:00+03:00",
                endDate: "2027-02-05T23:59:59+03:00",
                resumeDate: "2027-02-08T08:30:00+03:00",
                icon: "☕",
                type: "semester_break",
                description: "Yarıyıl tatili: 25 Ocak 2027 Pazartesi - 5 Şubat 2027 Cuma (2. Dönem 8 Şubat'ta başlar)."
            },
            {
                id: "semester-start-27",
                key: "secondSemesterStart",
                title: "2. Dönem Başlangıcı",
                shortTitle: "2. Dönem Başlangıcı",
                date: "2027-02-08T08:30:00+03:00",
                endDate: null,
                icon: "📚",
                type: "semester_start",
                description: "2. Dönem ders zili çalıyor (8 Şubat 2027 Pazartesi)."
            },
            {
                id: "break-2-27",
                key: "secondBreak",
                title: "2. Dönem Ara Tatili",
                shortTitle: "2. Ara Tatil",
                date: "2027-03-08T00:00:00+03:00",
                endDate: "2027-03-12T23:59:59+03:00",
                resumeDate: "2027-03-15T08:30:00+03:00",
                icon: "🌸",
                type: "break",
                description: "2. Dönem ara tatili: 8 Mart 2027 Pazartesi - 12 Mart 2027 Cuma (Dersler 15 Mart'ta başlar)."
            },
            {
                id: "school-end-27",
                key: "schoolEnd",
                title: "Eğitim Öğretim Yılı Sonu (Okulların Kapanışı)",
                shortTitle: "Yaz Tatili",
                date: "2027-06-25T17:00:00+03:00",
                endDate: "2027-09-12T23:59:59+03:00",
                resumeDate: "2027-09-13T08:30:00+03:00",
                icon: "🌴",
                type: "closing",
                description: "2026-2027 eğitim öğretim yılı sona eriyor ve yaz tatili başlıyor (25 Haziran 2027 Cuma)."
            }
        ]
    },
    "2027-2028": {
        academicYear: "2027-2028",
        title: "2027 - 2028 Eğitim Öğretim Yılı",
        events: [
            {
                id: "school-start-27",
                key: "schoolStart",
                title: "Okulların Açılışı (1. Dönem)",
                shortTitle: "Okul Açılışı",
                date: "2027-09-13T08:30:00+03:00",
                endDate: null,
                icon: "🎒",
                type: "opening",
                description: "2027-2028 Eğitim Öğretim Yılı başlangıcı."
            },
            {
                id: "break-1-27",
                key: "firstBreak",
                title: "1. Dönem Ara Tatili",
                shortTitle: "1. Ara Tatil",
                date: "2027-11-08T00:00:00+03:00",
                endDate: "2027-11-12T23:59:59+03:00",
                resumeDate: "2027-11-15T08:30:00+03:00",
                icon: "🍂",
                type: "break",
                description: "Kasım ara tatili."
            },
            {
                id: "semester-end-27",
                key: "firstSemesterEnd",
                title: "1. Dönem Sonu (Yarıyıl Tatili)",
                shortTitle: "1. Dönem Karneleri",
                date: "2028-01-21T17:00:00+03:00",
                endDate: "2028-02-04T23:59:59+03:00",
                resumeDate: "2028-02-07T08:30:00+03:00",
                icon: "📜",
                type: "semester_break",
                description: "Yarıyıl tatili başlıyor."
            },
            {
                id: "semester-start-28",
                key: "secondSemesterStart",
                title: "2. Dönem Başlangıcı",
                shortTitle: "2. Dönem Başlangıcı",
                date: "2028-02-07T08:30:00+03:00",
                endDate: null,
                icon: "📚",
                type: "semester_start",
                description: "2. Dönem dersleri başlıyor."
            },
            {
                id: "break-2-28",
                key: "secondBreak",
                title: "2. Dönem Ara Tatili",
                shortTitle: "2. Ara Tatil",
                date: "2028-04-10T00:00:00+03:00",
                endDate: "2028-04-14T23:59:59+03:00",
                resumeDate: "2028-04-17T08:30:00+03:00",
                icon: "🌸",
                type: "break",
                description: "Nisan ara tatili."
            },
            {
                id: "school-end-28",
                key: "schoolEnd",
                title: "Okulların Kapanışı (Yaz Tatili)",
                shortTitle: "Yaz Tatili",
                date: "2028-06-16T17:00:00+03:00",
                endDate: "2028-09-10T23:59:59+03:00",
                resumeDate: "2028-09-11T08:30:00+03:00",
                icon: "🌴",
                type: "closing",
                description: "Yaz tatili başlangıcı."
            }
        ]
    }
};

/**
 * Mevcut tarihe göre aktif veya en uygun eğitim-öğretim yılını otomatik seçer
 * @param {Date} date 
 * @returns {Object} Aktif akademik yıl nesnesi
 */
export function getActiveCalendar(date = new Date()) {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth(); // 0 = Ocak, 8 = Eylül
    
    // Eğitim yılı genellikle Eylül (ay 8) ayında başlar, bir sonraki yılın Haziranında biter
    let targetKey = `${currentYear}-${currentYear + 1}`;
    if (currentMonth < 7) {
        // Ocak - Temmuz arası bir önceki yılın eğitim yılıdır
        targetKey = `${currentYear - 1}-${currentYear}`;
    }

    if (SCHOOL_CALENDARS[targetKey]) {
        return SCHOOL_CALENDARS[targetKey];
    }

    // Bulunamazsa en yakın mevcut takvimi dön
    const keys = Object.keys(SCHOOL_CALENDARS);
    return SCHOOL_CALENDARS[keys[keys.length - 1]];
}

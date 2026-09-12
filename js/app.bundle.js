(function(){
"use strict";
/**
 * MEB Eğitim-Öğretim Takvimi Merkezi Veri Modülü
 * Türkiye Milli Eğitim Bakanlığı takvim yapısına uygun olarak düzenlenmiştir.
 * Yeni eğitim yılları bu nesneye kolayca eklenebilir veya tarihler güncellenebilir.
 */

const SCHOOL_CALENDARS = {
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
function getActiveCalendar(date = new Date()) {
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

﻿/**
 * Zaman ve Geri Sayım Hesaplama Motoru (TimeEngine)
 * Türkiye Saat Dilimi (Europe/Istanbul UTC+3) ve gerçek zaman farkı (Target - Now) ile çalışır.
 */



class TimeEngine {
    constructor() {
        this.timeZone = "Europe/Istanbul";
        this.selectedMilestoneId = null; // null = otomatik (en yakın etkinlik)
        this.selectedAcademicYear = null; // null = otomatik tespit
    }

    /**
     * Güncel Türkiye saatini Date nesnesi olarak döner
     */
    getNow() {
        return new Date();
    }

    /**
     * Belirtilen Date nesnesini Türkiye saat diliminde biçimlendirir
     */
    formatTurkishDate(date, includeTime = false, includeSeconds = false) {
        if (!date) return "";
        const d = typeof date === 'string' ? new Date(date) : date;
        
        const options = {
            timeZone: this.timeZone,
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        };

        if (includeTime) {
            options.hour = '2-digit';
            options.minute = '2-digit';
            if (includeSeconds) {
                options.second = '2-digit';
            }
        }

        return new Intl.DateTimeFormat('tr-TR', options).format(d);
    }

    /**
     * Sadece Türkiye saatini HH:mm:ss formatında döner
     */
    formatTurkishTime(date = new Date()) {
        return new Intl.DateTimeFormat('tr-TR', {
            timeZone: this.timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(date);
    }

    /**
     * Tarih farkını Gün, Saat, Dakika, Saniye olarak tam hesaplar
     */
    calculateDiff(targetDate, nowDate = new Date()) {
        const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
        const targetTime = target.getTime();
        const nowTime = nowDate.getTime();
        const diffMs = targetTime - nowTime;

        if (diffMs <= 0) {
            return {
                isFinished: true,
                totalMs: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                formatted: "00:00:00:00"
            };
        }

        const totalSeconds = Math.floor(diffMs / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return {
            isFinished: false,
            totalMs: diffMs,
            totalSeconds,
            days,
            hours,
            minutes,
            seconds,
            formattedDays: String(days).padStart(2, '0'),
            formattedHours: String(hours).padStart(2, '0'),
            formattedMinutes: String(minutes).padStart(2, '0'),
            formattedSeconds: String(seconds).padStart(2, '0')
        };
    }

    /**
     * Aktif akademik takvimi ve tüm etkinlikleri analiz ederek mevcut okul durumunu tespit eder
     */
    getCurrentStatus(customDate = null) {
        const now = customDate || this.getNow();
        const nowMs = now.getTime();
        
        let calendar = this.selectedAcademicYear 
            ? SCHOOL_CALENDARS[this.selectedAcademicYear] 
            : getActiveCalendar(now);
            
        if (!calendar) {
            calendar = getActiveCalendar(now);
        }

        const events = calendar.events.map(ev => ({
            ...ev,
            startMs: new Date(ev.date).getTime(),
            endMs: ev.endDate ? new Date(ev.endDate).getTime() : null,
            resumeMs: ev.resumeDate ? new Date(ev.resumeDate).getTime() : null,
            isPassed: new Date(ev.date).getTime() <= nowMs
        }));

        const schoolStart = events.find(e => e.key === 'schoolStart');
        const firstBreak = events.find(e => e.key === 'firstBreak');
        const firstSemesterEnd = events.find(e => e.key === 'firstSemesterEnd');
        const secondSemesterStart = events.find(e => e.key === 'secondSemesterStart');
        const secondBreak = events.find(e => e.key === 'secondBreak');
        const schoolEnd = events.find(e => e.key === 'schoolEnd');

        let statusType = "unknown";
        let statusBadge = "Durum Belirleniyor";
        let statusTitle = "Okulların Açılmasına Ne Kadar Kaldı?";
        let heroSubtitle = "2026-2027 Eğitim Öğretim Yılı için Canlı Geri Sayım";
        let targetEvent = schoolStart;
        let isSchoolOpen = false;
        let activeBreak = null;

        // 1. Durum: Okullar henüz açılmadı (Yaz Tatili aktif)
        if (schoolStart && nowMs < schoolStart.startMs) {
            statusType = "summer_holiday_before";
            statusBadge = "🌴 Yaz Tatili";
            statusTitle = "Okulların Açılmasına Ne Kadar Kaldı?";
            heroSubtitle = "Yeni eğitim-öğretim yılı ilk ders ziline kalan süre:";
            targetEvent = schoolStart;
            isSchoolOpen = false;
        }
        // 2. Durum: 1. Dönem başladı, 1. Ara Tatile kadar
        else if (firstBreak && nowMs < firstBreak.startMs) {
            statusType = "semester_1_active";
            statusBadge = "🏫 Okullar Açık (1. Dönem)";
            statusTitle = "Okulların Kapanmasına (Yaz Tatiline) Ne Kadar Kaldı?";
            heroSubtitle = "1. Dönem dersleri devam ediyor. Sıradaki mola: 1. Ara Tatil";
            targetEvent = schoolEnd || firstBreak;
            isSchoolOpen = true;
        }
        // 3. Durum: 1. Ara Tatil devam ediyor
        else if (firstBreak && firstBreak.resumeMs && nowMs >= firstBreak.startMs && nowMs < firstBreak.resumeMs) {
            statusType = "first_break_active";
            statusBadge = "🍂 1. Ara Tatil";
            statusTitle = "Okulların Yeniden Açılmasına Ne Kadar Kaldı?";
            heroSubtitle = "Kasım ara tatili devam ediyor. Derslerin başlamasına kalan süre:";
            targetEvent = {
                id: "first-break-resume",
                title: "1. Ara Tatil Bitişi (Ders Başı)",
                shortTitle: "Ders Başı",
                date: firstBreak.resumeDate,
                icon: "🎒"
            };
            activeBreak = firstBreak;
            isSchoolOpen = false;
        }
        // 4. Durum: 1. Ara Tatil bitti, Yarıyıl Tatiline (1. Dönem sonuna) kadar
        else if (firstSemesterEnd && nowMs < firstSemesterEnd.startMs) {
            statusType = "semester_1_resumed";
            statusBadge = "🏫 Okullar Açık (1. Dönem)";
            statusTitle = "Yarıyıl Tatiline (Sömestr) Ne Kadar Kaldı?";
            heroSubtitle = "1. Dönem karnelerinin dağıtılmasına kalan süre:";
            targetEvent = firstSemesterEnd;
            isSchoolOpen = true;
        }
        // 5. Durum: Yarıyıl Tatili (15 Tatil) devam ediyor
        else if (secondSemesterStart && nowMs >= firstSemesterEnd.startMs && nowMs < secondSemesterStart.startMs) {
            statusType = "semester_break_active";
            statusBadge = "📜 Yarıyıl Tatili (Sömestr)";
            statusTitle = "2. Dönemin Başlamasına Ne Kadar Kaldı?";
            heroSubtitle = "15 günlük yarıyıl tatili devam ediyor. 2. döneme kalan süre:";
            targetEvent = secondSemesterStart;
            activeBreak = firstSemesterEnd;
            isSchoolOpen = false;
        }
        // 6. Durum: 2. Dönem başladı, 2. Ara Tatile kadar
        else if (secondBreak && nowMs < secondBreak.startMs) {
            statusType = "semester_2_active";
            statusBadge = "🏫 Okullar Açık (2. Dönem)";
            statusTitle = "Okulların Kapanmasına (Yaz Tatiline) Ne Kadar Kaldı?";
            heroSubtitle = "2. Dönem devam ediyor. Sıradaki mola: 2. Ara Tatil";
            targetEvent = schoolEnd || secondBreak;
            isSchoolOpen = true;
        }
        // 7. Durum: 2. Ara Tatil devam ediyor
        else if (secondBreak && secondBreak.resumeMs && nowMs >= secondBreak.startMs && nowMs < secondBreak.resumeMs) {
            statusType = "second_break_active";
            statusBadge = "🌸 2. Ara Tatil";
            statusTitle = "Okulların Yeniden Açılmasına Ne Kadar Kaldı?";
            heroSubtitle = "Bahar ara tatili devam ediyor. Derslerin başlamasına kalan süre:";
            targetEvent = {
                id: "second-break-resume",
                title: "2. Ara Tatil Bitişi (Ders Başı)",
                shortTitle: "Ders Başı",
                date: secondBreak.resumeDate,
                icon: "🎒"
            };
            activeBreak = secondBreak;
            isSchoolOpen = false;
        }
        // 8. Durum: 2. Ara Tatil bitti, Okulların Kapanışına kadar
        else if (schoolEnd && nowMs < schoolEnd.startMs) {
            statusType = "school_closing_soon";
            statusBadge = "🏫 Okullar Açık (Yıl Sonu Yaklaşıyor)";
            statusTitle = "Okulların Kapanmasına (Yaz Tatiline) Ne Kadar Kaldı?";
            heroSubtitle = "Eğitim yılının son haftaları! Yaz tatili ve karnelere kalan süre:";
            targetEvent = schoolEnd;
            isSchoolOpen = true;
        }
        // 9. Durum: Okullar kapandı (Büyük Yaz Tatili Başladı)
        else {
            statusType = "summer_holiday_active";
            statusBadge = "🌴 Yaz Tatili";
            statusTitle = "Yeni Eğitim Yılı Açılışına Ne Kadar Kaldı?";
            heroSubtitle = "Yaz tatili devam ediyor! Gelecek eğitim-öğretim yılı başlangıcı:";
            
            // Gelecek akademik takvimi bul
            const keys = Object.keys(SCHOOL_CALENDARS);
            const currentIndex = keys.indexOf(calendar.academicYear);
            if (currentIndex !== -1 && currentIndex + 1 < keys.length) {
                const nextYearKey = keys[currentIndex + 1];
                const nextCal = SCHOOL_CALENDARS[nextYearKey];
                const nextSchoolStart = nextCal.events.find(e => e.key === 'schoolStart');
                targetEvent = nextSchoolStart || schoolEnd;
            } else {
                targetEvent = schoolEnd;
            }
            isSchoolOpen = false;
        }

        // Kullanıcı özel bir etkinlik seçtiyse hedefi o yap
        if (this.selectedMilestoneId) {
            const chosen = events.find(e => e.id === this.selectedMilestoneId);
            if (chosen) {
                targetEvent = chosen;
                statusTitle = `${chosen.title} İçin Kalan Süre`;
                heroSubtitle = chosen.description || "Seçilen tarih için canlı geri sayım";
            }
        }

        // Sıradaki en yakın etkinliği bul
        const upcomingEvents = events
            .filter(e => e.startMs > nowMs)
            .sort((a, b) => a.startMs - b.startMs);
        const nextMilestone = upcomingEvents.length > 0 ? upcomingEvents[0] : null;

        return {
            calendar,
            events,
            statusType,
            statusBadge,
            statusTitle,
            heroSubtitle,
            targetEvent,
            nextMilestone,
            isSchoolOpen,
            activeBreak,
            now
        };
    }
}

﻿/**
 * Eğitim Öğretim İstatistikleri Hesaplama Motoru (StatsEngine)
 */

class StatsEngine {
    /**
     * Takvim ve güncel tarihe göre detaylı eğitim istatistikleri üretir
     */
    static calculateStats(calendar, nowDate = new Date()) {
        if (!calendar || !calendar.events) {
            return null;
        }

        const events = calendar.events;
        const schoolStartEv = events.find(e => e.key === 'schoolStart');
        const schoolEndEv = events.find(e => e.key === 'schoolEnd');
        const firstBreakEv = events.find(e => e.key === 'firstBreak');
        const semEndEv = events.find(e => e.key === 'firstSemesterEnd');
        const semStartEv = events.find(e => e.key === 'secondSemesterStart');
        const secondBreakEv = events.find(e => e.key === 'secondBreak');

        if (!schoolStartEv || !schoolEndEv) {
            return null;
        }

        const startTime = new Date(schoolStartEv.date).getTime();
        const endTime = new Date(schoolEndEv.date).getTime();
        const nowTime = nowDate.getTime();

        const totalDurationMs = Math.max(0, endTime - startTime);
        const totalYearDays = Math.ceil(totalDurationMs / (1000 * 60 * 60 * 24));

        let elapsedDays = 0;
        let remainingDays = 0;
        let percentage = 0;

        if (nowTime < startTime) {
            // Yıl henüz başlamadı
            elapsedDays = 0;
            remainingDays = totalYearDays;
            percentage = 0;
        } else if (nowTime >= endTime) {
            // Yıl bitti
            elapsedDays = totalYearDays;
            remainingDays = 0;
            percentage = 100;
        } else {
            // Yıl devam ediyor
            const elapsedMs = nowTime - startTime;
            elapsedDays = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));
            remainingDays = Math.max(0, totalYearDays - elapsedDays);
            percentage = Math.min(100, Math.max(0, Math.round((elapsedMs / totalDurationMs) * 100)));
        }

        // Toplam okul günü ve tatil günü tahmini (MEB ortalama ~180 iş günü)
        // 36-38 haftalık eğitim dönemi ~ 180 iş günü, geri kalanı hafta sonları ve resmi ara tatiller
        const approximateSchoolWorkDays = 180;
        const approximateTotalHolidayDays = totalYearDays - approximateSchoolWorkDays + 90; // +yaz tatili ~90 gün

        // 1. Dönem ve 2. Dönem durumları
        let semesterInfo = {
            currentSemester: 1,
            label: "1. Dönem"
        };

        if (semStartEv && nowTime >= new Date(semStartEv.date).getTime()) {
            semesterInfo.currentSemester = 2;
            semesterInfo.label = "2. Dönem";
        }

        return {
            academicYear: calendar.academicYear,
            totalYearDays,
            elapsedDays,
            remainingDays,
            percentage,
            approximateSchoolWorkDays,
            approximateTotalHolidayDays,
            semesterInfo
        };
    }
}

﻿/**
 * Takvim Dışa Aktarma ve Paylaşım Modülü (CalendarExporter)
 * Google Calendar, Apple / Outlook (.ics) ve Sosyal Paylaşım desteği
 */

class CalendarExporter {
    /**
     * ISO tarihini ICS formatına (YYYYMMDDTHHMMSSZ veya YYYYMMDDTHHMMSS) çevirir
     */
    static formatICSDate(isoString) {
        const d = new Date(isoString);
        return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    }

    /**
     * Tek bir etkinlik için Google Calendar bağlantısı üretir
     */
    static getGoogleCalendarUrl(event) {
        const title = encodeURIComponent(`MEB: ${event.title}`);
        const details = encodeURIComponent(`${event.description || event.title}\n\nOkul Takvimi Canlı Takip: ${window.location.origin}`);
        const startDate = this.formatICSDate(event.date);
        
        let endDate;
        if (event.endDate) {
            endDate = this.formatICSDate(event.endDate);
        } else {
            // 2 saatlik varsayılan süre
            const d = new Date(event.date);
            d.setHours(d.getHours() + 2);
            endDate = this.formatICSDate(d.toISOString());
        }

        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=T%C3%BCrkiye`;
    }

    /**
     * Tüm takvimi veya seçilen etkinliği .ics dosyası olarak indirir
     */
    static downloadICS(events, filename = "MEB_Okul_Takvimi.ics") {
        let icsContent = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Okul Sayaci//MEB Egitim Takvimi//TR",
            "CALSCALE:GREGORIAN",
            "METHOD:PUBLISH",
            "X-WR-CALNAME:MEB Okul Takvimi",
            "X-WR-TIMEZONE:Europe/Istanbul"
        ];

        events.forEach(ev => {
            const start = this.formatICSDate(ev.date);
            let end = ev.endDate ? this.formatICSDate(ev.endDate) : null;
            if (!end) {
                const d = new Date(ev.date);
                d.setHours(d.getHours() + 2);
                end = this.formatICSDate(d.toISOString());
            }

            icsContent.push(
                "BEGIN:VEVENT",
                `UID:${ev.id}-${Date.now()}@okulsayaci.com`,
                `DTSTAMP:${this.formatICSDate(new Date().toISOString())}`,
                `DTSTART:${start}`,
                `DTEND:${end}`,
                `SUMMARY:MEB: ${ev.title}`,
                `DESCRIPTION:${ev.description || ev.title}`,
                "STATUS:CONFIRMED",
                "LOCATION:Türkiye",
                "END:VEVENT"
            );
        });

        icsContent.push("END:VCALENDAR");

        const blob = new Blob([icsContent.join("\r\n")], { type: "text/calendar;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }

    /**
     * Sayfa durumunu veya geri sayımı paylaşır
     */
    static async shareStatus(title, text, url = window.location.href) {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: text,
                    url: url
                });
                return { success: true, method: "native" };
            } catch (err) {
                if (err.name !== "AbortError") {
                    return this.copyToClipboard(url);
                }
                return { success: false, aborted: true };
            }
        } else {
            return this.copyToClipboard(url);
        }
    }

    /**
     * Panoya kopyalama yardımcısı
     */
    static async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return { success: true, method: "clipboard" };
        } catch (err) {
            // Fallback execCommand
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.select();
            const successful = document.execCommand("copy");
            document.body.removeChild(textarea);
            return { success: successful, method: "clipboard" };
        }
    }
}

﻿/**
 * Bildirim Yönetimi Modülü (NotificationManager)
 * Web Notifications API ile kullanıcılara hatırlatma sağlar
 */

class NotificationManager {
    constructor() {
        this.storageKey = "okul_sayaci_notif_pref";
    }

    static isSupported() {
        return "Notification" in window;
    }

    static getPermission() {
        if (!this.isSupported()) return "denied";
        return Notification.permission;
    }

    static async requestPermission() {
        if (!this.isSupported()) {
            return { granted: false, error: "Tarayıcınız bildirim özelliğini desteklemiyor." };
        }

        try {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                this.sendNotification("🔔 Bildirimler Açıldı!", {
                    body: "Okulların açılışı, tatiller ve sınav dönemleri yaklaştığında size bildirim göndereceğiz.",
                    icon: "assets/favicon.svg"
                });
                localStorage.setItem("okul_sayaci_notif_enabled", "true");
                return { granted: true };
            } else {
                localStorage.setItem("okul_sayaci_notif_enabled", "false");
                return { granted: false, permission };
            }
        } catch (e) {
            return { granted: false, error: e.message };
        }
    }

    static sendNotification(title, options = {}) {
        if (this.getPermission() === "granted") {
            try {
                return new Notification(title, {
                    icon: "assets/favicon.svg",
                    badge: "assets/favicon.svg",
                    ...options
                });
            } catch (e) {
                console.warn("Bildirim gönderilemedi:", e);
            }
        }
        return null;
    }
}

/**
 * UI Yönetimi ve DOM Render Modülü (UIManager)
 */






class UIManager {
    constructor(timeEngine) {
        this.timeEngine = timeEngine;
        this.prevSeconds = null;
        this.prevMinutes = null;
        this.prevHours = null;
        this.prevDays = null;

        this.initDOMElements();
        this.initTheme();
        this.initEventListeners();
    }

    initDOMElements() {
        this.dom = {
            themeToggle: document.getElementById('btn-theme-toggle'),
            notificationToggle: document.getElementById('btn-notification-toggle'),
            themeMeta: document.getElementById('theme-color-meta'),
            headerLiveTime: document.getElementById('header-live-time'),
            academicYearSelector: document.getElementById('academic-year-selector'),
            
            // Hero
            statusBadgeContainer: document.getElementById('status-badge-container'),
            statusBadgeIcon: document.getElementById('status-badge-icon'),
            statusBadgeText: document.getElementById('status-badge-text'),
            mainHeroTitle: document.getElementById('main-hero-title'),
            liveHeroDate: document.getElementById('live-hero-date'),
            liveHeroTime: document.getElementById('live-hero-time'),
            heroSubtitleText: document.getElementById('hero-subtitle-text'),

            // Countdown Numbers
            countdownDays: document.getElementById('countdown-days'),
            countdownHours: document.getElementById('countdown-hours'),
            countdownMinutes: document.getElementById('countdown-minutes'),
            countdownSeconds: document.getElementById('countdown-seconds'),
            quickMilestoneTabs: document.getElementById('quick-milestone-tabs'),

            // Actions
            btnShareMain: document.getElementById('btn-share-main'),
            btnCopyInfo: document.getElementById('btn-copy-info'),
            btnAddCalendar: document.getElementById('btn-add-to-calendar'),
            btnDownloadAllCalendar: document.getElementById('btn-download-all-calendar'),

            // Date Info Grid
            infoTodayDate: document.getElementById('info-today-date'),
            infoTurkeyTime: document.getElementById('info-turkey-time'),
            infoOpeningDate: document.getElementById('info-opening-date'),
            infoOpeningSub: document.getElementById('info-opening-sub'),
            infoClosingDate: document.getElementById('info-closing-date'),
            infoClosingSub: document.getElementById('info-closing-sub'),

            // Calendar Cards
            calendarSectionTitle: document.getElementById('calendar-section-title'),
            calendarGrid: document.getElementById('calendar-milestones-grid'),

            // Stats
            statsPercentText: document.getElementById('stats-percent-text'),
            statsProgressFill: document.getElementById('stats-progress-fill'),
            statTotalDays: document.getElementById('stat-total-days'),
            statElapsedDays: document.getElementById('stat-elapsed-days'),
            statRemainingDays: document.getElementById('stat-remaining-days'),
            statWorkDays: document.getElementById('stat-work-days'),
            statHolidayDays: document.getElementById('stat-holiday-days'),

            // Toast
            toastContainer: document.getElementById('toast-container')
        };
    }

    initTheme() {
        const savedTheme = localStorage.getItem('okul_sayaci_theme') || 'dark';
        this.setTheme(savedTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('okul_sayaci_theme', theme);
        if (this.dom.themeToggle) {
            this.dom.themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
            this.dom.themeToggle.title = theme === 'dark' ? 'Aydınlık Temaya Geç' : 'Karanlık Temaya Geç';
        }
        if (this.dom.themeMeta && this.dom.themeMeta.setAttribute) {
            this.dom.themeMeta.setAttribute('content', theme === 'dark' ? '#0a0e1a' : '#f1f5f9');
        }
    }

    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        this.setTheme(next);
    }

    initEventListeners() {
        if (this.dom.themeToggle) {
            this.dom.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        if (this.dom.notificationToggle) {
            this.dom.notificationToggle.addEventListener('click', async () => {
                const res = await NotificationManager.requestPermission();
                if (res.granted) {
                    this.showToast("🔔 Bildirimler başarıyla aktif edildi!", "success");
                } else {
                    this.showToast("⚠️ Bildirim izni verilmedi veya desteklenmiyor.", "warning");
                }
            });
        }

        if (this.dom.btnShareMain) {
            this.dom.btnShareMain.addEventListener('click', () => {
                const status = this.timeEngine.getCurrentStatus();
                const diff = this.timeEngine.calculateDiff(status.targetEvent.date, status.now);
                const shareText = `${status.statusTitle}\nKalan Süre: ${diff.days} Gün ${diff.hours} Saat ${diff.minutes} Dakika ${diff.seconds} Saniye\n\nCanlı Takip Et:`;
                CalendarExporter.shareStatus(status.statusTitle, shareText).then(res => {
                    if (res && res.method === "clipboard") {
                        this.showToast("🔗 Paylaşım bağlantısı panoya kopyalandı!", "info");
                    }
                });
            });
        }

        if (this.dom.btnCopyInfo) {
            this.dom.btnCopyInfo.addEventListener('click', () => {
                const status = this.timeEngine.getCurrentStatus();
                const diff = this.timeEngine.calculateDiff(status.targetEvent.date, status.now);
                const text = `📌 ${status.calendar.title}\n\nBugünün Tarihi: ${this.timeEngine.formatTurkishDate(status.now, true)}\n${status.statusTitle}: ${diff.days} Gün ${diff.hours} Saat ${diff.minutes} Dakika ${diff.seconds} Saniye\nHedef Tarih: ${this.timeEngine.formatTurkishDate(status.targetEvent.date, true)}\n\nCanlı takip: ${window.location.href}`;
                CalendarExporter.copyToClipboard(text).then(() => {
                    this.showToast("📋 Tüm tarih bilgileri panoya kopyalandı!", "success");
                });
            });
        }

        if (this.dom.btnAddCalendar) {
            this.dom.btnAddCalendar.addEventListener('click', () => {
                const status = this.timeEngine.getCurrentStatus();
                if (status.targetEvent) {
                    CalendarExporter.downloadICS([status.targetEvent], `${status.targetEvent.id || 'etkinlik'}.ics`);
                    this.showToast("📅 Takvim dosyası (.ics) indirildi!", "success");
                }
            });
        }

        if (this.dom.btnDownloadAllCalendar) {
            this.dom.btnDownloadAllCalendar.addEventListener('click', () => {
                const status = this.timeEngine.getCurrentStatus();
                if (status.calendar && status.calendar.events) {
                    CalendarExporter.downloadICS(status.calendar.events, `MEB_${status.calendar.academicYear}_Takvimi.ics`);
                    this.showToast(`📅 ${status.calendar.academicYear} eğitim takvimi (.ics) indirildi!`, "success");
                }
            });
        }

        // Güvenlik & Kısayol Engelleme (F12, Sağ Tık, Ctrl+U, Ctrl+Shift+I vb.)
        this.initSecurityGuards();
    }

    initSecurityGuards() {
        // Sağ Tık Menüsünü Engelle
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showToast("🔒 Güvenlik: Sağ tık menüsü devre dışı bırakıldı.", "warning");
            return false;
        });

        // F12 ve Geliştirici Kısayollarını Engelle
        document.addEventListener('keydown', (e) => {
            const key = e.key || e.keyCode;
            const isCtrl = e.ctrlKey || e.metaKey;
            const isShift = e.shiftKey;

            // F12
            if (key === 'F12' || e.keyCode === 123) {
                e.preventDefault();
                e.stopPropagation();
                this.showToast("🔒 F12 Geliştirici Araçları devre dışı bırakılmıştır.", "warning");
                return false;
            }

            // Ctrl + U (Kaynak Kodunu Görüntüle)
            if (isCtrl && (key === 'u' || key === 'U' || e.keyCode === 85)) {
                e.preventDefault();
                e.stopPropagation();
                this.showToast("🔒 Kaynak kodunu görüntüleme engellenmiştir.", "warning");
                return false;
            }

            // Ctrl + Shift + I / J / C / K (DevTools)
            if (isCtrl && isShift && (key === 'I' || key === 'i' || key === 'J' || key === 'j' || key === 'C' || key === 'c' || key === 'K' || key === 'k' || [73, 74, 67, 75].includes(e.keyCode))) {
                e.preventDefault();
                e.stopPropagation();
                this.showToast("🔒 Geliştirici konsolu engellenmiştir.", "warning");
                return false;
            }

            // Ctrl + S (Sayfayı Kaydet)
            if (isCtrl && (key === 's' || key === 'S' || e.keyCode === 83)) {
                e.preventDefault();
                e.stopPropagation();
                this.showToast("🔒 Sayfayı kaydetme kısayolu devre dışı bırakıldı.", "warning");
                return false;
            }

            // Ctrl + P (Yazdır)
            if (isCtrl && (key === 'p' || key === 'P' || e.keyCode === 80)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }, true);
    }

    /**
     * Akademik yıl seçim butonlarını çizer
     */
    renderAcademicYearSelector(activeYearKey) {
        if (!this.dom.academicYearSelector) return;
        this.dom.academicYearSelector.innerHTML = '';

        const keys = Object.keys(SCHOOL_CALENDARS);
        keys.forEach(key => {
            const btn = document.createElement('button');
            btn.className = `year-pill ${key === activeYearKey ? 'active' : ''}`;
            btn.textContent = `${key} Takvimi`;
            btn.addEventListener('click', () => {
                this.timeEngine.selectedAcademicYear = key;
                this.timeEngine.selectedMilestoneId = null;
                this.renderAll();
                this.showToast(`📅 ${key} Eğitim Takvimi seçildi.`, "info");
            });
            this.dom.academicYearSelector.appendChild(btn);
        });
    }

    /**
     * Hızlı hedef seçim sekmelerini çizer
     */
    renderQuickMilestoneTabs(calendar, activeMilestoneId) {
        if (!this.dom.quickMilestoneTabs) return;
        this.dom.quickMilestoneTabs.innerHTML = '';

        // Otomatik butonu
        const autoBtn = document.createElement('button');
        autoBtn.className = `quick-btn ${activeMilestoneId === null ? 'active' : ''}`;
        autoBtn.innerHTML = `<span>⚡</span> Otomatik (Sıradaki)`;
        autoBtn.addEventListener('click', () => {
            this.timeEngine.selectedMilestoneId = null;
            this.renderAll();
        });
        this.dom.quickMilestoneTabs.appendChild(autoBtn);

        // Takvimdeki etkinlikler
        calendar.events.forEach(ev => {
            const btn = document.createElement('button');
            btn.className = `quick-btn ${activeMilestoneId === ev.id ? 'active' : ''}`;
            btn.innerHTML = `<span>${ev.icon}</span> ${ev.shortTitle || ev.title}`;
            btn.addEventListener('click', () => {
                this.timeEngine.selectedMilestoneId = ev.id;
                this.renderAll();
            });
            this.dom.quickMilestoneTabs.appendChild(btn);
        });
    }

    /**
     * Detaylı MEB Takvim Kartlarını oluşturur
     */
    renderCalendarCards(status) {
        if (!this.dom.calendarGrid) return;
        this.dom.calendarGrid.innerHTML = '';

        const nowMs = status.now.getTime();

        status.events.forEach(ev => {
            const isPassed = ev.startMs <= nowMs;
            const isTarget = status.targetEvent && status.targetEvent.id === ev.id;

            const card = document.createElement('article');
            card.className = `milestone-card ${isPassed ? 'passed' : ''} ${isTarget ? 'active-target' : ''}`;

            let badgeHtml = '';
            if (isPassed) {
                badgeHtml = '<span class="milestone-badge badge-passed">✓ Tamamlandı</span>';
            } else if (isTarget) {
                badgeHtml = '<span class="milestone-badge badge-active">⚡ Hedef Sayaç</span>';
            } else {
                badgeHtml = '<span class="milestone-badge badge-upcoming">⏳ Yaklaşıyor</span>';
            }

            const formattedDate = this.timeEngine.formatTurkishDate(ev.date, true);
            const googleCalUrl = CalendarExporter.getGoogleCalendarUrl(ev);

            card.innerHTML = `
                <div class="milestone-top">
                    <span class="milestone-icon">${ev.icon}</span>
                    ${badgeHtml}
                </div>
                <h3 class="milestone-title">${ev.title}</h3>
                <div class="milestone-date-str">${formattedDate}</div>
                <p class="milestone-desc">${ev.description || ''}</p>
                <div class="milestone-actions">
                    <button class="milestone-btn select-count-btn" data-id="${ev.id}">
                        ⏱️ Geri Sayımı Seç
                    </button>
                    <a href="${googleCalUrl}" target="_blank" rel="noopener noreferrer" class="milestone-btn">
                        📅 Google Takvim
                    </a>
                </div>
            `;

            // Butona basıldığında hedef olarak ayarla
            const selectBtn = card.querySelector('.select-count-btn');
            selectBtn.addEventListener('click', () => {
                this.timeEngine.selectedMilestoneId = ev.id;
                this.renderAll();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                this.showToast(`🎯 Geri sayım "${ev.title}" olarak ayarlandı.`, "info");
            });

            this.dom.calendarGrid.appendChild(card);
        });
    }

    /**
     * İstatistik Bölümünü günceller
     */
    updateStats(calendar, now) {
        const stats = StatsEngine.calculateStats(calendar, now);
        if (!stats) return;

        if (this.dom.statsPercentText) {
            this.dom.statsPercentText.textContent = `%${stats.percentage}`;
        }
        if (this.dom.statsProgressFill) {
            this.dom.statsProgressFill.style.width = `${stats.percentage}%`;
        }
        if (this.dom.statTotalDays) {
            this.dom.statTotalDays.textContent = `${stats.totalYearDays} Gün`;
        }
        if (this.dom.statElapsedDays) {
            this.dom.statElapsedDays.textContent = `${stats.elapsedDays} Gün`;
        }
        if (this.dom.statRemainingDays) {
            this.dom.statRemainingDays.textContent = `${stats.remainingDays} Gün`;
        }
    }

    /**
     * Her saniye canlı geri sayım ve saatleri günceller (Çok hızlı, sadece değişen DOM elemanlarını günceller)
     */
    tick() {
        const status = this.timeEngine.getCurrentStatus();
        const now = status.now;

        // 1. Canlı Türkiye Saati & Başlık Saatleri
        const timeStr = this.timeEngine.formatTurkishTime(now);
        const dateStr = this.timeEngine.formatTurkishDate(now, false);

        if (this.dom.headerLiveTime) this.dom.headerLiveTime.textContent = timeStr;
        if (this.dom.infoTurkeyTime) this.dom.infoTurkeyTime.textContent = timeStr;
        if (this.dom.liveHeroTime) this.dom.liveHeroTime.textContent = timeStr;
        if (this.dom.liveHeroDate) this.dom.liveHeroDate.textContent = dateStr;
        if (this.dom.infoTodayDate) this.dom.infoTodayDate.textContent = dateStr;

        // 2. Geri Sayım Farkı
        if (status.targetEvent) {
            const diff = this.timeEngine.calculateDiff(status.targetEvent.date, now);

            if (this.dom.countdownDays && this.dom.countdownDays.textContent !== diff.formattedDays) {
                this.dom.countdownDays.textContent = diff.formattedDays;
                this.triggerAnim(this.dom.countdownDays);
            }

            if (this.dom.countdownHours && this.dom.countdownHours.textContent !== diff.formattedHours) {
                this.dom.countdownHours.textContent = diff.formattedHours;
                this.triggerAnim(this.dom.countdownHours);
            }

            if (this.dom.countdownMinutes && this.dom.countdownMinutes.textContent !== diff.formattedMinutes) {
                this.dom.countdownMinutes.textContent = diff.formattedMinutes;
                this.triggerAnim(this.dom.countdownMinutes);
            }

            if (this.dom.countdownSeconds && this.dom.countdownSeconds.textContent !== diff.formattedSeconds) {
                this.dom.countdownSeconds.textContent = diff.formattedSeconds;
                this.triggerAnim(this.dom.countdownSeconds);
            }
        }
    }

    triggerAnim(element) {
        if (!element) return;
        element.classList.remove('tick-anim');
        // Force reflow
        void element.offsetWidth;
        element.classList.add('tick-anim');
    }

    /**
     * Tüm ekranı tam olarak yeniler (Yıl değiştiğinde veya sayfa ilk açıldığında)
     */
    renderAll() {
        const status = this.timeEngine.getCurrentStatus();
        const now = status.now;

        // Başlıklar ve Durum Rozeti
        if (this.dom.mainHeroTitle) {
            this.dom.mainHeroTitle.textContent = status.statusTitle;
        }
        if (this.dom.heroSubtitleText) {
            this.dom.heroSubtitleText.textContent = status.heroSubtitle;
        }
        if (this.dom.statusBadgeText) {
            this.dom.statusBadgeText.textContent = status.statusBadge;
        }
        if (this.dom.calendarSectionTitle) {
            this.dom.calendarSectionTitle.innerHTML = `<span>📅</span> ${status.calendar.title}`;
        }

        // Açılış ve Kapanış Tarihleri Bilgileri
        const schoolStartEv = status.events.find(e => e.key === 'schoolStart');
        const schoolEndEv = status.events.find(e => e.key === 'schoolEnd');

        if (this.dom.infoOpeningDate && schoolStartEv) {
            this.dom.infoOpeningDate.textContent = this.timeEngine.formatTurkishDate(schoolStartEv.date, true);
        }
        if (this.dom.infoClosingDate && schoolEndEv) {
            this.dom.infoClosingDate.textContent = this.timeEngine.formatTurkishDate(schoolEndEv.date, true);
        }

        // Bileşenleri Render Et
        this.renderAcademicYearSelector(status.calendar.academicYear);
        this.renderQuickMilestoneTabs(status.calendar, this.timeEngine.selectedMilestoneId);
        this.renderCalendarCards(status);
        this.updateStats(status.calendar, now);
        this.tick();
    }

    /**
     * Modern Toast Bildirim Gösterici
     */
    showToast(message, type = "info") {
        if (!this.dom.toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        this.dom.toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3500);
    }
}


function startApp() {
    try {
        var engine = new TimeEngine();
        var ui = new UIManager(engine);
        ui.renderAll();
        setInterval(function() {
            ui.tick();
        }, 1000);
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) ui.renderAll();
        });
    } catch(e) {
        console.error('Uygulama başlatma hatası:', e);
    }
}

if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startApp);
    } else {
        startApp();
    }
}

})();
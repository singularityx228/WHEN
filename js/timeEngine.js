/**
 * Zaman ve Geri Sayım Hesaplama Motoru (TimeEngine)
 * Türkiye Saat Dilimi (Europe/Istanbul UTC+3) ve gerçek zaman farkı (Target - Now) ile çalışır.
 */

import { SCHOOL_CALENDARS, getActiveCalendar } from './calendarData.js';

export class TimeEngine {
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

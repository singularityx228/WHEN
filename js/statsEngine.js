/**
 * Eğitim Öğretim İstatistikleri Hesaplama Motoru (StatsEngine)
 */

export class StatsEngine {
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

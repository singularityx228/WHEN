/**
 * Takvim Dışa Aktarma ve Paylaşım Modülü (CalendarExporter)
 * Google Calendar, Apple / Outlook (.ics) ve Sosyal Paylaşım desteği
 */

export class CalendarExporter {
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

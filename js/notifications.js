/**
 * Bildirim Yönetimi Modülü (NotificationManager)
 * Web Notifications API ile kullanıcılara hatırlatma sağlar
 */

export class NotificationManager {
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

/**
 * Okul Sayacı - Ana Uygulama Giriş Noktası (App Entry)
 */

import { TimeEngine } from './timeEngine.js';
import { UIManager } from './ui.js';

class App {
    constructor() {
        this.timeEngine = new TimeEngine();
        this.ui = new UIManager(this.timeEngine);
        this.intervalId = null;
    }

    init() {
        console.log("🎒 Okul Sayacı Başlatılıyor...");

        // İlk tam render
        this.ui.renderAll();

        // 1 saniyelik senkronize saat döngüsü
        this.startTimerLoop();

        // Sekme arka plandan ön plana geldiğinde zaman senkronizasyonu
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.ui.renderAll();
            }
        });

        // URL parametresi ile belirli bir etkinliğe doğrudan odaklanma (örn: ?event=semester-end-26)
        this.handleUrlParams();
    }

    startTimerLoop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        // setInterval ile her 1000ms'de gerçek hedef - şu an farkı hesaplanır
        this.intervalId = setInterval(() => {
            this.ui.tick();
        }, 1000);
    }

    handleUrlParams() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const eventParam = urlParams.get('event');
            const yearParam = urlParams.get('year');

            let shouldRerender = false;

            if (yearParam) {
                this.timeEngine.selectedAcademicYear = yearParam;
                shouldRerender = true;
            }

            if (eventParam) {
                this.timeEngine.selectedMilestoneId = eventParam;
                shouldRerender = true;
            }

            if (shouldRerender) {
                this.ui.renderAll();
            }
        } catch (e) {
            console.error("URL parametreleri işlenirken hata:", e);
        }
    }
}

// DOMContentLoaded olayıyla uygulamayı başlat
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

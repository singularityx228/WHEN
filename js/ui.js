/**
 * UI Yönetimi ve DOM Render Modülü (UIManager)
 */

import { SCHOOL_CALENDARS } from './calendarData.js';
import { CalendarExporter } from './calendarExporter.js';
import { NotificationManager } from './notifications.js';
import { StatsEngine } from './statsEngine.js';

export class UIManager {
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

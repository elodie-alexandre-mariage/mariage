/* =====================================================
   MENU LATÉRAL COMMUN — ÉLODIE & ALEXANDRE
   Version responsive finale — août 2026

   Desktop (> 1024 px) : comportement et esthétique conservés.
===================================================== */

document.addEventListener("DOMContentLoaded", async () => {
    const mobileBreakpoint = 1024;
    const phoneBreakpoint = 720;

    const scriptElement = document.querySelector('script[src*="menu-lateral.js"]');
    const scriptURL = scriptElement
        ? new URL(scriptElement.src, window.location.href)
        : new URL("components/menu-lateral.js", window.location.href);
    const rootURL = new URL("../", scriptURL);

    function pageURL(relativePath = "") {
        return new URL(relativePath.replace(/^\/+/, ""), rootURL).href;
    }

    function rootPathname() {
        return normalizePath(rootURL.pathname);
    }

    const pageOrder = [
        "bienvenue",
        "sommaire",
        "invitation",
        "preparatifs",
        "first-look",
        "mairie",
        "eglise",
        "vin-d-honneur",
        "soiree",
        "remerciements",
        "souvenirs",
        "voyage-de-noces"
    ];

    const chapterOrder = [
        {
            id: "invitation",
            label: "Invitation",
            path: pageURL("invitation/index.html")
        },
        {
            id: "preparatifs",
            label: "Préparatifs",
            path: pageURL("preparatifs/index.html")
        },
        {
            id: "first-look",
            label: "First Look",
            path: pageURL("first-look/index.html")
        },
        {
            id: "mairie",
            label: "Mairie",
            path: pageURL("mairie/index.html")
        },
        {
            id: "eglise",
            label: "Église",
            path: pageURL("eglise/index.html")
        },
        {
            id: "vin-d-honneur",
            label: "Vin d’honneur",
            path: pageURL("vin_d_honneur/index.html")
        },
        {
            id: "soiree",
            label: "Soirée",
            path: pageURL("soiree/index.html")
        },
        {
            id: "remerciements",
            label: "Remerciements",
            path: pageURL("remerciements/index.html")
        },
        {
            id: "souvenirs",
            label: "Souvenirs",
            path: pageURL("souvenirs/index.html")
        }
    ];

    function normalizePath(pathname) {
        let path = pathname
            .toLowerCase()
            .replace(/index\.html$/, "")
            .replace(/\/+/g, "/");

        if (!path.endsWith("/")) {
            path += "/";
        }

        return path;
    }

    function getCurrentPage() {
        const currentPath = normalizePath(window.location.pathname);
        const rootPath = rootPathname();

        if (currentPath === rootPath) {
            return "bienvenue";
        }

        if (currentPath.endsWith("/sommaire/")) return "sommaire";
        if (currentPath.endsWith("/invitation/")) return "invitation";
        if (currentPath.includes("/preparatifs/")) return "preparatifs";
        if (currentPath.endsWith("/first-look/") || currentPath.endsWith("/first_look/")) return "first-look";
        if (currentPath.endsWith("/mairie/")) return "mairie";
        if (currentPath.endsWith("/eglise/")) return "eglise";
        if (currentPath.endsWith("/vin_d_honneur/") || currentPath.endsWith("/vin-d-honneur/")) return "vin-d-honneur";
        if (currentPath.endsWith("/soiree/")) return "soiree";
        if (currentPath.endsWith("/remerciements/")) return "remerciements";

        if (
            currentPath.endsWith("/souvenirs/") ||
            currentPath.endsWith("/videos/") ||
            currentPath.endsWith("/vosphotos/") ||
            currentPath.endsWith("/vos_photos/") ||
            currentPath.endsWith("/photoscouple/") ||
            currentPath.endsWith("/photos_couple/") ||
            currentPath.endsWith("/photosgroupe/") ||
            currentPath.endsWith("/photos_groupe/") ||
            currentPath.endsWith("/photobooth/")
        ) {
            return "souvenirs";
        }

        if (currentPath.endsWith("/voyage-de-noces/") || currentPath.endsWith("/voyage_de_noces/")) {
            return "voyage-de-noces";
        }

        return "bienvenue";
    }

    function applyPageProgression() {
        const currentPage = getCurrentPage();
        const currentIndex = pageOrder.indexOf(currentPage);

        document.querySelectorAll(".page-link").forEach((link) => {
            const pageName = link.dataset.page;
            const pageIndex = pageOrder.indexOf(pageName);

            link.classList.remove("is-current", "is-visited");
            link.removeAttribute("aria-current");

            if (pageIndex < currentIndex) {
                link.classList.add("is-visited");
            }

            if (pageName === currentPage) {
                link.classList.add("is-current");
                link.setAttribute("aria-current", "page");
            }
        });
    }

    function initializeMobileMenu() {
        const button = document.querySelector(".mobile-menu-button");
        const sidebar = document.querySelector(".book-sidebar");

        if (!button || !sidebar) {
            return;
        }

        let overlay = document.querySelector(".menu-overlay");

        if (!overlay) {
            overlay = document.createElement("div");
            overlay.className = "menu-overlay";
            overlay.setAttribute("aria-hidden", "true");
            document.body.insertAdjacentElement("afterbegin", overlay);
        }

        function isCompactNavigation() {
            return (
                window.innerWidth > phoneBreakpoint &&
                window.innerWidth <= mobileBreakpoint
            );
        }

        function closeMenu() {
            sidebar.classList.remove("is-open");
            document.body.classList.remove("mobile-menu-open");
            button.setAttribute("aria-expanded", "false");
            button.setAttribute("aria-label", "Ouvrir le sommaire");
            button.textContent = "☰";
        }

        function openMenu() {
            if (!isCompactNavigation()) {
                return;
            }

            sidebar.classList.add("is-open");
            document.body.classList.add("mobile-menu-open");
            button.setAttribute("aria-expanded", "true");
            button.setAttribute("aria-label", "Fermer le sommaire");
            button.textContent = "×";

            window.requestAnimationFrame(() => {
                const currentLink = sidebar.querySelector(".page-link.is-current");

                if (currentLink) {
                    currentLink.scrollIntoView({ block: "center" });
                }
            });
        }

        button.addEventListener("click", () => {
            if (sidebar.classList.contains("is-open")) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        overlay.addEventListener("click", closeMenu);

        sidebar.addEventListener("click", (event) => {
            if (event.target.closest("a[href]") && isCompactNavigation()) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && sidebar.classList.contains("is-open")) {
                closeMenu();
                button.focus();
            }
        });

        window.addEventListener("resize", () => {
            if (!isCompactNavigation()) {
                closeMenu();
            }
        });
    }

    function initializeChapterNavigation() {
        const currentPage = getCurrentPage();
        const currentIndex = chapterOrder.findIndex((chapter) => chapter.id === currentPage);

        if (currentIndex === -1) {
            return;
        }

        const hero = document.querySelector(".hero");

        if (!hero || document.querySelector(".mobile-chapter-nav")) {
            return;
        }

        const previousChapter = chapterOrder[currentIndex - 1] || null;
        const nextChapter = chapterOrder[currentIndex + 1] || null;

        const nav = document.createElement("nav");
        nav.className = "mobile-chapter-nav";
        nav.setAttribute("aria-label", "Navigation entre les chapitres du mariage");

        nav.innerHTML = `
            ${previousChapter ? `
                <a class="mobile-chapter-nav__link mobile-chapter-nav__link--previous" href="${previousChapter.path}">
                    <span aria-hidden="true">←</span>
                    <span>${previousChapter.label}</span>
                </a>
            ` : `<span class="mobile-chapter-nav__placeholder" aria-hidden="true"></span>`}

            <a class="mobile-chapter-nav__link mobile-chapter-nav__link--summary" href="${pageURL("sommaire/index.html")}">
                Sommaire
            </a>

            ${nextChapter ? `
                <a class="mobile-chapter-nav__link mobile-chapter-nav__link--next" href="${nextChapter.path}">
                    <span>${nextChapter.label}</span>
                    <span aria-hidden="true">→</span>
                </a>
            ` : `<span class="mobile-chapter-nav__placeholder" aria-hidden="true"></span>`}
        `;

        hero.insertAdjacentElement("afterend", nav);
    }

    function initializeBackToTop() {
        const currentPage = getCurrentPage();

        if (currentPage === "bienvenue" || currentPage === "sommaire") {
            return;
        }

        const button = document.createElement("button");
        button.type = "button";
        button.className = "mobile-back-to-top";
        button.setAttribute("aria-label", "Revenir en haut de la page");
        button.innerHTML = '<span aria-hidden="true">↑</span>';
        document.body.appendChild(button);

        function updateVisibility() {
            const shouldShow =
                window.innerWidth <= mobileBreakpoint &&
                window.scrollY > Math.max(460, window.innerHeight * 0.62);

            button.classList.toggle("is-visible", shouldShow);
        }

        button.addEventListener("click", () => {
            const reducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            window.scrollTo({
                top: 0,
                behavior: reducedMotion ? "auto" : "smooth"
            });
        });

        window.addEventListener("scroll", updateVisibility, { passive: true });
        window.addEventListener("resize", updateVisibility);
        updateVisibility();
    }

    function initializeMobileGalleries() {
        const currentPath = normalizePath(window.location.pathname);
        const eligibleSuffixes = [
            "/first-look/",
            "/mairie/",
            "/eglise/",
            "/vin_d_honneur/",
            "/vin-d-honneur/",
            "/photoscouple/",
            "/photos_couple/",
            "/photosgroupe/",
            "/photos_groupe/",
            "/vosphotos/",
            "/vos_photos/",
            "/preparatifs/elodie/",
            "/preparatifs/alexandre/"
        ];

        if (!eligibleSuffixes.some((suffix) => currentPath.endsWith(suffix))) {
            return;
        }

        const galleries = Array.from(document.querySelectorAll(".gallery"));

        galleries.forEach((gallery) => {
            if (gallery.dataset.mobileGalleryReady === "true") {
                return;
            }

            const items = gallery.querySelectorAll(".gallery-item");

            if (!items.length) {
                return;
            }

            gallery.dataset.mobileGalleryReady = "true";
            gallery.classList.add("mobile-gallery-enhanced");

            const total = items.length;
            const toolbar = document.createElement("div");
            toolbar.className = "mobile-gallery-toolbar";

            const hintText = total > 1 ? "Glissez les photos" : "Touchez la photo";
            const viewText = total > 1 ? `Voir les ${total} photos` : "Voir la photo";

            toolbar.innerHTML = `
                <span class="mobile-gallery-toolbar__hint">
                    <span>${hintText}</span>
                    ${total > 1 ? '<span class="mobile-gallery-toolbar__hint-arrow" aria-hidden="true">→</span>' : ''}
                </span>
                <button type="button" class="mobile-gallery-toolbar__toggle" aria-expanded="false">
                    ${viewText}
                </button>
            `;

            gallery.insertAdjacentElement("beforebegin", toolbar);

            const toggle = toolbar.querySelector(".mobile-gallery-toolbar__toggle");
            let savedScrollLeft = 0;

            toggle.addEventListener("click", () => {
                const isGrid = gallery.classList.toggle("mobile-gallery-grid");

                if (isGrid) {
                    savedScrollLeft = gallery.scrollLeft;
                    toolbar.classList.add("is-grid-view");
                    toggle.textContent = "Revenir au défilement";
                    toggle.setAttribute("aria-expanded", "true");
                } else {
                    toolbar.classList.remove("is-grid-view");
                    toggle.textContent = viewText;
                    toggle.setAttribute("aria-expanded", "false");

                    window.requestAnimationFrame(() => {
                        gallery.scrollLeft = savedScrollLeft;
                    });
                }
            });
        });
    }

    function initializePageTransitions() {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        document.querySelectorAll('a[href]').forEach((link) => {
            if (link.dataset.pageTransitionReady === "true") {
                return;
            }

            link.dataset.pageTransitionReady = "true";

            link.addEventListener("click", (event) => {
                const href = link.getAttribute("href");

                if (
                    prefersReducedMotion ||
                    !href ||
                    href.startsWith("#") ||
                    link.target === "_blank" ||
                    event.ctrlKey ||
                    event.metaKey ||
                    event.shiftKey ||
                    event.altKey
                ) {
                    return;
                }

                const destination = new URL(link.href, window.location.href);

                if (destination.origin !== window.location.origin) {
                    return;
                }

                event.preventDefault();
                document.body.classList.add("page-leaving");

                window.setTimeout(() => {
                    window.location.href = destination.href;
                }, 400);
            });
        });
    }

    /* Les améliorations de contenu ne dépendent pas du chargement du menu. */
    initializeChapterNavigation();
    initializeBackToTop();
    initializeMobileGalleries();

    try {
        if (window.location.protocol === "file:") {
            // Chrome bloque fetch(file://). Sur téléphone le menu latéral est masqué,
            // mais toutes les fonctions responsive restent actives pour le test local.
            initializePageTransitions();
            return;
        }

        const response = await fetch(
            pageURL("components/menu-lateral.html?v=51"),
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const menuHTML = await response.text();
        document.body.insertAdjacentHTML("afterbegin", menuHTML);

        applyPageProgression();
        initializeMobileMenu();
    } catch (error) {
        console.error("Impossible de charger le menu latéral :", error);
    } finally {
        initializePageTransitions();
    }
});

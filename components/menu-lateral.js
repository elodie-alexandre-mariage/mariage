/* =====================================================
   MENU LATÉRAL COMMUN — ÉLODIE & ALEXANDRE
   À charger avec defer sur toutes les pages.
===================================================== */

(() => {
    "use strict";

    const SITE_ROOT = "/mariage/";

    /* Ajouter ici l’adresse du futur site quand il sera prêt. */
    const HONEYMOON_URL = "";

    const pages = [
        { id: "bienvenue", label: "Bienvenue", number: "1", path: "" },
        { id: "sommaire", label: "Sommaire", number: "2", path: "sommaire/" },
        { id: "invitation", label: "Invitation", number: "3", path: "invitation/" },
        { id: "preparatifs", label: "Préparatifs", number: "4", path: "preparatifs/" },
        { id: "first-look", label: "Le First Look", number: "5", path: "first-look/" },
        { id: "mairie", label: "Mairie", number: "6", path: "mairie/" },
        { id: "eglise", label: "Église", number: "7", path: "eglise/" },
        { id: "vin-d-honneur", label: "Vin d’honneur", number: "8", path: "vin_d_honneur/" },
        { id: "soiree", label: "Soirée", number: "9", path: "soiree/" },
        { id: "remerciements", label: "Remerciements", number: "10", path: "remerciements/" },
        { id: "souvenirs", label: "Souvenirs", number: "11", path: "souvenirs/", separated: true }
    ];

    function siteUrl(path = "") {
        return `${SITE_ROOT}${path}`;
    }

    function detectCurrentPage() {
        const pathname = window.location.pathname
            .replace(/\/index\.html$/i, "/")
            .replace(/\/{2,}/g, "/");

        const relativePath = pathname.startsWith(SITE_ROOT)
            ? pathname.slice(SITE_ROOT.length)
            : pathname.replace(/^\//, "");

        if (!relativePath || relativePath === "index.html") {
            return "bienvenue";
        }

        const matchingPage = pages
            .filter((page) => page.path)
            .sort((a, b) => b.path.length - a.path.length)
            .find((page) => relativePath.startsWith(page.path));

        return matchingPage ? matchingPage.id : "bienvenue";
    }

    function createPageItem(page) {
        const classes = ["page-item"];

        if (page.separated) {
            classes.push("page-item-separated");
        }

        return `
            <li class="${classes.join(" ")}">
                <a
                    href="${siteUrl(page.path)}"
                    class="page-link"
                    data-page="${page.id}"
                >
                    <span class="page-dot">${page.number}</span>
                    <span class="page-label">${page.label}</span>
                </a>
            </li>
        `;
    }

    function createHoneymoonMarkup() {
        const planeIcon = `
            <span class="honeymoon-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                    <path d="M21 16.2 13.4 12V5.8C13.4 4.25 12.77 3 12 3s-1.4 1.25-1.4 2.8V12L3 16.2v1.9l7.6-2.4v3.5l-2.2 1.5V22l3.6-1 3.6 1v-1.3l-2.2-1.5v-3.5l7.6 2.4z"></path>
                </svg>
            </span>
        `;

        const copy = `
            <span class="honeymoon-copy">
                <span class="honeymoon-name">
                    Notre voyage de noces
                </span>

                <span class="honeymoon-meta">
                    Polynésie française${HONEYMOON_URL ? "" : " · Bientôt"}
                </span>
            </span>
        `;

        const entry = HONEYMOON_URL
            ? `
                <a
                    href="${HONEYMOON_URL}"
                    class="honeymoon-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Découvrir notre voyage de noces en Polynésie française sur un nouveau site"
                >
                    ${planeIcon}
                    ${copy}
                </a>
            `
            : `
                <div
                    class="honeymoon-link is-disabled"
                    aria-disabled="true"
                    title="Le site du voyage de noces sera bientôt disponible"
                >
                    ${planeIcon}
                    ${copy}
                </div>
            `;

        return `
            <li class="honeymoon-section">

                <span class="sidebar-section-title honeymoon-title">
                    Grâce à vous
                </span>

                ${entry}

            </li>
        `;
    }

    function createMenuMarkup() {
        const mainPages = pages
            .filter((page) => !page.separated)
            .map(createPageItem)
            .join("");

        const separatedPages = pages
            .filter((page) => page.separated)
            .map(createPageItem)
            .join("");

        return `
            <button
                class="mobile-menu-button"
                type="button"
                aria-label="Ouvrir le sommaire"
                aria-controls="book-sidebar"
                aria-expanded="false"
            >
                ☰
            </button>

            <aside
                class="book-sidebar"
                id="book-sidebar"
                aria-label="Pages de l’album"
            >
                <div class="sidebar-inner">

                    <a
                        href="${siteUrl("sommaire/")}"
                        class="logo-link"
                        aria-label="Retour au sommaire"
                    >
                        <img
                            src="${siteUrl("images/style/logo_couleur.png")}"
                            alt="Logo du mariage d’Élodie et Alexandre"
                            class="wedding-logo"
                        >
                    </a>

                    <p class="sidebar-section-title">
                        Pages de l’album
                    </p>

                    <nav aria-label="Navigation principale">

                        <ol class="page-list">

                            ${mainPages}

                            <li
                                class="menu-annexe"
                                aria-hidden="true"
                            >
                                <span class="menu-annexe-line"></span>

                                <span class="menu-annexe-title sidebar-section-title">
                                    À revivre
                                </span>
                            </li>

                            ${separatedPages}

                            ${createHoneymoonMarkup()}

                        </ol>

                    </nav>

                </div>
            </aside>
        `;
    }

    function markProgress(currentPage) {
        const currentIndex = pages.findIndex(
            (page) => page.id === currentPage
        );

        document
            .querySelectorAll(".page-link[data-page]")
            .forEach((link) => {
                const pageIndex = pages.findIndex(
                    (page) => page.id === link.dataset.page
                );

                link.classList.remove(
                    "is-current",
                    "is-visited"
                );

                link.removeAttribute("aria-current");

                if (pageIndex < currentIndex) {
                    link.classList.add("is-visited");
                }

                if (pageIndex === currentIndex) {
                    link.classList.add("is-current");
                    link.setAttribute("aria-current", "page");
                }
            });
    }

    function closeMobileMenu() {
        const sidebar = document.querySelector(".book-sidebar");
        const button = document.querySelector(".mobile-menu-button");

        if (!sidebar || !button) {
            return;
        }

        sidebar.classList.remove("is-open");

        button.setAttribute(
            "aria-expanded",
            "false"
        );

        button.setAttribute(
            "aria-label",
            "Ouvrir le sommaire"
        );

        button.textContent = "☰";
    }

    function setupMobileMenu() {
        const sidebar = document.querySelector(".book-sidebar");
        const button = document.querySelector(".mobile-menu-button");

        if (!sidebar || !button) {
            return;
        }

        button.addEventListener("click", () => {
            const isOpen = sidebar.classList.toggle("is-open");

            button.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            button.setAttribute(
                "aria-label",
                isOpen
                    ? "Fermer le sommaire"
                    : "Ouvrir le sommaire"
            );

            button.textContent = isOpen ? "×" : "☰";
        });

        document.addEventListener("click", (event) => {
            if (
                window.innerWidth <= 720 &&
                sidebar.classList.contains("is-open") &&
                !sidebar.contains(event.target) &&
                !button.contains(event.target)
            ) {
                closeMobileMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMobileMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 720) {
                closeMobileMenu();
            }
        });
    }

    function setupPageTransitions() {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        document.addEventListener("click", (event) => {
            const link = event.target.closest("a[href]");

            if (!link) {
                return;
            }

            const href = link.getAttribute("href");

            if (
                prefersReducedMotion ||
                !href ||
                href.startsWith("#") ||
                link.target === "_blank" ||
                link.hasAttribute("download") ||
                event.ctrlKey ||
                event.metaKey ||
                event.shiftKey ||
                event.altKey
            ) {
                return;
            }

            const destination = new URL(
                link.href,
                window.location.href
            );

            if (
                destination.origin !==
                window.location.origin
            ) {
                return;
            }

            event.preventDefault();

            document.body.classList.add("page-leaving");

            window.setTimeout(() => {
                window.location.href = destination.href;
            }, 400);
        });
    }

    function initialiseMenu() {
        document
            .querySelector(".mobile-menu-button")
            ?.remove();

        document
            .querySelector(".book-sidebar")
            ?.remove();

        document.body.insertAdjacentHTML(
            "afterbegin",
            createMenuMarkup()
        );

        markProgress(detectCurrentPage());
        setupMobileMenu();
        setupPageTransitions();
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initialiseMenu,
            {
                once: true
            }
        );
    } else {
        initialiseMenu();
    }
})();

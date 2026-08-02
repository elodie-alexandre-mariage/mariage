/* =====================================================
   MENU LATÉRAL COMMUN — ÉLODIE & ALEXANDRE

   Ce fichier génère automatiquement :
   - le bouton du menu mobile ;
   - le menu latéral ;
   - le logo cliquable ;
   - la liste des pages ;
   - la page actuellement affichée ;
   - les pages précédentes en bordeaux.

   Ne pas charger ce fichier sur les pages Soirée
   et Souvenirs si elles conservent leur propre menu.
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const siteRoot = "/mariage/";

    const pages = [
        {
            number: "1",
            name: "Bienvenue",
            slug: "bienvenue",
            href: siteRoot
        },
        {
            number: "2",
            name: "Sommaire",
            slug: "sommaire",
            href: `${siteRoot}sommaire/`
        },
        {
            number: "3",
            name: "Invitation",
            slug: "invitation",
            href: `${siteRoot}invitation/`
        },
        {
            number: "4",
            name: "Préparatifs",
            slug: "preparatifs",
            href: `${siteRoot}preparatifs/`
        },
        {
            number: "5",
            name: "First Look",
            slug: "first-look",
            href: `${siteRoot}first-look/`
        },
        {
            number: "6",
            name: "Mairie",
            slug: "mairie",
            href: `${siteRoot}mairie/`
        },
        {
            number: "7",
            name: "Église",
            slug: "eglise",
            href: `${siteRoot}eglise/`
        },
        {
            number: "8",
            name: "Vin d’honneur",
            slug: "vin-d-honneur",
            href: `${siteRoot}vin_d_honneur/`
        },
        {
            number: "9",
            name: "Soirée",
            slug: "soiree",
            href: `${siteRoot}soiree/`
        },
        {
            number: "10",
            name: "Remerciements",
            slug: "remerciements",
            href: `${siteRoot}remerciements/`
        },
        {
            number: "11",
            name: "Souvenirs",
            slug: "souvenirs",
            href: `${siteRoot}souvenirs/`,
            separated: true
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

        if (
            currentPath === siteRoot ||
            currentPath === `${siteRoot}index.html/`
        ) {
            return "bienvenue";
        }

        if (currentPath.includes(`${siteRoot}sommaire/`)) {
            return "sommaire";
        }

        if (currentPath.includes(`${siteRoot}invitation/`)) {
            return "invitation";
        }

        if (currentPath.includes(`${siteRoot}preparatifs/`)) {
            return "preparatifs";
        }

        if (
            currentPath.includes(`${siteRoot}first-look/`) ||
            currentPath.includes(`${siteRoot}first_look/`)
        ) {
            return "first-look";
        }

        if (currentPath.includes(`${siteRoot}mairie/`)) {
            return "mairie";
        }

        if (currentPath.includes(`${siteRoot}eglise/`)) {
            return "eglise";
        }

        if (
            currentPath.includes(`${siteRoot}vin_d_honneur/`) ||
            currentPath.includes(`${siteRoot}vin-d-honneur/`)
        ) {
            return "vin-d-honneur";
        }

        if (currentPath.includes(`${siteRoot}soiree/`)) {
            return "soiree";
        }

        if (currentPath.includes(`${siteRoot}remerciements/`)) {
            return "remerciements";
        }

        if (currentPath.includes(`${siteRoot}souvenirs/`)) {
            return "souvenirs";
        }

        return "bienvenue";
    }

    const currentPage = getCurrentPage();
    const currentIndex = pages.findIndex(
        (page) => page.slug === currentPage
    );

    const button = document.createElement("button");

    button.className = "mobile-menu-button";
    button.type = "button";
    button.setAttribute("aria-label", "Ouvrir le sommaire");
    button.setAttribute("aria-controls", "book-sidebar");
    button.setAttribute("aria-expanded", "false");
    button.textContent = "☰";

    const sidebar = document.createElement("aside");

    sidebar.className = "book-sidebar";
    sidebar.id = "book-sidebar";
    sidebar.setAttribute("aria-label", "Pages de l’album");

    const sidebarInner = document.createElement("div");
    sidebarInner.className = "sidebar-inner";

    const logoLink = document.createElement("a");

    logoLink.className = "logo-link";
    logoLink.href = `${siteRoot}sommaire/`;
    logoLink.setAttribute("aria-label", "Retourner au sommaire");

    const logo = document.createElement("img");

    logo.className = "wedding-logo";
    logo.src = `${siteRoot}images/style/logo_couleur.png`;
    logo.alt = "Logo du mariage d’Élodie et Alexandre";

    logoLink.appendChild(logo);

    const albumTitle = document.createElement("p");

    albumTitle.className = "sidebar-section-title";
    albumTitle.textContent = "Pages de l’album";

    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "Navigation principale");

    const pageList = document.createElement("ol");
    pageList.className = "page-list";

    pages.forEach((page, index) => {
        if (page.separated) {
            const separator = document.createElement("li");

            separator.className = "menu-annexe";
            separator.setAttribute("aria-hidden", "true");

            const separatorLine = document.createElement("span");
            separatorLine.className = "menu-annexe-line";

            const separatorTitle = document.createElement("span");

            separatorTitle.className =
                "sidebar-section-title menu-annexe-title";
            separatorTitle.textContent = "À revivre";

            separator.appendChild(separatorLine);
            separator.appendChild(separatorTitle);
            pageList.appendChild(separator);
        }

        const item = document.createElement("li");

        item.className = page.separated
            ? "page-item page-item-separated"
            : "page-item";

        const link = document.createElement("a");

        link.className = "page-link";
        link.href = page.href;
        link.dataset.page = page.slug;

        const dot = document.createElement("span");

        dot.className = "page-dot";
        dot.textContent = page.number;

        const label = document.createElement("span");

        label.className = "page-label";
        label.textContent = page.name;

        if (index < currentIndex) {
            link.classList.add("is-visited");
        }

        if (page.slug === currentPage) {
            link.classList.add("is-current");
            link.setAttribute("aria-current", "page");
        }

        link.appendChild(dot);
        link.appendChild(label);
        item.appendChild(link);
        pageList.appendChild(item);
    });

    nav.appendChild(pageList);

    sidebarInner.appendChild(logoLink);
    sidebarInner.appendChild(albumTitle);
    sidebarInner.appendChild(nav);
    sidebar.appendChild(sidebarInner);

    document.body.prepend(sidebar);
    document.body.prepend(button);

    button.addEventListener("click", () => {
        const isOpen = sidebar.classList.toggle("is-open");

        button.setAttribute("aria-expanded", String(isOpen));
        button.setAttribute(
            "aria-label",
            isOpen ? "Fermer le sommaire" : "Ouvrir le sommaire"
        );

        button.textContent = isOpen ? "×" : "☰";
    });

    document.addEventListener("click", (event) => {
        const clickedInsideSidebar = sidebar.contains(event.target);
        const clickedMenuButton = button.contains(event.target);

        if (
            window.innerWidth <= 720 &&
            sidebar.classList.contains("is-open") &&
            !clickedInsideSidebar &&
            !clickedMenuButton
        ) {
            sidebar.classList.remove("is-open");
            button.setAttribute("aria-expanded", "false");
            button.setAttribute(
                "aria-label",
                "Ouvrir le sommaire"
            );
            button.textContent = "☰";
        }
    });

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    document.querySelectorAll('a[href]').forEach((link) => {
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

            const destination = new URL(
                link.href,
                window.location.href
            );

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
});

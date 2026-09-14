const menuButton = document.querySelector("#menu-button");
const navLinks = document.querySelector("#nav-links");
const navItems = document.querySelectorAll(".nav-link");
const backToTop = document.querySelector("#back-to-top");
const detailButtons = document.querySelectorAll(".details-button");

menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
    });
});

detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const projectId = button.dataset.project;
        const details = document.querySelector(`#${projectId}`);

        details.classList.toggle("show");

        button.textContent = details.classList.contains("show")
            ? "Hide Details"
            : "Details";
    });
});

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

    const sections = document.querySelectorAll("main section[id]");

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            navItems.forEach((link) => {
                link.classList.remove("active");

                if (link.getAttribute("href") === `#${section.id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});
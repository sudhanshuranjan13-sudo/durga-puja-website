/* =========================================================
   SHREE SHREE DURGA PUJA SAMITI
   FINAL WEBSITE JAVASCRIPT
   Frontend + Backend Integration
========================================================= */

"use strict";

/* =========================================================
   GLOBAL SETTINGS
========================================================= */

const API_BASE_URL = "/api";

let currentLanguage =
    localStorage.getItem("language") || "hi";

let membersData = [];
let programData = [];
let noticesData = [];
let galleryData = [];
let contributorsData = [];


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initializeWebsite();
});


/* =========================================================
   INITIALIZE WEBSITE
========================================================= */

async function initializeWebsite() {

    try {

        setupLanguage();
        setupMobileMenu();
        setupDropdowns();
        setupSmoothNavigation();
        setupDarshanPopup();
        setupDonationForm();
        setupContactForm();
        setupAmountButtons();

        startCountdown();
        loadEstablishedYear();

        await loadMembers();

        setupProgramYear();
        await loadProgram();

        await loadNotices();
        await loadGallery();
        await loadContributors();
        await loadPublicDonations();
        

        console.log(
            "✅ Website initialized successfully."
        );

    } catch (error) {

        console.error(
            "❌ Website initialization error:",
            error
        );

    }

}


/* =========================================================
   LANGUAGE SYSTEM
========================================================= */

function setupLanguage() {

    changeLanguage(currentLanguage);

}


function changeLanguage(language) {

    if (
        language !== "hi" &&
        language !== "en"
    ) {
        language = "hi";
    }

    currentLanguage = language;

    localStorage.setItem(
        "language",
        language
    );


    /* -----------------------------------------
       NORMAL TEXT TRANSLATION
    ----------------------------------------- */

    const elements =
        document.querySelectorAll(
            "[data-hi][data-en]"
        );

    elements.forEach(element => {

        const text =
            element.getAttribute(
                `data-${language}`
            );

        if (text !== null) {
            element.textContent = text;
        }

    });


    /* -----------------------------------------
       PLACEHOLDER TRANSLATION
    ----------------------------------------- */

    const inputs =
        document.querySelectorAll(
            "[data-placeholder-hi][data-placeholder-en]"
        );

    inputs.forEach(input => {

        const placeholder =
            input.getAttribute(
                `data-placeholder-${language}`
            );

        if (placeholder) {
            input.placeholder = placeholder;
        }

    });


    /* -----------------------------------------
       LANGUAGE BUTTONS
    ----------------------------------------- */

    const hindiBtn =
        document.getElementById("hindiBtn");

    const englishBtn =
        document.getElementById("englishBtn");

    if (hindiBtn) {

        hindiBtn.classList.toggle(
            "active",
            language === "hi"
        );

    }

    if (englishBtn) {

        englishBtn.classList.toggle(
            "active",
            language === "en"
        );

    }


    /* -----------------------------------------
       DOCUMENT LANGUAGE
    ----------------------------------------- */

    document.documentElement.lang =
        language === "hi"
            ? "hi"
            : "en";


    /* -----------------------------------------
       RE-RENDER DYNAMIC DATA
    ----------------------------------------- */
    if (membersData.length) {

    const officeBearers = membersData.filter(
        member => getMemberType(member) === "office"
    );

    const generalMembers = membersData.filter(
        member => getMemberType(member) === "general"
    );

    renderOfficeBearers(officeBearers);

    renderGeneralMembers(generalMembers);
}

    if (programData.length) {
        renderProgram();
    }

    if (noticesData.length) {
        renderNotices();
    }

    if (contributorsData.length) {
        renderContributors();
    }

    if (galleryData.length) {
        filterGallery();
    }

}


/* =========================================================
   MOBILE MENU
========================================================= */

function setupMobileMenu() {

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");

    if (
        !menuToggle ||
        !mainNav
    ) {
        return;
    }


    menuToggle.addEventListener(
        "click",
        () => {

            mainNav.classList.toggle(
                "active"
            );

            const isOpen =
                mainNav.classList.contains(
                    "active"
                );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
                    ? "true"
                    : "false"
            );

        }
    );


    const links =
        mainNav.querySelectorAll("a");

    links.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mainNav.classList.remove(
                    "active"
                );

            }
        );

    });

}


/* =============dropdown menu ============================================
   DROPDOWN MENU
========================================================= */

function setupDropdowns() {

    const dropdowns =
        document.querySelectorAll(
            ".dropdown"
        );

    dropdowns.forEach(dropdown => {

        const button =
            dropdown.querySelector(
                ".dropdown-toggle"
            );

        if (!button) {
            return;
        }

        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                dropdowns.forEach(
                    otherDropdown => {

                        if (
                            otherDropdown !==
                            dropdown
                        ) {

                            otherDropdown.classList.remove(
                                "open"
                            );

                        }

                    }
                );

                dropdown.classList.toggle(
                    "open"
                );

            }
        );

    });


    document.addEventListener(
        "click",
        () => {

            dropdowns.forEach(
                dropdown => {

                    dropdown.classList.remove(
                        "open"
                    );

                }
            );

        }
    );

}


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

function setupSmoothNavigation() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                const navbar =
                    document.querySelector(
                        ".navbar"
                    );

                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;

                const position =
                    target.getBoundingClientRect()
                        .top +
                    window.pageYOffset -
                    navbarHeight -
                    10;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });

            }
        );

    });

}


/* =========================================================
   ESTABLISHED YEAR
========================================================= */

function loadEstablishedYear() {

    const yearElement =
        document.getElementById(
            "establishedYear"
        );

    if (!yearElement) {
        return;
    }

    const establishedYear =
        localStorage.getItem(
            "establishedYear"
        );

    if (establishedYear) {

        yearElement.textContent =
            establishedYear;

    } else {

        yearElement.textContent =
            "2016";

    }

}


/* =========================================================
   COUNTDOWN
========================================================= */

function startCountdown() {

    const targetDate =
        new Date(
            "2026-10-17T00:00:00"
        ).getTime();


    function updateCountdown() {

        const now =
            new Date().getTime();

        const difference =
            targetDate - now;


        const days =
            document.getElementById("days");

        const hours =
            document.getElementById("hours");

        const minutes =
            document.getElementById("minutes");

        const seconds =
            document.getElementById("seconds");


        if (
            !days ||
            !hours ||
            !minutes ||
            !seconds
        ) {
            return;
        }


        if (difference <= 0) {

            days.textContent = "00";
            hours.textContent = "00";
            minutes.textContent = "00";
            seconds.textContent = "00";

            return;

        }


        const d =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );

        const h =
            Math.floor(
                (
                    difference /
                    (1000 * 60 * 60)
                ) % 24
            );

        const m =
            Math.floor(
                (
                    difference /
                    (1000 * 60)
                ) % 60
            );

        const s =
            Math.floor(
                (
                    difference /
                    1000
                ) % 60
            );


        days.textContent =
            String(d).padStart(2, "0");

        hours.textContent =
            String(h).padStart(2, "0");

        minutes.textContent =
            String(m).padStart(2, "0");

        seconds.textContent =
            String(s).padStart(2, "0");

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );

}
  /* =========================================================
   NORMALIZE MEMBER TYPE
  ========================================================= */

function getMemberType(member) {

    let type =
        String(
            member.memberType ||
            member.type ||
            ""
        )
        .trim()
        .toLowerCase();

    /* -----------------------------------------
       OFFICE BEARERS
    ----------------------------------------- */

    if (
        type.includes("office") ||
        type.includes("bearer") ||
        type.includes("पदाधिकारी") 
       
      )    {

        return "office";

        }


    /* -----------------------------------------
       GENERAL MEMBERS
    ----------------------------------------- */

    if (
        type.includes("general") ||
        type.includes("member") ||
        type.includes("सदस्य")
    ) {

        return "general";

    }


    /* -----------------------------------------
       FALLBACK USING POSITION
    ----------------------------------------- */

    const position =
        String(
            member.positionHi ||
            member.positionEn ||
            member.position ||
            ""
        )
        .trim()
        .toLowerCase();


    if (
        position.includes("president") ||
        position.includes("secretary") ||
        position.includes("treasurer") ||
        position.includes("vice president") ||
        position.includes("coordinator") ||
        position.includes("अध्यक्ष") ||
        position.includes("सचिव") ||
        position.includes("कोषाध्यक्ष") ||
        position.includes("उपाध्यक्ष") ||
        position.includes("संयोजक")
    ) {

        return "office";

    }


    return "general";

}
/* =========================================================
   LOAD COMMITTEE MEMBERS FROM MONGODB
========================================================= */
/* =========================================================
   LOAD COMMITTEE MEMBERS FROM MONGODB
========================================================= */

async function loadMembers() {

    const officeContainer =
        document.getElementById("officeBearersContainer");

    const generalContainer =
        document.getElementById("generalMembersContainer");


    if (!officeContainer && !generalContainer) {

        console.error(
            "❌ Members containers NOT FOUND"
        );

        return;
    }


    try {

        console.log(
            "🔄 Loading committee members from MongoDB..."
        );


        const response = await fetch(
            `${API_BASE_URL}/members?t=${Date.now()}`,
            {
                method: "GET",

                headers: {
                    "Accept": "application/json",
                    "Cache-Control": "no-cache"
                },

                cache: "no-store"
            }
        );


        if (!response.ok) {

            throw new Error(
                `Members API Error: ${response.status}`
            );

        }


        const result =
            await response.json();


        console.log(
            "✅ Members received from MongoDB:",
            result
        );


        /* =========================================
           GET ARRAY FROM API RESPONSE
        ========================================= */

        let members = [];


        if (Array.isArray(result)) {

            members = result;

        }

        else if (
            result &&
            Array.isArray(result.data)
        ) {

            members = result.data;

        }

        else if (
            result &&
            Array.isArray(result.members)
        ) {

            members = result.members;

        }


        console.log(
            "👥 Total Members:",
            members.length
        );


        /* =========================================
           NORMALIZE MEMBER TYPE
           
           IMPORTANT:
           पहले normalizedMembers बन रहा है,
           उसके बाद membersData में save होगा।
        ========================================= */

        const normalizedMembers =
            members.map(
                (member, index) => {

                    return {

                        ...member,

                        memberType:
                            getMemberType(member),

                        order:
                            Number(member.order) ||
                            index + 1

                    };

                }
            );


        /* =========================================
           SAVE NORMALIZED DATA GLOBALLY
           
           IMPORTANT FIX
        ========================================= */

        membersData =
            normalizedMembers;


        console.log(
            "✅ Normalized Members:",
            membersData
        );


        /* =========================================
           SEPARATE OFFICE BEARERS
        ========================================= */

        const officeBearers =
            normalizedMembers.filter(
                member =>
                    member.memberType === "office"
            );


        /* =========================================
           SEPARATE GENERAL MEMBERS
        ========================================= */

        const generalMembers =
            normalizedMembers.filter(
                member =>
                    member.memberType === "general"
            );


        console.log(
            "🏛️ Office Bearers:",
            officeBearers
        );


        console.log(
            "👥 General Members:",
            generalMembers
        );


        /* =========================================
           RENDER OFFICE BEARERS
        ========================================= */

        renderOfficeBearers(
            officeBearers
        );


        /* =========================================
           RENDER GENERAL MEMBERS
        ========================================= */

        renderGeneralMembers(
            generalMembers
        );


    } catch (error) {

        console.error(
            "❌ Members loading failed:",
            error
        );


        /* =========================================
           OFFICE BEARER ERROR
        ========================================= */

        if (officeContainer) {

            officeContainer.innerHTML = `

                <div class="gallery-placeholder">

                    👥

                    <span>

                        ${
                            currentLanguage === "hi"
                                ? "पदाधिकारियों की जानकारी लोड नहीं हो सकी।"
                                : "Office bearers could not be loaded."
                        }

                    </span>

                </div>

            `;

        }


        /* =========================================
           GENERAL MEMBER ERROR
        ========================================= */

        if (generalContainer) {

            generalContainer.innerHTML = `

                <div class="gallery-placeholder">

                    👥

                    <span>

                        ${
                            currentLanguage === "hi"
                                ? "सदस्यों की जानकारी लोड नहीं हो सकी।"
                                : "General members could not be loaded."
                        }

                    </span>

                </div>

            `;

        }

    }

}


/* =========================================================
   RENDER OFFICE BEARERS
========================================================= */

function renderOfficeBearers(members) {

    const container =
        document.getElementById(
            "officeBearersContainer"
        );

    if (!container) return;


    if (
        !Array.isArray(members) ||
        members.length === 0
    ) {

        container.innerHTML = `

            <div class="gallery-placeholder">

                🏛️

                <span>
                    ${
                        currentLanguage === "hi"
                            ? "अभी कोई पदाधिकारी उपलब्ध नहीं है।"
                            : "No office bearers available yet."
                    }
                </span>

            </div>

        `;

        return;
    }


    members.sort(
        (a, b) =>
            (Number(a.order) || 999) -
            (Number(b.order) || 999)
    );


    container.innerHTML =
        members.map(member => {

            const name =
                currentLanguage === "hi"
                    ? (
                        member.nameHi ||
                        member.nameEn ||
                        member.name ||
                        "समिति सदस्य"
                    )
                    : (
                        member.nameEn ||
                        member.nameHi ||
                        member.name ||
                        "Committee Member"
                    );


            const position =
                currentLanguage === "hi"
                    ? (
                        member.positionHi ||
                        member.positionEn ||
                        member.position ||
                        "पदाधिकारी"
                    )
                    : (
                        member.positionEn ||
                        member.positionHi ||
                        member.position ||
                        "Office Bearer"
                    );


            let imageHTML = `

                <div class="member-photo">

                    <div class="default-icon">
                        👤
                    </div>

                </div>

            `;


            if (member.image) {

                let imageURL =
                    String(
                        member.image
                    ).trim();


                if (
                    !imageURL.startsWith("http://") &&
                    !imageURL.startsWith("https://") &&
                    !imageURL.startsWith("/")
                ) {

                    imageURL =
                        "/" + imageURL;

                }


                imageHTML = `

                    <div class="member-photo">

                        <img
                            src="${escapeHTML(imageURL)}"
                            alt="${escapeHTML(name)}"
                            loading="lazy"
                            onerror="
                                this.style.display='none';
                                this.parentElement
                                    .querySelector('.default-icon')
                                    .style.display='flex';
                            "
                        >

                        <div
                            class="default-icon"
                            style="display:none;">
                            👤
                        </div>

                    </div>

                `;

            }


            return `

                <div class="member-card">

                    ${imageHTML}

                    <h3>
                        ${escapeHTML(name)}
                    </h3>

                    <p>
                        ${escapeHTML(position)}
                    </p>

                </div>

            `;

        }).join("");

}


/* =========================================================
   RENDER GENERAL MEMBERS
========================================================= */

function renderGeneralMembers(members) {

    const container =
        document.getElementById(
            "generalMembersContainer"
        );

    if (!container) return;


    if (
        !Array.isArray(members) ||
        members.length === 0
    ) {

        container.innerHTML = `

            <div class="gallery-placeholder">

                👥

                <span>
                    ${
                        currentLanguage === "hi"
                            ? "अभी कोई सामान्य सदस्य उपलब्ध नहीं है।"
                            : "No general members available yet."
                    }
                </span>

            </div>

        `;

        return;
    }


    members.sort(
        (a, b) =>
            (Number(a.order) || 999) -
            (Number(b.order) || 999)
    );


    container.innerHTML =
        members.map(member => {

            const name =
                currentLanguage === "hi"
                    ? (
                        member.nameHi ||
                        member.nameEn ||
                        member.name ||
                        "समिति सदस्य"
                    )
                    : (
                        member.nameEn ||
                        member.nameHi ||
                        member.name ||
                        "Committee Member"
                    );


            const position =
                currentLanguage === "hi"
                    ? (
                        member.positionHi ||
                        member.positionEn ||
                        member.position ||
                        "सदस्य"
                    )
                    : (
                        member.positionEn ||
                        member.positionHi ||
                        member.position ||
                        "Member"
                    );


            let imageHTML = `

                <div class="member-photo">

                    <div class="default-icon">
                        👤
                    </div>

                </div>

            `;


            if (member.image) {

                let imageURL =
                    String(
                        member.image
                    ).trim();


                if (
                    !imageURL.startsWith("http://") &&
                    !imageURL.startsWith("https://") &&
                    !imageURL.startsWith("/")
                ) {

                    imageURL =
                        "/" + imageURL;

                }


                imageHTML = `

                    <div class="member-photo">

                        <img
                            src="${escapeHTML(imageURL)}"
                            alt="${escapeHTML(name)}"
                            loading="lazy"
                            onerror="
                                this.style.display='none';
                                this.parentElement
                                    .querySelector('.default-icon')
                                    .style.display='flex';
                            "
                        >

                        <div
                            class="default-icon"
                            style="display:none;">
                            👤
                        </div>

                    </div>

                `;

            }


            return `

                <div class="member-card">

                    ${imageHTML}

                    <h3>
                        ${escapeHTML(name)}
                    </h3>

                    <p>
                        ${escapeHTML(position)}
                    </p>

                </div>

            `;

        }).join("");

}
    
/* =========================================================
   LOAD PUJA PROGRAM
========================================================= */

async function loadProgram(year = null) {

    const container =
        document.getElementById(
            "programContainer"
        );

    if (!container) {
        return;
    }


    try {

        container.innerHTML = `

            <div class="gallery-placeholder">

                🪔

                <span>

                    ${
                        currentLanguage === "hi"
                            ? "पूजा कार्यक्रम लोड हो रहा है..."
                            : "Loading Puja Program..."
                    }

                </span>

            </div>

        `;


        let url =
            `${API_BASE_URL}/programs`;


        if (year) {

            url +=
                `?year=${encodeURIComponent(year)}`;

        }


        console.log(
            "🔄 Loading program:",
            url
        );


        const response =
            await fetch(
                url,
                {
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                `Program API Error: ${response.status}`
            );

        }


        const result =
            await response.json();


        if (Array.isArray(result)) {

            programData = result;

        } else if (
            result &&
            Array.isArray(result.data)
        ) {

            programData = result.data;

        } else {

            programData = [];

        }


        console.log(
            "✅ Program loaded:",
            programData
        );


        renderProgram();


    } catch (error) {

        console.error(
            "❌ Program loading failed:",
            error
        );


        programData = [

            {
                dayHi: "षष्ठी",
                dayEn: "Shashthi",
                titleHi: "षष्ठी पूजा",
                titleEn: "Shashthi Puja",
                descriptionHi:
                    "माँ दुर्गा का स्वागत एवं पूजा",
                descriptionEn:
                    "Welcome and Puja of Maa Durga"
            },

            {
                dayHi: "सप्तमी",
                dayEn: "Saptami",
                titleHi: "सप्तमी पूजा",
                titleEn: "Saptami Puja",
                descriptionHi:
                    "विशेष पूजा एवं आरती",
                descriptionEn:
                    "Special Puja and Aarti"
            },

            {
                dayHi: "अष्टमी",
                dayEn: "Ashtami",
                titleHi: "महाअष्टमी",
                titleEn: "Maha Ashtami",
                descriptionHi:
                    "विशेष पूजा एवं संधि पूजा",
                descriptionEn:
                    "Special Puja and Sandhi Puja"
            },

            {
                dayHi: "नवमी",
                dayEn: "Navami",
                titleHi: "महानवमी",
                titleEn: "Maha Navami",
                descriptionHi:
                    "महाआरती एवं विशेष कार्यक्रम",
                descriptionEn:
                    "Maha Aarti and Special Events"
            },

            {
                dayHi: "दशमी",
                dayEn: "Dashami",
                titleHi: "विजयादशमी",
                titleEn: "Vijayadashami",
                descriptionHi:
                    "विजय उत्सव",
                descriptionEn:
                    "Victory Festival"
            }

        ];


        renderProgram();

    }

}


/* =========================================================
   RENDER PROGRAM
========================================================= */

function renderProgram() {

    const container =
        document.getElementById(
            "programContainer"
        );

    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (
        !Array.isArray(programData) ||
        programData.length === 0
    ) {

        container.innerHTML = `

            <div class="gallery-placeholder">

                🪔

                <span>

                    ${
                        currentLanguage === "hi"
                            ? "इस वर्ष का पूजा कार्यक्रम अभी उपलब्ध नहीं है।"
                            : "Puja program is not available for this year."
                    }

                </span>

            </div>

        `;

        return;

    }


    programData.forEach(event => {

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "program-card";


        const day =
            currentLanguage === "hi"
                ? (
                    event.dayHi ||
                    event.day ||
                    ""
                )
                : (
                    event.dayEn ||
                    event.day ||
                    ""
                );


        const title =
            currentLanguage === "hi"
                ? (
                    event.titleHi ||
                    event.title ||
                    ""
                )
                : (
                    event.titleEn ||
                    event.title ||
                    ""
                );


        const description =
            currentLanguage === "hi"
                ? (
                    event.descriptionHi ||
                    event.description ||
                    ""
                )
                : (
                    event.descriptionEn ||
                    event.description ||
                    ""
                );


        card.innerHTML = `

            <div class="day">
                ${escapeHTML(day)}
            </div>

            <h3>
                ${escapeHTML(title)}
            </h3>

            <p>
                ${escapeHTML(description)}
            </p>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   PROGRAM YEAR CHANGE
========================================================= */

function setupProgramYear() {

    const programYear =
        document.getElementById(
            "programYear"
        );

    if (!programYear) {
        return;
    }


    programYear.addEventListener(
        "change",
        async () => {

            const selectedYear =
                programYear.value;


            console.log(
                "📅 Selected Puja Year:",
                selectedYear
            );


            await loadProgram(
                selectedYear
            );

        }
    );

}


/* =========================================================
   LOAD NOTICES
========================================================= */

async function loadNotices() {

    const container =
        document.getElementById(
            "noticeContainer"
        );

    if (!container) {
        return;
    }


    try {

        container.innerHTML = `

            <div class="gallery-placeholder">

                📢

                <span>

                    ${
                        currentLanguage === "hi"
                            ? "सूचना लोड हो रही है..."
                            : "Loading notices..."
                    }

                </span>

            </div>

        `;


        const response =
            await fetch(
                `${API_BASE_URL}/notices`,
                {
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                `Notice API Error: ${response.status}`
            );

        }


        const result =
            await response.json();


        if (Array.isArray(result)) {

            noticesData = result;

        } else if (
            result &&
            Array.isArray(result.data)
        ) {

            noticesData = result.data;

        } else {

            noticesData = [];

        }


        console.log(
            "✅ Notices loaded:",
            noticesData
        );


        renderNotices();


    } catch (error) {

        console.warn(
            "⚠️ Notice API not available:",
            error
        );


        noticesData = [];

        renderNotices();

    }

}


/* =========================================================
   RENDER NOTICES
========================================================= */

function renderNotices() {

    const container =
        document.getElementById(
            "noticeContainer"
        );

    if (!container) {
        return;
    }


    if (
        !Array.isArray(noticesData) ||
        noticesData.length === 0
    ) {

        container.innerHTML = `

            <div class="gallery-placeholder">

                📢

                <span>

                    ${
                        currentLanguage === "hi"
                            ? "अभी कोई सूचना उपलब्ध नहीं है।"
                            : "No notices available."
                    }

                </span>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    noticesData.forEach(notice => {

        const title =
            currentLanguage === "hi"
                ? (
                    notice.titleHi ||
                    notice.titleHindi ||
                    notice.titleEn ||
                    notice.title ||
                    ""
                )
                : (
                    notice.titleEn ||
                    notice.titleEnglish ||
                    notice.titleHi ||
                    notice.title ||
                    ""
                );


        const description =
            currentLanguage === "hi"
                ? (
                    notice.messageHi ||
                    notice.messageHindi ||
                    notice.messageEn ||
                    notice.message ||
                    ""
                )
                : (
                    notice.messageEn ||
                    notice.messageEnglish ||
                    notice.messageHi ||
                    notice.message ||
                    ""
                );


        const card =
            document.createElement(
                "div"
            );

        card.className =
            "notice-card";


        card.innerHTML = `

            <span class="notice-icon">
                🔔
            </span>

            <div>

                <h3>
                    ${escapeHTML(title)}
                </h3>

                <p>
                    ${escapeHTML(description)}
                </p>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   LOAD GALLERY
========================================================= */

async function loadGallery() {

    const container =
        document.getElementById(
            "galleryContainer"
        );

    if (!container) {
        return;
    }


    galleryData = [

        {
            year: 2026,
            category: "puja",
            image: "images/mata-rani.jpg",
            title: "माता रानी"
        },

        {
            year: 2026,
            category: "puja",
            image: "images/puja-1.jpg",
            title: "दुर्गा पूजा"
        },

        {
            year: 2026,
            category: "puja",
            image: "images/puja-2.jpg",
            title: "दुर्गा पूजा"
        },

        {
            year: 2026,
            category: "aarti",
            image: "images/puja-3.jpg",
            title: "आरती"
        },

        {
            year: 2026,
            category: "pandal",
            image: "images/puja-4.jpg",
            title: "पंडाल"
        },

        {
            year: 2026,
            category: "cultural",
            image: "images/puja-5.jpg",
            title: "सांस्कृतिक कार्यक्रम"
        },

        {
            year: 2026,
            category: "visarjan",
            image: "images/puja-6.jpg",
            title: "विसर्जन"
        }

    ];


    setupGalleryFilters();

    filterGallery();

}


/* =========================================================
   GALLERY FILTER
========================================================= */

function setupGalleryFilters() {

    const yearFilter =
        document.getElementById(
            "galleryYear"
        );

    const categoryFilter =
        document.getElementById(
            "galleryCategory"
        );


    if (
        !yearFilter ||
        !categoryFilter
    ) {

        return;

    }


    /*
       Duplicate event listener prevent
    */

    if (
        yearFilter.dataset.listenerAttached !== "true"
    ) {

        yearFilter.addEventListener(
            "change",
            filterGallery
        );

        yearFilter.dataset.listenerAttached =
            "true";

    }


    if (
        categoryFilter.dataset.listenerAttached !== "true"
    ) {

        categoryFilter.addEventListener(
            "change",
            filterGallery
        );

        categoryFilter.dataset.listenerAttached =
            "true";

    }

}


function filterGallery() {

    const yearElement =
        document.getElementById(
            "galleryYear"
        );

    const categoryElement =
        document.getElementById(
            "galleryCategory"
        );

    const container =
        document.getElementById(
            "galleryContainer"
        );


    if (
        !container ||
        !yearElement ||
        !categoryElement
    ) {

        return;

    }


    const year =
        yearElement.value;

    const category =
        categoryElement.value;


    const filtered =
        galleryData.filter(item => {

            const yearMatch =
                year === "all" ||
                String(item.year) ===
                String(year);


            const categoryMatch =
                category === "all" ||
                item.category ===
                category;


            return (
                yearMatch &&
                categoryMatch
            );

        });


    container.innerHTML = "";


    if (!filtered.length) {

        container.innerHTML = `

            <div class="gallery-placeholder">

                📸

                <span>

                    ${
                        currentLanguage === "hi"
                            ? "इस श्रेणी में अभी कोई फोटो उपलब्ध नहीं है।"
                            : "No photos available in this category yet."
                    }

                </span>

            </div>

        `;

        return;

    }


    filtered.forEach(item => {

        const galleryItem =
            document.createElement(
                "div"
            );


        galleryItem.className =
            "gallery-item";


        galleryItem.innerHTML = `

            <img
                src="${escapeHTML(item.image)}"
                alt="${escapeHTML(item.title)}"
                loading="lazy">

        `;


        container.appendChild(
            galleryItem
        );

    });

}


/* =========================================================
   VIDEOS
========================================================= */

function loadVideos(videos = []) {

    const container =
        document.getElementById(
            "videoContainer"
        );


    if (!container) {
        return;
    }


    if (!Array.isArray(videos) || !videos.length) {

        container.innerHTML = `

            <div class="gallery-placeholder">

                🎥

                <span>

                    ${
                        currentLanguage === "hi"
                            ? "अभी कोई वीडियो उपलब्ध नहीं है।"
                            : "No videos available yet."
                    }

                </span>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    videos.forEach(video => {

        const wrapper =
            document.createElement(
                "div"
            );


        wrapper.className =
            "video-item";


        wrapper.innerHTML = `

            <iframe
                src="${escapeHTML(video.url)}"
                title="${escapeHTML(
                    video.title ||
                    "Durga Puja Video"
                )}"
                frameborder="0"
                allowfullscreen>
            </iframe>

        `;


        container.appendChild(
            wrapper
        );

    });

}


/* =========================================================
   LIVE DARSHAN
========================================================= */

function setupLiveDarshan(
    streamUrl = null
) {

    const container =
        document.getElementById(
            "liveContainer"
        );


    if (!container) {
        return;
    }


    if (!streamUrl) {

        container.innerHTML = `

            <div class="gallery-placeholder">

                🔴

                <span>

                    ${
                        currentLanguage === "hi"
                            ? "लाइव दर्शन अभी उपलब्ध नहीं है।"
                            : "Live Darshan is currently unavailable."
                    }

                </span>

            </div>

        `;

        return;

    }


    container.innerHTML = `

        <div class="live-video">

            <iframe
                src="${escapeHTML(streamUrl)}"
                title="Live Darshan"
                frameborder="0"
                allowfullscreen>
            </iframe>

        </div>

    `;

}


/* =========================================================
   SPECIAL DARSHAN POPUP
========================================================= */

function setupDarshanPopup() {

    const button =
        document.getElementById(
            "darshanModeBtn"
        );

    const overlay =
        document.getElementById(
            "darshanOverlay"
        );

    const closeButton =
        document.getElementById(
            "closeDarshan"
        );


    if (
        !button ||
        !overlay
    ) {

        return;

    }


    button.addEventListener(
        "click",
        () => {

            overlay.classList.add(
                "active"
            );

            overlay.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow =
                "hidden";

        }
    );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeDarshanPopup
        );

    }


    overlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                overlay
            ) {

                closeDarshanPopup();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                overlay.classList.contains(
                    "active"
                )
            ) {

                closeDarshanPopup();

            }

        }
    );

}


function closeDarshanPopup() {

    const overlay =
        document.getElementById(
            "darshanOverlay"
        );


    if (!overlay) {
        return;
    }


    overlay.classList.remove(
        "active"
    );


    overlay.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


/* =========================================================
   DONATION AMOUNT BUTTONS
========================================================= */

function setupAmountButtons() {

    const buttons =
        document.querySelectorAll(
            ".amount-options button"
        );

    const amountInput =
        document.getElementById(
            "donationAmount"
        );


    if (!amountInput) {
        return;
    }


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const amount =
                    button.getAttribute(
                        "data-amount"
                    );


                amountInput.value =
                    amount;


                buttons.forEach(btn => {

                    btn.classList.remove(
                        "selected"
                    );

                });


                button.classList.add(
                    "selected"
                );

            }
        );

    });

}


/* =========================================================
   DONATION FORM
========================================================= */

function setupDonationForm() {

    const form =
        document.getElementById(
            "donationForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "donorName"
                    )
                    ?.value.trim() || "";


            const mobile =
                document
                    .getElementById(
                        "donorMobile"
                    )
                    ?.value.trim() || "";


            const email =
                document
                    .getElementById(
                        "donorEmail"
                    )
                    ?.value.trim() || "";


            const address =
                document
                    .getElementById(
                        "donorAddress"
                    )
                    ?.value.trim() || "";


            const amount =
                document
                    .getElementById(
                        "donationAmount"
                    )
                    ?.value || "";


            if (
                !/^[6-9]\d{9}$/.test(
                    mobile
                )
            ) {

                showMessage(
                    currentLanguage === "hi"
                        ? "कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।"
                        : "Please enter a valid 10-digit mobile number.",
                    "error"
                );

                return;

            }


            if (
                !amount ||
                Number(amount) <= 0
            ) {

                showMessage(
                    currentLanguage === "hi"
                        ? "कृपया सहयोग राशि दर्ज करें।"
                        : "Please enter a valid donation amount.",
                    "error"
                );

                return;

            }


            const donationData = {

                name,

                mobile,

                email,

                address,

                amount:
                    Number(amount),

                year:
                    new Date()
                        .getFullYear(),

                paymentMethod:
                    "Online",

                status:
                    "pending",

                createdAt:
                    new Date()
                        .toISOString()

            };


            try {

                const response =
                    await fetch(
                        `${API_BASE_URL}/donations/create`,
                        {

                            method:
                                "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(
                                    donationData
                                )

                        }
                    );


                if (response.ok) {

                    const result =
                        await response.json();


                    console.log(
                        "✅ Donation created:",
                        result
                    );


                    showMessage(
                        currentLanguage === "hi"
                            ? "आपकी जानकारी सफलतापूर्वक दर्ज हो गई है।"
                            : "Your donation information has been submitted successfully.",
                        "success"
                    );


                    form.reset();

                    return;

                }


                throw new Error(
                    `Donation API Error: ${response.status}`
                );


            } catch (error) {

                console.warn(
                    "⚠️ Donation API unavailable:",
                    error
                );


                showMessage(
                    currentLanguage === "hi"
                        ? "Donation system अभी payment gateway से connect नहीं है।"
                        : "The payment system is not connected to the payment gateway yet.",
                    "info"
                );

            }

        }
    );

}


/* =========================================================
   CONTACT FORM
========================================================= */

function setupContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "contactName"
                    )
                    ?.value.trim() || "";


            const mobile =
                document
                    .getElementById(
                        "contactMobile"
                    )
                    ?.value.trim() || "";


            const email =
                document
                    .getElementById(
                        "contactEmail"
                    )
                    ?.value.trim() || "";


            const message =
                document
                    .getElementById(
                        "contactMessage"
                    )
                    ?.value.trim() || "";


            if (
                !name ||
                !mobile ||
                !message
            ) {

                showMessage(
                    currentLanguage === "hi"
                        ? "कृपया सभी आवश्यक जानकारी भरें।"
                        : "Please fill all required information.",
                    "error"
                );

                return;

            }


            if (
                !/^[6-9]\d{9}$/.test(
                    mobile
                )
            ) {

                showMessage(
                    currentLanguage === "hi"
                        ? "कृपया सही मोबाइल नंबर दर्ज करें।"
                        : "Please enter a valid mobile number.",
                    "error"
                );

                return;

            }


            const contactData = {

                name,

                mobile,

                email,

                message,

                createdAt:
                    new Date()
                        .toISOString()

            };


            try {

                const response =
                    await fetch(
                        `${API_BASE_URL}/contact`,
                        {

                            method:
                                "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(
                                    contactData
                                )

                        }
                    );


                if (response.ok) {

                    showMessage(
                        currentLanguage === "hi"
                            ? "आपका संदेश सफलतापूर्वक भेज दिया गया है।"
                            : "Your message has been sent successfully.",
                        "success"
                    );


                    form.reset();

                    return;

                }


                throw new Error(
                    `Contact API Error: ${response.status}`
                );


            } catch (error) {

                console.warn(
                    "⚠️ Contact API unavailable:",
                    error
                );


                showMessage(
                    currentLanguage === "hi"
                        ? "संदेश अभी backend से connect नहीं हो पाया।"
                        : "The message could not be connected to the backend yet.",
                    "info"
                );

            }

        }
    );

}
/* =========================================================
   LOAD PUBLIC DONATION RECORDS
========================================================= */

async function loadPublicDonations() {

    const tableBody =
        document.getElementById(
            "publicDonationTableBody"
        );

    const totalDonors =
        document.getElementById(
            "publicTotalDonors"
        );

    const totalDonation =
        document.getElementById(
            "publicTotalDonation"
        );

    const yearFilter =
        document.getElementById(
            "publicDonationYear"
        );


    if (!tableBody) {

        console.warn(
            "⚠️ Public donation table not found."
        );

        return;
    }


    try {

        console.log(
            "🔄 Loading public donation records..."
        );


        const response =
            await fetch(
                `${API_BASE_URL}/donations/public?t=${Date.now()}`,
                {
                    method: "GET",

                    headers: {
                        "Accept": "application/json",
                        "Cache-Control": "no-cache"
                    },

                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                `Public Donations API Error: ${response.status}`
            );

        }


        const result =
            await response.json();


        console.log(
            "✅ Public donation response:",
            result
        );


        let records = [];


        if (Array.isArray(result)) {

            records = result;

        } else if (
            result &&
            Array.isArray(result.records)
        ) {

            records = result.records;

        } else if (
            result &&
            Array.isArray(result.data)
        ) {

            records = result.data;

        }


        console.log(
            "💰 Public donation records:",
            records
        );


        /* =========================================
           SAVE DATA
        ========================================= */

        window.publicDonationData =
            records;


        /* =========================================
           FILTER FUNCTION
        ========================================= */

        function renderDonationRecords() {

            const selectedYear =
                yearFilter
                    ? yearFilter.value
                    : "all";


            let filteredRecords =
                records.filter(record => {

                    if (
                        selectedYear === "all"
                    ) {
                        return true;
                    }


                    return String(
                        record.year || ""
                    ) === String(
                        selectedYear
                    );

                });


            /* =====================================
               TOTAL DONORS
            ===================================== */

            if (totalDonors) {

                totalDonors.textContent =
                    filteredRecords.length;

            }


            /* =====================================
               TOTAL DONATION
            ===================================== */

            const total =
                filteredRecords.reduce(
                    (
                        sum,
                        record
                    ) => {

                        return (
                            sum +
                            Number(
                                record.amount || 0
                            )
                        );

                    },
                    0
                );


            if (totalDonation) {

                totalDonation.textContent =
                    "₹" +
                    total.toLocaleString(
                        "en-IN"
                    );

            }


            /* =====================================
               EMPTY RECORDS
            ===================================== */

            if (
                filteredRecords.length === 0
            ) {

                tableBody.innerHTML = `

                    <tr>

                        <td
                            colspan="6"
                            data-hi="अभी कोई सार्वजनिक रिकॉर्ड उपलब्ध नहीं है।"
                            data-en="No public records available yet.">

                            ${
                                currentLanguage === "hi"
                                    ? "अभी कोई सार्वजनिक रिकॉर्ड उपलब्ध नहीं है।"
                                    : "No public records available yet."
                            }

                        </td>

                    </tr>

                `;

                return;

            }


            /* =====================================
               TABLE RENDER
            ===================================== */

            tableBody.innerHTML =
                filteredRecords
                    .map(
                        (
                            record,
                            index
                        ) => {

                            const name =
                                escapeHTML(
                                    record.name ||
                                    record.nameHi ||
                                    record.nameEn ||
                                    "Anonymous"
                                );


                            const year =
                                escapeHTML(
                                    record.year ||
                                    ""
                                );


                            const amount =
                                Number(
                                    record.amount || 0
                                ).toLocaleString(
                                    "en-IN"
                                );


                            const paymentMethod =
                                escapeHTML(
                                    record.paymentMethod ||
                                    record.paymentMode ||
                                    "Online"
                                );


                            let date = "";


                            if (
                                record.createdAt
                            ) {

                                const dateObject =
                                    new Date(
                                        record.createdAt
                                    );


                                if (
                                    !isNaN(
                                        dateObject.getTime()
                                    )
                                ) {

                                    date =
                                        dateObject.toLocaleDateString(
                                            "en-IN"
                                        );

                                }

                            }


                            if (!date) {

                                date =
                                    escapeHTML(
                                        record.date ||
                                        ""
                                    );

                            }


                            return `

                                <tr>

                                    <td>
                                        ${index + 1}
                                    </td>

                                    <td>
                                        ${year}
                                    </td>

                                    <td>
                                        ${name}
                                    </td>

                                    <td>
                                        ₹${amount}
                                    </td>

                                    <td>
                                        ${paymentMethod}
                                    </td>

                                    <td>
                                        ${date}
                                    </td>

                                </tr>

                            `;

                        }
                    )
                    .join("");

        }


        /* =========================================
           FIRST RENDER
        ========================================= */

        renderDonationRecords();


        /* =========================================
           YEAR FILTER
        ========================================= */

        if (
            yearFilter &&
            yearFilter.dataset.listenerAttached !==
                "true"
        ) {

            yearFilter.addEventListener(
                "change",
                renderDonationRecords
            );


            yearFilter.dataset.listenerAttached =
                "true";

        }


    } catch (error) {

        console.error(
            "❌ Public donation loading failed:",
            error
        );


        if (totalDonors) {

            totalDonors.textContent =
                "0";

        }


        if (totalDonation) {

            totalDonation.textContent =
                "₹0";

        }


        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="6">

                    ${
                        currentLanguage === "hi"
                            ? "सहयोग रिकॉर्ड लोड नहीं हो सका।"
                            : "Donation records could not be loaded."
                    }

                </td>

            </tr>

        `;

    }

}

/* =========================================================
   CONTRIBUTORS
========================================================= */

async function loadContributors() {

    const container =
        document.getElementById(
            "contributorsContainer"
        );


    if (!container) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/contributors`,
                {
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                `Contributor API Error: ${response.status}`
            );

        }


        const result =
            await response.json();


        if (Array.isArray(result)) {

            contributorsData = result;

        } else if (
            result &&
            Array.isArray(result.data)
        ) {

            contributorsData = result.data;

        } else {

            contributorsData = [];

        }


        console.log(
            "✅ Contributors loaded:",
            contributorsData
        );


        renderContributors();


    } catch (error) {

        console.warn(
            "⚠️ Contributor API unavailable:",
            error
        );


        contributorsData = [];


        renderContributors();

    }

}


/* =========================================================
   RENDER CONTRIBUTORS
========================================================= */

function renderContributors() {

    const container =
        document.getElementById(
            "contributorsContainer"
        );


    if (!container) {
        return;
    }


    if (
        !Array.isArray(
            contributorsData
        ) ||
        contributorsData.length === 0
    ) {

        container.innerHTML = `

            <div class="gallery-placeholder">

                🏆

                <span>

                    ${
                        currentLanguage === "hi"
                            ? "अभी कोई सहयोगकर्ता उपलब्ध नहीं है।"
                            : "No contributors available yet."
                    }

                </span>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    contributorsData.forEach(
        donor => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "member-card";


            const name =
                donor.name ||
                donor.nameHi ||
                donor.nameEn ||
                "Anonymous";


            card.innerHTML = `

                <div class="member-photo">

                    <div class="default-icon">

                        🙏

                    </div>

                </div>

                <h3>

                    ${escapeHTML(name)}

                </h3>

                <p>

                    ${
                        currentLanguage === "hi"
                            ? "सहयोगकर्ता"
                            : "Contributor"
                    }

                </p>

            `;


            container.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   MESSAGE / NOTIFICATION
========================================================= */

function showMessage(
    message,
    type = "info"
) {

    const existing =
        document.querySelector(
            ".website-message"
        );


    if (existing) {
        existing.remove();
    }


    const box =
        document.createElement(
            "div"
        );


    box.className =
        `website-message ${type}`;


    box.textContent =
        message;


    box.style.position =
        "fixed";

    box.style.top =
        "20px";

    box.style.right =
        "20px";

    box.style.zIndex =
        "99999";

    box.style.padding =
        "15px 20px";

    box.style.borderRadius =
        "12px";

    box.style.background =
        "#ffffff";

    box.style.boxShadow =
        "0 8px 25px rgba(0,0,0,0.2)";

    box.style.fontWeight =
        "bold";

    box.style.maxWidth =
        "380px";


    document.body.appendChild(
        box
    );


    setTimeout(
        () => {

            if (box.parentNode) {
                box.remove();
            }

        },
        4000
    );

}


/* =========================================================
   HTML SECURITY
========================================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   WINDOW EXPORTS
========================================================= */

window.changeLanguage =
    changeLanguage;


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%c🔱 Shree Shree Durga Puja Samiti Website",
    "font-size:18px;font-weight:bold;"
);

console.log(
    "✅ Frontend JavaScript Loaded Successfully."
);

// ============================================================
// WHOLE WEBSITE BACKGROUND VIDEO AUTOPLAY
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    const bgVideo = document.getElementById("websiteBackgroundVideo");

    if (!bgVideo) return;

    bgVideo.muted = true;
    bgVideo.setAttribute("muted", "");
    bgVideo.setAttribute("playsinline", "");

    const playVideo = () => {
        bgVideo.play().catch(error => {
            console.log("Background video autoplay blocked:", error);
        });
    };

    playVideo();

    // Try again after page is fully loaded
    window.addEventListener("load", playVideo);

}
);
// Mobile video autoplay fallback
document.addEventListener("touchstart", () => {

    const bgVideo =
        document.getElementById("websiteBackgroundVideo");

    if (!bgVideo) return;

    bgVideo.muted = true;

    bgVideo.play().catch(error => {
        console.log("Mobile background video blocked:", error);
    });

}, { once: true });
/* =========================================================
API
========================================================= */

const API = "";

let token = localStorage.getItem("durgaAdminToken");

let currentLanguage =
localStorage.getItem("adminLanguage") || "hi";

//let noticeLanguage = "hi";

/* =========================================================
TRANSLATIONS
========================================================= */

const translations = {

hi: {

    adminLogin: "एडमिन लॉगिन",
    username: "यूज़रनेम",
    password: "पासवर्ड",
    login: "लॉगिन",

    dashboard: "डैशबोर्ड",
    members: "सदस्य",
    programs: "कार्यक्रम",
    notices: "सूचनाएँ",
    gallery: "गैलरी",
    videos: "वीडियो",
    liveDarshan: "लाइव दर्शन",
    specialDarshan: "विशेष दर्शन",
    donations: "दान",
    contributors: "योगदानकर्ता",
    contactMessages: "संपर्क संदेश",
    logout: "लॉगआउट",

    totalMembers: "कुल सदस्य",
    totalDonations: "कुल दान",
    totalAmount: "कुल राशि",
    newMessages: "नए संदेश",
    recentDonations: "हाल के दान",

    committeeMembers: "👥 समिति सदस्य",
    memberType: "सदस्य प्रकार",
    officeBearer: "🏛️ Office Bearer",
    generalMember: "👥 General Member",
    positionHindi: "पद - हिंदी",
    positionEnglish: "पद - English",
    nameHindi: "नाम - हिंदी",
    nameEnglish: "नाम - English",
    imageUrl: "Image URL",
    order: "क्रम",
    addMember: "+ सदस्य जोड़ें",
    membersList: "सदस्य सूची",

    pujaProgram: "📅 पूजा कार्यक्रम",
    year: "वर्ष",
    date: "दिनांक",
    dayHindi: "दिन - हिंदी",
    dayEnglish: "Day - English",
    titleHindi: "शीर्षक - हिंदी",
    titleEnglish: "Title - English",
    descriptionHindi: "विवरण - हिंदी",
    descriptionEnglish: "Description - English",
    time: "समय",
    addProgram: "+ कार्यक्रम जोड़ें",
    programList: "कार्यक्रम सूची",

    notice: "📢 सूचना",
    messageHindi: "संदेश - हिंदी",
    messageEnglish: "Message - English",
    addNotice: "+ सूचना जोड़ें",
    noticeList: "सूचना सूची",

    category: "श्रेणी",
    puja: "पूजा",
    event: "कार्यक्रम",
    committee: "समिति",
    other: "अन्य",
    addGallery: "+ गैलरी जोड़ें",
    galleryList: "गैलरी सूची",

    youtubeVideo: "🎥 YouTube वीडियो",
    youtubeUrl: "YouTube URL",
    thumbnailUrl: "Thumbnail URL",
    addVideo: "+ वीडियो जोड़ें",
    videoList: "वीडियो सूची",

    streamUrl: "Stream URL",
    active: "सक्रिय",
    saveLive: "लाइव दर्शन सेव करें",

    saveDarshan: "विशेष दर्शन सेव करें",

    donationManagement: "💰 दान प्रबंधन",
    donorName: "दाता का नाम *",
    fatherName: "पिता का नाम",
    designation: "पद",
    organization: "कंपनी / संस्था",
    mobile: "मोबाइल",
    email: "ईमेल",
    amount: "राशि",
    address: "पता",
    receivedBy: "प्राप्तकर्ता",
    paymentMode: "भुगतान का माध्यम",
    select: "चुनें",
    cash: "नकद",
    bankTransfer: "बैंक ट्रांसफर",
    cheque: "चेक",
    remarks: "टिप्पणी",
    addDonation: "+ दान जोड़ें",
    exportExcel: "📥 Excel Export",
    donationRecords: "दान रिकॉर्ड",

    message: "संदेश",
    approved: "स्वीकृत",
    addContributor: "+ योगदानकर्ता जोड़ें",
    contributorList: "योगदानकर्ता सूची",

    name: "नाम",
    loading: "लोड हो रहा है...",
    action: "कार्यवाही",
    delete: "हटाएँ",
    read: "पढ़ा गया",

    noRecords: "कोई रिकॉर्ड नहीं मिला.",

    programAdded: "कार्यक्रम सफलतापूर्वक जोड़ा गया।",
    memberAdded: "सदस्य सफलतापूर्वक जोड़ा गया।",
    noticeAdded: "सूचना सफलतापूर्वक जोड़ी गई।",
    galleryAdded: "गैलरी आइटम सफलतापूर्वक जोड़ा गया।",
    videoAdded: "वीडियो सफलतापूर्वक जोड़ा गया।",
    liveUpdated: "लाइव दर्शन अपडेट हो गया।",
    darshanUpdated: "विशेष दर्शन अपडेट हो गया।",
    donationAdded: "दान सफलतापूर्वक जोड़ा गया।",
    contributorAdded: "योगदानकर्ता सफलतापूर्वक जोड़ा गया।",

    deleteMemberConfirm: "क्या आप इस सदस्य को हटाना चाहते हैं?",
    deleteProgramConfirm: "क्या आप इस कार्यक्रम को हटाना चाहते हैं?",
    deleteGalleryConfirm: "क्या आप इस गैलरी आइटम को हटाना चाहते हैं?",
    deleteVideoConfirm: "क्या आप इस वीडियो को हटाना चाहते हैं?",
    deleteDonationConfirm: "क्या आप इस दान रिकॉर्ड को हटाना चाहते हैं?",
    deleteMessageConfirm: "क्या आप इस संदेश को हटाना चाहते हैं?",

    donorRequired: "दाता का नाम आवश्यक है।",
    amountRequired: "सही दान राशि दर्ज करें।",

    yes: "हाँ",
    no: "नहीं"

},

en: {

    adminLogin: "Admin Login",
    username: "Username",
    password: "Password",
    login: "Login",

    dashboard: "Dashboard",
    members: "Members",
    programs: "Programs",
    notices: "Notices",
    gallery: "Gallery",
    videos: "Videos",
    liveDarshan: "Live Darshan",
    specialDarshan: "Special Darshan",
    donations: "Donations",
    contributors: "Contributors",
    contactMessages: "Contact Messages",
    logout: "Logout",

    totalMembers: "Total Members",
    totalDonations: "Total Donations",
    totalAmount: "Total Amount",
    newMessages: "New Messages",
    recentDonations: "Recent Donations",

    committeeMembers: "👥 Committee Members",
    memberType: "Member Type",
    officeBearer: "🏛️ Office Bearer",
     generalMember: "👥 General Member",
    positionHindi: "Position - Hindi",
    positionEnglish: "Position - English",
    nameHindi: "Name - Hindi",
    nameEnglish: "Name - English",
    imageUrl: "Image URL",
    order: "Order",
    addMember: "+ Add Member",
    membersList: "Members List",

    pujaProgram: "📅 Puja Program",
    year: "Year",
    date: "Date",
    dayHindi: "Day - Hindi",
    dayEnglish: "Day - English",
    titleHindi: "Title - Hindi",
    titleEnglish: "Title - English",
    descriptionHindi: "Description - Hindi",
    descriptionEnglish: "Description - English",
    time: "Time",
    addProgram: "+ Add Program",
    programList: "Program List",

    notice: "📢 Notice",
    messageHindi: "Message - Hindi",
    messageEnglish: "Message - English",
    addNotice: "+ Add Notice",
    noticeList: "Notice List",

    category: "Category",
    puja: "Puja",
    event: "Event",
    committee: "Committee",
    other: "Other",
    addGallery: "+ Add Gallery Item",
    galleryList: "Gallery List",

    youtubeVideo: "🎥 YouTube Video",
    youtubeUrl: "YouTube URL",
    thumbnailUrl: "Thumbnail URL",
    addVideo: "+ Add Video",
    videoList: "Video List",

    streamUrl: "Stream URL",
    active: "Active",
    saveLive: "Save Live Darshan",

    saveDarshan: "Save Special Darshan",

    donationManagement: "💰 Donation Management",
    donorName: "Donor Name *",
    fatherName: "Father's Name",
    designation: "Designation",
    organization: "Company / Organization",
    mobile: "Mobile",
    email: "Email",
    amount: "Amount",
    address: "Address",
    receivedBy: "Received By",
    paymentMode: "Payment Mode",
    select: "Select",
    cash: "Cash",
    bankTransfer: "Bank Transfer",
    cheque: "Cheque",
    remarks: "Remarks",
    addDonation: "+ Add Donation",
    exportExcel: "📥 Export Excel",
    donationRecords: "Donation Records",

    message: "Message",
    approved: "Approved",
    addContributor: "+ Add Contributor",
    contributorList: "Contributor List",

    name: "Name",
    loading: "Loading...",
    action: "Action",
    delete: "Delete",
    read: "Read",

    noRecords: "No records found.",

    programAdded: "Program added successfully.",
    memberAdded: "Member added successfully.",
    noticeAdded: "Notice added successfully.",
    galleryAdded: "Gallery item added successfully.",
    videoAdded: "Video added successfully.",
    liveUpdated: "Live Darshan updated.",
    darshanUpdated: "Special Darshan updated.",
    donationAdded: "Donation added successfully.",
    contributorAdded: "Contributor added successfully.",

    deleteMemberConfirm: "Delete this member?",
    deleteProgramConfirm: "Delete this program?",
    deleteGalleryConfirm: "Delete this gallery item?",
    deleteVideoConfirm: "Delete this video?",
    deleteDonationConfirm: "Delete this donation record?",
    deleteMessageConfirm: "Delete this message?",

    donorRequired: "Donor name is required.",
    amountRequired: "Valid donation amount is required.",

    yes: "Yes",
    no: "No"

}


};

/* =========================================================
LANGUAGE SYSTEM
========================================================= */

function t(key) {

return translations[currentLanguage]?.[key]
    || translations.en[key]
    || key;


}

function applyLanguage() {


document.documentElement.lang =
    currentLanguage === "hi" ? "hi" : "en";

document
    .querySelectorAll("[data-i18n]")
    .forEach(element => {

        const key =
            element.dataset.i18n;

        if (translations[currentLanguage][key]) {

            element.textContent =
                translations[currentLanguage][key];

        }

    });


document
    .querySelectorAll("[data-placeholder-hi]")
    .forEach(input => {

        input.placeholder =
            currentLanguage === "hi"
                ? input.dataset.placeholderHi
                : input.dataset.placeholderEn;

    });


document
    .querySelectorAll(".language-btn")
    .forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.lang === currentLanguage
        );

    });


updatePageTitle();

localStorage.setItem(
    "adminLanguage",
    currentLanguage
);

}

function updatePageTitle() {


const activeButton =
    document.querySelector(
        ".nav-btn.active[data-section]"
    );

if (!activeButton) return;

const span =
    activeButton.querySelector("[data-i18n]");

if (!span) return;

document.getElementById("pageTitle")
    .textContent =
    t(span.dataset.i18n);


}

document
.querySelectorAll(".language-btn")
.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            currentLanguage =
                button.dataset.lang;

            applyLanguage();

            const activeSection =
                document.querySelector(
                    ".content-section.active"
                );

            if (activeSection) {

                loadSection(
                    activeSection.id
                );

            }

        }
    );

});
/* =========================================================
   NOTICE LANGUAGE
========================================================= */



/* =========================================================
API REQUEST
========================================================= */

async function apiRequest(url, options = {}) {


options.headers =
    options.headers || {};

options.headers["Content-Type"] =
    "application/json";

if (token) {

    options.headers["Authorization"] =
        "Bearer " + token;

}

const response =
    await fetch(API + url, options);

const data =
    await response.json()
        .catch(() => ({}));

if (response.status === 401) {

    logout();

    throw new Error(
        currentLanguage === "hi"
            ? "लॉगिन सेशन समाप्त हो गया।"
            : "Login session expired."
    );

}

if (!response.ok) {

    throw new Error(
        data.message ||
        (
            currentLanguage === "hi"
                ? "रिक्वेस्ट असफल रही।"
                : "Request failed."
        )
    );

}

return data;

}

/* =========================================================
LOGIN
========================================================= */

document
.getElementById("loginForm")
.addEventListener(
"submit",
async function(e) {


        e.preventDefault();

        const username =
            document
                .getElementById("username")
                .value
                .trim();

        const password =
            document
                .getElementById("password")
                .value;

        const errorBox =
            document
                .getElementById("loginError");

        errorBox.style.display = "none";

        try {

            const response =
                await fetch(
                    "/api/auth/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            username,
                            password
                        })
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    (
                        currentLanguage === "hi"
                            ? "लॉगिन असफल रहा।"
                            : "Login failed."
                    )
                );

            }

            token = data.token;

            localStorage.setItem(
                "durgaAdminToken",
                token
            );

            showAdmin(data.admin);

        } catch(error) {

            errorBox.textContent =
                error.message;

            errorBox.style.display =
                "block";

        }

    }
);


/* =========================================================
SHOW ADMIN
========================================================= */

function showAdmin(admin) {

document
    .getElementById("loginPage")
    .style.display = "none";

document
    .getElementById("adminPanel")
    .style.display = "block";

document
    .getElementById("adminName")
    .textContent =
    admin?.username || "Admin";

applyLanguage();

loadDashboard();

}

/* =========================================================
CHECK LOGIN
========================================================= */

async function checkLogin() {

if (!token) return;

try {

    const data =
        await apiRequest(
            "/api/auth/me"
        );

    showAdmin(data.admin);

} catch(error) {

    localStorage.removeItem(
        "durgaAdminToken"
    );

    token = null;

}

}

/* =========================================================
LOGOUT
========================================================= */

async function logout() {


localStorage.removeItem(
    "durgaAdminToken"
);

token = null;

location.reload();


}

document
.getElementById("logoutBtn")
.addEventListener(
"click",
logout
);

/* =========================================================
NAVIGATION
========================================================= */

document
.querySelectorAll(".nav-btn[data-section]")
.forEach(btn => {


    btn.addEventListener(
        "click",
        () => {

            const section =
                btn.dataset.section;

            document
                .querySelectorAll(
                    ".content-section"
                )
                .forEach(s =>
                    s.classList.remove(
                        "active"
                    )
                );

            document
                .getElementById(section)
                .classList.add(
                    "active"
                );

            document
                .querySelectorAll(
                    ".nav-btn"
                )
                .forEach(b =>
                    b.classList.remove(
                        "active"
                    )
                );

            btn.classList.add("active");

            updatePageTitle();

            document
                .getElementById("sidebar")
                .classList.remove("open");

            loadSection(section);

        }
    );

});

/* =========================================================
MOBILE MENU
========================================================= */

document
.getElementById("mobileMenu")
.addEventListener(
"click",
() => {

        document
            .getElementById("sidebar")
            .classList.toggle("open");

    }
);

/* =========================================================
LOAD SECTION
========================================================= */

function loadSection(section) {

if (section === "dashboard")
    loadDashboard();

if (section === "members")
    loadMembers();

if (section === "programs")
    loadPrograms();

if (section === "notices")
    loadNotices();

if (section === "gallery")
    loadGallery();

if (section === "videos")
    loadVideos();

if (section === "live")
    loadLive();

if (section === "darshan")
    loadDarshan();

if (section === "donations")
    loadDonations();

if (section === "contributors")
    loadContributors();

if (section === "contacts")
    loadContacts();

}

/* =========================================================
DASHBOARD
========================================================= */

async function loadDashboard() {

try {

    const data =
        await apiRequest(
            "/api/admin/dashboard"
        );

    const stats =
        data.stats || {};

    document
        .getElementById("totalMembers")
        .textContent =
        stats.totalMembers || 0;

    document
        .getElementById("totalDonations")
        .textContent =
        stats.totalDonations || 0;

    document
        .getElementById("totalAmount")
        .textContent =
        "₹" +
        Number(
            stats.totalAmount || 0
        ).toLocaleString("en-IN");

    document
        .getElementById("pendingContacts")
        .textContent =
        stats.pendingContacts || 0;

    document
        .getElementById("approvedContributors")
        .textContent =
        stats.approvedContributors || 0;

    document
        .getElementById("totalPrograms")
        .textContent =
        stats.totalPrograms || 0;

    document
        .getElementById("totalNotices")
        .textContent =
        stats.totalNotices || 0;

    document
        .getElementById("totalGallery")
        .textContent =
        stats.totalGallery || 0;


    const tbody =
        document.getElementById(
            "recentDonations"
        );

    tbody.innerHTML = "";

    if (
        !data.recentDonations ||
        data.recentDonations.length === 0
    ) {

        tbody.innerHTML =
            `<tr>
                <td colspan="4">
                    ${t("noRecords")}
                </td>
            </tr>`;

        return;

    }

    data.recentDonations
        .forEach(record => {

            tbody.innerHTML +=
                `<tr>
                    <td>${escapeHtml(record.name)}</td>
                    <td>${record.year || ""}</td>
                    <td>₹${Number(record.amount || 0).toLocaleString("en-IN")}</td>
                    <td>${escapeHtml(record.date || "")}</td>
                </tr>`;

        });

} catch(error) {

    console.error(error);

}
/*===========load member==========*/
}
async function loadMembers() {

    try {

        const members =
            await apiRequest(
                "/api/members"
            );

        let html =
            `<table>
                <thead>
                    <tr>
                        <th>${t("positionHindi")}</th>
                        <th>${t("name")}</th>
                        <th>${t("order")}</th>
                        <th>${t("action")}</th>
                    </tr>
                </thead>
                <tbody>`;

        members.forEach(member => {

            const position =
                currentLanguage === "hi"
                    ? (member.positionHi || member.positionEn || "")
                    : (member.positionEn || member.positionHi || "");

            const name =
                currentLanguage === "hi"
                    ? (member.nameHi || member.nameEn || "")
                    : (member.nameEn || member.nameHi || "");

            html += `
                <tr>
                    <td>${escapeHtml(position)}</td>
                    <td>${escapeHtml(name)}</td>
                    <td>${member.order || 0}</td>
                    <td>
                        <button
                            class="btn btn-danger"
                            onclick="deleteMember('${member._id}')"
                        >
                            ${t("delete")}
                        </button>
                    </td>
                </tr>
            `;

        });

        html += `</tbody></table>`;

        const list =
            document.getElementById("membersList");

        if (list) {
            list.innerHTML = html;
        }

    } catch (error) {

        console.error(
            "Load members error:",
            error
        );

        const list =
            document.getElementById("membersList");

        if (list) {
            list.textContent = error.message;
        }

    }

}

/* =========================================================
MEMBERS
========================================================= */
    
async function addMember() {

    try {

        await apiRequest(
            "/api/admin/members",
            {
                method: "POST",

                body: JSON.stringify({

                    positionHi:
                        value("memberPositionHi"),

                    positionEn:
                        value("memberPositionEn"),

                    nameHi:
                        value("memberNameHi"),

                    nameEn:
                        value("memberNameEn"),

                    memberType:
                        value("memberType"),

                    image:
                        value("memberImage"),

                    order:
                        Number(
                            value("memberOrder")
                        ) || 0,

                    active: true

                })
            }
        );

        alert(t("memberAdded"));

        // Form clear
        document.getElementById("memberPositionHi").value = "";
        document.getElementById("memberPositionEn").value = "";
        document.getElementById("memberNameHi").value = "";
        document.getElementById("memberNameEn").value = "";
        document.getElementById("memberImage").value = "";
        document.getElementById("memberOrder").value = "";

        // Members list reload
        await loadMembers();

    } catch (error) {

        console.error(
            "Add member error:",
            error
        );

        alert(error.message);

    }

}
     loadMembers();

async function deleteMember(id) {

if (
    !confirm(
        t("deleteMemberConfirm")
    )
) return;

try {

    await apiRequest(
        "/api/admin/members/" + id,
        {
            method: "DELETE"
        }
    );

    loadMembers();

    loadDashboard();

} catch(error) {

    alert(error.message);

}

}

/* =========================================================
PROGRAMS
========================================================= */

/* =========================================================
   LOAD PROGRAM DATE & DAY BY YEAR
========================================================= */

async function loadProgramByYear() {

    const year =
        Number(
            value("programYear")
        );

    if (!year) {
        return;
    }

    try {

        const programs =
            await apiRequest(
                "/api/programs"
            );

        const yearPrograms =
            programs.filter(
                program =>
                    Number(program.year) === year
            );

        if (
            yearPrograms.length === 0
        ) {

            document.getElementById(
                "programDate"
            ).value = "";

            document.getElementById(
                "programDayHi"
            ).value = "";

            document.getElementById(
                "programDayEn"
            ).value = "";

            return;
        }

        const program =
            yearPrograms[0];

        document.getElementById(
            "programDate"
        ).value =
            program.date || "";

        document.getElementById(
            "programDayHi"
        ).value =
            program.dayHi || "";

        document.getElementById(
            "programDayEn"
        ).value =
            program.dayEn || "";

    } catch(error) {

        console.error(
            "Failed to load program by year:",
            error
        );

    }

}
async function loadPrograms() {

try {

    const programs =
        await apiRequest(
            "/api/programs"
        );

    let html =
        `<table>
            <thead>
                <tr>
                    <th>${t("date")}</th>
                    <th>${t("titleHindi")}</th>
                    <th>${t("time")}</th>
                    <th>${t("action")}</th>
                </tr>
            </thead>
            <tbody>`;

    programs.forEach(program => {

        const title =
            currentLanguage === "hi"
                ? (program.titleHi || program.titleEn || "")
                : (program.titleEn || program.titleHi || "");

        html +=
            `<tr>
                <td>${escapeHtml(program.date || "")}</td>
                <td>${escapeHtml(title)}</td>
                <td>${escapeHtml(program.time || "")}</td>
                <td>
                    <button
                        class="btn btn-danger"
                        onclick="deleteProgram('${program._id}')"
                    >
                        ${t("delete")}
                    </button>
                </td>
            </tr>`;

    });

    html += `</tbody></table>`;

    document
        .getElementById("programsList")
        .innerHTML = html;

} catch(error) {

    document
        .getElementById("programsList")
        .textContent =
        error.message;

}

}

async function addProgram() {


try {

    await apiRequest(
        "/api/admin/programs",
        {
            method: "POST",

            body: JSON.stringify({

                year:
                    Number(
                        value("programYear")
                    ),

                dayHi:
                    value("programDayHi"),

                dayEn:
                    value("programDayEn"),

                titleHi:
                    value("programTitleHi"),

                titleEn:
                    value("programTitleEn"),

                descriptionHi:
                    value("programDescriptionHi"),

                descriptionEn:
                    value("programDescriptionEn"),

                date:
                    value("programDate"),

                time:
                    value("programTime"),

                order:
                    Number(
                        value("programOrder")
                    ) || 0,

                active: true

            })

        }
    );

    alert(t("programAdded"));

    loadPrograms();

    loadDashboard();

} catch(error) {

    alert(error.message);

}

}

async function deleteProgram(id) {

if (
    !confirm(
        t("deleteProgramConfirm")
    )
) return;

try {

    await apiRequest(
        "/api/admin/programs/" + id,
        {
            method: "DELETE"
        }
    );

    loadPrograms();

    loadDashboard();

} catch(error) {

    alert(error.message);

}


}


/* =========================================================
NOTICES
========================================================= */

async function loadNotices() {

try {

    const notices =
        await apiRequest(
            "/api/admin/notices"
        );

    let html =
        `<table>
            <thead>
                <tr>
                    <th>${t("date")}</th>
                    <th>${t("titleHindi")}</th>
                    <th>${t("message")}</th>
                    <th>${t("action")}</th>
                </tr>
            </thead>
            <tbody>`;

    notices.forEach(notice => {

        const title =
            currentLanguage === "hi"
                ? (notice.titleHi || notice.titleEn || "")
                : (notice.titleEn || notice.titleHi || "");

        const message =
            currentLanguage === "hi"
                ? (notice.messageHi || notice.messageEn || "")
                : (notice.messageEn || notice.messageHi || "");

        html +=
            `<tr>
                <td>${escapeHtml(notice.date || "")}</td>
                <td>${escapeHtml(title)}</td>
                <td>${escapeHtml(message)}</td>
                <td>
                    ${
                        notice._id
                        ? `<button
                            class="btn btn-danger"
                            onclick="deleteNotice('${notice._id}')">
                            ${t("delete")}
                           </button>`
                        : ""
                    }
                </td>
            </tr>`;

    });

    html += `</tbody></table>`;

    document
        .getElementById("noticesList")
        .innerHTML = html;

} catch(error) {

    document
        .getElementById("noticesList")
        .textContent =
        error.message;

}

}

async function addNotice() {

    const titleHi = value("noticeTitleHi");
    const titleEn = value("noticeTitleEn");
    const messageHi = value("noticeMessageHi");
    const messageEn = value("noticeMessageEn");
    const date = value("noticeDate");

    if (!titleHi && !titleEn) {
        alert(
            currentLanguage === "hi"
                ? "कृपया कम से कम एक शीर्षक दर्ज करें।"
                : "Please enter at least one notice title."
        );
        return;
    }

    if (!messageHi && !messageEn) {
        alert(
            currentLanguage === "hi"
                ? "कृपया कम से कम एक संदेश दर्ज करें।"
                : "Please enter at least one notice message."
        );
        return;
    }

    try {

        await apiRequest("/api/admin/notices", {
            method: "POST",

            body: JSON.stringify({
                titleHi,
                titleEn,
                messageHi,
                messageEn,
                date
            })
        });

        alert(
            currentLanguage === "hi"
                ? "सूचना सफलतापूर्वक जोड़ दी गई।"
                : "Notice added successfully."
        );

        document.getElementById("noticeTitleHi").value = "";
        document.getElementById("noticeTitleEn").value = "";
        document.getElementById("noticeMessageHi").value = "";
        document.getElementById("noticeMessageEn").value = "";
        document.getElementById("noticeDate").value = "";

        loadNotices();
        loadDashboard();

    } catch (error) {

        console.error("Add Notice Error:", error);

        alert(
            currentLanguage === "hi"
                ? "सूचना जोड़ने में समस्या हुई।"
                : "Failed to add notice."
        );
    }
}
async function deleteNotice(id) {

if (
    !confirm(
        t("deleteMessageConfirm")
    )
) return;

try {

    await apiRequest(
        "/api/admin/notices/" + id,
        {
            method: "DELETE"
        }
    );

    loadNotices();

    loadDashboard();

} catch(error) {

    alert(error.message);

}

}
/* =========================================================
   LOAD GALLERY
   ADMIN PANEL / DATABASE ONLY
========================================================= */

async function loadGallery() {

    const container =
        document.getElementById(
            "galleryContainer"
        );

    if (!container) {
        return;
    }

    try {

        container.innerHTML = `

            <div class="gallery-placeholder">

                📸

                <span>

                    ${
                        currentLanguage === "hi"
                            ? "फोटो लोड हो रही हैं..."
                            : "Loading photos..."
                    }

                </span>

            </div>

        `;


        const response =
            await fetch(
                `${API_BASE_URL}/gallery`,
                {
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                `Gallery API Error: ${response.status}`
            );

        }


        const result =
            await response.json();


        if (Array.isArray(result)) {

            galleryData = result;

        } else if (
            result &&
            Array.isArray(result.data)
        ) {

            galleryData = result.data;

        } else {

            galleryData = [];

        }


        /* ================================================
           ONLY ACTIVE PHOTOS WITH IMAGE
        ================================================= */

        galleryData =
            galleryData.filter(item =>
                item &&
                item.image &&
                item.active !== false
            );


        console.log(
            "✅ Gallery loaded from Admin Panel:",
            galleryData
        );


        setupGalleryFilters();

        filterGallery();


    } catch (error) {

        console.error(
            "❌ Gallery loading failed:",
            error
        );


        galleryData = [];


        container.innerHTML = `

            <div class="gallery-placeholder">

                📸

                <span>

                    ${
                        currentLanguage === "hi"
                            ? "अभी कोई फोटो उपलब्ध नहीं है।"
                            : "No photos available yet."
                    }

                </span>

            </div>

        `;

    }

}

async function addGallery() {

try {

    await apiRequest(
        "/api/admin/gallery",
        {
            method: "POST",

            body: JSON.stringify({

                titleHi:
                    value("galleryTitleHi"),

                titleEn:
                    value("galleryTitleEn"),

                image:
                    value("galleryImage"),

                year:
                    Number(
                        value("galleryYear")
                    ),

                category:
                    value("galleryCategory"),

                date:
                    value("galleryDate"),

                active: true

            })

        }
    );

    alert(t("galleryAdded"));

    loadGallery();

    loadDashboard();

} catch(error) {

    alert(error.message);

}

}

async function deleteGallery(id) {

if (
    !confirm(
        t("deleteGalleryConfirm")
    )
) return;

try {

    await apiRequest(
        "/api/admin/gallery/" + id,
        {
            method: "DELETE"
        }
    );

    loadGallery();

    loadDashboard();

} catch(error) {

    alert(error.message);

}

}
/* =========================================================
DIRECT GALLERY PHOTO UPLOAD
========================================================= */

async function uploadGalleryPhoto() {

try {

    const fileInput =
        document.getElementById(
            "galleryPhotoFile"
        );


    if (
        !fileInput ||
        !fileInput.files.length
    ) {

        alert(
            "Please select a photo file."
        );

        return;

    }


    const file =
        fileInput.files[0];


    const formData =
        new FormData();


    formData.append(
        "photoFile",
        file
    );


    formData.append(
        "titleHi",
        value(
            "galleryTitleHi"
        )
    );


    formData.append(
        "titleEn",
        value(
            "galleryTitleEn"
        )
    );


    formData.append(
        "year",
        value(
            "galleryYear"
        )
    );


    formData.append(
        "category",
        value(
            "galleryCategory"
        )
    );


    formData.append(
        "date",
        value(
            "galleryDate"
        )
    );


    const token =
        localStorage.getItem(
            "durgaAdminToken"
        );


    const response =
        await fetch(
            "/api/admin/gallery/upload",
            {

                method: "POST",

                headers: {

                    Authorization:
                        "Bearer " +
                        token

                },

                body:
                    formData

            }
        );


    const result =
        await response.json();


    if (!response.ok) {

        throw new Error(
            result.message ||
            "Gallery photo upload failed."
        );

    }


    alert(
        result.message ||
        "Gallery photo uploaded successfully."
    );


    document.getElementById(
        "galleryTitleHi"
    ).value = "";


    document.getElementById(
        "galleryTitleEn"
    ).value = "";


    document.getElementById(
        "galleryPhotoFile"
    ).value = "";


    loadGallery();

    loadDashboard();


} catch (error) {

    console.error(
        "Gallery photo upload error:",
        error
    );


    alert(
        error.message ||
        "Gallery photo upload failed."
    );

}

}


/* =========================================================
   VIDEOS
========================================================= */

async function loadVideos() {

try {

    const videos =
        await apiRequest(
            "/api/videos"
        );

    let html =
        `<table>
            <thead>
                <tr>
                    <th>${t("titleHindi")}</th>
                    <th>YouTube URL</th>
                    <th>${t("action")}</th>
                </tr>
            </thead>
            <tbody>`;

    videos.forEach(video => {

        const title =
            currentLanguage === "hi"
                ? (video.titleHi || video.titleEn || "")
                : (video.titleEn || video.titleHi || "");

        html +=
            `<tr>
                <td>${escapeHtml(title)}</td>
                <td>${escapeHtml(video.youtubeUrl || "")}</td>
                <td>
                    <button
                        class="btn btn-danger"
                        onclick="deleteVideo('${video._id}')"
                    >
                        ${t("delete")}
                    </button>
                </td>
            </tr>`;

    });

    html += `</tbody></table>`;

    document
        .getElementById("videosList")
        .innerHTML = html;

} catch(error) {

    document
        .getElementById("videosList")
        .textContent =
        error.message;

}

}

async function addVideo() {

try {

    await apiRequest(
        "/api/admin/videos",
        {
            method: "POST",

            body: JSON.stringify({

                titleHi:
                    value("videoTitleHi"),

                titleEn:
                    value("videoTitleEn"),

                youtubeUrl:
                    value("youtubeUrl"),

                thumbnail:
                    value("videoThumbnail"),

                active: true

            })

        }
    );

    alert(t("videoAdded"));

    loadVideos();

} catch(error) {

    alert(error.message);

}


}
/* =========================================================
   DIRECT VIDEO UPLOAD
========================================================= */

async function uploadVideoFile() {

    try {

        const fileInput =
            document.getElementById(
                "uploadVideoFile"
            );


        if (
            !fileInput ||
            !fileInput.files.length
        ) {

            alert(
                "Please select a video file."
            );

            return;

        }


        const file =
            fileInput.files[0];


        const formData =
            new FormData();


        formData.append(
            "videoFile",
            file
        );


        formData.append(
            "titleHi",
            value(
                "uploadVideoTitleHi"
            )
        );


        formData.append(
            "titleEn",
            value(
                "uploadVideoTitleEn"
            )
        );


        const token =
            localStorage.getItem(
                "durgaAdminToken"
            );


        const response =
            await fetch(
                "/api/admin/videos/upload",
                {

                    method: "POST",

                    headers: {

                        Authorization:
                            "Bearer " +
                            token

                    },

                    body: formData

                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Video upload failed."
            );

        }


        alert(
            result.message ||
            "Video uploaded successfully."
        );


        document.getElementById(
            "uploadVideoTitleHi"
        ).value = "";


        document.getElementById(
            "uploadVideoTitleEn"
        ).value = "";


        document.getElementById(
            "uploadVideoFile"
        ).value = "";


        loadVideos();


    } catch (error) {

        console.error(
            "Video upload error:",
            error
        );


        alert(
            error.message ||
            "Video upload failed."
        );

    }

}
async function deleteVideo(id) {

if (
    !confirm(
        t("deleteVideoConfirm")
    )
) return;

try {

    await apiRequest(
        "/api/admin/videos/" + id,
        {
            method: "DELETE"
        }
    );

    loadVideos();

} catch(error) {

    alert(error.message);

}


}

/* =========================================================
LIVE DARSHAN
========================================================= */

async function loadLive() {

try {

    const data =
        await apiRequest(
            "/api/live"
        );

    document
        .getElementById("liveTitleHi")
        .value =
        data.titleHi || "";

    document
        .getElementById("liveTitleEn")
        .value =
        data.titleEn || "";

    document
        .getElementById("liveStreamUrl")
        .value =
        data.streamUrl || "";

    document
        .getElementById("liveActive")
        .checked =
        data.active === true;

} catch(error) {

    console.error(error);

}

}

async function updateLive() {

try {

    await apiRequest(
        "/api/admin/live",
        {
            method: "PUT",

            body: JSON.stringify({

                titleHi:
                    value("liveTitleHi"),

                titleEn:
                    value("liveTitleEn"),

                streamUrl:
                    value("liveStreamUrl"),

                active:
                    document
                        .getElementById(
                            "liveActive"
                        )
                        .checked

            })

        }
    );

    alert(t("liveUpdated"));

} catch(error) {

    alert(error.message);

}

}

/* =========================================================
SPECIAL DARSHAN
========================================================= */

async function loadDarshan() {

try {

    const data =
        await apiRequest(
            "/api/darshan"
        );

    document
        .getElementById("darshanTitleHi")
        .value =
        data.titleHi || "";

    document
        .getElementById("darshanTitleEn")
        .value =
        data.titleEn || "";

    document
        .getElementById("darshanImage")
        .value =
        data.image || "";

    document
        .getElementById("darshanActive")
        .checked =
        data.active === true;

} catch(error) {

    console.error(error);

}

}

async function updateDarshan() {

try {

    await apiRequest(
        "/api/admin/darshan",
        {
            method: "PUT",

            body: JSON.stringify({

                titleHi:
                    value("darshanTitleHi"),

                titleEn:
                    value("darshanTitleEn"),

                image:
                    value("darshanImage"),

                active:
                    document
                        .getElementById(
                            "darshanActive"
                        )
                        .checked

            })

        }
    );

    alert(t("darshanUpdated"));

} catch(error) {

    alert(error.message);

}

}

/* =========================================================
DONATIONS
========================================================= */

async function loadDonations() {

    try {

        const data =
            await apiRequest(
                "/api/admin/donations"
            );

        const records =
            data.records || [];

        let html =
            `<table>

                <thead>

                    <tr>

                        <th>${t("name")}</th>

                        <th>${t("year")}</th>

                        <th>${t("mobile")}</th>

                        <th>${t("amount")}</th>

                        <th>${t("paymentMode")}</th>

                        <th>${t("approved")}</th>

                        <th>Public</th>

                        <th>${t("action")}</th>

                    </tr>

                </thead>

                <tbody>`;

        /* =================================================
           NO RECORDS
        ================================================= */

        if (records.length === 0) {

            html +=
                `<tr>

                    <td
                        colspan="8"
                        style="text-align:center;"
                    >

                        ${
                            t("noRecords") ||
                            "No records found"
                        }

                    </td>

                </tr>`;

        }

        /* =================================================
           SHOW DONATION RECORDS
        ================================================= */

        records.forEach(record => {

            html +=
                `<tr>

                    <td>
                        ${escapeHtml(
                            record.name || ""
                        )}
                    </td>

                    <td>
                        ${
                            record.year || ""
                        }
                    </td>

                    <td>
                        ${escapeHtml(
                            record.mobile || ""
                        )}
                    </td>

                    <td>
                        ₹${Number(
                            record.amount || 0
                        ).toLocaleString("en-IN")}
                    </td>

                    <td>
                        ${escapeHtml(
                            record.paymentMode || ""
                        )}
                    </td>

                    <td>

                        ${
                            record.approved

                                ? `<span class="status-approved">
                                    ${t("yes")}
                                  </span>`

                                : `<span class="status-pending">
                                    ${t("no")}
                                  </span>`
                        }

                    </td>

                    <td>

                        ${
                            record.publicVisible

                                ? `<span class="status-approved">
                                    ${t("yes")}
                                  </span>`

                                : `<span class="status-pending">
                                    ${t("no")}
                                  </span>`
                        }

                    </td>

                    <td>

                        <!-- APPROVE / UNAPPROVE -->

                        <button
                            type="button"
                            class="btn"
                            onclick="updateDonationStatus(
                                '${record._id}',
                                'approved',
                                ${!record.approved}
                            )"
                        >

                            ${
                                record.approved
                                    ? "Unapprove"
                                    : "Approve"
                            }

                        </button>


                        <!-- PUBLISH / HIDE -->

                        <button
                            type="button"
                            class="btn"
                            onclick="updateDonationStatus(
                                '${record._id}',
                                'publicVisible',
                                ${!record.publicVisible}
                            )"
                            ${
                                !record.approved
                                    ? "disabled"
                                    : ""
                            }
                        >

                            ${
                                record.publicVisible
                                    ? "Hide"
                                    : "Publish"
                            }

                        </button>


                        <!-- DELETE -->

                        <button
                            type="button"
                            class="btn btn-danger"
                            onclick="deleteDonation(
                                '${record._id}'
                            )"
                        >

                            ${t("delete")}

                        </button>

                    </td>

                </tr>`;

        });

        html +=
            `</tbody>
            </table>`;


        /* =================================================
           DISPLAY RECORDS
        ================================================= */

        const donationsList =
            document.getElementById(
                "donationsList"
            );

        if (donationsList) {

            donationsList.innerHTML =
                html;

        }

    } catch (error) {

        console.error(
            "Load donations error:",
            error
        );

        const donationsList =
            document.getElementById(
                "donationsList"
            );

        if (donationsList) {

            donationsList.textContent =
                error.message;

        }

    }

}


/* =========================================================
   ADD DONATION
========================================================= */

async function addDonation(event) {

    /*
       Prevent form submit / page reload
    */

    if (event) {

        event.preventDefault();

    }


    /* =====================================================
       GET FORM VALUES
    ===================================================== */

    const name =
        value("donationName");

    const amount =
        Number(
            value("donationAmount")
        );


    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!name) {

        alert(
            t("donorRequired")
        );

        return false;

    }


    if (
        !Number.isFinite(amount) ||
        amount <= 0
    ) {

        alert(
            t("amountRequired")
        );

        return false;

    }


    /* =====================================================
       DONATION DATA
    ===================================================== */

    const donationData = {

        year:
            Number(
                value("donationYear")
            ) ||
            new Date().getFullYear(),

        name:
            name,

        fatherName:
            value(
                "donationFatherName"
            ),

        designation:
            value(
                "donationDesignation"
            ),

        organization:
            value(
                "donationOrganization"
            ),

        mobile:
            value(
                "donationMobile"
            ),

        email:
            value(
                "donationEmail"
            ),

        address:
            value(
                "donationAddress"
            ),

        amount:
            amount,

        receivedBy:
            value(
                "donationReceivedBy"
            ),

        date:
            value(
                "donationDate"
            ) ||
            new Date()
                .toISOString()
                .slice(0, 10),

        paymentMode:
            value(
                "donationPaymentMode"
            ),

        remarks:
            value(
                "donationRemarks"
            ),

        /*
           New donation should NOT be
           approved/public automatically
        */

        approved:
            false,

        publicVisible:
            false

    };


    console.log(
        "Donation data:",
        donationData
    );


    /* =====================================================
       SEND TO BACKEND
    ===================================================== */

    try {

        const response =
            await apiRequest(

                "/api/admin/donations",

                {

                    method:
                        "POST",

                    body:
                        JSON.stringify(
                            donationData
                        )

                }

            );


        console.log(
            "Donation API response:",
            response
        );


        /* =================================================
           SUCCESS MESSAGE
        ================================================= */

        alert(
            t("donationAdded")
        );


        /* =================================================
           CLEAR FORM
        ================================================= */

        const fields = [

            "donationName",

            "donationFatherName",

            "donationDesignation",

            "donationOrganization",

            "donationMobile",

            "donationEmail",

            "donationAddress",

            "donationAmount",

            "donationReceivedBy",

            "donationRemarks"

        ];


        fields.forEach(id => {

            const el =
                document.getElementById(
                    id
                );

            if (el) {

                el.value = "";

            }

        });


        /* =================================================
           RESET PAYMENT MODE
        ================================================= */

        const paymentMode =
            document.getElementById(
                "donationPaymentMode"
            );

        if (paymentMode) {

            paymentMode.value = "";

        }


        /* =================================================
           RESET DATE
        ================================================= */

        const dateInput =
            document.getElementById(
                "donationDate"
            );

        if (dateInput) {

            dateInput.value =
                new Date()
                    .toISOString()
                    .slice(0, 10);

        }


        /* =================================================
           RELOAD DONATION RECORDS
        ================================================= */

        await loadDonations();


        /* =================================================
           UPDATE DASHBOARD
        ================================================= */

        await loadDashboard();


        return true;


    } catch (error) {

        console.error(
            "Add donation error:",
            error
        );

        alert(
            error.message
        );

        return false;

    }

}


/* =========================================================
   APPROVE / PUBLISH DONATION
========================================================= */

async function updateDonationStatus(
    id,
    field,
    value
) {

    try {

        await apiRequest(

            "/api/admin/donations/" +
            id +
            "/status",

            {

                method:
                    "PATCH",

                body:
                    JSON.stringify({

                        [field]:
                            value

                    })

            }

        );


        /* =================================================
           RELOAD DATA
        ================================================= */

        await loadDonations();

        await loadDashboard();


    } catch (error) {

        console.error(
            "Donation status update error:",
            error
        );

        alert(
            error.message
        );

    }

}


/* =========================================================
   DELETE DONATION
========================================================= */

async function deleteDonation(id) {

    /* =====================================================
       CONFIRM DELETE
    ===================================================== */

    if (
        !confirm(
            t("deleteDonationConfirm")
        )
    ) {

        return;

    }


    try {

        await apiRequest(

            "/api/admin/donations/" +
            id,

            {

                method:
                    "DELETE"

            }

        );


        /* =================================================
           RELOAD DATA
        ================================================= */

        await loadDonations();

        await loadDashboard();


    } catch (error) {

        console.error(
            "Delete donation error:",
            error
        );

        alert(
            error.message
        );

    }

}



/* =========================================================
EXPORT DONATIONS
========================================================= */

async function exportDonations() {

try {

    const response =
        await fetch(
            "/api/admin/donations/export",
            {
                headers: {
                    Authorization:
                        "Bearer " + token
                }
            }
        );

    if (!response.ok) {

        throw new Error(
            currentLanguage === "hi"
                ? "Excel export असफल रहा।"
                : "Excel export failed."
        );

    }

    const blob =
        await response.blob();

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download =
        "donation-records.xlsx";

    document.body.appendChild(a);

    a.click();

    a.remove();

    URL.revokeObjectURL(url);

} catch(error) {

    alert(error.message);

}

}

/* =========================================================
CONTRIBUTORS
========================================================= */

async function loadContributors() {

try {

    const contributors =
        await apiRequest(
            "/api/contributors"
        );

    let html =
        `<table>
            <thead>
                <tr>
                    <th>${t("name")}</th>
                    <th>${t("year")}</th>
                    <th>${t("amount")}</th>
                    <th>${t("message")}</th>
                    <th>${t("approved")}</th>
                </tr>
            </thead>
            <tbody>`;

    contributors.forEach(item => {

        html +=
            `<tr>

                <td>
                    ${escapeHtml(item.name || "")}
                </td>

                <td>
                    ${item.year || ""}
                </td>

                <td>
                    ₹${Number(
                        item.amount || 0
                    ).toLocaleString("en-IN")}
                </td>

                <td>
                    ${escapeHtml(
                        item.message || ""
                    )}
                </td>

                <td>
                    ${
                        item.approved
                            ? t("yes")
                            : t("no")
                    }
                </td>

            </tr>`;

    });

    html += `</tbody></table>`;

    document
        .getElementById(
            "contributorsList"
        )
        .innerHTML = html;

} catch(error) {

    document
        .getElementById(
            "contributorsList"
        )
        .textContent =
        error.message;

}

}

async function addContributor() {

try {

    await apiRequest(
        "/api/admin/contributors",
        {
            method: "POST",

            body: JSON.stringify({

                name:
                    value(
                        "contributorName"
                    ),

                year:
                    Number(
                        value(
                            "contributorYear"
                        )
                    ),

                amount:
                    Number(
                        value(
                            "contributorAmount"
                        )
                    ) || 0,

                message:
                    value(
                        "contributorMessage"
                    ),

                approved:
                    document
                        .getElementById(
                            "contributorApproved"
                        )
                        .checked,

                active: true

            })

        }
    );

    alert(t("contributorAdded"));

    loadContributors();

    loadDashboard();

} catch(error) {

    alert(error.message);

}

}

/* =========================================================
CONTACTS
========================================================= */

async function loadContacts() {

try {

    const contacts =
        await apiRequest(
            "/api/admin/contacts"
        );

    let html =
        `<table>
            <thead>
                <tr>
                    <th>${t("name")}</th>
                    <th>${t("mobile")}</th>
                    <th>${t("email")}</th>
                    <th>${t("message")}</th>
                    <th>${t("action")}</th>
                </tr>
            </thead>
            <tbody>`;

    contacts.forEach(item => {

        html +=
            `<tr>

                <td>
                    ${escapeHtml(item.name || "")}
                </td>

                <td>
                    ${escapeHtml(item.mobile || "")}
                </td>

                <td>
                    ${escapeHtml(item.email || "")}
                </td>

                <td>
                    ${escapeHtml(item.message || "")}
                </td>

                <td>

                    <button
                        class="btn btn-warning"
                        onclick="markContactRead('${item._id}')"
                    >
                        ${t("read")}
                    </button>

                    <button
                        class="btn btn-danger"
                        onclick="deleteContact('${item._id}')"
                    >
                        ${t("delete")}
                    </button>

                </td>

            </tr>`;

    });

    html += `</tbody></table>`;

    document
        .getElementById(
            "contactsList"
        )
        .innerHTML = html;

} catch(error) {

    document
        .getElementById(
            "contactsList"
        )
        .textContent =
        error.message;

}

}

async function markContactRead(id) {

try {

    await apiRequest(
        "/api/admin/contacts/" + id,
        {
            method: "PUT",

            body: JSON.stringify({
                status: "read"
            })

        }
    );

    loadContacts();

    loadDashboard();

} catch(error) {

    alert(error.message);

}

}

async function deleteContact(id) {
if (
    !confirm(
        t("deleteMessageConfirm")
    )
) return;

try {

    await apiRequest(
        "/api/admin/contacts/" + id,
        {
            method: "DELETE"
        }
    );

    loadContacts();

    loadDashboard();

} catch(error) {

    alert(error.message);

}

}

/* =========================================================
HELPERS
========================================================= */

function value(id) {

const element =
    document.getElementById(id);

return element
    ? element.value.trim()
    : "";

}

function escapeHtml(value) {

return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}

/* =========================================================
SHOW / HIDE PASSWORD
========================================================= */

const passwordInput =
document.getElementById("password");

const togglePassword =
document.getElementById(
"togglePassword"
);

if (
passwordInput &&
togglePassword
) {

togglePassword.addEventListener(
    "click",
    function() {

        if (
            passwordInput.type ===
            "password"
        ) {

            passwordInput.type =
                "text";

            togglePassword.textContent =
                "🙈";

        } else {

            passwordInput.type =
                "password";

            togglePassword.textContent =
                "👁️";

        }

    }
);


}

/* =========================================================
START
========================================================= */

applyLanguage();

checkLogin();

/* =========================================================
   PROGRAM YEAR CHANGE
========================================================= */

document
    .getElementById("programYear")
    ?.addEventListener(
        "change",
        loadProgramByYear
    );
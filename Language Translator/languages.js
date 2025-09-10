const languages = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    hi: "Hindi",
    zh: "Chinese",
    ar: "Arabic",
    it: "Italian",
    ko: "Korean",
    ru: "Russian",
    pt: "Portuguese",
    tr: "Turkish",
    vi: "Vietnamese",
    nl: "Dutch",
    sv: "Swedish",
    pl: "Polish",
    uk: "Ukrainian",
    ro: "Romanian",
    el: "Greek",
    th: "Thai",
    he: "Hebrew",
    id: "Indonesian",
    ms: "Malay"
};

document.addEventListener("DOMContentLoaded", () => {
    const languageSelects = document.querySelectorAll("select");
    languageSelects.forEach(select => {
        for (const [code, name] of Object.entries(languages)) {
            const option = document.createElement("option");
            option.value = code;
            option.textContent = name;
            select.appendChild(option);
        }
    });
});

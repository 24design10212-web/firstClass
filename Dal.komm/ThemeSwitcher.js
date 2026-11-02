const themeSelect = document.querySelector("#theme-select");
const themeStylesheet = document.querySelector("#theme-stylesheet");
const loginWrap = document.querySelector("#wrap");

const themeFiles = {
    default: "",
    editorial: "Editorial.css",
    glassmorphism: "Glassmorphism.css",
    cyberpunk: "Cyberpunk.css"
};

function applyTheme(themeName) {
    const cssFile = themeFiles[themeName];

    if (cssFile) {
        themeStylesheet.href = cssFile;
        themeStylesheet.disabled = false;
    } else {
        themeStylesheet.removeAttribute("href");
        themeStylesheet.disabled = true;
    }

    loginWrap.classList.remove("editorial", "glassmorphism", "cyberpunk");
    if (themeName !== "default") {
        loginWrap.classList.add(themeName);
    }
}

themeSelect.addEventListener("change", (event) => {
    applyTheme(event.target.value);
});

applyTheme(themeSelect.value);

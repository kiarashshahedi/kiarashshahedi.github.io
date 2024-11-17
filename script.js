document.getElementById("toggleLang").addEventListener("click", function () {
    const body = document.body;
    const isLTR = body.classList.contains("ltr");

    if (isLTR) {
        body.classList.remove("ltr");
        body.classList.add("rtl");
        body.setAttribute("dir", "rtl");
        this.textContent = "Switch to English";
    } else {
        body.classList.remove("rtl");
        body.classList.add("ltr");
        body.setAttribute("dir", "ltr");
        this.textContent = "تغییر به فارسی";
    }

    // Update text content dynamically
    document.querySelectorAll("[data-en]").forEach(el => {
        const enText = el.getAttribute("data-en");
        const faText = el.getAttribute("data-fa");
        el.textContent = isLTR ? faText : enText;
    });
});

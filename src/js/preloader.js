export function initPreloader() {
    const preloader = document.createElement("div");
    preloader.classList.add("preloader");
    preloader.innerHTML = `
        <div class="loader-text">
            <span>E</span><span>V</span><span>E</span><span>N</span><span>T</span>
            <span>B</span><span>U</span><span>S</span><span>T</span><span>E</span><span>R</span>
        </div>
    `;
    document.body.appendChild(preloader);

    setTimeout(() => {
        preloader.classList.add("preloader--hide");
        setTimeout(() => {
            preloader.remove();
            const header = document.querySelector(".header-txt");
            if (header) header.classList.add("animate-header");
        }, 1000);
    }, 3000);
}

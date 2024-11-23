class ScrollManager {
    private scrollPosition: number;

    constructor() {
        this.scrollPosition = 0;
    }

    scrollOn() {
        setTimeout(() => {
            document.body.style.cssText = ``;
            document.documentElement.style.scrollBehavior = '';
        }, 50);
    }

    scrollOff() {
        this.scrollPosition = window.scrollY;
        document.body.style.cssText = `
            overflow: hidden;
            padding-right: ${window.innerWidth - document.body.offsetWidth}px;
            height: 100vh;
            width: 100vw;
            `;
        document.documentElement.style.scrollBehavior = 'unset';
    }

    resetScrollPosition(): void {
        this.scrollPosition = 0;
    }
}

export const scrollManager = new ScrollManager();

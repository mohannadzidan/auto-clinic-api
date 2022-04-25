
function StepsProgressBar(element) {
    const bar = element.querySelector('.bar');
    const mutedBar = element.querySelector('.muted-bar');
    const steps = element.querySelectorAll('ul>.step .bubble');
    let active = 0;
    let isRtl = false;
    const recalculate = () => {
        const start = Math.round((steps[0].offsetLeft + steps[0].offsetWidth / 2) / bar.parentElement.offsetWidth * 100);
        const end = Math.round((steps[steps.length - 1].offsetLeft + steps[steps.length - 1].offsetWidth / 2) / bar.parentElement.offsetWidth * 100);
        if (isRtl) {
            mutedBar.style.left = Math.min(start, end) + '%';
            mutedBar.style.right = 100 - Math.max(start, end) + '%';
        } else {
            mutedBar.style.left = Math.min(start, end) + '%';
            mutedBar.style.right = 100 - Math.max(start, end) + '%';
        }
    }
    const updateProgress = () => {
        let activeNode = steps[0];
        steps.forEach((step, i) => {

            if (i < active) {
                step.parentElement.classList.remove("active");
                step.parentElement.classList.add("done");
            } else if (i === active) {
                step.parentElement.classList.add("active");
                activeNode = step;
            } else {
                step.parentElement.classList.remove("active");
                step.parentElement.classList.remove("done");
            }
        });
        const start = Math.round((steps[0].offsetLeft + steps[0].offsetWidth / 2) / bar.parentElement.offsetWidth * 100);
        const end = Math.round((activeNode.offsetLeft + activeNode.offsetWidth / 2) / bar.parentElement.offsetWidth * 100);
        if (isRtl) {
            bar.style.left = Math.min(start, end) + '%';
            bar.style.right = 100 - Math.max(start, end) + '%';
        } else {
            bar.style.left = Math.min(start, end) + '%';
            bar.style.right = 100 - Math.max(start, end) + '%';
        }
    };

    this.setDirection = (dir) => {
        if (dir === 'rtl') isRtl = true;
        else isRtl = false;
        updateProgress();
        recalculate();
    }

    this.goto = (s) => {
        active = s;
        updateProgress();
    }

    this.next = (s) => {
        active = active + 1 < steps.length ? active + 1 : active;
        updateProgress();
    }

    this.previous = (s) => {
        active = active > 0 ? active - 1 : active;
        updateProgress();
    }
    window.addEventListener('load', () => {
        updateProgress();
        recalculate();
    })
   


}




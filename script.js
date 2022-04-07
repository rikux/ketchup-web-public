const angleRange = document.getElementById("angle-control");
const angleResult = document.getElementById("angle-result");
const root = document.querySelector("HTML");
const boxes = document.querySelectorAll(".box");

/*
angleRange.addEventListener(
    "input",
    function() {
        const angle = angleRange.value;
        const angleRad = (angle * Math.PI) / 180;
        const magicNumber = Math.abs(Math.tan(angleRad) / 2);
        angleResult.innerHTML = angleRange.value + " deg";
        document.documentElement.style.setProperty(
            "--angle",
            angleRange.value + "deg"
        );
        document.documentElement.style.setProperty("--magic-number", magicNumber);

        // Sadly the animation only updates correctly in Firefox :-(
        boxes.forEach((box) => {
            box.style.animation = "none";
        });
    },
    false
);
*/

window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    setTimeout(angleChange, 0);
});

function angleChange() {
    let angle = -15;
    let frame = 0;
    let fps = 0.005;
    const angleChange = () => {
        angle = easeInOutQuint(frame) * 15 - 15;
        frame = frame + fps;
        const angleRad = (angle * Math.PI) / 180;
        const magicNumber = Math.abs(Math.tan(angleRad) / 2);
        document.documentElement.style.setProperty(
            "--rotation-angle",
            angle + "deg"
        );
        // document.documentElement.style.setProperty("--magic-number", magicNumber);
    };

    const intervalId = setInterval(() => {
        angleChange();
        // if (angle < -30) {
        if (frame > 1) {
            clearInterval(intervalId); //intervalIdをclearIntervalで指定している
            var elem = document.getElementById("logo");
            elem.style.textShadow = "3px 3px var(--logo-color)";
        }
    }, 1);
}

function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function easeInOutQuint(x) {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

function easeInOutBack(x) {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;

    return x < 0.5 ?
        (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 :
        (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}
const html2canvas = require("html2canvas");

module.exports = {
    styledOutputText: function (textInput, colorInput, fontInput, sizeInput, strokeInput, zInput, rotateInput, output) {
        textInput.addEventListener("input", () => output.innerText = textInput.value);
        colorInput.addEventListener("input", () => output.style.color = colorInput.value);
        fontInput.addEventListener("input", () => output.style.fontFamily = fontInput.value);
        sizeInput.addEventListener("input", () => output.style.fontSize = `${sizeInput.value}px`);
        strokeInput.addEventListener("change", () => strokeInput.checked ? output.style.webkitTextStroke = `2px #000` : output.style.webkitTextStroke = `0px #000`);
        rotateInput.addEventListener("input", () => output.style.transform = `rotate(${rotateInput.value}deg)`);
        zInput.addEventListener("input", () => output.style.zIndex = zInput.value);
    },

    styledImgOutput: function (zInput, rotateInput, scaleInput, opacityInput, output, canvas) {
        let outputHeight = output.clientHeight;
        zInput.addEventListener("input", () => output.style.zIndex = zInput.value);
        rotateInput.addEventListener("input", () => output.style.transform = `rotate(${rotateInput.value}deg)`);
        scaleInput.addEventListener("input", () => output.style.height = `${outputHeight / 100 * scaleInput.value}px`);
        opacityInput.addEventListener("input", () => output.style.opacity = opacityInput.value);
    },

    moveElement: function (element, parent) {
        let active = false,
            currentX,
            currentY,
            initX,
            initY;
        element.addEventListener("mousedown", (e) => {
            active = true;
            initX = e.clientX - element.getBoundingClientRect().left;
            initY = e.clientY - element.getBoundingClientRect().top;
            document.addEventListener("mousemove", moveHandler)
        })
        function moveHandler(e) {
            if (active) {
                e.preventDefault();
                currentX = e.clientX - parent.getBoundingClientRect().left - initX;
                currentY = e.clientY - parent.getBoundingClientRect().top - initY;
                element.style.left = `${currentX}px`;
                element.style.top = `${currentY}px`;
            }
        }
        document.addEventListener("mouseup", () => {
            active = false
            document.removeEventListener("mousemove", moveHandler);
        });
    },

    resizeElement: function (parent, trig) {
        let centerX,
            centerY, currentWidth,
            currentHeight,
            active = true;

        trig.addEventListener("mousedown", (e) => {
            active = true;
            centerX = window.innerWidth / 2;
            centerY = window.innerHeight / 2;
            document.addEventListener("mousemove", resizeHandler)
        })
        function resizeHandler(e) {
            if (active) {
                e.preventDefault();
                currentWidth = (e.clientX - centerX) * 2;
                currentHeight = (e.clientY - centerY) * 2;
                parent.style.width = `${currentWidth}px`;
                parent.style.height = `${currentHeight}px`;
            }
        }
        document.addEventListener("mouseup", () => {
            active = false
            document.removeEventListener("mousemove", resizeHandler);
        });
    },

    rescale: function (canvas) {
        let scale = 1;
        window.addEventListener('wheel', e => {
            if (e.deltaY > 0 && window.scrollY === 0) {
                if (scale <= 0.2) e.preventDefault()
                else {
                    scale -= 0.02
                    canvas.style.transform = `scale(${scale})`;
                }
            }
        })
    },

    removeItem: function (e, panel, canvas) {
        e.preventDefault();
        panel.remove()
        canvas.remove();
    },

    downloadCanvas: function (wrapper, outputCanvas) {
        html2canvas(wrapper).then(canvas => {
            outputCanvas.classList.remove("d-none");
            outputCanvas.appendChild(canvas);
            let date = new Date();
            const link = document.createElement("A");
            link.download = `myMeme_${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}_${date.getHours()}:${date.getMinutes()}.jpg`;
            link.href = canvas.toDataURL();
            link.click();
            outputCanvas.classList.add("d-none");
        })
    },

    clearCanvas: function (imgLabelsWrapper, inscriptionLabelsWrapper, canvas) {
        imgLabelsWrapper.innerHTML = ``;
        inscriptionLabelsWrapper.innerHTML = ``;
        canvas.innerHTML = ``;
        const resizeTrig = document.createElement("DIV");
        resizeTrig.classList.add("canvas-resize-trig");
        canvas.append(resizeTrig);
        this.resizeElement(canvas, resizeTrig)
    }
}
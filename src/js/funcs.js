const html2canvas = require("html2canvas");

module.exports = {
    styledImgOutput: async function (zInput, rotateInput, scaleInput, opacityInput, removeBgBtn, output, canvas, overlay) {
        let outputHeight = canvas.clientHeight;
        zInput.addEventListener("input", () => output.style.zIndex = zInput.value);
        rotateInput.addEventListener("input", () => output.style.transform = `rotate(${rotateInput.value}deg)`);
        scaleInput.addEventListener("input", () => output.style.height = `${outputHeight / 100 * scaleInput.value}px`);
        opacityInput.addEventListener("input", () => output.style.opacity = opacityInput.value);
        removeBgBtn.addEventListener("click", async () => {
            overlay.style.display = "flex";
            let base64 = await this.imgToBase64(output);
            this.removeBackground(output, base64, overlay);
        });
    },

    imgToBase64: async function (img) {
        let base64 = await new Promise((resolve) => {
            const imgToB64 = document.createElement("IMG");
            imgToB64.src = img.src;
            imgToB64.onload = function () {
                let key = encodeURIComponent(img.src),
                    canvas = document.createElement("canvas");
                canvas.width = imgToB64.width;
                canvas.height = imgToB64.height;
                let ctx = canvas.getContext("2d");
                ctx.drawImage(imgToB64, 0, 0);
                resolve(canvas.toDataURL("image/png"));
            };
        })
        return base64;
    },

    removeBackground: function (img, base64, overlay) {
        fetch("https://benzin.io/api/removeBackground",
            {
                method: "POST",
                headers: {
                    "dataType": "json",
                    "Content-Type": "application/json",
                    "X-Access-Token": "djK0qGeGToPpSUmCVXGZzvkb76GhZ1lj9SScrYNV8g051lZIth5OBP2ZEhQbrPMn"
                },
                body: JSON.stringify({
                    "crop": true,
                    "crop_margin": "10px",
                    "image_file_b64": base64,
                    "output_format": "image",
                    "output_image_format": "png"
                }),
            })
            .then(response => response.blob())
            .then(blob => {
                const croppedImgUrl = URL.createObjectURL(blob);
                img.src = croppedImgUrl;
                overlay.style.display = "none";
            })
            .catch(error => console.error(error));
    },

    styledOutputText: function (textInput, colorInput, fontInput, sizeInput, strokeInput, zInput, rotateInput, output) {
        textInput.addEventListener("input", () => output.innerText = textInput.value);
        colorInput.addEventListener("input", () => output.style.color = colorInput.value);
        fontInput.addEventListener("input", () => output.style.fontFamily = fontInput.value);
        sizeInput.addEventListener("input", () => output.style.fontSize = `${sizeInput.value}px`);
        strokeInput.addEventListener("change", () => strokeInput.checked ? output.style.webkitTextStroke = `2px #000` : output.style.webkitTextStroke = `0px #000`);
        rotateInput.addEventListener("input", () => output.style.transform = `rotate(${rotateInput.value}deg)`);
        zInput.addEventListener("input", () => output.style.zIndex = zInput.value);
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

    clearCanvas: function (imgLabelsWrapper, inscriptionLabelsWrapper, canvas, counter, textCounter, imgCounter) {
        imgLabelsWrapper.innerHTML = ``;
        inscriptionLabelsWrapper.innerHTML = ``;
        canvas.innerHTML = ``;
        const resizeTrig = document.createElement("DIV");
        resizeTrig.classList.add("canvas-resize-trig");
        canvas.append(resizeTrig);
        this.resizeElement(canvas, resizeTrig);
        counter = 0;
        textCounter = 0;
        imgCounter = 0;
    }
}
import "./assets/style.css"
import html2canvas from "html2canvas";

const outputWrapper = document.querySelector(".output"),
    imgOutput = document.querySelector(".img-output"),
    imgInput = document.querySelector(".img-input"),
    imgInputLabel = document.querySelector(".img-input-label"),
    setupInput = document.querySelector(".setup-input"),
    setupOutput = document.querySelector(".output-setup"),
    setupSizeSelect = document.querySelector(".setup-font-size-select"),
    setupFontSelect = document.querySelector(".setup-font-family-select"),
    setupColorSelect = document.querySelector(".setup-color-input"),
    setupStrokeCheckbox = document.querySelector(".setup-stroke-checkbox"),
    punchlineInput = document.querySelector(".punchline-input"),
    punchlineOutput = document.querySelector(".output-punchline"),
    punchlineSizeSelect = document.querySelector(".punchline-font-size-select"),
    punchlineFontSelect = document.querySelector(".punchline-font-family-select"),
    punchlineColorSelect = document.querySelector(".punchline-color-input"),
    punchlineStrokeCheckbox = document.querySelector(".punchline-stroke-checkbox"),
    downloadBtn = document.querySelector(".download-btn");

imgInput.oninput = () => outputImage();
setupInput.oninput = (e) => outputText(e, setupInput, setupOutput, 40);
setupSizeSelect.oninput = () => setupOutput.style.fontSize = `${setupSizeSelect.value}px`;
setupFontSelect.oninput = () => setupOutput.style.fontFamily = setupFontSelect.value;
setupColorSelect.oninput = () => setupOutput.style.color = setupColorSelect.value;
setupStrokeCheckbox.onchange = () => setupStrokeCheckbox.checked ? setupOutput.style.webkitTextStroke = "#000 2px" : setupOutput.style.webkitTextStroke = "#000 0";
punchlineInput.oninput = (e) => outputText(e, punchlineInput, punchlineOutput, 50);
punchlineSizeSelect.oninput = () => punchlineOutput.style.fontSize = `${punchlineSizeSelect.value}px`;
punchlineFontSelect.oninput = () => punchlineOutput.style.fontFamily = punchlineFontSelect.value;
punchlineColorSelect.oninput = () => punchlineOutput.style.color = punchlineColorSelect.value;
punchlineStrokeCheckbox.onchange = () => punchlineStrokeCheckbox.checked ? punchlineOutput.style.webkitTextStroke = "#000 2px" : punchlineOutput.style.webkitTextStroke = "#000 0";

downloadBtn.onclick = () => {
    html2canvas(outputWrapper).then(canvas => {
        outputWrapper.innerHTML = "";
        outputWrapper.appendChild(canvas);
        let date = new Date();
        const link = document.createElement("A");
        link.download = `myMeme_${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}_${date.getHours()}:${date.getMinutes()}.jpg`;
        link.href = canvas.toDataURL();
        link.click();
    })
}

function outputImage() {
    let f = imgInput.files[0];
    if (f) {
        imgOutput.src = URL.createObjectURL(f);
        imgInputLabel.innerText = f.name.length - 4 > 20 ? `${f.name.slice(0, 20)}...${f.name.slice(f.name.length - 3, f.name.length)}` : f.name;
    }
}

function outputText(e, input, output, textLength) {
    if (input.value.length < textLength) {
        output.innerText = input.value;
    } else {
        input.value = input.value.slice(0, textLength);
        e.preventDefault();
    }
}
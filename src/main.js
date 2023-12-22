import "./assets/style.css";

const layouts = require("./js/layouts.js"),
    funcs = require("./js/funcs.js"),
    hiddenPanelBtn = document.querySelector(".hidden-panel"),
    panel = document.querySelector(".panel"),
    imgInput = document.querySelector("#panel__img-input"),
    imgLabelsWrapper = document.querySelector(".panel-images-wrapper"),
    addTextBtn = document.querySelector(".panel__add-inscription-btn"),
    textLabelsWrapper = document.querySelector(".panel-inscriptions-wrapper"),
    outputWrapper = document.querySelector(".output-wrapper"),
    canvas = document.querySelector(".canvas"),
    canvasResizeTrig = document.querySelector(".canvas-resize-trig"),
    downloadCanvasBtn = document.querySelector(".panel__download-canvas-btn"),
    clearCanvasBtn = document.querySelector(".panel__clear-canvas-btn");

let textCounter = 0,
    imgCounter = 0;

funcs.resizeElement(outputWrapper, canvasResizeTrig);

hiddenPanelBtn.onclick = () => panel.classList.toggle("d-none");

imgInput.oninput = () => {
    imgCounter++;
    const f = imgInput.files[0];
    const imgLabel = layouts.imgLabelLayout(imgCounter, f.name);
    imgLabelsWrapper.append(imgLabel);
    const imgOutput = layouts.imgOutputLayout();
    imgOutput.style.height = `${outputWrapper.clientHeight}px`
    outputWrapper.append(imgOutput);
    if (f) imgOutput.src = URL.createObjectURL(f);
    imgLabel.querySelector(`.delete-item-btn-${imgCounter}`).onclick = (e) => funcs.removeItem(e, imgLabel, imgOutput);
    funcs.styledImgOutput(imgLabel.querySelector(`.img-${imgCounter}__z-input`),
        imgLabel.querySelector(`.img-${imgCounter}__rotate-input`),
        imgLabel.querySelector(`.img-${imgCounter}__scale-input`),
        imgLabel.querySelector(`.img-${imgCounter}__opacity-input`),
        imgLabel.querySelector(`.img-${imgCounter}__remove-bg-btn`),
        imgOutput, outputWrapper)
    funcs.moveElement(imgOutput, outputWrapper);
}

addTextBtn.onclick = () => {
    textCounter++;
    const textLabel = layouts.inscrtiptionLabelLayout(textCounter);
    const textOutput = layouts.outputInscrtiptionLayout(textCounter);
    textLabelsWrapper.append(textLabel);
    outputWrapper.append(textOutput);
    textOutput.style.zIndex = textCounter;
    textLabel.querySelector(`.delete-item-btn-${textCounter}`).onclick = (e) => funcs.removeItem(e, textLabel, textOutput);
    funcs.styledOutputText(textLabel.querySelector(`.inscription-${textCounter}__text-input`),
        textLabel.querySelector(`.inscription-${textCounter}__color-input`),
        textLabel.querySelector(`.inscription-${textCounter}__font-select`),
        textLabel.querySelector(`.inscription-${textCounter}__size-select`),
        textLabel.querySelector(`.inscription-${textCounter}__stroke-cb`),
        textLabel.querySelector(`.inscription-${textCounter}__z-input`),
        textLabel.querySelector(`.inscription-${textCounter}__rotate-input`),
        textOutput);
    funcs.moveElement(textOutput, outputWrapper);
};

downloadCanvasBtn.onclick = () => funcs.downloadCanvas(outputWrapper, canvas);
clearCanvasBtn.onclick = () => funcs.clearCanvas(imgLabelsWrapper, textLabelsWrapper, outputWrapper);
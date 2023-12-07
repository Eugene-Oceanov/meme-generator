import "./assets/style.css";


const layouts = require("./js/layouts.js"),
    funcs = require("./js/funcs.js"),
    imgInput = document.querySelector("#panel__img-input"),
    imgLabelsWrapper = document.querySelector(".panel-images-wrapper"),
    addTextBtn = document.querySelector(".panel__add-inscription-btn"),
    textLabelsWrapper = document.querySelector(".panel-inscriptions-wrapper"),
    canvas = document.querySelector(".canvas"),
    canvasResizeTrig = document.querySelector(".canvas-resize-trig"),
    downloadCanvasBtn = document.querySelector(".panel__download-canvas-btn"),
    clearCanvasBtn = document.querySelector(".panel__clear-canvas-btn");

let textCounter = 0,
    imgCounter = 0;

funcs.resizeElement(canvas, canvasResizeTrig);
// funcs.rescale(canvas);

imgInput.oninput = () => {
    imgCounter++;
    let f = imgInput.files[0];
    const imgLabel = layouts.imgLabelLayout(imgCounter, f.name);
    imgLabelsWrapper.append(imgLabel);
    const imgOutput = layouts.imgOutputLayout();
    imgOutput.style.height = `${canvas.clientHeight}px`
    canvas.append(imgOutput);
    if (f) imgOutput.src = URL.createObjectURL(f);
    imgLabel.querySelector(`.delete-item-btn-${imgCounter}`).onclick = (e) => funcs.removeItem(e, imgLabel, imgOutput);
    funcs.styledImgOutput(imgLabel.querySelector(`.img-${imgCounter}__z-input`),
        imgLabel.querySelector(`.img-${imgCounter}__rotate-input`),
        imgLabel.querySelector(`.img-${imgCounter}__scale-input`),
        imgOutput)
    funcs.moveElement(imgOutput, canvas);
}

addTextBtn.onclick = () => {
    textCounter++;
    const textLabel = layouts.inscrtiptionLabelLayout(textCounter);
    const textOutput = layouts.outputInscrtiptionLayout(textCounter);
    textLabelsWrapper.append(textLabel);
    canvas.append(textOutput);
    textLabel.querySelector(`.delete-item-btn-${textCounter}`).onclick = (e) => funcs.removeItem(e, textLabel, textOutput);
    funcs.styledOutputText(textLabel.querySelector(`.inscription-${textCounter}__text-input`),
        textLabel.querySelector(`.inscription-${textCounter}__color-input`),
        textLabel.querySelector(`.inscription-${textCounter}__font-select`),
        textLabel.querySelector(`.inscription-${textCounter}__size-select`),
        textLabel.querySelector(`.inscription-${textCounter}__stroke-cb`),
        textLabel.querySelector(`.inscription-${textCounter}__z-input`),
        textOutput);
    funcs.moveElement(textOutput, canvas);
};

downloadCanvasBtn.onclick = () => funcs.downloadCanvas(canvas);
clearCanvasBtn.onclick = () => funcs.clearCanvas(imgLabelsWrapper, textLabelsWrapper, canvas);
module.exports = {
  imgLabelLayout: function (classCounter, zCounter, name) {
    const imgLabel = document.createElement("DETAILS");
    imgLabel.classList.add("img-label", `img-label-${classCounter}`);
    imgLabel.innerHTML = `<summary>
                            <div class="summary-title-wrapper d-flex ai-center">
                              ${this.arrowSVG()}
                              <p class="label-title">${name}</p>
                            </div>
                            ${this.deleteSVG(classCounter)}
                          </summary>
                          <div class="input-wrapper d-flex jc-space-between ai-center">
                            <p>Z-index:</p>
                            <input type="text" class="img-${classCounter}__z-input z-input" value="${zCounter}">
                          </div>
                          <div class="input-wrapper">
                            <p class="text-center">Rotate:</p>
                            <input type="range" min="-180" max="180" value="0" step="1" class="img-${classCounter}__rotate-input rotate-input">
                          </div>
                          <div class="input-wrapper">
                            <p class="text-center">Scale:</p>
                            <input type="range" min="20" max="180" value="100" step="1" class="img-${classCounter}__scale-input scale-input">
                          </div>
                          <div class="input-wrapper">
                            <p class="text-center">Opacity:</p>
                            <input type="range" min="0" max="1" value="100" step="0.01" class="img-${classCounter}__opacity-input opacity-input">
                          </div>
                          <button class="img-${classCounter}__remove-bg-btn btn">Remove background</button>`;
    return imgLabel
  },

  imgOutputLayout: function (classCounter, zCounter) {
    const imgOutput = document.createElement("IMG");
    imgOutput.classList.add(`img-output-${classCounter}`, "img-output");
    imgOutput.classList.zIndex = zCounter;
    return imgOutput;
  },

  inscrtiptionLabelLayout: function (classCounter, zCounter) {
    const textPanel = document.createElement("DETAILS");
    textPanel.classList.add("inscription-label", `inscription-label-${classCounter}`);
    textPanel.innerHTML = `<summary>
                            <div class="summary-title-wrapper d-flex ai-center">
                              ${this.arrowSVG()}
                              <p class="inscription-title inscription-${classCounter}-title">Inscription #${classCounter}</p>
                            </div>
                            ${this.deleteSVG(classCounter)}
                          </summary>
                          <input type="text" class="inscription-${classCounter}__text-input inscription-text-input" placeholder="Input text...">
                          <div class="input-wrapper d-flex jc-space-between ai-center">
                            <p>Color:</p>
                            <input type="color" class="inscription-${classCounter}__color-input" value="#FFFFFF">
                          </div>
                          <div class="input-wrapper d-flex jc-space-between ai-center">
                            <p>Font family:</p>
                            <select class="inscription-${classCounter}__font-select">
                              <option value="Impact" style="font-family: Impact">Impact</option>
                              <option value="Times New Roman" style="font-family: Times New Roman">Times New Roman</option>
                              <option value="Calibri" style="font-family: Calibri">Calibri</option>
                              <option value="Segoe UI" style="font-family: Segoe UI">Segoe UI</option>
                              <option value="Comic Sans MS" style="font-family: Comic Sans MS">Comic Sans MS</option>
                              <option value="Antonella script X" style="font-family: Antonella script X">Antonella script X</option>
                              <option value="Streamster" style="font-family: Streamster">Streamster</option>
                              <option value="Triod" style="font-family: Triod">Triod</option>
                              <option value="Lobster" style="font-family: Lobster">Lobster</option>
                            </select>
                          </div>
                          <div class="input-wrapper d-flex jc-space-between ai-center">
                            <p>Font size:</p>
                            <select class="inscription-${classCounter}__size-select">
                              <option value="8">8</option>
                              <option value="12">12</option>
                              <option value="14">14</option>
                              <option value="18">18</option>
                              <option value="24">24</option>
                              <option value="32">32</option>
                              <option value="44">44</option>
                              <option value="52">52</option>
                              <option value="52">52</option>
                              <option value="58">58</option>
                              <option value="64" selected>64</option>
                              <option value="72">72</option>
                            </select>
                          </div>
                          <div class="input-wrapper d-flex jc-space-between ai-center">
                            <p>Stroke:</p>
                            <input type="checkbox" class="inscription-${classCounter}__stroke-cb" checked="true">
                          </div>
                          <div class="input-wrapper d-flex jc-space-between ai-center">
                            <p>Z-index:</p>
                            <input type="text" class="inscription-${classCounter}__z-input z-input" value="${zCounter}">
                          </div>
                          <div class="input-wrapper">
                            <p class="text-center">Rotate:</p>
                            <input type="range" min="-180" max="180" value="0" step="1" class="inscription-${classCounter}__rotate-input rotate-input">
                          </div>`;
    return textPanel;
  },

  outputInscrtiptionLayout: function (classCounter, zCounter) {
    const outputText = document.createElement("P");
    outputText.classList.add(`inscription-output-${classCounter}`, "inscription-output");
    outputText.style.zIndex = zCounter;
    return outputText;
  },

  deleteSVG: function (counter) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" class="delete-item-btn delete-item-btn-${counter}">
          <path d="M20.625 4H17.125V1.8125C17.125 0.847266 16.3402 0.0625 15.375 0.0625H6.625C5.65977 0.0625 4.875 0.847266 4.875 1.8125V4H1.375C0.891016 4 0.5 4.39102 0.5 4.875V5.75C0.5 5.87031 0.598437 5.96875 0.71875 5.96875H2.37031L3.0457 20.2695C3.08945 21.202 3.86055 21.9375 4.79297 21.9375H17.207C18.1422 21.9375 18.9105 21.2047 18.9543 20.2695L19.6297 5.96875H21.2812C21.4016 5.96875 21.5 5.87031 21.5 5.75V4.875C21.5 4.39102 21.109 4 20.625 4ZM15.1562 4H6.84375V2.03125H15.1562V4Z" fill="#000"/>
        </svg>`;
  },

  arrowSVG: function () {
    return `<?xml version="1.0" encoding="utf-8"?>
    <svg class="open-details-svg" width="30px" height="14px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000" /></svg>`
  }
}
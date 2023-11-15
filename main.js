/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (() => {

eval("const imgOutput = document.querySelector(\".img-output\");\r\nconst saveBtn = document.querySelector(\".save-btn\");\r\nconst saveInput = document.querySelector(\".img-input\");\r\n\r\nfunction save() {\r\n    let f = saveInput.files[0];\r\n    if (f) imgOutput.src = URL.createObjectURL(f);\r\n    console.log(1)\r\n}\r\nsaveInput.oninput = () => save()\r\n\n\n//# sourceURL=webpack://wb-l2-meme-generator/./src/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/main.js"]();
/******/ 	
/******/ })()
;
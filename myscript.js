

// This is a simple JavaScript file
// It will be loaded by the index.html file
const charLimit = 2048;
const charBreak = 100;

const fontMin = 18;
const fontMax = 24;

window.onload = function() {
    const txtInput = document.getElementById("txtInput");
    const txtOutput = document.getElementById("txtOutput");

    const lblCharCount = document.getElementById("lblCharCount");

    const txtInputHandler = function(e) {
        var charCount = txtInput.value.length;
        var fontSize = charCount <= charBreak ? fontMax : fontMin;
        console.log(fontSize);
        console.log(txtInput.style.fontSize)
        txtInput.style.fontSize = fontSize + "px";
        lblCharCount.innerText = charCount + " / " + charLimit;
    }

    txtInput.addEventListener('input', txtInputHandler);
    txtInput.addEventListener('propertychange', txtInputHandler); // for IE8
    txtInputHandler();
};

function procesText() {
    var txtInput = document.getElementById("txtInput");
    var txtOutput = document.getElementById("txtOutput");
    
    txtOutput.value = txtInput.value;
}
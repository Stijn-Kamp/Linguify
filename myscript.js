

// This is a simple JavaScript file
// It will be loaded by the index.html file

var txtInput;
var txtOutput;
var lblCharCount;

var close;
var alert;


const charLimit = 2048;
const charBreak = 100;

const fontMin = 18;
const fontMax = 24;

window.onload = function(e) {
    txtInput = document.getElementById("txtInput");
    txtOutput = document.getElementById("txtOutput");
    lblCharCount = document.getElementById("lblCharCount");
    close = document.getElementById("btnClose");
    charLimitAlert = close.parentElement;

    const txtInputHandler = function(e) {
        var charCount = txtInput.value.length;
        var fontSize = charCount <= charBreak ? fontMax : fontMin;

        if (charCount > charLimit) {
            charLimitAlert.style.display = "block";
            charLimitAlert.style.opacity = "1";
            txtInput.value = txtInput.value.substring(0, charLimit);
            charCount = charLimit;
        }

        txtInput.style.fontSize = fontSize + "px";
        lblCharCount.innerText = charCount + " / " + charLimit;
    }

    txtInput.addEventListener('input', txtInputHandler);
    txtInput.addEventListener('propertychange', txtInputHandler); // for IE8
    txtInputHandler();

    
    close.onclick = function(){
        var div = this.parentElement;
        div.style.opacity = "0";
        setTimeout(function(){ div.style.display = "none"; }, 600);
    }
};

function procesText() {
    txtInput = document.getElementById("txtInput");
    txtOutput = document.getElementById("txtOutput");
    txtOutput.style.fontSize = txtInput.style.fontSize;
    txtOutput.value = txtInput.value;
}


// This is a simple JavaScript file
// It will be loaded by the index.html file

const url = "http://127.0.0.1:5000/translate"; 

var txtInput;
var txtOutput;
var lblCharCount;
var ddlTranslateTo;

var btnClose;
var pnlAlert;


const charLimit = 2048;
const charBreak = 100;

const fontMin = 18;
const fontMax = 24;

window.onload = function(e) {
    txtInput = document.getElementById("txtInput");
    txtOutput = document.getElementById("txtOutput");
    lblCharCount = document.getElementById("lblCharCount");
    ddlTranslateTo = document.getElementById("ddlTo");
    btnClose = document.getElementById("btnClose");
    pnlAlert = document.getElementById("pnlAlert");

    const txtInputHandler = function(e) {
        var charCount = txtInput.value.length;
        var fontSize = charCount <= charBreak ? fontMax : fontMin;

        if (charCount > charLimit) {
            pnlAlert.style.display = "block";
            pnlAlert.style.opacity = "1";
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

function copyTextHeight() {
    var height = txtInput.style.height > txtOutput.style.height ? txtInput.style.height : txtOutput.style.height;
    txtOutput.style.height = txtInput.style.height = height;
}

function clearTxtInput() {
    txtOutput.value = txtInput.value = "";
    txtInput.style.fontSize = fontMax + "px";
    lblCharCount.innerText = "0 / " + charLimit;
    copyTextHeight();
}

// Works but not very well
function textAreaAdjust(element) {
    element.style.height = "1px";
    element.style.height = (20+element.scrollHeight)+"px";

    copyTextHeight();
}

async function procesText() {
    txtInput = document.getElementById("txtInput");
    txtOutput = document.getElementById("txtOutput");
    txtOutput.value = "Translating...";
    txtOutput.parentElement.style.background = "white";
    txtOutput.style.fontSize = fontMax + "px";
    
    var text = txtInput.value;
    text = text.replaceAll('\n', "\\n");
    text = encodeURIComponent(text);

    var to = ddlTranslateTo.value;
    
    // replace \n with \\n in one line
    var translation = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          "text": text,
            "to": to
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      })
      .then(res => {return res.text()}) // parses JSON response into native JavaScript objects
      .catch(e => {
        console.log(e);
        return ""
    }); // parses JSON response into native JavaScript objects
      
    // set font size of output text based on length of translation
    if (translation.length == 0) {
        translation = "Failed to translate.";
    } else if(translation.length > charBreak) {
        txtOutput.style.fontSize = fontMin + "px";
    }

    txtOutput.parentElement.style.background = "#f5f5f5";
    txtOutput.value = translation.replaceAll('\\n', "\n");
}
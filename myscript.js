

// This is a simple JavaScript file
// It will be loaded by the index.html file

const url = "http://127.0.0.1:5000/translate"; 

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

async function procesText() {
    txtInput = document.getElementById("txtInput");
    txtOutput = document.getElementById("txtOutput");
    txtOutput.value = "Translating...";
    txtOutput.style.fontSize = fontMax + "px";
    console.log(txtInput.value.replaceAll('\n', "\\n"));
    
    // replace \n with \\n in one line
    var translation = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          "text": txtInput.value.replaceAll('\n', "\\n"),
            "to": "Dutch"
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

    txtOutput.value = translation.replaceAll('\\n', "\n");
}
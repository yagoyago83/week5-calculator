let runningtotal = 0;
let buffer = "0";
let previusOperator;
const screen = document.querySelector(".screen");

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
}

function handleMath(value) {
    if (buffer === "0") {
        return;
    }
    const intBuffer = parseInt(buffer);
    if (runningtotal === "0") {
        runningtotal = intBuffer
    } else {
        flushOperation(intBuffer)
    }
    previusOperator = value;
    buffer = "0";
}

function handleSymbol(value) {
    switch (value) {
        case "C":
            buffer = "0";
            runningtotal = 0;
            break;
        case "=":
            if (previusOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer))
            previusOperator = null;
            buffer = +runningtotal;
            runningtotal = 0;
            break;
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case "+":
        case "-":
        case "X":
        case "÷":
            handleMath(value);
            break;

    }
}

function rerender() {
    screen.innerText = buffer;
}

function init() {
    document.querySelector(".calc-buttons").addEventListener("click", function(event) {
        buttonClick(event.target.innerText);
    })
}
init();
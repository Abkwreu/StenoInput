let capitalizeNext = true;
let spaceAfter = false;
let glue = false;
let currentWord = "";
let history = [""];
let numbers = /^\d+/g;

clear.onclick = () => {
    textArea.value = "";
}

enter.onclick = () => {
    if (S.value == "S") {
        if (num.value == "#") {
            currentWord += "1";
        } else {
            currentWord += "S";
        }
    }
    if (T.value == "T") {
        if (num.value == "#") {
            currentWord += "2";
        } else {
            currentWord += "T";
        }
    }
    if (K.value == "K") {
        currentWord += "K";
    }
    if (P.value == "P") {
        if (num.value == "#") {
            currentWord += "3";
        } else {
            currentWord += "P";
        }
    }
    if (W.value == "W") {
        currentWord += "W";
    }
    if (H.value == "H") {
        if (num.value == "#") {
            currentWord += "4";
        } else {
            currentWord += "H";
        }
    }
    if (R.value == "R") {
        currentWord += "R";
    }
    if (A.value == "" && O.value == "" && star.value == "" && E.value == "" && U.value == "" && num.value == "") {
        currentWord += "-";
    }
    if (A.value == "A") {
        if (num.value == "#") {
            currentWord += "5";
        } else {
            currentWord += "A";
        }
    }
    if (O.value == "O") {
        if (num.value == "#") {
            currentWord += "0";
        } else {
            currentWord += "O";
        }
    }
    if (star.value == "*") {
        currentWord += "*";
    }
    if (E.value == "E") {
        currentWord += "E";
    }
    if (U.value == "U") {
        currentWord += "U";
    }
    if (f.value == "F") {
        if (num.value == "#") {
            currentWord += "6";
        } else {
            currentWord += "F";
        }
    }
    if (r.value == "R") {
        currentWord += "R";
    }
    if (p.value == "P") {
        if (num.value == "#") {
            currentWord += "7";
        } else {
            currentWord += "P";
        }
    }
    if (b.value == "B") {
        currentWord += "B";
    }
    if (l.value == "L") {
        if (num.value == "#") {
            currentWord += "8";
        } else {
            currentWord += "L";
        }
    }
    if (g.value == "G") {
        currentWord += "G";
    }
    if (t.value == "T") {
        if (num.value == "#") {
            currentWord += "9";
        } else {
            currentWord += "T";
        }
    }
    if (s.value == "S") {
        currentWord += "S";
    }
    if (d.value == "D") {
        currentWord += "D";
    }
    if (z.value == "Z") {
        currentWord += "Z";
    }

    ////////////////////////////////

    if (stroke.value == "/") {
        currentWord += "/";
    } else {
        word = stenoData[currentWord];
        hasSpace = false;
        if (word == undefined) {
            word = currentWord;
        }
        if (spaceAfter == true) {
            hasSpace = true;
        }
        spaceAfter = true;
        word = word.replace("{}", "");
        if (word.includes("{-|}")) {
            hasSpace = false;
            capitalizeNext = true;
            word = word.replace("{-|}", "");
        }
        if (word.includes("{>}")) {
            hasSpace = false;
            capitalizeNext = false;
            word = word.replace("{>}", "");
        }
        console.log(numbers.test(word));
        if (numbers.test(word) == true) {
            if (glue == true) {
                hasSpace = false;
            }
            glue = true;
        } else if (word.charAt(0) == "{" && word.charAt(1) == "&" && word.charAt(word.length - 1) == "}") {
            word = word.substring(2, word.length - 1);
            if (glue == true) {
                hasSpace = false;
            }
            glue = true;
        } else {
            glue = false;
        }
        if (word.charAt(0) == "{" && word.charAt(word.length - 1) == "}") {
            word = word.substring(1, word.length - 1);
            hasSpace = false;
        }
        if (word.includes("{^.^}")) {
            word = word.replace("{^.^}", ".");
            hasSpace = false;
            spaceAfter = false;
        }
        word = word.replace(">}{&", "");
        if (capitalizeNext == true) {
            word = word.charAt(0).toUpperCase() + word.slice(1)
        }
        capitalizeNext = false;
        if (hasSpace == true) {
            textArea.value += " ";
        }
        spaceAfter = true;
        switch (word) {
            case ".":
            case ",":
            case "?":
            case "!":
            case ":":
                capitalizeNext = true;
        }
        textArea.value += word;
        currentWord = "";
    }

}
changePos();


function changePos() {
    /*     t.focus();
        t.setSelectionRange(t.value.length, t.value.length);
        s.style.left = getCursorXY(t, t.selectionEnd).x - 100 + "px";
        t.blur();
     */
}

post.onclick = () => {
    const posting = document.createElement("span");
    posting.style.display = "block";
    posting.style.marginTop = "0.5em";
    posting.style.fontSize = "1.3em";
    posting.innerText = "Posting...";
    document.body.appendChild(posting);

    setTimeout(() => {
        posting.innerText = "Posted!";
    }, 1500);
}








/**
 * FROM https://medium.com/@jh3y/how-to-where-s-the-caret-getting-the-xy-position-of-the-caret-a24ba372990a
 */
function getCursorXY(input, selectionPoint) {
    const {
        offsetLeft: inputX,
        offsetTop: inputY,
    } = input
    // create a dummy element that will be a clone of our input
    const div = document.createElement('div')
    // get the computed style of the input and clone it onto the dummy element
    const copyStyle = getComputedStyle(input)
    for (const prop of copyStyle) {
        div.style[prop] = copyStyle[prop]
    }
    // we need a character that will replace whitespace when filling our dummy element if it's a single line <input/>
    const swap = '.'
    const inputValue = input.tagName === 'INPUT' ? input.value.replace(/ /g, swap) : input.value
    // set the div content to that of the textarea up until selection
    const textContent = inputValue.substr(0, selectionPoint)
    // set the text content of the dummy element div
    div.textContent = textContent
    if (input.tagName === 'TEXTAREA') div.style.height = 'auto'
    // if a single line input then the div needs to be single line and not break out like a text area
    if (input.tagName === 'INPUT') div.style.width = 'auto'
    // create a marker element to obtain caret position
    const span = document.createElement('span')
    // give the span the textContent of remaining content so that the recreated dummy element is as close as possible
    span.textContent = inputValue.substr(selectionPoint) || '.'
    // append the span marker to the div
    div.appendChild(span)
    // append the dummy element to the body
    document.body.appendChild(div)
    // get the marker position, this is the caret position top and left relative to the input
    const { offsetLeft: spanX, offsetTop: spanY } = span
    // lastly, remove that dummy element
    // NOTE:: can comment this out for debugging purposes if you want to see where that span is rendered
    document.body.removeChild(div)
    // return an object with the x and y of the caret. account for input positioning so that you don't need to wrap the input
    return {
        x: inputX + spanX,
        y: inputY + spanY,
    }
}
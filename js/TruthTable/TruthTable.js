// checks for syntax errors and processes the expression
function parseExp() {
    const booleanExp = document.getElementById('boolInput').value;
    // allVars is a string of all the variable names (non-distinct)
    const allVars = booleanExp
            .replace(/[\s()&|!^01]/g, "")
            .trim();
    // vars[] contains only unique variable names
    const uniqueVars = allVars
            .split("")
            .filter((v, i, a) => a.indexOf(v) === i)
            .sort();
    // ops[] is an array of the variables without a proper logical operator between them
    const ops = booleanExp
            .replace(/[\s]/g, "")               // replace all white spaces with empty string
            .replace(/[!-\/:-@[-`{-~]/g, " ")   // replace all logical operators with a space
            .split(/\s+/)                       // split by  white spaces
            .filter(x => x.length > 1);         // find variables without an operator
    const specialChar = new RegExp(/[!-\/:-@[-`{-~]/);
    const otherNums = new RegExp(/[2-9]/);
    // check if other numbers other than 0 and 1 are used
    if (otherNums.test(allVars)) {
        document.getElementById('truthTable').innerHTML = "";
        document.getElementById('errMsg').innerHTML = "Syntax error: illegal number " + allVars.replace(/[^2-9]/g, "").split("");
    // check if there are any special characters used
    } else if (specialChar.test(allVars)) {
        document.getElementById('truthTable').innerHTML = "";
        document.getElementById('errMsg').innerHTML = "Syntax error: illegal special character " + allVars.replace(/[a-zA-Z]/g, "").split("");
    // check if all the variables are operated on properly
    } else if (ops.length > 0) {
        document.getElementById('truthTable').innerHTML = "";
        document.getElementById('errMsg').innerHTML = "Syntax error: missing logical operator between " + ops.toString();
    // check if there are enough variables used
    } else if (uniqueVars.length < 1) {
        document.getElementById('truthTable').innerHTML = "";
        document.getElementById('errMsg').innerHTML = "Enter an expression!";
    // check if there are too many variables used
    } else if (uniqueVars.length > 5) {
        document.getElementById('truthTable').innerHTML = "";
        document.getElementById('errMsg').innerHTML = "Too many variables: " + uniqueVars.toString();
    // js own syntax error
    } else {
        try {
            document.getElementById('errMsg').innerHTML = "";
            return evalExp(booleanExp, uniqueVars);
        } catch (err) {
            document.getElementById('truthTable').innerHTML = "";
            document.getElementById('errMsg').innerHTML = "Syntax error: " + err.message.toLowerCase();
        }
    }
}

function printMinterms(ans) {
    let minterms = [];
    for (let i = 0; i < ans.length; i++) {
        if (ans[i] === 1) minterms.push(i);
    }
    return minterms;
}

// evaluates the expression
function evalExp(booleanExp, vars) {
    let ans;
    if (vars.length === 1) {
        ans = oneVarSolver(booleanExp, vars);
        document.getElementById('truthTable').innerHTML = vars[0] + " | F" + "</br>" +
                                                          "<s>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</s>" + "</br>" +
                                                          "0 | " + ans[0] + "</br>" +
                                                          "1 | " + ans[1] + "</br></br>" +
                                                          "F(" + vars + ") = Σm(" + printMinterms(ans) + ")";
    } else if (vars.length === 2) {
        ans = twoVarSolver(booleanExp, vars);
        document.getElementById('truthTable').innerHTML = vars[0] + vars[1] + " | F" + "</br>" +
                                                          "<s>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</s>" + "</br>" +
                                                          "00 | " + ans[0] + "</br>" +
                                                          "01 | " + ans[1] + "</br>" +
                                                          "10 | " + ans[2] + "</br>" +
                                                          "11 | " + ans[3] + "</br></br>" +
                                                          "F(" + vars + ") = Σm(" + printMinterms(ans) + ")";
    } else if (vars.length === 3) {
        ans = threeVarSolver(booleanExp, vars);
        document.getElementById('truthTable').innerHTML = vars[0] + vars[1] + vars[2] + " | F" + "</br>" +
                                                          "<s>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</s>" + "</br>" +
                                                          "000 | " + ans[0] + "</br>" +
                                                          "001 | " + ans[1] + "</br>" +
                                                          "010 | " + ans[2] + "</br>" +
                                                          "011 | " + ans[3] + "</br>" +
                                                          "100 | " + ans[4] + "</br>" +
                                                          "101 | " + ans[5] + "</br>" +
                                                          "110 | " + ans[6] + "</br>" +
                                                          "111 | " + ans[7] + "</br></br>" +
                                                          "F(" + vars + ") = Σm(" + printMinterms(ans) + ")";
    } else if (vars.length === 4) {
        ans = fourVarSolver(booleanExp, vars);
        document.getElementById('truthTable').innerHTML = vars[0] + vars[1] + vars[2] + vars[3] + " | F" + "</br>" +
                                                          "<s>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</s>" + "</br>" +
                                                          "0000 | " + ans[0] + "</br>" +
                                                          "0001 | " + ans[1] + "</br>" +
                                                          "0010 | " + ans[2] + "</br>" +
                                                          "0011 | " + ans[3] + "</br>" +
                                                          "0100 | " + ans[4] + "</br>" +
                                                          "0101 | " + ans[5] + "</br>" +
                                                          "0110 | " + ans[6] + "</br>" +
                                                          "0111 | " + ans[7] + "</br>" +
                                                          "1000 | " + ans[8] + "</br>" +
                                                          "1001 | " + ans[9] + "</br>" +
                                                          "1010 | " + ans[10] + "</br>" +
                                                          "1011 | " + ans[11] + "</br>" +
                                                          "1100 | " + ans[12] + "</br>" +
                                                          "1101 | " + ans[13] + "</br>" +
                                                          "1110 | " + ans[14] + "</br>" +
                                                          "1111 | " + ans[15] + "</br></br>" +
                                                          "F(" + vars + ") = Σm(" + printMinterms(ans) + ")";
    } else if (vars.length === 5) {
        ans = fiveVarSolver(booleanExp, vars);
        document.getElementById('truthTable').innerHTML = vars[0] + vars[1] + vars[2] + vars[3] + vars[4] + " | F" + "</br>" +
                                                          "<s>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</s>" + "</br>" +
                                                          "00000 | " + ans[0] + "</br>" +
                                                          "00001 | " + ans[1] + "</br>" +
                                                          "00010 | " + ans[2] + "</br>" +
                                                          "00011 | " + ans[3] + "</br>" +
                                                          "00100 | " + ans[4] + "</br>" +
                                                          "00101 | " + ans[5] + "</br>" +
                                                          "00110 | " + ans[6] + "</br>" +
                                                          "00111 | " + ans[7] + "</br>" +
                                                          "01000 | " + ans[8] + "</br>" +
                                                          "01001 | " + ans[9] + "</br>" +
                                                          "01010 | " + ans[10] + "</br>" +
                                                          "01011 | " + ans[11] + "</br>" +
                                                          "01100 | " + ans[12] + "</br>" +
                                                          "01101 | " + ans[13] + "</br>" +
                                                          "01110 | " + ans[14] + "</br>" +
                                                          "01111 | " + ans[15] + "</br>" +
                                                          "10000 | " + ans[16] + "</br>" +
                                                          "10001 | " + ans[17] + "</br>" +
                                                          "10010 | " + ans[18] + "</br>" +
                                                          "10011 | " + ans[19] + "</br>" +
                                                          "10100 | " + ans[20] + "</br>" +
                                                          "10101 | " + ans[21] + "</br>" +
                                                          "10110 | " + ans[22] + "</br>" +
                                                          "10111 | " + ans[23] + "</br>" +
                                                          "11000 | " + ans[24] + "</br>" +
                                                          "11001 | " + ans[25] + "</br>" +
                                                          "11010 | " + ans[26] + "</br>" +
                                                          "11011 | " + ans[27] + "</br>" +
                                                          "11100 | " + ans[28] + "</br>" +
                                                          "11101 | " + ans[29] + "</br>" +
                                                          "11110 | " + ans[30] + "</br>" +
                                                          "11111 | " + ans[31] + "</br></br>" +
                                                          "F(" + vars + ") = Σm(" + printMinterms(ans) + ")";
    }
}

function oneVarSolver(booleanExp, vars) {
    const ans = [];
    for (let i = 0; i < 2; i++) {
        const firstVar = new RegExp(vars[0], "g");
        const currBool = booleanExp
                .replace(firstVar, i);
        // +0 is to convert back to 1 or 0 instead of boolean true/false
        ans.push(eval(currBool) + 0);
    }
    return ans;
}

function twoVarSolver(booleanExp, vars) {
    const ans = [];
    for (let i = 0; i < 2; i++) {
        const firstVar = new RegExp(vars[0], "g");
        for (let j = 0; j < 2; j++) {
            const secondVar = new RegExp(vars[1], "g");
            const currBool = booleanExp
                    .replace(secondVar, j)
                    .replace(firstVar, i);
            // +0 is to convert back to 1 or 0 instead of boolean true/false
            ans.push(eval(currBool) + 0);
        }
    }
    return ans;
}

function threeVarSolver(booleanExp, vars) {
    const ans = [];
    for (let i = 0; i < 2; i++) {
        const firstVar = new RegExp(vars[0], "g");
        for (let j = 0; j < 2; j++) {
            const secondVar = new RegExp(vars[1], "g");
            for (let k = 0; k < 2; k++) {
                const thirdVar = new RegExp(vars[2], "g");
                const currBool = booleanExp
                        .replace(thirdVar, k)
                        .replace(secondVar, j)
                        .replace(firstVar, i);
                // +0 is to convert back to 1 or 0 instead of boolean true/false
                ans.push(eval(currBool) + 0);
            }
        }
    }
    return ans;
}

function fourVarSolver(booleanExp, vars) {
    const ans = [];
    for (let i = 0; i < 2; i++) {
        const firstVar = new RegExp(vars[0], "g");
        for (let j = 0; j < 2; j++) {
            const secondVar = new RegExp(vars[1], "g");
            for (let k = 0; k < 2; k++) {
                const thirdVar = new RegExp(vars[2], "g");
                for (let l = 0; l < 2; l++) {
                    const fourthVar = new RegExp(vars[3], "g");
                    const currBool = booleanExp
                            .replace(fourthVar, l)
                            .replace(thirdVar, k)
                            .replace(secondVar, j)
                            .replace(firstVar, i);
                    // +0 is to convert back to 1 or 0 instead of boolean true/false
                    ans.push(eval(currBool) + 0);
                }
            }
        }
    }
    return ans;
}

function fiveVarSolver(booleanExp, vars) {
    const ans = [];
    for (let i = 0; i < 2; i++) {
        const firstVar = new RegExp(vars[0], "g");
        for (let j = 0; j < 2; j++) {
            const secondVar = new RegExp(vars[1], "g");
            for (let k = 0; k < 2; k++) {
                const thirdVar = new RegExp(vars[2], "g");
                for (let l = 0; l < 2; l++) {
                    const fourthVar = new RegExp(vars[3], "g");
                    for (let m = 0; m < 2; m++) {
                        const fifthVar = new RegExp(vars[4], "g");
                        const currBool = booleanExp
                                .replace(fifthVar, m)
                                .replace(fourthVar, l)
                                .replace(thirdVar, k)
                                .replace(secondVar, j)
                                .replace(firstVar, i);
                        // +0 is to convert back to 1 or 0 instead of boolean true/false
                        ans.push(eval(currBool) + 0);
                    }
                }
            }
        }
    }
    return ans;
}

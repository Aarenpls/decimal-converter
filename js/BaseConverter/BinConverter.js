document.getElementById('numInput').addEventListener('input', function(e){
    let num = e.target.value;
    let decimalNum;

    function binToDec(bin) {
        const int = parseInt(bin, 2);
        if (isNaN(int)) return 0;
        decimalNum = int;
        if (int.length <= 4) {
            return int;
        } else {
            return formatDec(int.toString());
        }
    }

    function decToOct(dec) {
        const str = (dec >>> 0).toString(8);
        if (str.length <= 4) {
            return str;
        } else {
            return formatOutput(str);
        }
    }

    function decToHex(dec) {
        const str = (dec >>> 0).toString(16).toUpperCase();
        if (str.length <= 4) {
            return str;
        } else {
            return formatOutput(str);
        }
    }

    function formatOutput(str) {
        let toReturn = str.slice(0, str.length % 4);
        for (let i = str.length % 4; i < str.length; i = i + 4) {
            toReturn = toReturn + " " + str.slice(i, i + 4);
        }
        return toReturn;
    }

    function formatDec(str) {
        let toReturn = str.slice(0, str.length % 3);
        for (let i = str.length % 3; i < str.length; i = i + 3) {
            toReturn = toReturn + " " + str.slice(i, i + 3);
        }
        return toReturn;
    }

    if (num > 11111111111111111111111111111111) {
        document.getElementById('errMsg').innerHTML = "This number is too big!";
        document.getElementById('decOutput').innerHTML = "-";
        document.getElementById('octOutput').innerHTML = "-";
        document.getElementById('hexOutput').innerHTML = "-";
        return false;
    } else if (num < 0) {
        document.getElementById('errMsg').innerHTML = "Negative numbers not allowed for binary conversion";
        document.getElementById('decOutput').innerHTML = "-";
        document.getElementById('octOutput').innerHTML = "-";
        document.getElementById('hexOutput').innerHTML = "-";
        return false;
    } else if (/[^01]/.test(num)) {
        document.getElementById('errMsg').innerHTML = "Binary only contains 1s and 0s";
        document.getElementById('decOutput').innerHTML = "-";
        document.getElementById('octOutput').innerHTML = "-";
        document.getElementById('hexOutput').innerHTML = "-";
        return false;
    } else {
        document.getElementById('errMsg').innerHTML = "";
        document.getElementById('decOutput').innerHTML = binToDec(num);
        document.getElementById('octOutput').innerHTML = decToOct(decimalNum);
        document.getElementById('hexOutput').innerHTML = decToHex(decimalNum);
    }
});

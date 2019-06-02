document.getElementById('numInput').addEventListener('input', function(e){
    let num = e.target.value.replace(/ /g, "");
    let decimalNum;

    function hexToDec(hex) {
        const int = parseInt(hex, 16);
        if (isNaN(int)) return 0;
        decimalNum = int;
        if (int.length <= 4) {
            return int;
        } else {
            return formatDec(int.toString());
        }
    }

    function decToBin(dec) {
        const str = (dec >>> 0).toString(2);
        if (str.length <= 4) {
            return str;
        } else {
            return formatOutput(str);
        }
    }

    function decToOct(dec) {
        const str = (dec >>> 0).toString(8).toUpperCase();
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

    if (parseInt(num, 16) > 4294967295) {
        document.getElementById('errMsg').innerHTML = "Hexadecimal numbers cannot be more than 0xFFFF FFFF!";
        document.getElementById('decOutput').innerHTML = "-";
        document.getElementById('binOutput').innerHTML = "-";
        document.getElementById('octOutput').innerHTML = "-";
        return false;
    } else if (num < 0) {
        document.getElementById('errMsg').innerHTML = "Negative numbers not allowed for hexadecimal conversion";
        document.getElementById('decOutput').innerHTML = "-";
        document.getElementById('binOutput').innerHTML = "-";
        document.getElementById('octOutput').innerHTML = "-";
        return false;
    } else if (/[^0-9A-Fa-f]/.test(num)) {
        document.getElementById('errMsg').innerHTML = "Hexadecimal numbers should only contain 0-9 and A-F";
        document.getElementById('decOutput').innerHTML = "-";
        document.getElementById('binOutput').innerHTML = "-";
        document.getElementById('octOutput').innerHTML = "-";
        return false;
    }  else {
        document.getElementById('errMsg').innerHTML = "";
        document.getElementById('decOutput').innerHTML = hexToDec(num);
        document.getElementById('binOutput').innerHTML = decToBin(decimalNum);
        document.getElementById('octOutput').innerHTML = decToOct(decimalNum);
    }
});

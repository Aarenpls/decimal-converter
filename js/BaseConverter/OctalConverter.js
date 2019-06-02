document.getElementById('numInput').addEventListener('input', function(e){
    let num = e.target.value;
    let decimalNum;

    function octToDec(oct) {
        const int = parseInt(oct, 8);
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

    if (num > 37777777777) {
        document.getElementById('errMsg').innerHTML = "This number is too big!";
        document.getElementById('decOutput').innerHTML = "-";
        document.getElementById('binOutput').innerHTML = "-";
        document.getElementById('hexOutput').innerHTML = "-";
        return false;
    } else if (num < 0) {
        document.getElementById('errMsg').innerHTML = "Negative numbers not allowed for octal conversion";
        document.getElementById('decOutput').innerHTML = "-";
        document.getElementById('binOutput').innerHTML = "-";
        document.getElementById('hexOutput').innerHTML = "-";
        return false;
    } else if (/[^0-8]/.test(num)) {
        document.getElementById('errMsg').innerHTML = "Octal only contains numbers 0 to 8";
        document.getElementById('decOutput').innerHTML = "-";
        document.getElementById('binOutput').innerHTML = "-";
        document.getElementById('hexOutput').innerHTML = "-";
        return false;
    } else {
        document.getElementById('errMsg').innerHTML = "";
        document.getElementById('decOutput').innerHTML = octToDec(num);
        document.getElementById('binOutput').innerHTML = decToBin(decimalNum);
        document.getElementById('hexOutput').innerHTML = decToHex(decimalNum);
    }
});

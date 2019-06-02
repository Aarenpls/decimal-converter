document.getElementById('numInput').addEventListener('input', function(e){
    let num = e.target.value;

    function decToBin(dec) {
        const str = (dec >>> 0).toString(2);
        if (str.length <= 4) {
            return str;
        } else {
            return formatOutput(str);
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

    if (num > 4294967295) {
        document.getElementById('errMsg').innerHTML = "Positive numbers cannot be more than 4,294,967,295";
        document.getElementById('binOutput').innerHTML = "-";
        document.getElementById('octOutput').innerHTML = "-";
        document.getElementById('hexOutput').innerHTML = "-";
        return false;
    } else if (num < -4294967296) {
        document.getElementById('errMsg').innerHTML = "Negative numbers cannot be less than -4,294,967,296";
        document.getElementById('binOutput').innerHTML = "-";
        document.getElementById('octOutput').innerHTML = "-";
        document.getElementById('hexOutput').innerHTML = "-";
        return false;
    } else if (num.toString().includes(".")) {
        document.getElementById('errMsg').innerHTML = "Floating point numbers are not allowed!";
        document.getElementById('binOutput').innerHTML = "-";
        document.getElementById('octOutput').innerHTML = "-";
        document.getElementById('hexOutput').innerHTML = "-";
        return false;
    } else {
        document.getElementById('errMsg').innerHTML = "";
        document.getElementById('binOutput').innerHTML = decToBin(num);
        document.getElementById('octOutput').innerHTML = decToOct(num);
        document.getElementById('hexOutput').innerHTML = decToHex(num);
    }
});

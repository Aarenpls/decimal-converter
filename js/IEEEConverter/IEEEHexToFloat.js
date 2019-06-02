document.getElementById('numInput').addEventListener('input', function(e) {
    let num = e.target.value
            .replace("0x", "")
            .replace(/[\s]/g, "");

    const hexLen = num.length;
    const binNum = parseInt(num, 16)
            .toString(2)
            .padStart(hexLen * 4, "0");

    function formatBin(str) {
        if (isNaN(str)) {
            return "-";
        } else {
            let toReturn = str.slice(0, str.length % 4);
            for (let i = str.length % 4; i < str.length; i = i + 4) {
                toReturn = toReturn + " " + str.slice(i, i + 4);
            }
            return toReturn;
        }
    }

    if (/[^0-9A-Fa-fx]/.test(num)) {
        document.getElementById('binaryOutput').innerHTML = "-";
        document.getElementById('sign').innerHTML = "-";
        document.getElementById('exponent').innerHTML = "-";
        document.getElementById('mantissa').innerHTML = "-";
        document.getElementById('floatOutput').innerHTML = "-";
        document.getElementById('errMsg').innerHTML = "Hexadecimal numbers should only contain 0-9 and A-F";
        return false;
    } else if (hexLen < 8) {
        document.getElementById('binaryOutput').innerHTML = formatBin(binNum);
        document.getElementById('sign').innerHTML = "-";
        document.getElementById('exponent').innerHTML = "-";
        document.getElementById('mantissa').innerHTML = "-";
        document.getElementById('floatOutput').innerHTML = "-";
        document.getElementById('errMsg').innerHTML = "";
        return false;
    } else if (hexLen > 8) {
        document.getElementById('binaryOutput').innerHTML = "-";
        document.getElementById('sign').innerHTML = "-";
        document.getElementById('exponent').innerHTML = "-";
        document.getElementById('mantissa').innerHTML = "-";
        document.getElementById('floatOutput').innerHTML = "-";
        document.getElementById('errMsg').innerHTML = "Too many digits!";
        return false;
    } else {
        document.getElementById('binaryOutput').innerHTML = formatBin(binNum);
        const sign = binNum.slice(0, 1);
        const binExpo = binNum.slice(1, 9);
        const binMan = binNum.slice(9, 32);

        const expo = 127 - parseInt(binExpo, 2);
        const man = "1" + binMan; // normalise the mantissa
        const e = -23 - expo; // mantissa is 23 bits
        const s = parseInt(sign) === 1 ? -1 : 1;
        const float = s * parseInt(man, 2) * Math.pow(2, e);
        document.getElementById('sign').innerHTML = sign;
        document.getElementById('exponent').innerHTML = binExpo;
        document.getElementById('mantissa').innerHTML = binMan;
        document.getElementById('floatOutput').innerHTML = float;
        document.getElementById('errMsg').innerHTML = "";
        return true;
    }
});

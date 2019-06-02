document.getElementById('numInput').addEventListener('input', function(e) {
    let num = e.target.value;

    function floatToHex(f) {
        const buf = new ArrayBuffer(4);
        (new Float32Array(buf))[0] = f;
        const hex = (new Uint32Array(buf))[0];
        return hex;
    }

    function binFormat(IEEE) {
        const binNum = IEEE.toString();
        const toReturn = binNum.slice(0, 4) + " " + binNum.slice(4, 8)
                        + " " + binNum.slice(8, 12) + " " + binNum.slice(12, 16)
                        + " " + binNum.slice(16, 20) + " " + binNum.slice(20, 24)
                        + " " + binNum.slice(24, 28) + " " + binNum.slice(28, 32);
        return toReturn;
    }

    function hexFormat(hex) {
        const str = hex.toString(16).toUpperCase().padStart(8, "0");
        const toReturn = "0x" + str.slice(0, 4) + " " + str.slice(4, 8);
        return toReturn;
    }

    if (num * 1 === 0) {
        document.getElementById('binaryOutput').innerHTML = "-";
        document.getElementById('hexOutput').innerHTML = "-";
        document.getElementById('sign').innerHTML = "-";
        document.getElementById('exponent').innerHTML = "-";
        document.getElementById('mantissa').innerHTML = "-";
    } else {
        const hex = floatToHex(num);
        const binNum = hex.toString(2).padStart(32, "0");
        document.getElementById('binaryOutput').innerHTML = binFormat(binNum);
        document.getElementById('hexOutput').innerHTML = hexFormat(hex);
        document.getElementById('sign').innerHTML = binNum.slice(0, 1);
        document.getElementById('exponent').innerHTML = binNum.slice(1, 9);
        document.getElementById('mantissa').innerHTML = binNum.slice(9, 32);
    }
});

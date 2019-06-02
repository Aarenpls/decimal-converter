const refData = {
    "add": {"format": "R", "opcode": 0x0, "funct": 0x20},
    "addi": {"format": "I", "opcode": 0x8},
    "addiu": {"format": "I", "opcode": 0x9},
    "addu": {"format": "R", "opcode": 0x0, "funct": 0x21},
    "and": {"format": "R", "opcode": 0x0, "funct": 0x24},
    "andi": {"format": "I", "opcode": 0xC},
    "beq": {"format": "I", "opcode": 0x4},
    "bne": {"format": "I", "opcode": 0x5},
    "j": {"format": "J", "opcode": 0x2},
    "jal": {"format": "J", "opcode": 0x3},
    "jr": {"format": "R", "opcode": 0x3, "funct": 0x08},
    "lb": {"format": "I", "opcode": 0x20},
    "lbu": {"format": "I", "opcode": 0x24},
    "lhu": {"format": "I", "opcode": 0x25},
    "ll": {"format": "I", "opcode": 0x30},
    "lui": {"format": "I", "opcode": 0xF},
    "lw": {"format": "I", "opcode": 0x23},
    "nor": {"format": "R", "opcode": 0x0, "funct": 0x27},
    "or": {"format": "R", "opcode": 0x0, "funct": 0x25},
    "ori": {"format": "I", "opcode": 0xD},
    "slt": {"format": "R", "opcode": 0x0, "funct": 0x2A},
    "slti": {"format": "I", "opcode": 0xA},
    "sltiu": {"format": "I", "opcode": 0xB},
    "sltu": {"format": "R", "opcode": 0x0, "funct": 0x2B},
    "sll": {"format": "R", "opcode": 0x0, "funct": 0x00},
    "srl": {"format": "R", "opcode": 0x0, "funct": 0x02},
    "sb": {"format": "I", "opcode": 0x28},
    "sc": {"format": "I", "opcode": 0x38},
    "sh": {"format": "I", "opcode": 0x29},
    "sw": {"format": "I", "opcode": 0x2B},
    "sub": {"format": "R", "opcode": 0x0, "funct": 0x22},
    "subu": {"format": "R", "opcode": 0x0, "funct": 0x23}
}

const reg = {
    "$zero": 0, "$at": 1, "$v0": 2, "$v1": 3, "$a0": 4,
    "$a1": 5, "$a2": 6, "$a3": 7, "$t0": 8, "$t1": 9,
    "$t2": 10, "$t3": 11, "$t4": 12, "$t5": 13, "$t6": 14,
    "$t7": 15, "$s0": 16, "$s1": 17, "$s2": 18, "$s3": 19,
    "$s4": 20, "$s5": 21, "$s6": 22, "$s7": 23, "$t8": 24,
    "$t9": 25, "$k0": 26, "$k1": 27, "$gp": 28, "$sp": 29,
    "$fp": 30, "$ra": 31, "$0": 0, "$1": 1, "$2": 2,
    "$3": 3, "$4": 4, "$5": 5, "$6": 6, "$7": 7,
    "$8": 8, "$9": 9, "$10": 10, "$11": 11, "$12": 12,
    "$13": 14, "$14": 14, "$15": 15, "$16": 16, "$17": 17,
    "$18": 18, "$19": 19, "$20": 20, "$21": 21, "$22": 22,
    "$23": 23, "$24": 24, "$25": 25, "$26": 26, "$27": 27,
    "$28": 28, "$29": 29, "$30": 30, "$31": 31
}

function evalExp() {
    const userInput = document.getElementById('mipsInput').value.toLowerCase();
    const split = userInput
            .replace(/,/g, " ")
            .split(/\s+/);
    const instruction = split[0];

    try {
        let type; // type is the object which describes the instruction eg. {"format": "R", "opcode": 0x0, "funct": 0x20}
        for (const [key, value] of Object.entries(refData)) {
            if (key === instruction) type = value;
        }
        if (type === undefined) throw "Instruction not found: " + instruction;

        if (type.format === "R") {
            if (instruction === "sll" || instruction === "srl") {
                return RshiftHandler(split, type);
            } else if (instruction === "jr") {
                return jrHandler(split, type);
            } else {
                return RHandler(split, type);
            }
        } else if (type.format === "I") {
            if (instruction === "beq" || instruction === "bne") {
                return IbranchHandler(split, type);
            } else if (instruction === "lb" || instruction === "lui" || instruction === "sw"
                    || instruction === "lw" || instruction === "sb" || instruction == "lbu") {
                return IloadHandler(split, type);
            } else {
                return IHandler(split, type);
            }
        } else {
            return JHandler(split, type);
        }
    }
    catch (err) {
        document.getElementById('working').innerHTML = "-";
        document.getElementById('binOutput').innerHTML = "-";
        document.getElementById('hexOutput').innerHTML = "-";
        document.getElementById('errMsg').innerHTML = err;
    }
}

function regFinder(r) {
    let regFound;
    for (const [key, value] of Object.entries(reg)) {
        if (key === r) regFound = value;
    }
    if (regFound === undefined) {
        throw "Register not found: " + r;
    } else {
        return regFound;
    }
}

function formatOutput(str) {
    let toReturn = str.slice(0, str.length % 4);
    for (let i = str.length % 4; i < str.length; i = i + 4) {
        toReturn = toReturn + " " + str.slice(i, i + 4);
    }
    return toReturn.trim();
}

function RshiftHandler(split, type) {
    if (isNaN(split[3])) throw "shamt field is not a valid number: " + split[3];

    const binOpcode = type
            .opcode
            .toString(2)
            .padStart(6, "0");

    const binRd = regFinder(split[1])
            .toString(2)
            .padStart(5, "0");

    const binRs = "00000"; // assumed to be 0x0

    const binRt = regFinder(split[2])
            .toString(2)
            .padStart(5, "0");

    const binShamt = split[3].includes("x") || split[3].includes("X") ?
            parseInt(split[3], 16).toString(2).padStart(5, "0") :
            parseInt(split[3], 10).toString(2).padStart(5, "0");

    const binFunct = split[0] === "sll" ? "000000" : "000010";

    const binEncoding = binOpcode + binRs + binRt + binRd + binShamt + binFunct;
    const hexEncoding = parseInt(binEncoding, 2)
            .toString(16)
            .padStart(8, "0")
            .toUpperCase();

    document.getElementById('working').innerHTML =
            "<u>R-format</u>" +
            "</br>" + "op: " + split[0] + " = " + binOpcode +
            "</br>" + "rs: $zero" + " = " + binRs +
            "</br>" + "rt: " + split[2] + " = " + binRt +
            "</br>" + "rd: " + split[1] + " = " + binRd +
            "</br>" + "shamt: " + split[3] + " = " + binShamt +
            "</br>" + "funct: " + binFunct;
    document.getElementById('binOutput').innerHTML = formatOutput(binEncoding);
    document.getElementById('hexOutput').innerHTML = "0x" + formatOutput(hexEncoding);
    document.getElementById('errMsg').innerHTML = "";
}

function jrHandler(split, type) {
    const binOpcode = "000000";

    const binRs = regFinder(split[1])
            .toString(2)
            .padStart(5, "0");

    const binRt = binRd = binShamt = "00000";

    const binFunct = "001000";

    const binEncoding = binOpcode + binRs + binRt + binRd + binShamt + binFunct;
    const hexEncoding = parseInt(binEncoding, 2)
            .toString(16)
            .padStart(8, "0")
            .toUpperCase();

    document.getElementById('working').innerHTML =
            "<u>R-format</u>" +
            "</br>" + "op: " + split[0] + " = " + binOpcode +
            "</br>" + "rs: " + split[1] + " = " + binRs +
            "</br>" + "rt: $zero" + " = " + binRt +
            "</br>" + "rd: $zero" + " = " + binRd +
            "</br>" + "shamt: " + binShamt +
            "</br>" + "funct: " + binFunct;
    document.getElementById('binOutput').innerHTML = formatOutput(binEncoding);
    document.getElementById('hexOutput').innerHTML = "0x" + formatOutput(hexEncoding);
    document.getElementById('errMsg').innerHTML = "";
}

function RHandler(split, type) {
// works for add, addu, and, nor, or, slt, sltu, sll, srl, jr
    const binOpcode = type
            .opcode
            .toString(2)
            .padStart(6, "0");

    const binRd = regFinder(split[1])
            .toString(2)
            .padStart(5, "0");

    const binRs = regFinder(split[2])
            .toString(2)
            .padStart(5, "0");

    const binRt = regFinder(split[3])
            .toString(2)
            .padStart(5, "0");

    const binShamt = "00000";

    const binFunct = type
            .funct
            .toString(2)
            .padStart(6, "0");

    const binEncoding = binOpcode + binRs + binRt + binRd + binShamt + binFunct;
    const hexEncoding = parseInt(binEncoding, 2)
            .toString(16)
            .padStart(8, "0")
            .toUpperCase();

    document.getElementById('working').innerHTML =
            "<u>R-format</u>" +
            "</br>" + "op: " + split[0] + " = " + binOpcode +
            "</br>" + "rs: " + split[2] + " = " + binRs +
            "</br>" + "rt: " + split[3] + " = " + binRt +
            "</br>" + "rd: " + split[1] + " = " + binRd +
            "</br>" + "shamt: " + binShamt +
            "</br>" + "funct: " + binFunct;
    document.getElementById('binOutput').innerHTML = formatOutput(binEncoding);
    document.getElementById('hexOutput').innerHTML = "0x" + formatOutput(hexEncoding);
    document.getElementById('errMsg').innerHTML = "";
}

function IbranchHandler(split, type) {
    if (isNaN(split[3])) throw "immediate field is not a valid number: " + split[3];
    const binOpcode = type
            .opcode
            .toString(2)
            .padStart(6, "0");

    const binRs = regFinder(split[1])
            .toString(2)
            .padStart(5, "0");

    const binRt = regFinder(split[2])
            .toString(2)
            .padStart(5, "0");

    const binImm = split[3].includes("x") || split[3].includes("X") ?
            parseInt(split[3], 16).toString(2).padStart(16, "0") :
            parseInt(split[3], 10).toString(2).padStart(16, "0");

    const binEncoding = binOpcode + binRs + binRt + binImm;
    const hexEncoding = parseInt(binEncoding, 2)
            .toString(16)
            .padStart(8, "0")
            .toUpperCase();

    document.getElementById('working').innerHTML =
            "<u>I-format</u>" +
            "</br>" + "op: " + split[0] + " = " + binOpcode +
            "</br>" + "rs: " + split[1] + " = " + binRs +
            "</br>" + "rt: " + split[2] + " = " + binRt +
            "</br>" + "imm: " + split[3] + " = " + binImm;
    document.getElementById('binOutput').innerHTML = formatOutput(binEncoding);
    document.getElementById('hexOutput').innerHTML = "0x" + formatOutput(hexEncoding);
    document.getElementById('errMsg').innerHTML = "";
}

function IloadHandler(split, type) {
    const splitOfSplit = split[2]
            .replace(/[()]/g, " ")
            .trim()
            .split(/\s+/);

    const offset = splitOfSplit[0];
    const rs = split[0] === "lui" ? "$zero" : splitOfSplit[1];
    if (isNaN(offset)) throw "offset field is not a valid number: " + offset;

    const binOpcode = type
            .opcode
            .toString(2)
            .padStart(6, "0");

    const binRt = regFinder(split[1])
            .toString(2)
            .padStart(5, "0");

    const binRs = regFinder(rs)
            .toString(2)
            .padStart(5, "0");

    const binOffset = offset.includes("x") || offset.includes("X") ?
            parseInt(offset, 16).toString(2).padStart(16, "0") :
            parseInt(offset, 10).toString(2).padStart(16, "0");

    const binEncoding = binOpcode + binRs + binRt + binOffset;
    const hexEncoding = parseInt(binEncoding, 2)
            .toString(16)
            .padStart(8, "0")
            .toUpperCase();

    document.getElementById('working').innerHTML =
            "<u>I-format</u>" +
            "</br>" + "op: " + split[0] + " = " + binOpcode +
            "</br>" + "rs: " + rs + " = " + binRs +
            "</br>" + "rt: " + split[1] + " = " + binRt +
            "</br>" + "offset: " + offset + " = " + binOffset;
    document.getElementById('binOutput').innerHTML = formatOutput(binEncoding);
    document.getElementById('hexOutput').innerHTML = "0x" + formatOutput(hexEncoding);
    document.getElementById('errMsg').innerHTML = "";
}

function IHandler(split, type) {
// works for addi, addiu, andi, ori, slti, sltiu, beq, bne, lb, lui, lw, sb, sw
    if (isNaN(split[3])) throw "offset field is not a valid number: " + split[3];

    const binOpcode = type
            .opcode
            .toString(2)
            .padStart(6, "0");

    const binRt = regFinder(split[1])
            .toString(2)
            .padStart(5, "0");

    const binRs = regFinder(split[2])
            .toString(2)
            .padStart(5, "0");

    const binImm = split[3].includes("x") || split[3].includes("X") ?
            parseInt(split[3], 16).toString(2).padStart(16, "0") :
            parseInt(split[3], 10).toString(2).padStart(16, "0");

    const binEncoding = binOpcode + binRs + binRt + binImm;
    const hexEncoding = parseInt(binEncoding, 2)
            .toString(16)
            .padStart(8, "0")
            .toUpperCase();

    document.getElementById('working').innerHTML =
            "<u>I-format</u>" +
            "</br>" + "op: " + split[0] + " = " + binOpcode +
            "</br>" + "rt: " + split[1] + " = " + binRs +
            "</br>" + "rs: " + split[2] + " = " + binRt +
            "</br>" + "imm: " + split[3] + " = " + binImm;
    document.getElementById('binOutput').innerHTML = formatOutput(binEncoding);
    document.getElementById('hexOutput').innerHTML = "0x" + formatOutput(hexEncoding);
    document.getElementById('errMsg').innerHTML = "";
}

function JHandler(split, type) {
    if (isNaN(split[1]) || split[1] === undefined) throw "immediate field is not a valid number: " + split[1];

    const binOpcode = type
            .opcode
            .toString(2)
            .padStart(6, "0");

    const binImm = split[1].includes("x") || split[1].includes("X") ?
            parseInt(split[1], 16).toString(2).padStart(26, "0") :
            parseInt(split[1], 10).toString(2).padStart(26, "0");

    const binEncoding = binOpcode + binImm;
    const hexEncoding = parseInt(binEncoding, 2)
            .toString(16)
            .padStart(8, "0")
            .toUpperCase();

    document.getElementById('working').innerHTML =
            "<u>J-format</u>" +
            "</br>" + "op: " + split[0] + " = " + binOpcode +
            "</br>" + "imm: " + split[1] + " = " + binImm;
    document.getElementById('binOutput').innerHTML = formatOutput(binEncoding);
    document.getElementById('hexOutput').innerHTML = "0x" + formatOutput(hexEncoding);
    document.getElementById('errMsg').innerHTML = "";
}

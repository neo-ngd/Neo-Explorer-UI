/* eslint-disable prettier/prettier */
import {format} from "timeago.js";
import Neon from "@cityofzion/neon-js";


// const RPC_NODE = "http://seed2t4.neo.org:20332";
const RPC_NODE_MAIN = "https://neofura.ngd.network"
const RPC_NODE_TEST_T5 = "https://testmagnet.ngd.network"

function changeFormat(button) {
    if(button.state) {
        button.state = false;
        button.buttonName = "Addr";
    } else {
        button.state = true;
        button.buttonName = "Hash";
    }
}

/*
* Button{
*   state: boolean
*   buttonName: string
* }
* */

function numFormat(num){
    // var reg=/\d(?=(?:\d{3})+\b)/g;
    // console.log(num.toString())
    // return (num.toString()+ '').replace(reg, '$&,');
    var res=num.toString().replace(/\d+/, function(n){
        return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
            return $1+",";
        });
    })
    return res;
}

function sleep(ms) {
    return new Promise(resolve =>
        setTimeout(resolve, ms)
    )
}
async function copyItem(ele, button,span) {
    const item = document.getElementById(ele).innerText;
    const oInput = document.createElement('input');
    oInput.value = item;
    document.body.appendChild(oInput);
    oInput.select();
    document.execCommand("Copy");
    oInput.className = 'oInput';
    oInput.style.display = 'none';
    document.getElementById(button).style.color = "black";
    document.getElementById(span).innerText = " Copied"
    document.getElementById(span).style.color = "black"
    await sleep(500);
    document.getElementById(button).style.color = "grey";
    document.getElementById(span).innerText = "";
}

function switchTime(time){
    if (time.state){
        time.state= false;
    } else {
        time.state = true;
    }

}

function convertToken(token, decimal) {
    return numFormat(parseFloat((token * Math.pow(10, -decimal)).toFixed(8)))
}

function convertGas(gas) {
    return numFormat(parseFloat((gas * Math.pow(0.1, 8)).toFixed(8)));
}

function convertTotalSupply(supply,decimal) {
    return numFormat(parseFloat((supply * Math.pow(10, -decimal))))
}


function convertTime(ts, locale) { // this.$i18n.locale
    switch (locale) {
        case "cn":
            return format(ts, "zh_CN");
        case "en":
            return format(ts, "en_short");
        default:
            return format(ts);
    }
}

function convertPreciseTime(time) {
    const date = new Date(time);
    const y = date.getFullYear()
    const m = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1)
    const d = (date.getDate() <10 ? ('0' +date.getDate()): date.getDate())
    const h = date.getHours() < 10 ? ('0' + date.getHours()): date.getHours()
    const mi = date.getMinutes() < 10 ? ('0' + date.getMinutes()): date.getMinutes()
    const s = date.getSeconds() < 10 ? ('0' + date.getSeconds()): date.getSeconds()
    return m+'-'+d+'-'+y+' '+h+':'+mi+':'+ s  + " " + 'UTC+' + (0 - new Date().getTimezoneOffset() / 60);
}

function convertISOTime(time) {
    const date = new Date(time);
    const y = date.getFullYear()
    const m = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1)
    const d = (date.getDate() <10 ? ('0' +date.getDate()): date.getDate())
    const h = date.getHours() < 10 ? ('0' + date.getHours()): date.getHours()
    const mi = date.getMinutes() < 10 ? ('0' + date.getMinutes()): date.getMinutes()
    const s = date.getSeconds() < 10 ? ('0' + date.getSeconds()): date.getSeconds()
    return y+'-'+m+'-'+d+' '+h+':'+mi+':'+ s  ;
}



function addressToScriptHash(addr) {
    const acc = Neon.create.account(addr);
    return "0x" + acc.scriptHash;
}

function scriptHashToAddress(hash) {
    const trunc = hash.substring(2);
    const acc = Neon.create.account(trunc);
    return acc.address;
}

function responseConverter(key, val) {
    if (typeof val === "object") {
        if (val["type"] === "ByteString" && typeof val["value"] === "string") {
            const buffer = Buffer.from(val["value"], "base64");
            const hex = buffer.toString("hex");
            if (Neon.is.publicKey(hex)) {
                const acc = Neon.create.account(hex);
                val["type"] = "ScriptHash";
                val["value"] = "0x" + acc.scriptHash;
            } else if (Neon.is.scriptHash(hex)) {
                const reversed = Neon.u.reverseHex(hex)
                val["type"] = "ScriptHash";
                val["value"] = "0x" + reversed;
            } else if ((/^((0x)?)([0-9a-f]{64})$/).test(hex)){
                val["type"] = "ScriptHash";
                val["value"] = "0x" + hex;
            } else {
                if (/^[\x20-\x7F]*$/.test(buffer.toString())) {
                    val["type"] = "String";
                    val["value"] = buffer.toString();
                } else {
                    val["type"] = "HexString";
                    val["value"] = buffer.toString("hex");
                }
            }
        } else if ( val["type"] === "Buffer" && typeof val["value"] === "string"){
            const buffer = Buffer.from(val["value"], "base64");
            if ( /^[\x20-\x7F]*$/.test(buffer.toString())) {
                val["type"] = "String";
                val["value"] = buffer.toString();
            } else {
                val["type"] = "BigInteger";
                val["value"] = parseInt(buffer.toString("hex"), 16);
            }
        }
    }
    return val;
}




export {
    RPC_NODE_MAIN,
    RPC_NODE_TEST_T5,
    switchTime,
    numFormat,
    changeFormat,
    convertToken,
    convertGas,
    convertTime,
    convertPreciseTime,
    addressToScriptHash,
    scriptHashToAddress,
    responseConverter,
    copyItem,
    convertISOTime,
    convertTotalSupply,
};

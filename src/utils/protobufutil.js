import {encodeMessage } from "../../json-module"


function serializable(data){
    return encodeMessage(data)
}
let reader;
function deSerializable(data){
    reader=new FileReader()
    reader.readAsArrayBuffer(data)
}

export default {
    serializable,
    deSerializable,
    reader
}
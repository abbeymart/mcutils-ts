/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-06-24 | @Updated: 2020-06-24
 * @Company: mConnect.biz | @License: MIT
 * @Description: get Parameters response
 */

import {getResMessage, ResponseMessage} from "../../mc-response/src";

interface MessageObject {
    [key: string]: string;

}

function getParamsMessage(msgObject: MessageObject): ResponseMessage {
    let messages = '';
    Object.entries(msgObject).forEach(([key, msg]) => {
        messages = messages ? `${messages} | ${key} : ${msg}` : `${key} : ${msg}`;
    });
    return getResMessage('validateError', {
        message: messages,
    });
}

export { getParamsMessage };

/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-06-24 | @Updated: 2020-06-25
 * @Company: mConnect.biz | @License: MIT
 * @Description: string to boolean converter
 */

function strToBool(val:string | number = 'n'): boolean {
    const strVal = val.toString().toLowerCase();
    if (strVal === 'true' || strVal === 't' || strVal === 'yes' || strVal === 'y') {
        return true;
    } else if (Number(strVal) > 0) {
        return true;
    } else if (strVal === 'false' || strVal === 'f' || strVal === 'no' || strVal === 'n') {
        return false;
    } else {
        return false
    }
}

export { strToBool };

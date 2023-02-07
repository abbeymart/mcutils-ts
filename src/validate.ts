/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-06-26 | @Updated: 2020-06-26
 * @Company: mConnect.biz | @License: MIT
 * @Description: common validation functions
 */
import { ObjectType, ValueType } from "./types";

export const isProvided = (param: ValueType): boolean => {
    // Verify the Required status
    // Validate that the item is not empty / null / undefined
    return !(param === "" || param === null || param === undefined || Object.keys(param).length === 0);
};

export const isEven = (num: number): boolean => {
    return Number.isFinite(num) && (num % 2 === 0);
};

export const isOdd = (num: number): boolean => {
    return Number.isFinite(num) && (num % 2 !== 0);
};

export const isNumberDigit = (num: number | string): boolean => {
    // Validate that param is a number (digit): 100 | 99 | 33 | 44 | 200
    const numberPattern = /^[0-9]+$/;
    return numberPattern.test(num.toString());
};

export const isNumberFloat = (num: number | string): boolean => {
    // Validate that param is a number (float): 0.90 | 99.9 | 33.3 | 44.40
    const numberPattern = /^([0-9])+([.,])([0-9])*$/;
    return numberPattern.test(num.toString());
};

export const isObjectType = (param: ObjectType): boolean => {
    "use strict";
    // Validate param is an object, {}
    return (typeof param === "object" && !Array.isArray(param));
};

export const isArrayType = (param: Array<ValueType>): boolean => {
    "use strict";
    // Validate param is an object, []
    return Array.isArray(param);
};

// isStringChar validates that param is characters string (no numbers), including spaces.
export const isStringChar = (param: string): boolean => {
    // Validate that param is a string (characters only) -- use regEx
    const charRegEx = /^[a-z\sA-Z&$_\-]+$/;
    return charRegEx.test(param);
};

// isStringAlpha validates that param is alphanumeric string (chars/numbers only), including spaces.
export const isStringAlpha = (param: string): boolean => {
    const alphaNumericPattern = /^[a-z\sA-Z0-9-_-]+$/;
    return alphaNumericPattern.test(param);
};

export const isUsername = (param: string): boolean => {
    "use strict";
    const usernamePattern = /^([a-zA-Z0-9_])+$/; // alphanumeric, underscore, no space
    return usernamePattern.test(param);
};

export const isEmpty = (param: ValueType): boolean => {
    "use strict";
    return (param === "" || param === null || param === undefined ||
        typeof param === "object" && (Object.keys(param).length === 0 || Object.values(param).length === 0) ||
        (Array.isArray(param) && param.length === 0));
};

export const isEmail = (param: string): boolean => {
    const testPattern = /^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$/;
    // const testPattern = /^[0-9a-zA-Z]+([\-._][0-9a-zA-Z]+)*@[0-9a-zA-Z]+([\-.][0-9a-zA-Z]+)*([.])[a-zA-Z]{2,6}$/;
    return testPattern.test(param);
};

export const isPassword = (param: string): boolean => {
    const testPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{6,15}$/;
    return testPattern.test(param);
};

export const isPhone = (param: string): boolean => {
    const phonePattern = /^([1-9]{1,3})?[\-. ]?(\(\d{3}\)?[\-. ]?|\d{3}?[\-. ]?)?\d{3}?[\-. ]?\d{4}$/;
    return phonePattern.test(param);
};

// isPostalCode validate postal codes.
export const isPostalCode = (param: string): boolean => {
    const postCodePattern = /^[a-zA-Z0-9]*(\s)?[a-zA-Z0-9]*/;
    return postCodePattern.test(param);
};

// isName validate a given name as valid characters.
export const isName = (param: string): boolean => {
    const namePattern = /^[a-zA-Z"\-]+(\s[a-zA-Z"\-])*[a-zA-Z"\-]*/;   // Abi Charles Africa America
    return namePattern.test(param);
};

// isURL validate a URL as valid.
export const isURL = (param: string): boolean => {
    // Abi Charles Africa America
    const namePattern = /^[a-zA-Z0-9\-\\_.:]+$/;
    return namePattern.test(param);

};

export const isBusinessNumber = (param: string): boolean => {
    // business number format
    const bnPattern = /^[0-9\-]+$/;
    return bnPattern.test(param);
};

export const isStandardCode = (param: string): boolean => {
    // Product Group | Body & Soul10
    const standardCodePattern = /^[a-zA-Z0-9]+[&\s\-_]*[a-zA-Z0-9$#]*$/;
    return standardCodePattern.test(param);
};

export const isCountryCode = (param: string): boolean => {
    // langCode must be string of format en-US
    const countryCodePattern = /^[a-z]{2}-[A-Z]{2}$/;
    return countryCodePattern.test(param);
};

export const isLanguageCode = (param: string): boolean => {
    // langCode must be string of format en-US
    const langCodePattern = /^[a-z]{2}-[A-Z]{2}$/;
    return langCodePattern.test(param);
};

export const isWordSpace = (param: string): boolean => {
    // words with spaces and hyphens, no numbers
    const wordSpacePattern = /^[a-zA-Z0-9,()"._&]+[\s\-a-zA-Z0-9,()"._&]*[a-zA-Z0-9,()"._?]*$/;
    return wordSpacePattern.test(param);
};

export const isLabelCode = (param: string): boolean => {
    // firstName_middleName_lastName
    const labelCodePattern = /^[a-zA-Z]+[_\-a-zA-Z]*[_a-z0-9]*$/;
    return labelCodePattern.test(param);
};

export const isErrorCode = (param: string): boolean => {
    // error code format (AB10-100, AB900)
    const errorCodePattern = /^[a-zA-Z0-9]+-*[0-9]*$/;
    return errorCodePattern.test(param);
};

export const isPathName = (param: string) => {
    // mysite.new_base.nicelook
    const pathNamePattern = /^[a-zA-Z0-9/]+[_a-zA-Z0-9./]*[a-zA-Z0-9/]*$/;
    return pathNamePattern.test(param);
};

export const isNameNoSpace = (param: string): boolean => {
    // JohnPaul
    const nameNoSpacePattern = /[a-zA-Z]+/;
    return nameNoSpacePattern.test(param);
};

export const isDescription = (param: string): boolean => {
    "use strict";
    const descPattern = /^[a-zA-Z0-9\s\\.,:/()*_|\-!@#$%&]+$/; // Alphanumeric string with spaces, and
    // (.,:/()*_-|!@)
    return descPattern.test(param);
};

export const isCurrency = (param: string): boolean => {
    const currencyPattern = /^[a-zA-Z#$]+$/;
    return currencyPattern.test(param);
}

export const isSafeInteger = (n: number): boolean => {
    return (Math.round(n) === n &&
        Number.MIN_SAFE_INTEGER <= n &&
        n <= Number.MAX_SAFE_INTEGER);
}

/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-06-26 | @Updated: 2020-06-26
 * @Company: mConnect.biz | @License: MIT
 * @Description: common validation functions
 */

const isProvided = (param: any): boolean => {
    // Verify the Required status
    // Validate that the item is not empty / null / undefined
    return !(param === '' || param === null || param === undefined || Object.keys(param).length === 0);
};

const isEven = (num: number): boolean => {
    return Number.isFinite(num) && (num % 2 === 0);
};

const isOdd = (num: number): boolean => {
    return Number.isFinite(num) && (num % 2 !== 0);
};

const isNumberDigit = (num: number | string): boolean => {
    // Validate that param is a number (digit): 100 | 99 | 33 | 44 | 200
    const numberPattern = /^[0-9]+$/;
    return numberPattern.test(num.toString());
};

const isNumberFloat = (num: number): boolean => {
    // Validate that param is a number (float): 0.90 | 99.9 | 33.3 | 44.40
    const numberPattern = /^([0-9])+([.])?([0-9])*$/;
    return numberPattern.test(num.toString());
};

const isObjectType = (param: object): boolean => {
    "use strict";
    // Validate param is an object, {}
    return (typeof param === 'object' && !Array.isArray(param));
};

const isArrayType = (param: Array<any>): boolean => {
    "use strict";
    // Validate param is an object, []
    return Array.isArray(param);
};

const isStringChar = (param: string): boolean => {
    // Validate that param is a string (characters only) -- use regEx
    const charRegEx = /^[a-zA-Z&$_\-]+$/;
    return charRegEx.test(param);
};

const isStringAlpha = (param: string): boolean => {
    // Validate that param is a string (alphanumeric, chars/numbers only)
    const alphaNumericPattern = /^[a-zA-Z0-9-_-]+$/;
    return alphaNumericPattern.test(param);
};

const isUsername = (param: string): boolean => {
    "use strict";
    const usernamePattern = /^([a-zA-Z0-9_])+$/; // alphanumeric, underscore, no space
    return usernamePattern.test(param);
};

const isEmpty = (param: any): boolean => {
    "use strict";
    return (param === '' || param === null || param === undefined ||
        Object.keys(param).length === 0 ||
        (Array.isArray(param) && param.length === 0));
};

const isNull = (infoItem: any): boolean => {
    "use strict";
    return infoItem === null;
};

const isEmail = (param: string): boolean => {
    const testPattern = /^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$/;
    // const testPattern = /^[0-9a-zA-Z]+([\-._][0-9a-zA-Z]+)*@[0-9a-zA-Z]+([\-.][0-9a-zA-Z]+)*([.])[a-zA-Z]{2,6}$/;
    return testPattern.test(param);
};

const isPassword = (param: string): boolean => {
    const testPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{6,15}$/;
    return testPattern.test(param);
};

const isNumberOnRange = (num: number, min: number = 0, max: number = 0) => {
    if ((isNumberDigit(num) || isNumberFloat(num)) && (min < max)) {
        return (num >= min && num <= max)
    }
    return false;
};

const isPhone = (param: string): boolean => {
    const phonePattern = /^([1-9]{1,3})?[\-. ]?(\(\d{3}\)?[\-. ]?|\d{3}?[\-. ]?)?\d{3}?[\-. ]?\d{4}$/;
    return phonePattern.test(param);
};

const isPostalCode = (param: string): boolean => {
    const postCodePattern = /^[a-zA-Z0-9]+(\s)?[a-zA-Z0-9]*/;
    return postCodePattern.test(param);
};

const isPostalCodeUS = (param: string): boolean => {
    const postCodePattern = /^[a-zA-Z0-9]+(\s)?[a-zA-Z0-9]*/;
    return postCodePattern.test(param);
};

const isPostalCodeCanada = (param: string): boolean => {
    const postCodePattern = /^[a-zA-Z0-9]+(\s)?[a-zA-Z0-9]*/;
    return postCodePattern.test(param);
};

const isPostalCodeUK = (param: string): boolean => {
    const postCodePattern = /^[a-zA-Z0-9]+(\s)?[a-zA-Z0-9]*/;
    return postCodePattern.test(param);
};

const isName = (param: string): boolean => {
    const namePattern = /^[a-zA-Z'\-]+(\s[a-zA-Z'\-])*[a-zA-Z'\-]*/;   // Abi Charles Africa America
    return namePattern.test(param);
};

const isURL = (param: string): boolean => {
    // Abi Charles Africa America
    const namePattern = /^[a-zA-Z0-9\-\\_.:]+$/;
    return namePattern.test(param);

};

const isBusinessNumber = (param: string): boolean => {
    // business number format
    const bnPattern = /^[0-9\-]+$/;
    return bnPattern.test(param);
};

const isStandardCode = (param: string): boolean => {
    // Product Group | Body & Soul10
    const standardCodePattern = /^[a-zA-Z0-9]+[&\s\-_]*[a-zA-Z0-9$#]*$/;
    return standardCodePattern.test(param);
};

const isCountryCode = (param: string): boolean => {
    // langCode must be string of format en-US
    const countryCodePattern = /^[a-z]{2}-[A-Z]{2}$/;
    return countryCodePattern.test(param);
};

const isLanguageCode = (param: string): boolean => {
    // langCode must be string of format en-US
    const langCodePattern = /^[a-z]{2}-[A-Z]{2}$/;
    return langCodePattern.test(param);
};

const isWordSpace = (param: string): boolean => {
    // words with spaces and hyphens, no numbers
    const wordSpacePattern = /^[a-zA-Z0-9,()'._&]+[\s\-a-zA-Z0-9,()'._&]*[a-zA-Z0-9,()'._?]*$/;
    return wordSpacePattern.test(param);
};

const isLabelCode = (param: string): boolean => {
    // firstName_middleName_lastName
    const labelCodePattern = /^[a-zA-Z]+[_\-a-zA-Z]*[_a-z0-9]*$/;
    return labelCodePattern.test(param);
};

const isErrorCode = (param: string): boolean => {
    // error code format (AB10-100, AB900)
    const errorCodePattern = /^[a-zA-Z0-9]+[-]*[0-9]*$/;
    return errorCodePattern.test(param);
};

const isPathName = (param: string) => {
    // mysite.new_base.nicelook
    const pathNamePattern = /^[a-zA-Z0-9/]+[_a-zA-Z0-9./]*[a-zA-Z0-9/]*$/;
    return pathNamePattern.test(param);
};

const isNameNoSpace = (param: string): boolean => {
    // JohnPaul
    const nameNoSpacePattern = /[a-zA-Z]+/;
    return nameNoSpacePattern.test(param);
};

const isDescription = (param: string): boolean => {
    "use strict";
    const descPattern = /^[a-zA-Z0-9\s\\.,:/()*_|\-!@#$%&]+$/; // Alphanumeric string with spaces, and
    // (.,:/()*_-|!@)
    return descPattern.test(param);
};

const isCurrency = (param: string): boolean => {
    const currencyPattern = /^[a-zA-Z#$]+$/;
    return currencyPattern.test(param);
};

const isSafeInteger = (n: number): boolean => {
    return (Math.round(n) === n &&
        Number.MIN_SAFE_INTEGER <= n &&
        n <= Number.MAX_SAFE_INTEGER);
};

export {
    isProvided,
    isEven,
    isOdd,
    isNumberDigit,
    isNumberFloat,
    isObjectType,
    isArrayType,
    isStringAlpha,
    isStringChar,
    isUsername,
    isEmpty,
    isNull,
    isEmail,
    isPassword,
    isNumberOnRange,
    isPhone,
    isPostalCode,
    isPostalCodeCanada,
    isPostalCodeUK,
    isPostalCodeUS,
    isName,
    isURL,
    isPathName,
    isBusinessNumber,
    isCountryCode,
    isCurrency,
    isDescription,
    isErrorCode,
    isLabelCode,
    isLanguageCode,
    isNameNoSpace,
    isStandardCode,
    isWordSpace,
    isSafeInteger,
};

/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-11
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: get default / user language
 */

 export const getLanguage = (userLang: string = 'en-US'): string => {
    // Define/set default language variable
    let defaultLang = 'en-US';
    // Set defaultLang to current userLang, set from the UI
    if (userLang) {
        defaultLang = userLang;
    }
    return defaultLang;
};

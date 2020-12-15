/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-14
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-central-ts: testing module functions
 */
declare type TestFunction = () => void;
interface OptionValue {
    name?: string;
    testFunc?: TestFunction;
    before?: string;
    after?: string;
}
export declare function delay(ms: number): Promise<unknown>;
export declare function assertEquals(expr: any, result: any, message?: string): string;
export declare function assertNotEquals(expr: any, result: any, message?: string): string;
export declare function assertStrictEquals(expr: any, result: any, message?: string): string;
export declare function assertNotStrictEquals(expr: any, result: any, message?: string): string;
export declare function mcTest(options: OptionValue): Promise<void>;
export declare function postTestResult(): Promise<void>;
export {};

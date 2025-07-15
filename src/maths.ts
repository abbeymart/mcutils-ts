import { ArrayOfNumber, ArrayOfString, ArrayOfSymbol, ArrayValue, CounterType, CounterValueType } from "./types";

/**
 * leapYear determines if the given year(e.g. 2000) is a leap year, i.e. February day === 29.
 * @param year
 * @return boolean
 */
export const leapYear = (year: number): boolean => {
    // by setting the day to the 29th and checking if the day remains
    // Providing a day value of zero for the next month(2-for-March) gives you the previous month's(1-for-Feb) last day
    const febDate = new Date(year, 2, 0);
    // year%4 == 0 && (year%100 != 0 || year%400 == 0)
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) || febDate.getDate() === 29;
}

/**
 * factorialTail function generates factorial value,using tail call optimization.
 * @param num - maximum number to compute factorial
 * @param acc - accumulator value should be set to 1 (default) to compute factorial
 * @return number
 */
export const factorialTail = (num: number, acc = 1): number => {
    if (acc < 1) {
        acc = 1
    }
    if (num <= 1) {
        return acc
    }
    // using the tail call optimization
    return factorialTail(num - 1, num * acc)
}

/**
 * factorialSeries function generates factorial value, using number-series, no recursion.
 * @param num
 * @return number
 */
export const factorialSeries = (num: number): number => {
    let result = 1;
    for (let val = 1; val < num + 1; val++) {
        result *= val;
    }
    return result;
}

/**
 * factNumGen generates factorial numbers up to the specified limit (num).
 * @param num
 * @yield
 */
export function* factNumGen(num: number) {
    let x: number;
    for (x = 1; x <= num; x++) {
        yield x;
    }
}

/**
 * factorialFromNumGen use the factorial numbers generator function, no recursion
 * @param num
 * @return number
 */
export function factorialFromNumGen(num: number): number {
    let result = 1;
    for (const val of factNumGen(num)) {
        result *= val;
    }
    return result;
}

/**
 * fibos returns the fibo series, as array of numbers.
 * @param num
 * @return Array<number>
 */
export function fibos(num: number): Array<number> {
    // set the first-two items => [1, 1]
    const fiboArray: Array<number> = [1, 1];
    let i = 2
    while (i < num) {
        const prev = fiboArray[fiboArray.length - 1];
        const prev2 = fiboArray[fiboArray.length - 2];
        fiboArray.push(prev + prev2)
        i++
    }
    return fiboArray
}

/**
 * fiboTail returns the last value of the fibonacci series, using tail call optimization.
 * The starting values of current and next are optional - should be set to 0 & 1 (default) - TODO: review/test
 * @param num
 * @param current
 * @param next
 * @return number
 */
export const fiboTail = (num: number, current = 0, next = 1): number => {
    if (num === 0) {
        return current;
    }
    // use the tail call optimization
    return fiboTail(num - 1, next, current + next);
}

/**
 * fiboArray returns each fibo item as an Array of [current, next].
 */
export const fiboArray = (num: number): Array<Array<number>> => {
    // no recursion, memoization using array
    let a = 0, b = 1;
    const result: Array<Array<number>> = [];
    for (let i = 0; i < num; i++) {
        const bTempValue = b;
        b = a + b;
        a = bTempValue;
        result.push([a, b]);
    }
    return result;
}

/**
 * fiboSeriesGen returns the fibo series, one at a time.
 */
export function* fiboSeriesGen(num: number) {
    // initial pairs / values
    let a = 0, b = 1;
    let i = 0;
    while (i < num) {
        yield b;
        const bVal = b;
        b = a + b;
        a = bVal;
        i++
    }
}

/**
 * naturalNumbers generator-function yields/generates count natural numbers, from 0.
 */
export function* naturalNumbers(count: number) {
    for (let cnt = 0; cnt < count; cnt++) {
        yield cnt;
    }
}

/**
 * positiveNumbers generator-function yields/generates count natural numbers, from 1.
 */
export function* positiveNumbers(count: number) {
    for (let cnt = 1; cnt <= count; cnt++) {
        yield cnt;
    }
}

/**
 * primeNumbers returns the prime numbers from 2 up to num.
 * prime number is a number that's only divisible by itself.
 */
export const primeNumbers = (num: number): Array<number> => {
    const pNums: Array<number> = [];
    next:
        for (let outer = 2; outer <= num; outer++) {
            for (let inner = 2; inner < outer; inner++) {
                if (outer % inner == 0) {
                    continue next;
                }
            }
            pNums.push(outer);
        }
    return pNums;
}

/**
 * isPrime determines if the specified number is a prime number.
 */
export const isPrime = (n: number): boolean => {
    // prime number count algorithm condition
    const s = Math.floor(Math.sqrt(n));
    //Perform remainder of n for all numbers from 2 to s(short-algorithm-value)/n-1
    for (let x = 2; x <= s; x++) {
        if (n % x == 0) {
            return false;
        }
    }
    return n > 1;
}

/**
 * reverseArray generic function reverses the Array of numbers and string.
 */
export const reverseArray = <T>(arr: Array<T>): Array<T> => {
    const revArray: Array<T> = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        revArray.push(arr[i]);
    }
    return revArray;
}

/**
 * reverseArrayGen generic generator function returns the array item, on at a time, in reverse order.
 */
export function* reverseArrayGen<T>(arr: Array<T>) {
    for (let i = arr.length - 1; i >= 0; i--) {
        yield arr[i];
    }
}

/**
 * pythagoras function returns all the arrays(Array<Array>) of a regular pythagoras [base, adjacent, hypothenus].
 */
export const pythagoras = (limit: number): Array<Array<number>> => {
    const pResult: Array<Array<number>> = [];
    let a: number, b: number;
    for (a = 1; a <= limit; a++) {
        for (b = a; b <= limit; b++) {
            const itemSqrt = Math.sqrt(a * a + b * b);
            if (itemSqrt % 1.00 === 0 || itemSqrt % 1.00 === 0.00) {
                pResult.push([a, b, itemSqrt]);
            }
        }
    }
    return pResult;
}

/**
 * pythagorasGen generator function returns series of the array value (<Array> of a regular pythagoras [base, adjacent, hypothenus].
 */
export function* pythagorasGen(limit: number): Generator<Array<number>> {
    let a: number, b: number;
    for (a = 1; a <= limit; a++) {
        for (b = a; b <= limit; b++) {
            const itemSqrt = Math.sqrt(a * a + b * b);
            if (itemSqrt % 1.00 == 0 || itemSqrt % 1.00 == 0.00) {
                yield [a, b, itemSqrt];
            }
        }
    }
}

/**
 * counterGeneric supports types - number, string and symbol only.
 */
export const counterGeneric = (values: ArrayValue<CounterValueType>): CounterType => {
    const counterObject: CounterType = {};
    for (const val of values) {
        // val = (typeof val !== "object"? JSON.stringify(val) : val) as T;
        if (counterObject[val]) {
            counterObject[val] += +1
        } else {
            counterObject[val] = 1
        }
    }
    return counterObject;
}

export type SetValueType = string | number | boolean | symbol;

/**
 * set returns unique array values
 */
export const set = <T extends SetValueType>(values: ArrayValue<T>): Array<T> => {
    const setValue: Array<T> = [];
    for (const it of values) {
        // const itExist = setValue.indexOf(it);
        // if (itExist === -1) {
        //     setValue.push(it);
        // }
        if (!setValue.includes(it)) {
            setValue.push(it);
        }
    }
    // console.log("set-values: ", setValue);
    return setValue
}

export const setOfString = (values: ArrayOfString): ArrayOfString => {
    const setValue: ArrayOfString = [];
    for (const it of values) {
        if (!setValue.includes(it)) {
            setValue.push(it);
        }
    }
    return setValue
}

export const setOfNumber = (values: ArrayOfNumber): ArrayOfNumber => {
    const setValue: ArrayOfNumber = [];
    for (const it of values) {
        if (!setValue.includes(it)) {
            setValue.push(it);
        }
    }
    return setValue
}

export const setOfSymbol = (values: ArrayOfSymbol): ArrayOfSymbol => {
    const setValue: ArrayOfSymbol = [];
    for (const it of values) {
        if (!setValue.includes(it)) {
            setValue.push(it);
        }
    }
    return setValue
}

export const sumOfArrayAcc = (values: Array<number>, accumulator = 0): number => {
    if (values.length === 0) return accumulator;
    const [head, ...tail] = values;
    return head ? sumOfArrayAcc(tail, head + accumulator) : accumulator;
}

export const sumOfArray = (values: Array<number>): number => {
    let sum = 0
    for (const value of values) {
        sum += value
    }
    return sum;
}

export const multiplyArray = (values: Array<number>): number => {
    let multi = 1
    for (const value of values) {
        multi *= value
    }
    return multi;
}

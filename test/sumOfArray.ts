import { sumOfArray } from "../src";

const arrValue = [1, 2, 3, 4, 5]

const startTime = Date.now();
const sumValue = sumOfArray(arrValue);
console.log("result: ", sumValue);
console.log("elapsed: ", Date.now() - startTime);

const startTime2 = Date.now();
const sumValue2 = arrValue.reduce((a, b) => a + b);
console.log("result-reduce: ", sumValue2);
console.log("elapsed: ", Date.now() - startTime2);

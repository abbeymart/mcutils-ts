import { multiplyArray, sumOfArrayAcc, sumOfArray } from "../src";

const arrValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const startTime = Date.now();
const sumValue = sumOfArrayAcc(arrValue);
console.log("sum-result-sumOfArray: ", sumValue);
console.log("elapsed-time(ms): \n", Date.now() - startTime);

const startTime0 = Date.now();
const sumValue0 = sumOfArray(arrValue);
console.log("sum-result-sumOfArray2: ", sumValue0);
console.log("elapsed-time(ms): \n", Date.now() - startTime0);

const startTime01 = Date.now();
const multiValue01 = multiplyArray(arrValue);
console.log("sum-result-multiplyArray: ", multiValue01);
console.log("elapsed-time(ms): \n", Date.now() - startTime01);

const startTime2 = Date.now();
const sumValue2 = arrValue.reduce((a, b) => a + b);
console.log("sum-result-reduce: ", sumValue2);
console.log("elapsed-time(ms): \n", Date.now() - startTime2);

const startTime3 = Date.now();
const multiValue3 = arrValue.reduce((a, b) => a * b);
console.log("multiply-result-reduce: ", multiValue3);
console.log("elapsed-time(ms): \n", Date.now() - startTime3);

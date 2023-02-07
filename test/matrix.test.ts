import {
    assertEquals, assertNotEquals, mcTest, postTestResult,
} from "@mconnect/mctest";
import { sampleStandardDeviation } from "../src";
import {
    arrayOfNumber, stdDeviationResultEst,
} from "./data/testData";

(async () => {
    const startTime = Date.now();

    await mcTest({
        name    : "Successfully returns standard-deviation, rounded to 5 decimal places, result",
        testFunc: () => {
            const result = sampleStandardDeviation(arrayOfNumber, 5);
            const resultEst = Number(result.toFixed(5));
            console.log("standardDeviation-Res: ", resultEst);
            assertEquals(resultEst, stdDeviationResultEst, `Expected outcome: ${stdDeviationResultEst}`);
            assertNotEquals(resultEst, 1, `Expected outcome: ${stdDeviationResultEst}`);
        },
    });

    // addMatrices


    // addMultiMatrices


    // subMatrices


    // subMultiMatrices


    // addScalarMatrix


    // subScalarMatrix


    // multiScalarMatrix


    // divScalarMatrix


    // transposeMatrix


    // multiMatrix


    // multiMatrices


    await postTestResult();

    console.log(`\nTest Completed in ${Date.now() - startTime}ms\n`);
})();

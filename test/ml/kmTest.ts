import {KMeans, KMeansAutoSolver} from "../../src/ml/kmeans";
import { example3d3k, example2dnk, example2d3k, exampleRandomCentroids } from './data/kmeans';

console.log("\nML in JS Chapter 4 k-means clustering examples.");
console.log("===============================================\n");

////////////////////////////////////////////////////////////////

console.log("Testing centroid generation:");
console.log("===============================================\n");

const exRandomCentroidsSolver = new KMeans(2, exampleRandomCentroids);

console.log("Randomly initialized centroids: ");
console.log(exRandomCentroidsSolver.centroids);
console.log("\n-----------------------------------------------\n\n");

////////////////////////////////////////////////////////////////

console.log("Solving example: 2d data with 3 clusters:");
console.log("===============================================\n");


console.log("Solution for 2d data with 3 clusters:");
console.log("-------------------------------------");
const ex1Solver = new KMeans(3, example2d3k);
const ex1Centroids = ex1Solver.solve();
console.log(ex1Centroids);
console.log("");

console.log("Iteration log for 2d data with 3 clusters:");
console.log("------------------------------------------");
ex1Solver.iterationLogs.forEach(log => console.log(log));
console.log("");

console.log("Test 2d data with 3 clusters five times:");
console.log("----------------------------------------");
for (let i = 0; i < 5; i++) {
    ex1Solver.reset();
    const solution = ex1Solver.solve();
    console.log(solution);
}
console.log("");

///////////////////////////////////////////////////////////////////

console.log("Solving example: 3d data with 3 clusters:");
console.log("===============================================\n");
console.log("Solution for 3d data with 3 clusters:");
console.log("-------------------------------------");
const ex2Solver = new KMeans(3, example3d3k);
const ex2Centroids = ex2Solver.solve();
console.log(ex2Centroids);
console.log("");

//////////////////////////////////////////////////////////
console.log("Solving example: 2d data with unknown clusters:");
console.log("===============================================\n");
console.log("Solution for 2d data with unknown clusters:");
console.log("-------------------------------------");
const ex_3_solver = new KMeansAutoSolver(1, 30, 5, example2dnk);
const ex_3_solution = ex_3_solver.solve();
console.log(ex_3_solution);

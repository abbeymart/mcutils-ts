import { ObjectType } from "../types";
import { distance, mean } from "../stats";
import { isEmptyObject } from "../utilFuncs";

export interface IterationLog {
    centroids?: Array<Array<number>>;
    iteration?: number;
    error?: number;
    didReachSteadyState?: boolean;
    k?: number;
    currentTrial?: number;
}

export type IterationLogs = Array<IterationLog>

export interface MinMaxType {
    min: number;
    max: number;
}

/**
 * @class
 * Determines "k" cluster centroids given a list of points,
 * using the k-means algorithm.
 *
 * Basic usage:
 *
 *     const numberOfCentroids = 3;
 *     const arrayOfDataPoints = [ [1, 2], [3, 3], ... ];
 *     const maxAllowedIterations = 1000;
 *     const kMeansSolver = new KMeans(numberOfCentroids, arrayOfDataPoints);
 *     const {centroids, iteration, error, didReachSteadyState} = kMeansSolver.solve(maxAllowedIterations);
 *     // Reset the solver if you wish to run it again:
 *     kMeansSolver.reset();
 *     // Inspect iteration logs to debug:
 *     console.log(kMeansSolver.iterationLogs)
 *
 * All data points given to this algorithm must have the same number of dimensions;
 * For instance, you can not mix 2D points with 3D points.
 */
export class KMeans {
    private readonly k: number;
    private readonly data: Array<Array<number>>;
    private error: number;
    private iterations: number;
    iterationLogs: IterationLogs;
    public centroids: Array<Array<number>>;
    private centroidAssignments: Array<number>;

    /**
     * @constructor
     * @param k number
     * @param data Array<number>
     */
    constructor(k: number, data: Array<Array<number>>) {
        this.k = k;
        this.data = data;
        // reset params
        this.error = 0;
        this.iterations = 0;
        this.iterationLogs = [];
        this.centroids = this.initRandomCentroids();
        this.centroidAssignments = [];
    }

    /**
     * @method
     * Resets the solver state; use this if you wish to run the
     * same solver instance again with the same data points
     * but different initial conditions.
     */
    reset() {
        this.error = 0;
        this.iterations = 0;
        this.iterationLogs = [];
        this.centroids = this.initRandomCentroids();
        this.centroidAssignments = [];
    }

    /**
     * @method
     * Determines the number of dimensions in the data set.
     * @return {number}
     */
    getDimensionality(): number {
        const point = this.data[0];
        return point.length;
    }

    /**
     * @method
     * For a given dimension in the data set, determine the minimum
     * and maximum value. This is used during random initialization
     * to make sure the random centroids are in the same range as
     * the data.
     *
     * @param n number
     * @returns {MinMaxType}
     */
    getRangeForDimension(n: number): MinMaxType {
        const values = this.data.map(point => point[n]);
        return {
            min: Math.min.apply(null, values),
            max: Math.max.apply(null, values)
        };
    }

    /**
     * @method
     * Get ranges for all dimensions.
     * @see getRangeForDimension
     * @returns {Array} Array whose indices are the dimension number and whose members are the output of getRangeForDimension
     */
    getAllDimensionRanges(): Array<MinMaxType> {
        const dimensionRanges: Array<MinMaxType> = [];
        const dimensionality = this.getDimensionality();

        for (let dimension = 0; dimension < dimensionality; dimension++) {
            dimensionRanges[dimension] = this.getRangeForDimension(dimension);
        }

        return dimensionRanges;

    }

    /**
     * @method
     * Initializes random centroids, using the ranges of the data
     * to set minimum and maximum bounds for the centroids.
     * You may inspect the output of this method if you need to debug
     * random initialization, otherwise this is an internal method.
     * @see getAllDimensionRanges
     * @see getRangeForDimension
     * @returns {Array}
     */
    initRandomCentroids(): Array<Array<number>> {
        const dimensionality = this.getDimensionality();
        const dimensionRanges = this.getAllDimensionRanges();
        const centroids = [];

        // We must create 'k' centroids.
        for (let i = 0; i < this.k; i++) {

            // Since each dimension has its own range, create a placeholder at first
            let point = [];

            /**
             * For each dimension in the data find the min/max range of that dimension,
             * and choose a random value that lies within that range.
             */
            for (let dimension = 0; dimension < dimensionality; dimension++) {
                const {min, max} = dimensionRanges[dimension];
                point[dimension] = min + (Math.random() * (max - min));
            }
            centroids.push(point);
        }
        return centroids;
    }

    /**
     * @method
     * Given a point in the data to consider, determine the closest
     * centroid and assign the point to that centroid.
     * The return value of this method is a boolean which represents
     * whether the point's centroid assignment has changed;
     * this is used to determine the termination condition for the algorithm.
     * @param pointIndex  number
     * @returns {boolean} Did the point change its assignment?
     */
    assignPointToCentroid(pointIndex: number): boolean {

        const lastAssignedCentroid = this.centroidAssignments[pointIndex];
        const point = this.data[pointIndex];
        let minDistance = null;
        let assignedCentroid = null;

        for (let i = 0; i < this.centroids.length; i++) {
            const centroid = this.centroids[i];
            const distanceToCentroid = distance(point, centroid);

            if (minDistance === null || distanceToCentroid < minDistance) {
                minDistance = distanceToCentroid;
                assignedCentroid = i;
            }

        }
        if (assignedCentroid) {
            this.centroidAssignments[pointIndex] = assignedCentroid;
        }

        return lastAssignedCentroid !== assignedCentroid;

    }

    /**
     * @method
     * For all points in the data, call assignPointsToCentroids
     * and returns whether _any_ point's centroid assignment has
     * been updated.Was any point's centroid assignment updated?
     *
     * @see assignPointToCentroid
     * @returns {boolean}
     */
    assignPointsToCentroids(): boolean {
        let didAnyPointsGetReassigned = false;
        for (let i = 0; i < this.data.length; i++) {
            const wasReassigned = this.assignPointToCentroid(i);
            if (wasReassigned) didAnyPointsGetReassigned = true;
        }
        return didAnyPointsGetReassigned;
    }

    /**
     * @method
     * Given a centroid to consider, returns an array
     * of all points assigned to that centroid.
     *
     * @param centroidIndex number
     * @returns {Array}
     */
    getPointsForCentroid(centroidIndex: number): Array<Array<number>> {
        const points: Array<Array<number>> = [];
        for (let i = 0; i < this.data.length; i++) {
            const assignment = this.centroidAssignments[i];
            if (assignment === centroidIndex) {
                points.push(this.data[i]);
            }
        }
        return points;
    }

    /**
     * @method
     * Given a centroid to consider, update its location to
     * the mean value of the positions of points assigned to it.
     * @see getPointsForCentroid
     * @see getDimensionality
     * @param centroidIndex
     * @returns {Array}
     */
    updateCentroidLocation(centroidIndex: number): Array<number> {
        const thisCentroidPoints = this.getPointsForCentroid(centroidIndex);
        const dimensionality = this.getDimensionality();
        const newCentroid: Array<number> = [];
        for (let dimension = 0; dimension < dimensionality; dimension++) {
            newCentroid[dimension] = mean(thisCentroidPoints.map(point => point[dimension]));
        }
        this.centroids[centroidIndex] = newCentroid;
        return newCentroid;
    }

    /**
     * @method
     * For all centroids, call updateCentroidLocation
     */
    updateCentroidLocations() {
        for (let i = 0; i < this.centroids.length; i++) {
            this.updateCentroidLocation(i);
        }
    }

    /**
     * @method
     * Calculates the total "error" for the current state
     * of centroid positions and assignments.
     * Here, error is defined as the root-mean-squared distance
     * of all points to their centroids.
     * @returns {Number}
     */
    calculateError(): number {

        let sumDistanceSquared = 0;
        for (let i = 0; i < this.data.length; i++) {
            const centroidIndex = this.centroidAssignments[i];
            const centroid = this.centroids[centroidIndex];
            const point = this.data[i];

            // Un-comment this one to do a purely geometrical error calculation
            // const thisDistance = distance(point, centroid);

            // This version also considers the number of clusters; helpful for
            // our auto-solver so that it doesn't over-fit.
            const thisDistance = distance(point, centroid) + this.k;
            sumDistanceSquared += thisDistance * thisDistance;
        }

        this.error = Math.sqrt(sumDistanceSquared / this.data.length);
        return this.error;
    }

    /**
     * @method
     * Run the k-means algorithm until either the solver reaches steady-state,
     * or the maxIterations allowed has been exceeded.
     * You are most likely interested in the centroids property of the output.
     * @see IterationLog
     * @param maxIterations {number} Default 1000
     * @returns {IterationLog}
     */
    solve(maxIterations = 1000): IterationLog {

        while (this.iterations < maxIterations) {

            const didAssignmentsChange = this.assignPointsToCentroids();
            this.updateCentroidLocations();
            this.calculateError();

            this.iterationLogs[this.iterations] = {
                centroids          : [...this.centroids],
                iteration          : this.iterations,
                error              : this.error,
                didReachSteadyState: !didAssignmentsChange
            };

            if (!didAssignmentsChange) {
                break;
            }

            this.iterations++;

        }

        return this.iterationLogs[this.iterationLogs.length - 1];

    }


}

/**
 * @class
 */
export class KMeansAutoSolver {
    private readonly kMin: number;
    private readonly kMax: number;
    private readonly maxTrials: number;
    private readonly data: Array<Array<number>>;
    private best: IterationLog;
    protected log: Array<IterationLog>;

    /**
     * @constructor
     * @param kMin
     * @param kMax
     * @param maxTrials
     * @param data
     */
    constructor(kMin = 1, kMax = 5, maxTrials = 5, data: Array<Array<number>>) {
        this.kMin = kMin;
        this.kMax = kMax;
        this.maxTrials = maxTrials;
        this.data = data;
        this.best = {};
        this.log = [];
        // this.reset();
    }

    /**
     * @method
     */
    reset() {
        this.best = {};
        this.log = [];
    }

    /**
     * @method
     * @param maxIterations number Default - 1000
     */
    solve(maxIterations = 1000): IterationLog {

        for (let k = this.kMin; k < this.kMax; k++) {

            for (let currentTrial = 0; currentTrial < this.maxTrials; currentTrial++) {

                const solver = new KMeans(k, this.data);
                // Add k and currentTrial number to the solution before logging
                const solution: IterationLog = Object.assign({}, solver.solve(maxIterations), {k, currentTrial});
                this.log.push(solution);

                if (isEmptyObject(this.best as unknown as ObjectType) || (solution.error && this.best?.error && solution.error < this.best.error)) {
                    this.best = solution as unknown as ObjectType;
                }
            }
        }

        return this.best;

    }
}

import Population from "./population.js";
import GeneticAlgorithm from "./algorithm.js";
import { TARGET } from "./target.js";

const INDIVIDUAL_SIZE = TARGET.length;
const POPULATION_SIZE: number = 100;

const p = new Population(INDIVIDUAL_SIZE, POPULATION_SIZE);
const algo = new GeneticAlgorithm(p.population);

console.log(algo.selection());

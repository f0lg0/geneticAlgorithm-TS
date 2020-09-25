import Population from "./population.js";
import GeneticAlgorithm from "./algorithm.js";
import printPopulation from "./printPopulation.js";

const POPULATION_SIZE: number = 100;
const p = new Population(POPULATION_SIZE);
const initialIndividual = p.population[0].INDIVIDUAL;

let generationNumber = 0;

while (1) {
    printPopulation(p.population.reverse(), generationNumber);

    if (p.population[0].FITNESS >= 1) {
        break;
    }

    GeneticAlgorithm.evolve(p);
    generationNumber++;
}

console.log("Simulation terminated, target reached");
console.log(
    "Fittest individual:",
    p.population[0].INDIVIDUAL,
    "started from",
    initialIndividual
);

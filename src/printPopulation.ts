import Individual from "./individual.js";
import { TARGET } from "./target.js";

export default function printPopulation(
    pop: Array<Individual>,
    genNumber: number
) {
    console.log("==========================================================");
    console.log(
        "Generation #",
        genNumber,
        "| Fittest individual fitness: ",
        pop[0].FITNESS
    );
    console.log("Target phrase:", TARGET);
    console.log("==========================================================");

    for (const individual of pop) {
        console.log(individual.INDIVIDUAL);
    }

    console.log("\n");
}

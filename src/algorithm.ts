import Individual from "./individual.js";
import Population from "./population.js";
import { TARGET } from "./target.js";
import { KEYS } from "./keys.js";

const TOURNAMENT_POP_SIZE = 40;
const MUTATION_RATE = 0.1;

class GeneticAlgorithm {
    static selection(pop: Population) {
        const population = pop.population;

        let tournament_pop = new Population(0);

        let i = 0;
        while (i < TOURNAMENT_POP_SIZE) {
            tournament_pop.population.push(
                population[Math.floor(Math.random() * population.length)]
            );
            i++;
        }

        tournament_pop.population.sort((a, b) =>
            a.FITNESS > b.FITNESS ? 1 : b.FITNESS > a.FITNESS ? -1 : 0
        );

        return tournament_pop;
    }

    static reproduction(pop: Population) {
        for (let i = 0; i < pop.population.length; i++) {
            const partnerA = this.selection(pop).population.reverse()[0];
            const partnerB = this.selection(pop).population.reverse()[1];

            const child = this.crossover(partnerA, partnerB);

            pop.population[i] = child;
        }

        this.mutate(pop);
    }

    static crossover(parentA: Individual, parentB: Individual) {
        const child = new Individual();

        const midpoint = Math.floor(Math.random() * TARGET.length);

        const half1 = parentA.DNA.slice(0, midpoint);
        const half2 = parentB.DNA.slice(midpoint);

        const newDNA = half1.concat(half2);
        child.modifyDNA(newDNA);

        return child;
    }
    static mutate(pop: Population) {
        for (const individual of pop.population) {
            if (Math.floor(Math.random()) <= MUTATION_RATE) {
                individual.modifySingleDNAGene(
                    Math.floor(Math.random() * TARGET.length),
                    KEYS.charAt(Math.floor(Math.random() * KEYS.length))
                );
            }
        }
    }

    static evolve(pop: Population) {
        this.reproduction(pop);
    }
}

export default GeneticAlgorithm;

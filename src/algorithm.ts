import Individual from "./individual.js";

class GeneticAlgorithm {
    private target_population: Array<Individual>;
    private TOURNAMENT_POP_SIZE = 40;

    constructor(pop: Array<Individual>) {
        this.target_population = pop;
    }

    selection() {
        let tournament_pop: Array<Individual> = [];

        let i = 0;
        while (i < this.TOURNAMENT_POP_SIZE) {
            tournament_pop.push(
                this.target_population[
                    Math.floor(Math.random() * this.target_population.length)
                ]
            );
            i++;
        }

        tournament_pop.sort((a, b) =>
            a.FITNESS > b.FITNESS ? 1 : b.FITNESS > a.FITNESS ? -1 : 0
        );
        return tournament_pop.reverse();
    }
}

export default GeneticAlgorithm;

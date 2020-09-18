import Individual from "./individual.js";

class Population {
    private pop: Array<Individual> = [];

    constructor(ind_size: number, pop_size: number) {
        for (let i = 0; i < pop_size; i++) {
            this.pop.push(new Individual(ind_size));
        }
    }

    get population() {
        return this.pop;
    }
}

export default Population;

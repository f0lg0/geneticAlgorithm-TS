import Individual from "./individual.js";

class Population {
    private pop: Array<Individual> = [];

    constructor(pop_size: number) {
        for (let i = 0; i < pop_size; i++) {
            this.pop.push(new Individual());
        }
    }

    get population() {
        return this.pop;
    }
}

export default Population;

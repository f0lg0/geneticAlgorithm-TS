import { TARGET } from "./target.js";
import { KEYS } from "./keys.js";

class Individual {
    private dna: Array<string>;
    private fitness: number;
    private score: number;

    constructor() {
        this.dna = this.generateDNA();
        this.fitness = 0;
        this.score = 0;

        this.calculateFitness();
    }

    generateDNA() {
        let result: Array<string> = [];
        for (let i = 0; i < TARGET.length; i++) {
            result.push(KEYS.charAt(Math.floor(Math.random() * KEYS.length)));
        }

        return result;
    }

    modifyDNA(newDNA: Array<string>) {
        this.dna = newDNA;
        return true;
    }

    modifySingleDNAGene(index: number, newGene: string) {
        this.dna[index] = newGene;
        return true;
    }

    calculateFitness() {
        this.score = 0;

        for (let i = 0; i < TARGET.length; i++) {
            if (this.dna[i] === TARGET[i]) this.score++;
        }

        this.fitness = this.score / TARGET.length;
        return this.fitness;
    }

    get INDIVIDUAL() {
        return this.dna.join("");
    }

    get DNA() {
        return this.dna;
    }

    get FITNESS() {
        this.calculateFitness();
        return this.fitness;
    }
}

export default Individual;

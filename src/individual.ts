import { TARGET } from "./target.js";
const KEYS = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ";

class Individual {
    private dna: Array<string>;
    private fitness: number;
    private score: number;

    constructor(size: number) {
        this.dna = this.generateDNA(size);
        this.fitness = 0;
        this.score = 0;

        this.calculateFitness(TARGET);
    }

    generateDNA(size: number) {
        let result: Array<string> = [];
        for (let i = 0; i < size; i++) {
            result.push(KEYS.charAt(Math.floor(Math.random() * KEYS.length)));
        }

        return result;
    }

    calculateFitness(target: string) {
        for (let i = 0; i < target.length; i++) {
            if (this.dna[i] === target[i]) this.score++;
        }

        this.fitness = this.score / target.length;
        return this.fitness;
    }

    get INDIVIDUAL() {
        return this.dna.join("");
    }

    get DNA() {
        return this.dna;
    }

    get FITNESS() {
        return this.fitness;
    }
}

export default Individual;

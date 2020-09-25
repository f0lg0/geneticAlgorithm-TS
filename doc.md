# Documentation

The simulation starts with a randomly generated `Population` of `Individuals` represented by strings with random characters and the goal is to reach a `target` word or phrase:

```
==========================================================
Generation # 0 | Fittest individual fitness:  0
Target phrase: Genetic Algorithm in TS
==========================================================
SncNvertFeJQjPuXOcZ xfe
EhiZBXslUuvqwTYOXnpsTxX
YQUZGUMBjYwvtsTgGiTNbeF
xCTMVEcUmgWhYfBX FrLHQr

...

```

The Individuals have to `mutate` their `DNA` in order to replicate the `Target`. This is done entirely with a specific algorithm called [Genetic Algorithm](https://en.wikipedia.org/wiki/Genetic_algorithm).

It replicates nature and natural selection: the individuals will `reproduce` and `transmit` their DNA (or `genes`) to their children. This way a new `Individual` is born with genetic material coming from 2 `parents`.

Of course, natural selection will pick the `fittest` individuals and make them have kids.

The `fitness` is a score that every individual gets based on how similar is their genetic material to the target one.

Every time a `cicle` of reproduction ends, a new `generation` of individuals is born; based of course on previous reproduction.

This goes on until at least one individual reaches the target:

```

==========================================================
Generation # 55 | Fittest individual fitness:  1
Target phrase: Genetic Algorithm in TS
==========================================================
Genetic Algorithm in TS
GenetiD Algorithm in TS
GenStic Algorithm in TS
Genetic AlgoriLhm in TS
Genetic Algorqthm in TS

...

```

## The actual code

### Target

```typescript
export const TARGET: string = "Genetic Algorithm in TS";
```

### Keys

These are all of the possible chars that can make up an individual's DNA

```typescript
export const KEYS: string =
    "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ";
```

### Individuals

Their genetic material is initially generated randomly

```typescript

    generateDNA() {
        let result: Array<string> = [];
        for (let i = 0; i < TARGET.length; i++) {
            result.push(KEYS.charAt(Math.floor(Math.random() * KEYS.length)));
        }

        return result;
    }

```

And their `fitness` is calculated based on how many genes are similar to the target ones.

```typescript

    calculateFitness() {
        this.score = 0;

        for (let i = 0; i < TARGET.length; i++) {
            if (this.dna[i] === TARGET[i]) this.score++;
        }

        this.fitness = this.score / TARGET.length;
        return this.fitness;
    }

```

### Population

A population is an array of individuals

```typescript
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
```

### The Algo

We set a size for the [Tournament Population](https://en.wikipedia.org/wiki/Tournament_selection) which is a random collection of selected individuals.

```typescript
const TOURNAMENT_POP_SIZE = 40;
```

Then we actually create this Tournament to pick individuals in order to make them reproduce.

```typescript
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
```

Once we have selected them we make them reproduce by using the [Crossover](<https://en.wikipedia.org/wiki/Crossover_(genetic_algorithm)>) method which consists in shuffling genetic material. A child is born having 50% of `parentA` genes and 50% `parentB` genes.

```typescript
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
```

We also add a little bit of random `mutation`, this can occur also in nature. Genes get mutated based on a percentage rate:

```typescript
const MUTATION_RATE = 0.1;
```

```typescript
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
```

Finally we call the method `evolve` and we let the algorithm do his magic!

```typescript
    static evolve(pop: Population) {
        this.reproduction(pop);
    }
```

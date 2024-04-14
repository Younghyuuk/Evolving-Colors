class Animat {
    constructor(parent, automata) {
        this.automata = automata;
        this.hue = parent.hue;
        this.x = parent.x;
        this.y = parent.y;
        this.energy = 50;
    }

    // Normalize value to wrap around within the bounds [0, max)
    normalize(value, max) {
        return (value + max) % max;
    }

    // Move to the optimal neighboring cell based on hue differences
    move() {
        let bestTarget = { x: this.x, y: this.y, diff: Infinity };

        for (let dx = -1; dx <= 1; dx++) {
            const newX = this.normalize(this.x + dx, PARAMETERS.dimension);
            for (let dy = -1; dy <= 1; dy++) {
                const newY = this.normalize(this.y + dy, PARAMETERS.dimension);
                const plant = this.automata.plants[newX][newY];
                const diff = plant ? Math.abs(this.hue - plant.hue) : Infinity;

                if (diff < bestTarget.diff) {
                    bestTarget = { x: newX, y: newY, diff };
                }
            }
        }

        this.x = bestTarget.x;
        this.y = bestTarget.y;
    }

    // Calculate hue difference taking hue wrapping into account
    hueDifference(plant) {
        const diff = plant ? Math.abs(this.hue - plant.hue) : 180;
        const adjustedDiff = diff > 180 ? 360 - diff : diff;
        return (90 - adjustedDiff) / 90;
    }

    // Consume plant energy based on selectivity and grow
    eat() {
        const growthRate = parseInt(document.getElementById("animatgrowth").value, 10);
        const selectivity = parseInt(document.getElementById("animatselection").value, 10);
        const plant = this.automata.plants[this.x][this.y];
        const diff = this.hueDifference(plant);

        if (plant && diff >= selectivity) {
            this.automata.plants[this.x][this.y] = null;
            this.energy += (80 / growthRate) * diff;
        }
    }

    // Reproduce if energy threshold is exceeded
    reproduce() {
        if (this.energy > 80) {
            this.energy -= 80;
            gameEngine.addEntity(new Animat(this.mutate(), this.automata));
        }
    }

    // Determine if the animat should be removed
    die() {
        this.removeFromWorld = true;
    }

    // Create a slight variation for offspring
    mutate() {
        const newX = this.normalize(this.x - 1 + this.randomInt(3), PARAMETERS.dimension);
        const newY = this.normalize(this.y - 1 + this.randomInt(3), PARAMETERS.dimension);
        const newHue = this.normalize(this.hue - 10 + this.randomInt(21), 360);
        return { hue: newHue, x: newX, y: newY };
    }

    // Random integer helper function
    randomInt(range) {
        return Math.floor(Math.random() * range);
    }

    // Lifecycle update per animation frame
    update() {
        this.move();
        this.eat();
        this.reproduce();
        if (this.energy < 1 || Math.random() < 0.01) {
            this.die();
        }
    }

    // Visual representation of animat
    draw(ctx) {
        ctx.fillStyle = `hsl(${this.hue}, 75%, 50%)`;
        ctx.strokeStyle = "light gray";
        ctx.beginPath();
        ctx.arc((this.x + 0.5) * PARAMETERS.size, (this.y + 0.5) * PARAMETERS.size, PARAMETERS.size / 2 - 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}

class Plant {
    constructor(other, automata) {
        this.automata = automata;
        this.hue = other.hue;
        this.x = other.x;
        this.y = other.y;
        this.growth = 0;
    }

    // Normalize value to wrap around within the bounds [0, max)
    normalize(value, max) {
        return (value + max) % max;
    }

    // Generate a slightly different plant for potential reproduction
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
        const growthRate = parseInt(document.getElementById("plantgrowth").value, 10);

        // Increase growth according to the growth rate
        if (this.growth < 80) {
            this.growth += 80 / growthRate;
        }

        // Reproduce if growth is sufficient and space is available
        if (this.growth >= 80) {
            const newPlant = this.mutate();
            if (!this.automata.plants[newPlant.x][newPlant.y]) {
                this.automata.plants[newPlant.x][newPlant.y] = new Plant(newPlant, this.automata);
                this.growth -= 80;
            }
        }
    }

    // Visual representation of plant
    draw(ctx) {
        ctx.fillStyle = `hsl(${this.hue}, ${20 + this.growth}%, 50%)`;
        ctx.strokeStyle = "dark gray";
        ctx.fillRect(this.x * PARAMETERS.size, this.y * PARAMETERS.size, PARAMETERS.size, PARAMETERS.size);
        ctx.strokeRect(this.x * PARAMETERS.size, this.y * PARAMETERS.size, PARAMETERS.size, PARAMETERS.size);
    }
}

class Automata {
	constructor() {
		this.plants = [];
		for(var i = 0; i < PARAMETERS.dimension; i++) {
			this.plants.push([]);
			for(var j = 0; j < PARAMETERS.dimension; j++) {
				this.plants[i].push(null);
			}
		}
		
	}	

	clearPlants() {
		for(var i = 0; i < PARAMETERS.dimension; i++) {
			for(var j = 0; j < PARAMETERS.dimension; j++) {
				this.plants[i][j] = null;
			}
		}
	}

	addPlant() {
		const i = randomInt(PARAMETERS.dimension);
		const j = randomInt(PARAMETERS.dimension);
		this.plants[i][j] = new Plant({hue: randomInt(360), x:i, y:j}, this)

		this.reset();
	}

	initializeCentralCluster() {
        this.clearPlants();
        const center = Math.floor(PARAMETERS.dimension / 2);
        const radius = Math.floor(PARAMETERS.dimension / 10);
        for (let i = center - radius; i <= center + radius; i++) {
            for (let j = center - radius; j <= center + radius; j++) {
                const normalizedX = this.normalize(i, PARAMETERS.dimension);
                const normalizedY = this.normalize(j, PARAMETERS.dimension);
                this.plants[normalizedX][normalizedY] = new Plant({
                    hue: randomInt(360),
                    x: normalizedX,
                    y: normalizedY
                }, this);
            }
        }
    }
	
	initializeCorners() {
        this.clearPlants();
        const radius = Math.floor(PARAMETERS.dimension / 10); // Defines the size of the cluster in each corner

        // Define corner positions
        const corners = [
            { x: 0, y: 0 }, // Top-left corner
            { x: 0, y: PARAMETERS.dimension - 1 }, // Bottom-left corner
            { x: PARAMETERS.dimension - 1, y: 0 }, // Top-right corner
            { x: PARAMETERS.dimension - 1, y: PARAMETERS.dimension - 1 } // Bottom-right corner
        ];

        corners.forEach(corner => {
            for (let i = 0; i <= radius; i++) {
                for (let j = 0; j <= radius; j++) {
                    // Normalize the positions to handle wrapping if necessary
                    const nx = this.normalize(corner.x + i, PARAMETERS.dimension);
                    const ny = this.normalize(corner.y + j, PARAMETERS.dimension);
                    this.addPlant(nx, ny);
                }
            }
        });
    }

	normalize(value, max) {
		return (value + max) % max;
	}

	randomInt(range) {
		return Math.floor(Math.random() * range);
	}

	update() {
		for(var i = 0; i < PARAMETERS.dimension; i++) {
			for(var j = 0; j < PARAMETERS.dimension; j++) {
				this.plants[i][j]?.update();
				if(Math.random() < 0.001) this.plants[i][j] = null;
			}
		}
	
	}

	draw(ctx) {
		for(var i = 0; i < PARAMETERS.dimension; i++) {
			for(var j = 0; j < PARAMETERS.dimension; j++) {
				this.plants[i][j]?.draw(ctx);
			}
		}
	}
};
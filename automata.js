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
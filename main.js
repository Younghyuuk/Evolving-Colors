const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	gameEngine.entities = [];
	let automata = new Automata();
	gameEngine.addEntity(automata);

	document.getElementById("plant").addEventListener("click", () => {
		automata.addPlant();
	});

	document.getElementById("animat").addEventListener("click", () => {
		gameEngine.addEntity(new Animat({x:randomInt(PARAMETERS.dimension),y:randomInt(PARAMETERS.dimension),hue:randomInt(360)}, automata));
	});

	document.getElementById("clear").addEventListener("click", () => {
		gameEngine.clearAnimats();
		automata.clearPlants();
	});


	
		// Attach event listener to the button
	document.getElementById('initCluster').addEventListener('click', function() {
		automata.initializeCentralCluster();
		gameEngine.addEntity(new Animat({x:randomInt(PARAMETERS.dimension/4),y:randomInt(PARAMETERS.dimension/4),hue:randomInt(360)}, automata));
		gameEngine.addEntity(new Animat({x:randomInt(PARAMETERS.dimension/4),y:randomInt(PARAMETERS.dimension/4),hue:randomInt(360)}, automata));
		gameEngine.addEntity(new Animat({x:randomInt(PARAMETERS.dimension/4),y:randomInt(PARAMETERS.dimension/4),hue:randomInt(360)}, automata));
	});

	document.getElementById('initCorner').addEventListener('click', function() {
		automata.initializeCorners();
		gameEngine.addEntity(new Animat({x:randomInt(PARAMETERS.dimension/4),y:randomInt(PARAMETERS.dimension/4),hue:randomInt(360)}, automata));
		gameEngine.addEntity(new Animat({x:randomInt(PARAMETERS.dimension/4),y:randomInt(PARAMETERS.dimension/4),hue:randomInt(360)}, automata));
		gameEngine.addEntity(new Animat({x:randomInt(PARAMETERS.dimension/4),y:randomInt(PARAMETERS.dimension/4),hue:randomInt(360)}, automata));
	});
	

	gameEngine.init(ctx);

	gameEngine.start();
});
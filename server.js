import userFn from './user/main.js';

let intents = [];

class GameObj {

  wood = 1;

  get wood() {
    return this.wood;
  }
}

GameObj.prototype.harvestWood = function() {
  console.log("Harvesting wood");
  intents.push("harvestWood");
}

global.Game = new GameObj();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const processIntents = (intents) => {
  for (const intent of intents) {
    if (intent === 'harvestWood') {
      Game.wood++;
    }
  }
}

function loop() {
  intents = [];
  console.log("Main function running...");
  userFn();
  console.log("Intents: ", intents);
}

let runCount = 0;
const MAX_RUNS = 5;
while (true) {
  loop();
  processIntents(intents);

  runCount++;
  if (runCount >= MAX_RUNS) {
    break;
  }
  await sleep(1000);
}

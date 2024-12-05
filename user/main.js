export default async function() {
  const tick = Game.currentTick();
  console.log("Current Tick: ", tick);

  const currentWood = await Game.getWood();
  console.log("Current Wood: ", currentWood);

  console.log("Calling harvestWood");
  Game.harvestWood();

  console.log("----------");
}

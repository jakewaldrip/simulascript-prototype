export default function() {
  console.log("User function running...");
  console.log("Current Wood from User Fn: " + Game.wood);
  Game.harvestWood();
}

import userFn from './user/main.js';
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

class GameObj { }
let intents = [];
let runCount = 0;
const MAX_RUNS = 5;

const db = await open({
  filename: '/tmp/database.db',
  driver: sqlite3.Database
});
await createTables();

GameObj.prototype.harvestWood = function() {
  intents.push({ type: "harvestWood", amount: 5 });
}

GameObj.prototype.getWood = async function() {
  const woodRow = await db.get(`select amount from resources where name = 'wood'`);
  return woodRow.amount;
}

GameObj.prototype.currentTick = function() {
  return runCount;
}

global.Game = new GameObj();

async function createTables() {
  await db.exec(`
    create table if not exists resources (
      id integer primary key,
      name text not null unique,
      amount integer not null default 0
     )
  `);

  await db.exec(`
    insert or replace into resources (id, name) values (0, 'wood')
  `);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const processIntents = async (intents) => {
  for (const intent of intents) {
    if (intent.type === 'harvestWood') {
      await db.exec(`
        update resources set amount = amount + ${intent.amount} where name = 'wood'
      `);
    }
  }
}

async function loop() {
  intents = [];
  await userFn();
}

while (true) {
  await loop();
  await processIntents(intents);

  runCount++;
  if (runCount >= MAX_RUNS) {
    break;
  }
  await sleep(1000);
}

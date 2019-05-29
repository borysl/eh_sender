const { EventHubClient } = require('@azure/event-hubs');

const { readdirSync, readFileSync } = require('fs');
const { join } = require('path');

const { deflateSync } = require('zlib');

// Define connection string and the name of the Event Hub
const { connectionString, eventHubsName } = require('./config.json');

async function main() {
  const client = EventHubClient.createFromConnectionString(connectionString, eventHubsName);

  const dir = 'data';
  const files = readdirSync(dir).map(name => join(dir, name));

  for (let file of files) {
    var zipline = deflateSync(readFileSync(file));
    const eventData = { body: zipline };
    console.log(`Sending message from file: ${file}`);
    await client.send(eventData);
  }

  await client.close();
}

main().catch(err => {
  console.log('Error occurred: ', err);
});
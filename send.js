const { EventHubClient } = require('@azure/event-hubs');

// Define connection string and the name of the Event Hub
const { connectionString, eventHubsName } = require('./config.json');

async function main() {
  const client = EventHubClient.createFromConnectionString(connectionString, eventHubsName, { consumerGroup: 'einstein'} );

  for (let i = 0; i < 100; i++) {
    const eventData = { body: `Event ${i}` };
    console.log(`Sending message: ${eventData.body}`);
    await client.send(eventData);
  }

  await client.close();
}

main().catch(err => {
  console.log('Error occurred: ', err);
});
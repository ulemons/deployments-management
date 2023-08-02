import Koa from 'koa';
import amqp from 'amqplib';
import { CONSTANTS } from '../config';
import { DataEvent } from '../models/events-model';
import { DataAggregationService } from '../services/data-aggregation-service';

const app = new Koa();
const queueName = CONSTANTS.DATA_EVENT_QUEUE;

async function listenToQueue() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName);
    console.log('Listening to queue...');

    await channel.consume(queueName, message => {
      if (message !== null) {
        const content: DataEvent = JSON.parse(message.content.toString());
        const dataAggregationService: DataAggregationService = new DataAggregationService();
        dataAggregationService.pushEvent(content);
        channel.ack(message);
      }
    });

    return channel;
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

listenToQueue().then(() => {
  app.listen(3001, () => {
    console.log('Server listening on port 3001');
  });
});

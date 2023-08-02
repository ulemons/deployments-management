import Koa from 'koa';
import amqp from 'amqplib';
import { CONSTANTS } from '../config';
import { DataEvent } from '../models/events-model';
import { DataAggregationService } from '../services/data-aggregation-service';
import logger from '../logger'

const app = new Koa();
const PORT = CONSTANTS.DATA_AGGREGATION_PORT;

async function listenToQueue() {
  try {
    const connection = await amqp.connect(CONSTANTS.RABBITMQ_HOST);
    const channel = await connection.createChannel();

    await channel.assertQueue(CONSTANTS.DATA_EVENT_QUEUE);
    logger.info('Listening to queue...');

    await channel.consume(CONSTANTS.DATA_EVENT_QUEUE, message => {
      if (message !== null) {
        const content: DataEvent = JSON.parse(message.content.toString());
        const dataAggregationService: DataAggregationService = new DataAggregationService();
        dataAggregationService.pushEvent(content);
        channel.ack(message);
      }
    });

    return channel;
  } catch (error) {
    logger.error('Error connecting to RabbitMQ:', error);
  }
}

listenToQueue().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

import 'reflect-metadata';
import { connection } from './config/database';
import fishLogSeed from '../src/utils/seed/fishLogSeed';
import app from './app';

connection.initialize().then(() => { console.log("Banco conectado")} ).catch((err) => console.log(err));

const serverPort = process.env.PORT || 4000;

fishLogSeed();

app.listen(serverPort, () => {
  console.log('server running on port %d', serverPort);
});
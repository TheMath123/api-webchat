// Importar as dependências
import mongoose, { ConnectOptions } from 'mongoose';

const dbUsername = process.env.DB_USERNAME;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

const urlDatabase = `mongodb+srv://${dbUsername}:${dbPass}@${dbName}.tvdnrgn.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(urlDatabase);
    console.log('Conexão com o MongoDB estabelecida');
  } catch (error) {
    console.error('Erro ao conectar com o MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;

export { connectDB };

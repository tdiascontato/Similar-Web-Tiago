require('dotenv/config')
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.SECRET_KEY);
    console.log('Conexão com o MongoDB estabelecida com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB :c', error);
  }
};

module.exports = connectDB;
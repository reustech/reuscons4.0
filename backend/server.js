import app from './src/app.js';
import { connectDB } from './src/shared/config/database.js';

const PORT = process.env.PORT || 5000;

// Conectar a BD e iniciar servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  });
});

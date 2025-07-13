const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/admin', adminRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});

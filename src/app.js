const express = require('express');

const app = express();

const productRouters = require('./routers/products.routers');
const salesRouters = require('./routers/sales.routers');

app.use(express.json());

// para usar as rotas
app.use('/products', productRouters);
app.use('/sales', salesRouters);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
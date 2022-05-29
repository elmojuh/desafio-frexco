const express = require('express');
const authMiddleware = require('../middlewares/auth')

const Product = require('../models/Product');

const router = express.Router();

router.use(authMiddleware);

//buscar todos os produtos
router.get('/list', async (req, res) => {
    try {
        const products = await Product.find().populate('user');

        return res.send(products);
    } catch (error) {
        res.status(400).send({ error: 'Erro na Listagem'})
    }
})


//busca de produto por ID
router.get('/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).populate('user');

        return res.send(product);
    } catch (error) {
        res.status(400).send({ error: 'Erro na busca do produto'})
    }
})

//Registrar novo produto
router.post('/register', async (req, res) => {
    const {name} = req.body;
    const require = await Product.findOne({name});
    try {
        if (!require) {
            const product = await Product.create({ ...req.body, amount: 1 , user: req.userId});
            return res.send({product});
        }
        return res.status(400).send({error: 'Produto já existe'});
        
    } catch (error) {
        res.status(400).send({ error: 'Erro no Registro'})
    }
})

//Editar um produto
router.put('/update/:productId', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.productId,{
            ...req.body,
            },{new: true});
        return res.send({product});
        
    } catch (error) {
        res.status(400).send({ error: 'Erro no Registro'})
    }
})

//Setar quantidade de itens de um produto
router.put('/stock/amount/:productId', async (req, res) => {
    const {amount} = req.body;
    try {
        const product = await Product.findByIdAndUpdate(req.params.productId,{
            amount,
            },{new: true});
        return res.send({product});
        
    } catch (error) {
        res.status(400).send({ error: 'Erro na Setagem'})
    }
})

//remover item de itens de um produto
router.put('/stock/remove/:productId', async (req, res) => {
    const valor = 4;
    try {
        const product = await Product.findByIdAndUpdate(req.params.productId,{
            amount: valor,
            },{new: true});
        return res.send({product});
        
    } catch (error) {
        res.status(400).send({ error: 'Erro na Remoção'})
    }
})

//Deletar um produto
router.delete('/delete/:productId', async (req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.productId).populate('user');
        return res.status(200).send({ ok: 'Exclusão com sucesso'})
        
    } catch (error) {
        res.status(400).send({ error: 'Erro na exclusão'})
    }
})



module.exports = app => app.use('/products', router)
const express = require('express');

const router = express.Router();

const Tarea = require('../models/tarea')

//muestra todas las tareas
router.get('/', async (req, res) => {
    const tarea = await Tarea.find()
    res.json(tarea)
})

//muestra la tarea correspondiente a un id
router.get('/:id', async (req, res) => {
    const tarea = await Tarea.findById(req.params.id)
    res.json(tarea)
})

//crea una tarea
router.post('/', (req, res) => {
    const tarea = new Tarea(req.body)
    tarea.save()
    res.json({status: 'Tarea saved'})
})

//modifica una tarea
router.put('/:id', async (req, res) => {
    await Tarea.findByIdAndUpdate(req.params.id, req.body)
    res.json({status: 'Tarea updated'})    
})

//elimina una tarea
router.delete('/:id', async (req, res) => {
    await Tarea.findByIdAndDelete(req.params.id)
    res.json({status: 'Tarea deleted'})
})

module.exports = router;
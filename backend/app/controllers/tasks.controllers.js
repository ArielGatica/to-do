const Tasks = require('../models/tasks');

const getTasks = async(req, res) =>{
    await Tasks.find((err, tasks) =>{
        if(!err)
            res.status(200).json({ data: tasks });
        else
            res.status(500).send({ message: `Error al intentar listar tareas ${err}` });
    })
}

const saveTask = async(req, res) =>{
    const { name, description } = req.body;
    
    let newTasks = new Tasks({ 
        name, 
        status: false, 
        description 
    });
    
    await newTasks.save((err) =>{
        if(!err)
            res.status(200).send({ message: `Tarea agregada correctamente` });
        else
            res.status(500).send({ message: `Error al intentar agregar Tarea ${err}` });
    })
}

const doneTask = async(req, res) =>{
    const { _id } = req.params;
    const { status } = req.body;

    Tasks.findById({ _id: _id }, (err, task) =>{
        if(err)
            res.status(500).send({ message: `Error ${err}` });
        if(task){
            Tasks.findByIdAndUpdate({ _id: _id }, { status }, (err) =>{
                if(!err)
                    res.status(200).send({ message: `Tarea ${task.name} ha sido finalizada` });
                else
                    res.status(500).send({ message: `Error al intentar finalizar tarea ${err}` });
            })
        }
        else
            res.status(404).send({ message: `Error, tarea no ha sido encontrada` });
    })
}

module.exports = { getTasks, saveTask, doneTask };
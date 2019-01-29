<template>
    <div>
        <nav class="navbar navbar-expand navbar-light bg-light">
            <a href="/" class="navbar-brand">Node.js - Tareas</a>
            <div class="nav navbar-nav">
            </div>
        </nav>
        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card-group">
                        <div class="card">
                            <div class="card-body">
                                <form @submit.prevent="sendTarea">
                                    <div class="form-group">
                                        <label for="">Tarea</label>
                                        <input v-model="tarea.title" type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId">
                                    </div>
                                    <div class="form-group">
                                      <label for="">Descripción</label>
                                      <textarea v-model="tarea.description" class="form-control" name="" id="" rows="3"></textarea>
                                    </div>
                                    <template v-if="edit === false">
                                        <button class="btn btn-primary">Enviar</button>
                                    </template>
                                    <template v-else>
                                        <button class="btn btn-primary">Actualizar</button>
                                    </template>
                                </form>
                            </div>
                        </div>
                    </div>                    
                </div>
                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Tarea</th>
                                <th>Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="tarea of tareas" :key="tarea._id">
                                <td>{{tarea.title}}</td>
                                <td>{{tarea.description}}</td>
                                <td><button @click="deleteTarea(tarea._id)" class="btn btn-danger">Delete</button></td>
                                <td><button @click="updateTarea(tarea._id)" class="btn btn-secondary">Update</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    class Tarea {
        constructor(title, description) {
            this.title = title
            this.description = description
        }
    }
    export default {
        data() {
            return {
                tarea: new Tarea(),
                tareas: [],
                edit: false,
                tareaToEdit: ''
            }
        },
        created() {
            this.getTareas()
        },
        methods: {
            sendTarea() {
                if(this.edit === false) {
                    fetch('/api/tareas', {
                        method: 'POST',
                        body: JSON.stringify(this.tarea),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getTareas()
                    })
                } else {
                    fetch('/api/tareas/' + this.tareaToEdit, {
                        method: 'PUT',
                        body: JSON.stringify(this.tarea),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getTareas()
                        this.edit = false
                    })
                }
                this.tarea = new Tarea()
            },
            getTareas() {
                fetch('/api/tareas')
                    .then(res => res.json())
                    .then(data => {
                        this.tareas = data,
                        console.log(this.tareas);                        
                    })
            },
            deleteTarea(id) {
                fetch('/api/tareas/'+id, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => this.getTareas())                
            },
            updateTarea(id) {
                fetch('/api/tareas/'+id)
                    .then(res => res.json())
                    .then(data => {
                        this.tarea = new Tarea(data.title, data.description)
                        this.tareaToEdit = data._id
                        this.edit = true
                    })
            }
        }
    }
</script>
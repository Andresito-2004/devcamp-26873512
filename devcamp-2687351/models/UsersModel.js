//Conexion a mongose
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,"nombre requerido"]
    },
    email: {
        type:String,
        required: [true, "Email requerido"],
        match: [ /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ , "Email no valido"]
    },
    role: {
        type: String,
        required: [true,"rol requerido"],
        eum:[
            "user",
            "publisher"
        ]
    },
    password: {
        type: String,
        required: [true,"Contraseña requerida"],
        max:6,
        select: false
    },
    createdAt:{
        type:Date,
        defaul: Date.now
    }

})
//accion pre
UserSchema.pre('save', async function(next){
    //creat sal, caracteres random
    const sal= await bcryptjs.genSalt(10)
    //encriptar contraseña
    this.password= await bcryptjs.hash(this.password,sal) 

})



const user= mongoose.model('User',UserSchema)
module.exports=mongoose.model('users', UserSchema)
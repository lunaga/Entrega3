// Consigna: Implementar programa que contenga una clase llamada Contenedor que reciba el 
//nombre del archivo con el que va a trabajar e implemente los siguientes métodos:


// ● save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
// ● getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
// ● getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
// ● deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
// ● deleteAll(): void - Elimina todos los objetos presentes en el archivo.



// >> Aspectos a incluir en el entregable:
// - El método save incorporará al producto un id numérico, que deberá ser siempre uno más que el id 
// del último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
// - Tomar en consideración el contenido previo del archivo, en caso de utilizar uno existente.
// - Implementar el manejo de archivos con el módulo fs de node.js, utilizando promesas con 
// async/await y manejo de errores.
// - Probar el módulo creando un contenedor de productos, que se guarde en el archivo: 
// “productos.txt”
// - Incluir un llamado de prueba a cada método, y mostrando por pantalla según corresponda para 
// verificar el correcto funcionamiento del módulo construído. 
// - El formato de cada producto será :

const fs = require ('fs')


class Contenedor{
    constructor(archivo){
        this.archivo = archivo;
    }



    async save(objeto){
        try {
            for(let i=0; i< objeto.length;i++){
                objeto[i].id= 1+ i
            }
            console.table(objeto)
            await fs.promises.writeFile(this.archivo,JSON.stringify(objeto))
        } catch (error) {
            throw new Error(error,'Error no se puede guardar el producto')
        }
    }


    async getById(id){
        try{
            const contenido = await this.getAll()
            let idencontrado = contenido.find(prod => prod.id === id)
            console.table(idencontrado)
        }catch(error){
            throw new Error(error,"Error no se encuentra dicho producto")
        }
    }


    async getAll(){
        try{
            let contenido = await fs.promises.readFile(this.archivo, "utf8");
            return JSON.parse(contenido)
        } catch(error){
            throw new Error(error,"Error al leer el archivo")
        }
    }


    async deleteById(id){
        try{
            const contenido = await this.getAll()
            const deleted = contenido.filter(producto => producto.id !== id)
            await fs.promises.writeFile(this.archivo, JSON.stringify(deleted,null,4))
            console.log('Elemento eliminado')
            console.table(deleted)
        }catch(error){
            throw new Error(error,"Error al borrar el producto")
        }
    }


    async deleteAll(){
        try{
            await fs.promises.writeFile(this.archivo, []);
            console.log("Contenido borrado")
        } catch(error){
            throw new Error(error,"Error al borrar todo")
        }
    }
}

module.exports = Contenedor;






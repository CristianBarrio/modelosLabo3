namespace Entidades
{
    export class Persona
    {
        public nombre:string;
        public correo:string;
        public clave:string;

        public constructor(nombre:string, correo:string, clave:string)
        {
            this.nombre = nombre;
            this.correo = correo;
            this.clave = clave;
        }

        public ToString():string
        {
            const personaJSON = {
                nombre: this.nombre,
                correo: this.correo,
                clave: this.clave
            };

            return JSON.stringify(personaJSON);
        }
    }
}
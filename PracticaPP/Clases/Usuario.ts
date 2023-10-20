namespace Entidades
{
    export class Usuario extends Persona
    {
        public id:number;
        public id_perfil:number;
        //protected perfil:string;

        public constructor(nombre:string, correo:string, clave:string, id:number, id_perfil:number)//, perfil:string)
        {
            super(nombre, correo, clave);
            this.id = id;
            this.id_perfil = id_perfil;
            //this.perfil = perfil;
        }

        public ToJSON():JSON
        {
            const usuarioJSON = {
                ...JSON.parse(super.ToString()),
                id: this.id,
                id_perfil: this.id_perfil,
                //perfil: this.perfil
            };

            return usuarioJSON;
        }


    }
}
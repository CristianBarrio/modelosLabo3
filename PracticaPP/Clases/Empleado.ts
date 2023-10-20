namespace Entidades
{
    export class Empleado extends Usuario
    {
        //protected id:number;
        public sueldo:number;
        public foto:string;

        public constructor(nombre:string, correo:string, clave:string,id:number, id_perfil:number, sueldo:number, foto:string)
        {
            super(nombre, correo, clave, id, id_perfil)//, perfil);
            this.sueldo = sueldo;
            this.foto = foto;
        }
    }
}
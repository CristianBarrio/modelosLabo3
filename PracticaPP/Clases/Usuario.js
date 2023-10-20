"use strict";
var Entidades;
(function (Entidades) {
    class Usuario extends Entidades.Persona {
        //protected perfil:string;
        constructor(nombre, correo, clave, id, id_perfil) {
            super(nombre, correo, clave);
            this.id = id;
            this.id_perfil = id_perfil;
            //this.perfil = perfil;
        }
        ToJSON() {
            const usuarioJSON = Object.assign(Object.assign({}, JSON.parse(super.ToString())), { id: this.id, id_perfil: this.id_perfil });
            return usuarioJSON;
        }
    }
    Entidades.Usuario = Usuario;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=Usuario.js.map
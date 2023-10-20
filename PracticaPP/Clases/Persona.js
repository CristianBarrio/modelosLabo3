"use strict";
var Entidades;
(function (Entidades) {
    class Persona {
        constructor(nombre, correo, clave) {
            this.nombre = nombre;
            this.correo = correo;
            this.clave = clave;
        }
        ToString() {
            const personaJSON = {
                nombre: this.nombre,
                correo: this.correo,
                clave: this.clave
            };
            return JSON.stringify(personaJSON);
        }
    }
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=Persona.js.map
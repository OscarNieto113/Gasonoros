const db = require ('../util/database')

module.exports = class Vacaciones {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_no_empleado, nuevo_responsable_ausencia, nuevo_observaciones, nuevo_reanudacion_labores, nuevo_fecha_primer_dia, nuevo_fecha_ultimo_dia, nuevo_dias_solicitados, nuevo_estatus_vacaciones) {
        this.no_empleado = nuevo_no_empleado;
        this.responsable_ausencia = nuevo_responsable_ausencia;
        this.observaciones = nuevo_observaciones;
        this.reanudacion_labores = nuevo_reanudacion_labores;
        this.fecha_primer_dia = nuevo_fecha_primer_dia;
        this.fecha_ultimo_dia = nuevo_fecha_ultimo_dia;
        this.dias_solicitados = nuevo_dias_solicitados;
        this.estatus_vacaciones = nuevo_estatus_vacaciones;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
      return db.execute('INSERT INTO vacaciones (no_empleado, responsable_ausencia, observaciones, reanudacion_labores, fecha_primer_dia, fecha_ultimo_dia, dias_solicitados, estatus_vacaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [this.no_empleado, this.responsable_ausencia, this.observaciones, this.reanudacion_labores, this.fecha_primer_dia, this.fecha_ultimo_dia, this.dias_solicitados, this.estatus_vacaciones]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
      return db.execute(
        'SELECT e.nombres_empleados, e.apellido_paterno, e.apellido_materno, a.nombre_area, v.dias_solicitados, v.estatus_vacaciones, v.folio, v.responsable_ausencia, v.observaciones, v.reanudacion_labores, v.fecha_primer_dia, v.fecha_ultimo_dia, v.fecha_solicitud ' +
        'FROM empleado e, vacaciones v, area a ' +
        'WHERE e.no_empleado = v.no_empleado AND a.id_area = e.id_area AND v.estatus_vacaciones ="Pendiente" ' );
    }

    static fetchSome(no_empleado) {
        return db.execute(
          'SELECT fecha_solicitud, fecha_primer_dia, fecha_ultimo_dia, reanudacion_labores, dias_solicitados, responsable_ausencia, observaciones, estatus_vacaciones ' +
          'FROM empleado e, vacaciones v ' +
          'WHERE e.no_empleado = v.no_empleado AND v.no_empleado=?', [no_empleado]);
    }

    static fetchByStatus(estatus_vacaciones) {
        return db.execute(
          'SELECT e.nombres_empleados, e.apellido_paterno, e.apellido_materno, a.nombre_area, v.dias_solicitados, v.estatus_vacaciones, v.folio, v.responsable_ausencia, v.observaciones, v.reanudacion_labores, v.fecha_primer_dia, v.fecha_ultimo_dia, v.fecha_solicitud ' +
          'FROM empleado e, vacaciones v, area a ' +
          'WHERE e.no_empleado = v.no_empleado AND a.id_area = e.id_area AND v.estatus_vacaciones =?', [estatus_vacaciones]);
    }


    static fetchOne(folio) {
        return db.execute('SELECT * FROM vacaciones WHERE id=?', [folio]);
    }

}

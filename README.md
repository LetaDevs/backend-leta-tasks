# Backend APP LETA-Tasks

## Casos de uso

- [x] crear cuenta de usuario
- [x] cambiar password
- [x] iniciar sesión
- [x] crear proyecto
- [x] editar proyecto
- [x] eliminar proyecto
- [x] crear tarea
- [x] editar tarea
- [x] eliminar tarea
- [x] cambiar estado tarea

## Endpoints de operación

### Crear cuenta de usuario

**POST** <http://referer/api/v1/crear-cuenta>

los datos **Nombre**, **Email** y **Password** son requeridos.

---

### Confirmar cuenta

**POST** <http://referer/confirmar-cuenta/:token>

Para confirmar la cuenta, se le enviará un correo al usuario con un token de verificación, al obtener un **POST** desde este endpoint se validará el token asociado a el y se activará la cuenta del usuario al que pertenezca dicho token.

---

### Solicitud reset password

**POST** <http://referer/api/v1/reset-password>

El **email** del usuario será requerido en el body del request

Al obtener un **POST** desde este endpoint, se le enviará un correo al usuario con la url de reset.

---

### Validación token reset password

**POST** <http://referer/api/v1/reset-password/validacion/:token>

Al obtener un **POST** desde este endpoint se validará el token asociado y se le permitirá al usuario modificar el password.

---

### Actualizar password

**POST** <http://referer/api/v1/reset-password/:token>

El campo **password** será requerido en el body del request

---

### Iniciar sesión

**POST** <http://referer/api/v1/iniciar-sesion>

Los campos **email** y **password** son requeridos en el body del request.

Al enviar un **POST** a este endpoint se validará que el email ingresado esté registrado y que el password pertenezca a dicho email, si la validación es correcta se enviará como respuesta un jwt con los datos del usuario.

---

### Autenticar usuario

**POST** <http://referer/api/v1/autenticacion>

El campo **token** requerido en el body del request.

Al enviar un **POST** a este endpoint se validará el jwt enviado en el body del request y se devolverán los datos del usuario

---

### Crear nuevo proyecto

**POST** <http://referer/api/v1/proyectos/crear-proyecto>

El campo **titulo** es requerido en el body del request.

Al enviar un **POST** a este endpoint se validará la sesión del usuario mediante un jwt en los headers del request, si dicha validación es exitosa se procedera a crear el registro del nuevo proyecto

---

### Actualizar proyecto

**PUT** <http://referer/api/v1/proyectos/editar-proyecto/:proyectoId>

El campo **titulo** es requerido en el body del request.

Al enviar un **PUT** a este endpoint se validará la sesión del usuario mediante un jwt en los headers del request, si dicha validación es exitosa se procedera a actualizar el registro del proyecto al que corresponda el id

---

### Eliminar proyecto

**DELETE** <http://referer/api/v1/proyectos/eliminar-proyecto/:proyectoId>

Al enviar un **DELETE** a este endpoint se validará la sesión del usuario mediante un jwt en los headers del request, si dicha validación es exitosa se procedera a eliminar el registro del proyecto al que corresponda el id

---

### Obtener proyectos

**GET** <http://referer/api/v1/proyectos/obtener-proyectos/:usuarioId>

Al enviar un **GET** a este endpoint se validará la sesión del usuario mediante un jwt en los headers del request, si dicha validación es exitosa se devolverá un json con los proyectos pertenecientes a dicho usuario.

---

### Obtener proyecto por url

**GET** <http://referer/api/v1/proyectos/obtener-proyecto/:url>

Al enviar un **GET** a este endpoint se validará la sesión del usuario mediante un jwt en los headers del request, si dicha validación es exitosa se devolverá un json con el proyecto.

---

### Crear tarea

**POST** <http://referer/api/v1/tareas/crear-tarea?proyectoId={id}>

se espera el parámetro **proyectoId** para identificar el proyecto al que se le debe asignar la tarea que se desea crear

El campo **titulo** es requerido en el body del request, el campo **descripcion** es opcional.

Al enviar un **POST** a este endpoint se validará la sesión del usuario mediante un jwt en los headers del request, si dicha validación es exitosa se procederá a crear la tarea.

---

### Editar tarea

**PUT** <http://referer/api/v1/tareas/editar-tarea/:tareaId>

El campo **titulo** es requerido en el body del request, el campo **descripcion** es opcional.

Al enviar un **PUT** a este endpoint se validará la sesión del usuario mediante un jwt en los headers del request, si dicha validación es exitosa y la tarea le pertenece al usuario autenticado, se procederá a actualizar la tarea.

---

### Eliminar tarea

**DELETE** <http://referer/api/v1/tareas/eliminar-tarea/:tareaId>

Al enviar un **DELETE** a este endpoint se validará la sesión del usuario mediante un jwt en los headers del request, si dicha validación es exitosa y la tarea le pertenece al usuario autenticado, se procederá a eliminar dicha tarea.

---

### Actualizar estado tarea

**PATCH** <http://referer/api/v1/tareas/estado-tarea/:tareaId>

Al enviar un **PATCH** a este endpoint se validará la sesión del usuario mediante un jwt en los headers del request, si dicha validación es exitosa y la tarea le pertenece al usuario autenticado, se procederá a cambiar el estado de dicha tarea (de true a false y veceversa).

---

### Obtener tareas

**GET** <http://referer/api/v1/tareas/obtener-tareas/:proyectoId>

Al enviar un **GET** a este endpoint se validará la sesión del usuario mediante un jwt en los headers del request, si dicha validación es exitosa se devolverá un json con las tareas pertenecientes a dicho proyecto.

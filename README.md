# Backend APP LETA-Tasks

## Endpoints de operación

---

### Crear cuenta de usuario

**POST** <http://referer/api/v1/crear-cuenta>

los datos **Nombre**, **Email** y **Password** son requeridos.

---

### Confirmar cuenta

**GET** <http://referer/confirmar-cuenta/:token>

Para confirmar la cuenta, se le enviará un correo al usuario con la url de confirmación, al obtener un **GET** desde esa url se validará el token asociado a ella y se activará la cuenta del usuario al que pertenezca dicho token.

---

### Solicitud reset password

**POST** <http://referer/api/v1/reset-password>

El **email** del usuario será requerido en el body del request

Al solicitar un reset de password, se le enviará un correo al usuario con la url de reset, al obtener un **GET** desde esa url se validará el token asociado a ella y se le permitirá al usuario modificar el password.

---

### Validación token reset password

**GET** <http://referer/reset-password/:token>

Al obtener un **GET** desde este endpoint se validará el token asociado y se le permitirá al usuario modificar el password.

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

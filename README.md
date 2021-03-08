# **App**
---

## **Como utilizar**
- Al abrir la aplicacion por primera vez aparecera la pantalla de login, en esta pantalla el usuario y contraseña validos son:
~~~
usuario:user1 
password:1234
~~~

- Una vez dentro de la aplicación apareceran los datos del usuario. y se puede observar 4 tabs correspondientes a Cuentas, Nueva Cuenta, Cambiar nombre de cuenta y transferencias.

### **Cuentas**
En este tab se lista las cuentas del usuario y en el caso de no observar cambios tras una operacion se puede deslizar hacia abajo para actualizar la informacion. Al presionar en una cuenta se despliegan los movimientos de dicha cuenta.

### **Nueva Cuenta**
En este apartado el usuario puede crear una nueva cuenta, El id del usuario debe contener 12 caracteres numéricos, para el numero de cuenta es necesario que sea de 11 caracteres numéricos.

### **Cambiar nombre de cuenta**
Este tab permitira el cambio de nombre de las cuentas del usuario. Se debe seleccionar la cuenta y colocar un nuevo nombre.

### **Transferencias**
Aqui el usuario puede seleccionar una cuenta destino, una cuenta emisora de la transferencia y el monto a transferir.

## **Informacion de desarrollo**
El presente proyecto fue realizado con ionic/angular.

El proyecto utiliza como recurso de inicio 2 json que contienen la informacion principal del programa, una vez obtenida esta informacion se guarda en el local storage.

El proyecto se conforma en base a los servicios de transacciones(transaction),cuentas(accounts) y autenticiad de usuario(auth).

Se utiliza un guard para evitar la navegación en la aplicacion a usuarios no autenticados.

Se genero componentes para el listado de las cuentas en el tab principal y para el listado de sus movimientos.
## **Pruebas Unitarias**
Se realizo las siguientes pruebas unitarias en el servicio de cuentas **AccountService**:

- test newAccount function
- test updateAccount for unexisting account
- test newAccount when user have no accounts
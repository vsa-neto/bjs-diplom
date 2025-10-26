'use strict'

 const userForm = new UserForm();


 userForm.loginFormCallback = data => {
    //  console.log(data);
     ApiConnector.login(data, callback => {
         if (callback.success) {
               console.log(callback.success);
             location.reload();
         } else {
             userForm.setLoginErrorMessage("попробуйте снова");
              console.log(callback);
              console.log(data);
         }
     });
 };

 userForm.registerFormCallback = data => {
    //  console.log(data);
     ApiConnector.register(data, callback => {
         if (callback.success) {
             location.reload();
         } else {
            userForm.setLoginErrorMessage("что-то пошло не так");
         }
     });
 };




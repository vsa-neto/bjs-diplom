"use strict";

const logoutUser = new LogoutButton();

logoutUser.action = () => {
    ApiConnector.logout(callback => {
        if(callback.success){
            location.reload();
        }
    } );
};


ApiConnector.current((callback) => {
            if(callback.success){
            ProfileWidget.showProfile(callback.data);
            console.log(callback.data.login);
        }
});



const ratesBoard = new RatesBoard();


function currentRate() {
 ApiConnector.getStocks((callback) => {
          if(callback.success){
           ratesBoard.clearTable();

           ratesBoard.fillTable(callback.data);
           console.log(callback.data);

        }
});
}
currentRate();
setInterval(currentRate, 60000);





const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, callback => {
        if(callback.success){
        ProfileWidget.showProfile(callback.data);
        moneyManager.setMessage(true, "пополнение выполнено");
         console.log(callback.data);
        } else {
         moneyManager.setMessage(true, "что-то пошло не так");

        }
        
    });
}


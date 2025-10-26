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
            // console.log(callback.data.login);
        }
});

const ratesBoard = new RatesBoard();

function currentRate() {
 ApiConnector.getStocks((callback) => {
          if(callback.success){
           ratesBoard.clearTable();
           ratesBoard.fillTable(callback.data);
           // console.log(callback);
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
        // console.log(callback.data);
        } else {
         moneyManager.setMessage(false, "что-то пошло не так");
        }
        
    });
};

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, callback => {
        if(callback.success){
        ProfileWidget.showProfile(callback.data);
        moneyManager.setMessage(true, "конвертация выполнена");
        // console.log(callback.data);
        } else {
         moneyManager.setMessage(false, "что-то пошло не так");
        }
        
    });
};

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, callback => {
        if(callback.success){
        ProfileWidget.showProfile(callback.data);
        moneyManager.setMessage(true, "перевод выполнен");
        // console.log(callback.data);
        } else {
         moneyManager.setMessage(false, "что-то пошло не так");
        }
        
    });
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(callback => {
       if(callback.success){

         console.log(callback.data);
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(callback.data);
        moneyManager.updateUsersList(callback.data);
        moneyManager.setMessage(true, "список пользователей обновлен");
        } else {
         moneyManager.setMessage(false, "что-то пошло не так");
        }
});

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, callback => {
  if(callback.success){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(callback.data);
        moneyManager.updateUsersList(callback.data);
        favoritesWidget.setMessage(true, "пользователь добавлен");
        } else {
         favoritesWidget.setMessage(false, "что-то пошло не так");
        }
    });
};

favoritesWidget.removeUserCallback = id => {
    ApiConnector.removeUserFromFavorites(id, callback => {
  if(callback.success){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(callback.data);
        moneyManager.updateUsersList(callback.data);
        favoritesWidget.setMessage(true, "пользователь удален из адресной книги");
        } else {
         favoritesWidget.setMessage(false, "что-то пошло не так");
        }
    });
};
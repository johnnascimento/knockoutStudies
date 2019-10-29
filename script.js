console.log('Knock out script working sound');

const viewMode = {
  user: {
    firstName: ko.observable('John'),
    lastName: ko.observable('Nascimento'),
    age: ko.observable(28),
    cartValue: ko.observable(25)
  }
};

ko.applyBindings(viewMode);
viewMode.user.lastName('Lenon');

var myObservableArray = ko.observableArray();    // Initially an empty array
myObservableArray.push('Some value');            // Adds the value and notifies observers
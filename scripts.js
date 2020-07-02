console.log('scripts js initialized');

let koClass = "";
let reservationVM = "";

class koTestXpto {
  constructor() {
    this.firstName = ko.observable('John');
    this.lastName = ko.observable('Nascimento');
    this.userFullName = this.fullName();
  }

  fullName() {
    return ko.computed(function() {
      return this.firstName() + ' ' + this.lastName();
    }, this);
  }

  captalizeLastName() {
    let currentVal = this.lastName();
    this.lastName(currentVal.toUpperCase());
  }
}



class SeatReservation {
  constructor(name, initialMeal) {
    var self = this;
    self.name = name;
    self.meal = ko.observable(initialMeal);
    
    self.formattedPrice = ko.computed(function() {
      var price = self.meal().price;
      return price ? "$" + price.toFixed(0) : "None";
    });
  }
}

// Overall viewmodel for this screen, along with initial state
class ReservationsViewModel {
  constructor() {
    var self = this;
    self.newName = ko.observable();
    
    // Non-editable catalog data - would come from the server
    self.availableMeals = [
      { mealName: "Standard (sandwich)", price: 0 },
      { mealName: "Premium (lobster)", price: 34.95 },
      { mealName: "Ultimate (whole zebra)", price: 290 }
            ];

    // Editable data
    self.seats = ko.observableArray([
      new SeatReservation("Steve", self.availableMeals[0]),
      new SeatReservation("Bert", self.availableMeals[0])
            ]);
            
     self.addSeat = function() {
       self.seats.push(new SeatReservation(self.newName(), self.availableMeals[0]));
     };
     
     self.removeSeat = function(seat) { 
       self.seats.remove(seat);
     };
     
     self.totalSurcharge = ko.computed(function() {
       var total = 0;
       var max = self.seats().length;
       
       for(var i = 0; i < max; i++) {
         total += self.seats()[i].meal().price;
       }
       
       return total;
     });
  }
}

koClass = new koTestXpto();
reservationVM = new ReservationsViewModel();

// ko.applyBindings(koClass);
ko.applyBindings(reservationVM);
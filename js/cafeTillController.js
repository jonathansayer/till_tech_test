cafeTill.controller('cafeTillController',[function(){

  var self = this;
  self.customers = []
  self.total = 0;
  self.shopInfo = info[0]
  self.menu = info[0].prices[0]
  self.orderedItems = [];
  self.tax = 0;
  self.showPayment=false;
  self.showChange=false;


  self.addToOrderedItems = function(item, price){
    self.total += price
    self.applyDiscount();
    if(self.alreadyOrdered(item) == false){
      self.orderedItems.push({item: item, quantity:1, itemTotal:price})}
    else{
      index = self.indexOfHash(item)
      self.orderedItems[index].quantity += 1;
      self.orderedItems[index].itemTotal += price;
    }
  }


  self.alreadyOrdered = function(item) {
    if(self.orderedItems.length == 0){
      return false
    }
    for(i = 0; i < self.orderedItems.length; i ++){
      if(self.orderedItems[i].item == item){
        return true;
      }
    }
    return false;
  }

  self.indexOfHash = function(item) {
    for(i = 0; i <= self.orderedItems.length; i++){
      if(self.orderedItems[i].item == item)
        return i;
    }
  }

  self.addToCustomers = function() {
    self.tax = self.total * 0.0864;
    self.customers.push({name:self.newCustomerName,
                          order:self.orderedItems,
                          total:self.total,
                          tax:self.tax,
                          showPayment: false});
    self.orderedItems = [];
    self.total = 0;
    self.newCustomerName = ''
  }

  self.pay = function(name) {
    index = self.indexOfCustomer(name);
    self.customers[index].showPayment = !self.customers[index].showPayment;
  };

  self.viewChange = function(total) {
    self.showChange = true;
    self.calculateChange(total);
  }

  self.calculateChange = function(total) {
    self.change = self.cashAmount - total;
  }

  self.applyDiscount = function() {
    if(self.total >= 50){
      self.total *= 0.95;
    }
  }

  self.indexOfCustomer = function(name) {
    for(i = 0; i <= self.customers.length; i++){
      if(self.customers[i].name == name){
        return i;
      };
    };
  };

  self.removeFromOrderedItems = function(item, price) {
    self.total -= price;
    index = self.indexOfHash(item);
    self.orderedItems.splice(index,1);
  }

  }]);

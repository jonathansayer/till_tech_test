cafeTill.controller('cafeTillController',[function(){

  var self = this;
  self.total = 0;
  self.shopInfo = info[0]
  self.menu = info[0].prices[0]
  self.orderedItems = [];
  self.customers = []
  self.tax = 0;
  self.payment=false;
  self.showChange=false;


  self.addToOrderedItems = function(item, price){
    self.total += price
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
    self.customers.push({name:self.customerName, order:self.orderedItems, total:self.total, tax:self.tax});
    self.orderedItems = [];
    self.total = 0;
    self.customerName = ''
  }

  self.increaseTotal = function(price){
    self.total += price;
  }

  self.pay = function() {
    self.payment = true;
  };

  self.viewChange = function(total) {
    self.showChange = true;
    self.calculateChange(total);

  }

  self.calculateChange = function(total) {
    self.change = self.cashAmount - total;
  }

  }]);

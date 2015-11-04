cafeTill.controller('cafeTillController',[function(){

  var self = this;
  self.customers = []
  self.total = 0;
  self.discount = 0;
  self.shopInfo = info[0]
  self.menu = info[0].prices[0]
  self.orderedItems = [];
  self.tax = 0;


  self.addToOrderedItems = function(item, price){
    self.total += Math.round(price * 100)/ 100
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
    self.applyDiscount();
    self.tax = self.total * 0.0864;
    self.customers.push({name:self.newCustomerName,
                          order:self.orderedItems,
                          total:self.total,
                          tax:self.tax,
                          showPayment: false,
                          showChange: false,
                          discount:self.discount,
                          cashAmount:'',
                          change:0});
    self.orderedItems = [];
    self.total = 0;
    self.newCustomerName = ''
  }

  self.pay = function(name) {
    var index = self.indexOfCustomer(name);
    self.customers[index].showPayment = !self.customers[index].showPayment;
  };

  self.viewChange = function(name) {
    var index = self.indexOfCustomer(name);
    self.customers[index].showChange = ! self.customers[index].showChange;
    self.calculateChange(name);
  }

  self.calculateChange = function(name) {
    var index = self.indexOfCustomer(name);
    self.customers[index].change = self.customers[index].cashAmount - (self.customers[index].total + self.customers[index].tax);
    self.customers[index].change = Math.round(self.customers[index].change * 100)/100
  }

  self.applyDiscount = function() {
    if(self.total >= 50){
      self.discount = Math.round(self.total * 0.05 * 100) /100;
      self.discountedTotal = self.total - self.discount
    }
    else{
      self.discountedTotal = self.total;
    }
  }

  self.indexOfCustomer = function(name) {
    for(i = 0; i < self.customers.length; i++){
      if(self.customers[i].name == name){
        return i;
      };
    };
  };

  self.removeFromOrderedItems = function(item, price) {
    self.total -= price;
    var index = self.indexOfHash(item);
    self.orderedItems.splice(index,1);
  }

  }]);

cafeTill.controller('cafeTillController',[function(){

  var self = this;
  self.total = 0;
  self.menu = menu[0].prices[0]

  self.increaseTotal = function(price){
    self.total += price;
  }

  }]);

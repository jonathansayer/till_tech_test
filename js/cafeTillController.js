cafeTill.controller('cafeTillController',[function(){

  var self = this;
  self.total = 0;
  self.menu = menu[0].prices[0]
  self.orderedItems = [];

  self.increaseTotal = function(price){
    self.total += price;
  }

  self.addToOrderedItems = function(item){
    if(self.alreadyOrdered(item) == false){
      self.orderedItems.push({item: item, quantity:1})}
    else{
      index = self.indexOfHash(item)
      self.orderedItems[index].quantity += 1;
    }
  }


  self.alreadyOrdered = function(item) {
    for(i = 0; i <= self.orderedItems.length; i ++){
      if(self.orderedItems.length == 0){
        return false
      }
      else if(self.orderedItems[i].item == item){
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

  }]);

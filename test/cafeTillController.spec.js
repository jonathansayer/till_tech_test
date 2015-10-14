describe('cafeTillController', function() {
  beforeEach(module('cafeTill'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('cafeTillController');
   }));

  it('initilises with an empty search term', function(){
    expect(ctrl.menu).toBeDefined();
  });

  var items =
        {
          "Cafe Latte": 4.75,
          "Flat White": 4.75,
          "Cappucino": 3.85,
          "Single Espresso": 2.05,
          "Double Espresso": 3.75,
          "Americano": 3.75,
          "Cortado": 4.55,
          "Tea": 3.65,
          "Choc Mudcake": 6.40,
          "Choc Mousse": 8.20,
          "Affogato": 14.80,
          "Tiramisu": 11.40,
          "Blueberry Muffin": 4.05,
          "Chocolate Chip Muffin": 4.05,
          "Muffin Of The Day": 4.55
        }


  it('displays all data',function() {
    expect(ctrl.menu.items).toEqual(items);
  });

  it('displays the items that can be ordered', function(){
    expect(ctrl.menu.items).toEqual(items)
  })

  it('should intialise with an total of 0', function() {
    expect(ctrl.total).toEqual(0)
  })

  it('should be able to increase the total by the price of an item', function() {
    ctrl.increaseTotal(2.20)
    expect(ctrl.total).toEqual(2.20)
  })

})

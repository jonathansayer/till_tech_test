describe('cafeTillController', function() {
  beforeEach(module('cafeTill'));

  info = [
          {
            "shopName": "The Coffee Connection",
            "address": "123 Lakeside Way",
            "phone": "16503600708",
            "prices": [
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
            ]
          }
        ]

  prices = {
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


  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('cafeTillController');
   }));

  it('initilises with an menu buttons', function(){
    expect(ctrl.menu).toBeDefined();
  });

  it('displays all data',function() {
    expect(ctrl.menu).toEqual(prices);
  });

  it('should intialise with an total of 0', function() {
    expect(ctrl.total).toEqual(0)
  })

  it('should be able to increase the total by the price of an item', function() {
    ctrl.increaseTotal(2.20)
    expect(ctrl.total).toEqual(2.20)
  })

  it('should add ordered items to the ordered array', function() {
    ctrl.addToOrderedItems('Tea',3.65);
    expect(ctrl.orderedItems).toEqual([{item:'Tea', quantity:1}]);
  })

  it('should increase the quantity of items have already been ordered', function() {
    ctrl.addToOrderedItems('Tea',3.65);
    ctrl.addToOrderedItems('Tea',3.65);
    expect(ctrl.orderedItems).toEqual([{item:'Tea', quantity:2}]);
  })

  it('should save the order of each customer', function() {
    ctrl.addToOrderedItems('Tea',3.65);
    ctrl.addToOrderedItems('Cappucino',3.85);
    ctrl.customerName = 'Jonathan'
    ctrl.addToCustomers();
    expect(ctrl.customers).toEqual([{name:"Jonathan",order:[{item:"Tea",quantity:1},{item:"Cappucino",quantity:1}],total:7.5, tax:0.648}]);
  })

  it('should have no ordered items when a new customer has been added', function() {
    ctrl.addToOrderedItems('Tea',3.65);
    ctrl.addToOrderedItems('Cappucino',3.85);
    ctrl.addToCustomers('Jonathan');
    expect(ctrl.orderedItems).toEqual([]);
  })

  it('should have a total of zero when a new customer is saved', function() {
    ctrl.addToOrderedItems('Tea',3.65);
    ctrl.addToOrderedItems('Cappucino',3.85);
    ctrl.addToCustomers('Jonathan');
    expect(ctrl.total).toEqual(0);
  })

})

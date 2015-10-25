describe('Cafe Till', function() {

  beforeEach(function() {
    browser.get('http://localhost:8080');
    total = element(by.binding('searchCtrl.total'));
    receipt = element(by.className('receipt'));
    order = element(by.className('order'));
    cappucino = element(by.buttonText('Cappucino'));
    tea = element(by.buttonText('Tea'));
    chocMousse = element(by.buttonText('Choc Mousse'));
  })

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Cafe Till');
  });

  it('the total is displayed at the start', function() {
    expect(total.getText()).toEqual('£0.00')
  })

  it('changes the total when an item is selected', function() {
    item_button = element(by.buttonText('Tea'));
    item_button.click();
    nameInput = element(by.className('nameInput'));
    nameInput.sendKeys('Jonathan');
    button = element(by.className("newCustomer"));
    button.click();
    total = element(by.className('finalTotal'))
    expect(total.getText()).toContain('£3.65')
  })

  describe('the receipt', function() {

    it('must show a receipt', function() {
      expect(receipt.getText()).toContain('Receipt');
    });

    it('must show a list of ordered items on order', function() {
      cappucino.click();
      tea.click();
      expect(order.getText()).toContain('Cappucino');
      expect(order.getText()).toContain('Tea');
      expect(order.getText()).toNotContain('Tiramisu')
    });

    it('must show the quantity of items ordered', function() {
      cappucino.click();
      cappucino.click();
      expect(order.getText()).toContain('2X Cappucino');
    });

    it('must show the shop information on the reciept', function() {
      expect(receipt.getText()).toContain("The Coffee Connection");
      expect(receipt.getText()).toContain("123 Lakeside Way");
      expect(receipt.getText()).toContain("phone: 16503600708");
    })
  });

  describe('display customer name', function() {

    beforeEach(function() {
      nameInput = element(by.className('nameInput'))
    })

    it('must take the name of each customer', function() {
      expect(nameInput.isPresent()).toBe(true);
    });

    it('must display the name of the customer on the receipt', function() {
      nameInput.sendKeys('Jonathan');
      button = element(by.buttonText('Save Customer'));
      button.click();
      expect(receipt.getText()).toContain("Jonathan");
    });
  });

  describe('multiple receipts', function() {

    it('must be able to display multiple names', function() {
      nameInput = element(by.className('nameInput'));
      nameInput.sendKeys('Jonathan');
      button = element(by.buttonText('Save Customer'));
      button.click();
      nameInput.clear();
      nameInput.sendKeys("Melissa");
      button.click();
      expect(receipt.getText()).toContain("Jonathan");
      expect(receipt.getText()).toContain("Melissa");
    })

    it('must display the order of multiple customers', function() {
      nameInput = element(by.className('nameInput'));
      nameInput.sendKeys('Jonathan');
      cappucino.click();
      button = element(by.buttonText('Save Customer'));
      button.click();
      nameInput.clear();
      nameInput.sendKeys("Melissa");
      tea.click();
      tea.click();
      chocMousse.click();
      button.click();
      nameInput.clear();
      expect(receipt.getText()).toContain("Jonathan","1X Cappucino");
      expect(receipt.getText()).toContain("Melissa", "2X Tea 1X Choc Mousse");
    })
  })

  it('should display the tax for each customer', function() {
    nameInput = element(by.className('nameInput'));
    nameInput.sendKeys('Jonathan');
    cappucino.click();
    button = element(by.buttonText('Save Customer'));
    button.click();
    expect(receipt.getText()).toContain("Tax: +£0.33")
  })
});

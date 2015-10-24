describe('Cafe Till', function() {

  beforeEach(function() {
    browser.get('http://localhost:8080');
    total = element(by.binding('searchCtrl.total'))
    receipt = element(by.className('receipt'))
    cappucino = element(by.buttonText('Cappucino'));
    tea = element(by.buttonText('Tea'))
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
    expect(total.getText()).toEqual('£3.65')
  })

  describe('the receipt', function() {

    it('must show a receipt', function() {
      expect(receipt.getText()).toContain('Receipt');
    });

    it('must show a list of ordered items on receipt', function() {
      cappucino.click();
      tea.click();
      expect(receipt.getText()).toContain('Cappucino');
      expect(receipt.getText()).toContain('Tea');
      expect(receipt.getText()).toNotContain('Tiramisu')
    });

    it('must show the quantity of items ordered', function() {
      cappucino.click();
      cappucino.click();
      expect(receipt.getText()).toContain('2X Cappucino');
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
      button = element(by.buttonText('Add Name'));
      button.click();
      expect(receipt.getText()).toContain("Jonathan");
    });
  });
});

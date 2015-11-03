describe('Cafe Till', function() {

  beforeEach(function() {
    browser.get('http://localhost:8080');
    nameInput = element(by.className('nameInput'));
    total = element(by.binding('ctrl.total'));
    saveCustomerBtn = element(by.buttonText('Save Customer'))
    receipt = element(by.className('receipt'));
    order = element(by.className('order'));
    cappucino = element(by.buttonText('Cappucino'));
    tea = element(by.buttonText('Tea'));
    chocMousse = element(by.buttonText('Choc Mousse'));
    affogato = element(by.buttonText('Affogato'));
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Cafe Till');
  });

  describe('the total', function() {

    it('the total is displayed at the start', function() {
      expect(total.getText()).toEqual('£0.00')
    });

    it('changes the total when an item is selected', function() {
      tea.click();
      nameInput.sendKeys('Jonathan');
      expect(total.getText()).toContain('£3.65')
    });
  });

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
    });
  });

  describe('display customer name', function() {

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

    beforeEach(function() {
      nameInput.sendKeys('Jonathan');
      cappucino.click();
      saveCustomerBtn.click();
      nameInput.sendKeys("Melissa");
      tea.click();
      tea.click();
      chocMousse.click();
      saveCustomerBtn.click();
    });

    it('must be able to display multiple names', function() {
      expect(receipt.getText()).toContain("Jonathan");
      expect(receipt.getText()).toContain("Melissa");
    });

    it('must display the order of multiple customers', function() {
      expect(receipt.getText()).toContain("Jonathan","1X Cappucino");
      expect(receipt.getText()).toContain("Melissa", "2X Tea 1X Choc Mousse");
    });
  });

  it('should display the tax for each customer', function() {
    nameInput.sendKeys('Jonathan');
    cappucino.click();
    saveCustomerBtn.click();
    expect(receipt.getText()).toContain("Tax: +£0.33")
  });

  it('should display the amount for each item', function() {
    nameInput.sendKeys('Jonathan');
    cappucino.click();
    cappucino.click();
    expect(order.getText()).toContain('2X Cappucino £7.70');
  });

  describe('when taking payment', function() {

    beforeEach(function() {
      nameInput.sendKeys('Jonathan');
      tea.click();
      cappucino.click();
      saveCustomerBtn.click();
      jonPaymentBtn = element(by.className('JonathanPaymentBtn'))
      jonCashAmount = element(by.className('JonathanCashAmount'));
    });

    it('should be told how much money the customer has given', function() {
      jonPaymentBtn.click();
      jonCashAmount.sendKeys("10.00")
      change = element(by.className('change'));
      change.click();
      payment = element(by.className('JonathanPayment'));
      expect(payment.getText()).toContain("Change: £1.85")
    });

    it('should only display the payment amount for one customer when payment button is selected', function() {
      nameInput.sendKeys('Melissa');
      cappucino.click();
      saveCustomerBtn.click();
      jonPaymentBtn.click();
      expect(element(by.className('MelissaCashAmount')).isDisplayed()).toEqual(false);
    });

    it('should hide the payment options after payent button has been played again', function() {
      jonPaymentBtn.click();
      expect(jonCashAmount.isDisplayed()).toEqual(true);
      jonPaymentBtn.click();
      expect(jonCashAmount.isDisplayed()).toEqual(false);
    });
  });

  it('should allow for an item to removed from the order list', function() {
    nameInput.sendKeys('Jonathan');
    tea.click();
    cappucino.click();
    teaRemove = element(by.className('TeaRemove'));
    teaRemove.click();
    expect(order.getText()).toNotContain('Tea');
    expect(order.getText()).toContain('Cappucino');
  });

  it('should display the discount (5% off orders over £50)', function() {
    nameInput.sendKeys('Jonathan');
    affogato.click();
    affogato.click();
    affogato.click();
    chocMousse.click();
    expect(order.getText()).toContain('- £2.63');
  });
});

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
  });
});

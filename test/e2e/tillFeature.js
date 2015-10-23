describe('Cafe Till', function() {
  
  it('has a title', function() {
    browser.get('http://localhost:8080');
    expect(browser.getTitle()).toEqual('Cafe Till');
  });

  it('the total is displayed at the start', function() {
    browser.get('http://localhost:8080');
    expect(element(by.binding('searchCtrl.total')).getText()).toEqual('£0.00')
  })

  it('changes the total when an item is selected', function() {
    item_button = element(by.buttonText('Tea'));
    item_button.click();
    expect(element(by.binding('searchCtrl.total')).getText()).toEqual('£3.65')
  })
});

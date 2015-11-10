Till tech test
==============

![a till](/images/till.jpg)


Introduction
-------------

The Cafe Till is a web application which can be used as a till for a cafe shop. The app uses a JSON file which contains the items that are being sold and the prices. Its easy to take away or add items to the till, all you have to do is alter the hipstercoffee.json file. The specification for the till is as follows:

"We want to sell tills to local hipster coffee shop who are finally embracing the 21st century. We need a new till to replace their vintage machines - unfortunately, hipster staff are too cool to learn a new system, so we need you to build something that they will understand."

How I Tackled the Challenge
-------
I prioritised simplicity in the design and the functions. The program is built in angular. There is one controller, one module and one JSON. You can't get much simpler than that.

The controller stores the menu, which has been extracted from the JSON, and contains functions relevant to the exchange of money.

The application is all test driven using Karma to unit test the controller and Protractor to feature test the till.

Difficulties
-----
Difficulties can when determining how to store the data for each individual customer. I opted to store each customers data in a JSON which is called customers in the till controller. This JSON is then queried when displaying receipts and extracting data referring to a specific customer.


How to use the Program
-----
Once this repo has been cloned, open index.html. You should see a very simply designed page with a button for each available item. Enter the name of the customer at the top and click the items for that customer. The name and items should appear below along with a total price and quantity. Click save customer. This then moves the order to the 'Receipt' section where payment can be taken and change give. Click 'Take Payment'. A input field will appear for you to enter the amount of cash that has been handed over. The program has calculated tax and any discount that is available (5% of on orders over £50). The change is given below.

To run the test suites, simply run

```
 karma start test/karma.conf.js
```

This will show the unit tests for the controller all passing. To run the protractor tests you will have to run "webdriver-manager" and a "http-server" before calling the protractor test:

```
protractor test/e2e/conf/js
```

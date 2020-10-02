// Budget Controller
var budgetController = (function() {

    // Expense function constructor
    var Expense = function(id, description, value) {
       this.id = id;
       this.description = description;
       this.value = value;
    };

    // Income function constructor
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inx: [],
        },
        totals: {
            exp: 0,
            inc: 0
        }        
    };

})();



// UI Controller
var UIController = (function() {

    // Central place were all our strings are stored.
    var DOMstrings = {
        inputType: '.add__type',
        inputDiscription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be iether inc or exp (any one)
                description: document.querySelector(DOMstrings.inputDiscription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: function() {
            return DOMstrings; // returning strings to be accessed in the controller
        }
    };

})();



// Global App Controller
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {

        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);// Here it is DOM instead of DOMstrings

        document.addEventListener('keypress', function(event) {
        
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        
        });
    };
    
    var ctrlAddItem = function() {
        // 1. Get the field input data
        var input = UICtrl.getInput();
        console.log(input);

        // 2. Add the item to the budget controller
        
        // 3. Add the item to the UI
        
        // 4. Calculate the budget
        
        // 5. Display the budget on the UI         
    }  

    return {
        init: function() {
            setupEventListeners();
        }
    };

})(budgetController, UIController);


// Only line out of modules
// Main line of code
controller.init();
// Executed at the start of our application
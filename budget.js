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
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }        
    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            // [1 2 3 4 5], next ID = 6
            // [ 1 2 4 6 8], next ID = 9
            // ID = lastID + 1

            // create a new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }            

            // Create a new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            
            // Push it into our data structure
            data.allItems[type].push(newItem);
            
            // Return the new element
            return newItem;
        },

        testing: function() {
            console.log(data);
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
                type: document.querySelector(DOMstrings.inputType).value, // will be either 'inc' or 'exp' (any one)
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
        var input, newItem;

        // 1. Get the field input data
        input = UICtrl.getInput();

        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        
        // 3. Add the item to the UI
        
        // 4. Calculate the budget
        
        // 5. Display the budget on the UI         
    }  

    return {
        init: function() {
            console.log('App started');
            setupEventListeners();
        }
    };

})(budgetController, UIController);


// Only line out of modules
// Main line of code
controller.init();
// Executed at the start of our application
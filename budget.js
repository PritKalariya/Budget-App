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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
    }

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either 'inc' or 'exp' (any one)
                description: document.querySelector(DOMstrings.inputDiscription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;

            // Create html strings with placeholder text

            if(type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if(type === 'exp') {
                element = DOMstrings.expensesContainer;

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }    

            // Replace placeholder with some actual text
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the html into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDiscription + ', ' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            fieldsArr[0].focus();
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
        UICtrl.addListItem(newItem, input.type);

        // 4. Clear the fields
        UICtrl.clearFields();
        
        // 5. Calculate the budget
        
        // 6. Display the budget on the UI         
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
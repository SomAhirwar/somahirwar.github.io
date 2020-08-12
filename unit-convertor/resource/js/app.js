var unitController = (function() {
    var unit = {
        weight: {
            microgram: 0.000001,
            milligram: 0.001,
            centigram: 0.01,
            decigram: 0.1,
            gram: 1,
            decagram: 10,
            hectogram: 100,
            kilogram:1000
        }
    };
    return {
        convertUnit: function(u1, u2, value1) {
            return (unit.weight[u1]/unit.weight[u2]) * value1;
        }
    };
})();

var UIController = (function() {
    var DOMString = {
        convertBtn: '.convert',
        u1: 'unit-1',
        u2: 'unit-2',
        value1: 'unit-1-value',
        value2: 'unit-2-value',
        swapBtn: '.interchange',
        unitRealtionOneToTwo:'.unit-1-to-2',
        unitRealtionTwotoOne: '.unit-2-to-1'
    }
    return {
        getDOMString: function() {
            return DOMString;
        },
        getInput: function() {
            return {
                u1: document.getElementById(DOMString.u1).value,
                u2: document.getElementById(DOMString.u2).value,
                value1: parseFloat(document.getElementById(DOMString.value1).value),
                //value2: parseFloat(document.getElementById(DOMString.value2).value)
            }
        },
        updateValue2: function(value2) {
            var u1,u2;
            document.getElementById(DOMString.value2).value = value2;
            document.getElementById(DOMString.value2).style.backgroundColor="rgba(200,200,200,0.7)";
        },
        updateUnitRelation: function(u1,u2, value1, value2, selector) {
            var relation = value2/value1;
            document.querySelector(selector).textContent = '1 ' + u1 + ' = ' + relation + ' ' + u2;
        }
    };
})();

var controller = (function(unitCtrl, UICtrl) {
    var DOM = UICtrl.getDOMString();

    var convert = function() {
        var input, value2;
        //1. Take unit1, unit 2 type and also unit1 value;
        input = UICtrl.getInput();
        //console.log(input);
        //2. Convert u1 to u2
        if(!isNaN(input.value1) && input.value1 != 0)
        {
            value2 = unitCtrl.convertUnit(input.u1, input.u2, input.value1);
            //3. Update UI
            UICtrl.updateValue2(value2);
    
            //4. Updating unit relation
            UICtrl.updateUnitRelation(input.u1, input.u2, input.value1, value2, DOM.unitRealtionOneToTwo);
            UICtrl.updateUnitRelation(input.u2, input.u1, value2, input.value1, DOM.unitRealtionTwotoOne);

        }
    }

    var swap = function() {
        var u1, u2, value1, value2, temp;
        u1= document.getElementById(DOM.u1).value;
        u2= document.getElementById(DOM.u2).value;

        //Swaping value of u1 and u2;
        temp = u1;
        u1=u2;
        u2=temp;
        document.getElementById(DOM.u1).value = u1;
        document.getElementById(DOM.u2).value = u2;
        value1 = parseFloat(document.getElementById(DOM.value1).value);

        if(!isNaN(value1) && value1!=0){
            //Convert unit2 to unit1
            value2 = unitCtrl.convertUnit(u1,u2, value1);
            UICtrl.updateValue2(value2);
        }

            //4. Updating unit relation
            /*UICtrl.updateUnitRelation(u1, u2, value1, value2, DOM.unitRealtionOneToTwo);
            UICtrl.updateUnitRelation(u2, u1, value2, value1, DOM.unitRealtionTwotoOne);*/
            temp = document.querySelector(DOM.unitRealtionOneToTwo).textContent;
            document.querySelector(DOM.unitRealtionOneToTwo).textContent = document.querySelector(DOM.unitRealtionTwotoOne).textContent;
            document.querySelector(DOM.unitRealtionTwotoOne).textContent = temp;        
    }

    var setupEventListener = function() {
        document.querySelector(DOM.convertBtn).addEventListener('click', convert);
        document.addEventListener('keypress', function(event) {
            if(event.keyCode === 13 || event.which === 13) {
                convert();
            }
        });
        document.querySelector(DOM.swapBtn).addEventListener('click', swap);
    };
    return {
        init: function() {
            /*console.log("it's InIt");
            console.log(DOM);*/
            setupEventListener();
        }
    }
})(unitController, UIController);

controller.init();
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
    },
    length: {
        nanometer: 0.000000001,
        micrometer: 0.000001,
        millimeter: 0.001,
        centimeter: 0.01,
        decimeter: 0.1,
        meter:1,
        kilometer:1000
    }
};
var unitController = (function() {
    return {
        convertUnit: function(unitType,u1, u2, value1) {
            //console.log(unitType);
            return (unit[unitType][u1]/unit[unitType][u2]) * value1;
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
        unitRealtionTwotoOne: '.unit-2-to-1',
        unitType: 'unit-type'
    }
    return {
        getDOMString: function() {
            return DOMString;
        },
        getInput: function() {
            return {
                uType: document.getElementById(DOMString.unitType).value,
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
        updateUnitRelation: function(uType, u1,u2, selector) {
            var relation = unit[uType][u2]/unit[uType][u1];
            //console.log(unit);
            document.querySelector(selector).textContent = '1 ' + u1 + ' = ' + relation + ' ' + u2;
        },
        populate: function() {
            var l1,l2,l3, optionArray;
            l1 = document.getElementById(DOMString.unitType);
            l2 = document.getElementById(DOMString.u1);
            l3 = document.getElementById(DOMString.u2);
            l2.innerHTML = "";
            l3.innerHTML = "";
            if(l1.value === 'length') {
                optionArray = ['kilometer|Kilometer','nanometer|Nanometer','micrometer|Micrometer','millimeter|Millimeter','centimeter|Centimeter','decimeter|Decimeter','meter|Meter'];
            } else if(l1.value === 'weight') {
                optionArray = ['kilogram|Kilogram','gram|Gram','decigram|Decigram','decagram|Decagram','centigram|Centigram','milligram|Milligram','hectogram|Hectogram','microgram|Microgram'];
            }
            optionArray.forEach(function(cur) {
                var pair = cur.split('|');
                var newOption = document.createElement('option');
                newOption.value = pair[0];
                newOption.innerHTML = pair[1];
                l2.options.add(newOption);
            });
            optionArray.forEach(function(cur) {
                var pair = cur.split('|');
                var newOption = document.createElement('option');
                newOption.value = pair[0];
                newOption.innerHTML = pair[1];
                l3.options.add(newOption);
            });
        },
        clearInput: function() {
            document.getElementById(DOMString.value1).value = '';
            document.getElementById(DOMString.value2).value = '';
        }
    };
})();

var controller = (function(unitCtrl, UICtrl) {
    var DOM = UICtrl.getDOMString();

    var convert = function() {
        var input, value2;
        //1. Take unit1, unit 2, unit-type type and also unit1 value;
        input = UICtrl.getInput();
        //console.log(input);
        //2. Convert u1 to u2
        if(!isNaN(input.value1) && input.value1 != 0)
        {
            value2 = unitCtrl.convertUnit(input.uType,input.u1, input.u2, input.value1);
            //3. Update UI
            UICtrl.updateValue2(value2);
    
            //4. Updating unit relation
            UICtrl.updateUnitRelation(input.uType, input.u1, input.u2, DOM.unitRealtionOneToTwo);
            UICtrl.updateUnitRelation(input.uType, input.u2, input.u1, DOM.unitRealtionTwotoOne);

        }else {
            UICtrl.clearInput();
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
        unitType = document.getElementById(DOM.unitType).value;

        if(!isNaN(value1) && value1!=0){
            //Convert unit2 to unit1
            value2 = unitCtrl.convertUnit(unitType,u1,u2, value1);
            UICtrl.updateValue2(value2);
        }

            //4. Updating unit relation
            temp = document.querySelector(DOM.unitRealtionOneToTwo).textContent;
            document.querySelector(DOM.unitRealtionOneToTwo).textContent = document.querySelector(DOM.unitRealtionTwotoOne).textContent;
            document.querySelector(DOM.unitRealtionTwotoOne).textContent = temp;        
    }


    var setupEventListener = function() {
        var options;
        document.querySelector(DOM.convertBtn).addEventListener('click', convert);
        document.addEventListener('keypress', function(event) {
            if(event.keyCode === 13 || event.which === 13) {
                convert();
            }
        });
        document.querySelector(DOM.swapBtn).addEventListener('click', swap);

        document.getElementById(DOM.value1).addEventListener('input',convert)
    };
    return {
        init: function() {
            setupEventListener();
        }
    }
})(unitController, UIController);

controller.init();
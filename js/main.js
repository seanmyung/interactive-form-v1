
document.addEventListener('DOMContentLoaded', () => {
//Set focus on the first text field
  const name = document.getElementById('name');
  const focusFirstField = function() {
    name.focus();
  };
  window.onload = focusFirstField;

//function for display or hide
function displayOption(idName, option) {
  document.getElementById(idName).style.display = option;
}

//Hide 'other title role' text field
  displayOption('other-title', 'none');

//Display or hide text field of other title of the select when select 'other' option
  const selectTitle = document.getElementById('title');
  selectTitle.addEventListener('change', (e) => {
    if(e.target.value === 'other') {
      displayOption('other-title', 'block');
    } else {
      displayOption('other-title', 'none');
    }
  });

//Display or hide color design function
  function displayColor(node, option1, option2) {
    colorDiv.style.display = option1;
    document.getElementById('color')[node].style.display = option2;
  }

  const colorDiv = document.getElementById('colors-js-puns');
  const selectDesign = document.getElementById('design');
  const color = document.getElementById('color');
  colorDiv.style.display = 'none';  //Hide 'color' div until selecting the design

//Display or hide based on selecting designs
  selectDesign.addEventListener('change', (e) => {
    if(e.target.value === 'js puns') {         //Only disaply 'js puns' design
      for(let i = 0; i < color.length; i++ ) {
        if(i < 3) {
          displayColor(i, 'block', 'block');
        } else {
          displayColor(i, 'block', 'none');
        }
      }
    } else if(e.target.value === 'heart js') { //Only disaply 'heart js' design
      for(let i = 0; i < color.length; i++ ) {
        if(i < 3) {
          displayColor(i, 'block', 'none');
        } else {
          displayColor(i, 'block',' block');
        }
      }
    }else {                                   //Display all design
      for(let i = 0; i < color.length; i++ ) {
          displayColor(i, 'none', 'block');
      }
    }
  });

//Disaply function for total amount of activities selected
  function totalInput() {
      const inputLists = activitiesFieldset.children;
      var sum = 0;
      for(let i = 1; i < inputLists.length-1; i++) {
        let inputList = inputLists[i];
          if(inputList.className == 'responded') {  //Calculate sum if slected activities
          sum += parseInt(priceArray[i]);

          if(inputList.className == '') {     //Claculate sum if uncheck acctivities
            sum += parseInt(priceArray[i]);
          }
        }

      }
      return sum;
  }

//Create 'span' to show total amount
  const activitiesFieldset = document.querySelector('fieldset[class=activities]');
  const totalDiv = document.createElement('div');
  var totalSpan = document. createElement('sapn');
  totalSpan.id = 'total';

  activitiesFieldset.appendChild(totalDiv);
  totalDiv.appendChild(totalSpan);
  const priceArray = [0,200,100,100,100,100,100,100];  //Price each activity

//Disaply total amount of activities selected
  activitiesFieldset.addEventListener('change', (e) => {
    const checkBox = event.target
    const isChecked = checkBox.checked;
    const labelList = checkBox.parentNode;

      if(isChecked) {                       //If slect activities, disaply a total amount.
        labelList.className = 'responded';
        totalSpan.textContent = 'Total: ' + '$' + totalInput();
        displayOption('total', 'block');
      } else {
        labelList.className = '';
        totalSpan.textContent = 'Total: ' + '$' + totalInput();
        if(totalInput() === 0) {            //If total amount equals zero, hide the amount text.
          displayOption('total', 'none');
        }
      }
  });

//When select first checkbox, the second checkbox become disabled
function disableCheckBox(firstQuery, SecondQuery ) {
  firstQuery.addEventListener('change', (e) => {
  const checkBox = e.target.checked;
    if(checkBox) {
      SecondQuery.disabled = true;
    } else {
      SecondQuery.disabled = false;
    }
  });
}

  const checkFrameworks = document.querySelector('input[name=js-frameworks]');
  const checkExpress = document.querySelector('input[name=express]');
  const checkLibs = document.querySelector('input[name=js-libs]');
  const checkNode = document.querySelector('input[name=node]');

 //Call disable CheckBox function
  disableCheckBox(checkFrameworks, checkExpress);
  disableCheckBox(checkExpress, checkFrameworks);
  disableCheckBox(checkLibs, checkNode);
  disableCheckBox(checkNode, checkLibs);

//Display function for payment method according to select menu
function displayPayment(display1, display2, display3) {
  creditCard.style.display = display1;
  payPal.style.display = display2;
  bitcoin.style.display = display3;
}
  const payment = document.getElementById('payment');
  const creditCard = document.getElementById('credit-card');
  const payPal = document.getElementsByTagName('p')[0]
  const bitcoin = document.getElementsByTagName('p')[1]
  payment.value = 'credit card';

  displayPayment('block', 'none', 'none'); //Display credit card on default payment method.

//Display payment method according to select menu
  payment.addEventListener('change', (e) => {
    const selectValue = e.target.value;

    if(selectValue === 'credit card') {
      displayPayment('block', 'none', 'none');
    } else if(selectValue === 'paypal') {
      displayPayment('none', 'block', 'none');
    } else if(selectValue === 'bitcoin') {
      displayPayment('none', 'none', 'block');
    } else{
      displayPayment('none', 'none', 'none');
    }
  });

  const submit = document.querySelector('button[type=submit]');
  const nameLabel = document.querySelector('label[for=name]');
  const emailLabel = document.querySelector('label[for=mail]');

//Create label to display error message in case of checkbox validiation
  const addLabel = document.createElement('label');
  addLabel.textContent = 'Please select an activity';
  activitiesFieldset.childNodes[1].append(addLabel);
  addLabel.style.display = 'none';

  const ccLabel = document.querySelector('label[for=cc-num]');
//Function for displaying each query of credit card when error occur
function displayQuery(querySelector, color) {
  document.querySelector(querySelector).style.color = color;
}

//Check form validiation function
  function inputValidation() {
    var isValid = true;
//Name validiation. Indicate error message when name field is blank
      if(name.value.length === 0) {
          nameLabel.textContent = 'Name: (Please provide your name)';
          nameLabel.style.color = 'red';
          isValid = false;
      } else {
          nameLabel.textContent = 'Name:';
          nameLabel.style.color = 'black';
      }
//Email validiation. Indicate error message when name field is blank or invalid format
      if (!emailValidation()) {
        emailLabel.textContent = 'Email: (Please provide a valid email address)';
        emailLabel.style.color = 'red';
        isValid = false;
      } else {
        emailLabel.textContent = 'Email:';
        emailLabel.style.color = 'black';
      }
//Checkbox validiation. Indicate error message when no check box of activities checked
      if(totalInput() === 0) {
          addLabel.style.display = 'block';
          addLabel.style.color = 'red';
          isValid = false;
      } else {
          addLabel.style.display = 'none';
      }
//Indicate error message when credit card does not fit a creditcard form
      if(payment.value == 'credit card') {
          const cardNumberLength = document.getElementById('cc-num').value.length;
          const zipCodeLength = document.getElementById('zip').value.length;
          const cvvLength =document.getElementById('cvv').value.length;
//Credit card must be 13 digit between 16 digit
          if(cardNumberLength > 12 && cardNumberLength < 17) {
            ccLabel.textContent = 'Card Number: ';
            displayQuery('label[for=cc-num]', 'black');
          } else if (cardNumberLength === 0){
            ccLabel.textContent = 'Please enter a credit card number';
            displayQuery('label[for=cc-num]', 'red');
            isValid = false;
          } else {
            ccLabel.textContent = 'Please enter at least 16 digits long';
            displayQuery('label[for=cc-num]', 'red');
            isValid = false;
          }
//Zip code must have 5digit.
          if(zipCodeLength != 5) {
            displayQuery('label[for=zip]', 'red');
            isValid = false;
          } else {
            displayQuery('label[for=zip]', 'black');
          }
//Zip code must have 3digit.
          if(cvvLength != 3) {
            displayQuery('label[for=cvv]', 'red');
            isValid = false;
          } else {
            displayQuery('label[for=cvv]', 'black');
          }
      }
      return isValid;
  }

//function for checking email validation
  function emailValidation() {
    var x = document.getElementById('mail').value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
      return false;
    } else {
      return true;
    }
  }

//addEventListener function for keypress and mouseover at the same time
  function eventListener(element, eventValue) {
    for(var i = 0; i < element.length; i++) {
      element[i].addEventListener(eventValue, function() {
        inputValidation();
      });
    }
  }

  var inputs = document.querySelectorAll('form');

//Indicate error message on default
  window.onload = inputValidation();
//Call the eventListener function for real time form validation 
  eventListener(inputs,'keypress');
  eventListener(inputs,'mouseover');
  eventListener(creditCard,'keypress');

//  When submit, check whether the form is valid
    submit.addEventListener('click', (e) => {
      e.preventDefault();
      if(inputValidation()) {
        console.log('Completed submit')
        return true;
      } else {
        return false;
      }
    });

});

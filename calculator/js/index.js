var clearAll = false;
var prevRes = 0;
var stack = new Array();

$("button").click(function() {
  var res = $(".result");
  
  if(clearAll){
    res.val("");
    clearAll = false;
  }
  
  var oldRes = res.val();
  var input = this.id.split('-')[0];
  
  switch (this.id) {
    case '0-button':
    case '1-button':
    case '2-button':
    case '3-button':
    case '4-button':
    case '5-button':
    case '6-button':
    case '7-button':
    case '8-button':
    case '9-button':
      processOperand(input);
      break;
    case 'pt-button':
      processOperand(".");
      break;
    case 'div-button':
    case 'mul-button':
    case 'sub-button':
    case 'sum-button':
    case 'mod-button':
      processOperator(input);
      break;
    case 'ac-button':
      res.val("");
      answer = 0;
      break;
    case 'ans-button':
      res.val(oldRes + prevRes);
      break;
    case 'ce-button':
      res.val(oldRes.substring(0, oldRes.length - stack.pop().length));
      break;
    case 'eq-button':
      var answer = eval(res.val());
      res.val(answer);
      prevRes = answer;
      clearAll = true;
      break;
  }

});

function processOperator(input) {
  var res = $(".result");
  var oldRes = res.val();

  switch (input) {

    case 'sum':
      res.val(oldRes + " + ");
      stack.push(" + ");
      break;
    case 'sub':
      res.val(oldRes + " - ");
      stack.push(" - ");
      break;
    case 'div':
      res.val(oldRes + " / ");
      stack.push(" / ");
      break;
    case 'mul':
      res.val(oldRes + " * ");
      stack.push(" * ");
      break;
    case 'mod':
      res.val(oldRes + " % ");
      stack.push(" % ");
      break;
  }

}

function processOperand(input) {

  var res = $(".result");
  var oldRes = res.val();

  res.val(oldRes + input);
  stack.push(input);

}
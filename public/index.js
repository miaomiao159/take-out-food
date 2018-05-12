function calculatePrice() {
  var mitems = document.getElementById('items');
  var mli = mitems.getElementsByTagName('li');
  let inputs = [];
  for (let i = 0; i < mli.length; i++) {
    var minput = mli[i].getElementsByTagName('input');
    if (parseInt(minput[0].value) == 0) {
      continue;
    }
    else {
      var mspan = mli[i].getElementsByTagName('span');
      var temp = mspan[0].innerText + "x" + parseInt(minput[0].value);
      inputs.push(temp);
    }
  }
  document.getElementById('message').innerHTML = bestCharge(inputs);
}

function clear1() {
  var input = document.getElementsByTagName('input');
  document.getElementById('message').innerHTML = '';
  for (let i = 0; i < input.length; i++) {
    input[i].value = '0';
  }
}

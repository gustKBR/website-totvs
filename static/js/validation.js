function newElement(){
  var newRow = document.createElement("div");
  var rowPosition = document.getElementById("expenses-row").children.length;
  newRow.id = `row${rowPosition}`;
  newRow.className = "row";
  newRow.innerHTML = `
    <button type="button" onclick="removeElement(this)" class="btn"><i class="fas fa-window-close"></i></button>
    <select name="categories" id="categories">
      <option selected>Selecione uma categoria</option>
      <option>Pedágio</option>
      <option>Hospedagem</option>
      <option>Combustível</option>
      <option>Alimentação</option>
      <option>Outra</option>
    </select>
    <input type="text" name="description" id="description" placeholder="Descrição" />
    <input type="number" name="unit_value" id="unit_value${rowPosition}" placeholder="Valor unitário" oninput="getTotalValue(this)" />
    <input type="number" name="amount" id="amount${rowPosition}" placeholder="Quantidade" oninput="getTotalValue(this)" />
    <input type="number" name="total_value" id="total_value${rowPosition}" placeholder="Valor total" readonly />
  `
  document.getElementById('expenses-row').appendChild(newRow);
}

function removeElement(element){
  Swal.fire({
    title: 'Deseja realmente remover esse item?',
    text: "Esta ação não poderá ser desfeita!",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText:'Não',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deletado!',
        'O item foi removido com sucesso.',
        'success',
      )
      element.parentElement.remove();
    }
  })
}

function getPosition(element) {
  return element.id.split("").pop();
}

function getTotalValue(element){
  const position = getPosition(element);
  const unitValue = document.getElementById(`unit_value${position}`).value;
  const amount = document.getElementById(`amount${position}`).value;
  const totalValue = unitValue * amount;

  document.getElementById(`total_value${position}`).value = totalValue;
  highlightFields(totalValue, position);
}

function highlightFields(totalValue, position){
  if (totalValue > 200) {
    document.getElementById(`row${position}`).classList.add("highlighted");
  } else {
    document.getElementById(`row${position}`).classList.remove("highlighted");
  }
}

function resetStyles(){
  Array.from(document.getElementById("expenses-row").children).forEach(child => {child.classList.remove("highlighted")});
}

function sumValues(){
        
  var tabela = document.getElementsByClassName("unit_value");
  var unitValue = 0;
  var amount = 0;

  for( var i = 1; i < tabela.length; i++){    
      var unitvl = tabela[i].value;
      
      unitValue = unitValue + parseInt(unitvl);
  };

  tabela = document.getElementsByClassName("amount");
  
  for( var i = 1; i < tabela.length; i++){    
      var qtde = tabela[i].value;
      
      amount = amount + parseInt(qtde);
  };

  var result = parseInt(unitValue) * parseInt(amount);
  $('#grand_total').val(result).innerHTML = result;
  var limit = 400;    

  if(limit <= result){
      document.getElementById("warning").innerHTML = "Limite de R$ 400,00 atingido. A solicitação irá passar por uma revisão.";
  }
  else{
      document.getElementById("warning").innerHTML = "Limite aceito!";    
  }
}

function confirmMessage() {
  Swal.fire({
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
  })
}
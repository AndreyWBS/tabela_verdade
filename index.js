function gerar_tabela() {
  const numero_de_entrada = document.querySelector("#n_de_entrada").value;
  if (
    numero_de_entrada == 0 ||
    numero_de_entrada == "" ||
    numero_de_entrada == 1
  ) {
    alert("Por favor, insira um número válido maior que 1.");
    return;
  }

  const $main_tabela = document.querySelector("#entrada");
  if ($main_tabela.classList) $main_tabela.classList.add("nulo");
  else $main_tabela.className += " nulo";

  const $tabela_input = document.querySelector("#tabela");
  $tabela_input.classList.remove("nulo");

  $tabela_input.innerHTML = gerarTabelaCheckbox(
    numero_de_entrada,
    2 ** numero_de_entrada
  );
}

function resultado() {
  var resultsArray = [];
  var tableRows = document.querySelectorAll("table tbody tr");
  console.log(tableRows);

  tableRows.forEach(function (row) {
    var linhas = [];
    var checkBoxes = row.querySelectorAll('input[type="checkbox"]');
    checkBoxes.forEach(function (cedula_) {
      linhas.push(cedula_.checked);
    });
    resultsArray.push(linhas)
  });

  console.log(resultsArray);
}

function verifica_true(sequencia, posicao) {
  if (sequencia[posicao] == 1) {
    return true;
  }
  return false;
}

function gerarTabelaCheckbox(numColunas, numLinhas) {
  let tabelaHTML = "<table>";
  tabelaHTML += "<tr>";
  for (let coluna = 0; coluna < numColunas; coluna++) {
    let tituloColuna = String.fromCharCode(65 + coluna);
    tabelaHTML += `<th>Coluna ${tituloColuna}</th>`;
  }
  tabelaHTML += "<th>Resultado</th>";
  tabelaHTML += "</tr>";

  for (let i = 1; i <= numLinhas; i++) {
    tabelaHTML += "<tr>";
    for (let j = 1; j <= numColunas; j++) {
      let binario = (i - 1).toString(2);

      if (verifica_true(binario.split("").reverse().join(""), j - 1)) {
        tabelaHTML += `<td><input type='checkbox' id='checkbox_${i}_${j}' class="linha${i} coluna${j}" name='checkbox_${i}_${j}' value='${i},${j}' checked ></td>`;
      } else {
        tabelaHTML += `<td><input type='checkbox' id='checkbox_${i}_${j}' class="linha${i} coluna${j}" name='checkbox_${i}_${j}' value='${i},${j}'  ></td>`;
      }
    }
    tabelaHTML += `<td><input type='checkbox' id='resultado_${i}' name='resultado_${i}' value='resultado_${i}'> </td>`;
    tabelaHTML += "</tr>";
  }
  tabelaHTML += "</table>";
  tabelaHTML +=
    "<input  type='button' onclick='resultado()' value='resultado'>";
  return tabelaHTML;
}

function genera_sub_conjuntos(array) {
  let result = [];

  function backtrack(start, subset) {
    result.push(subset.slice()); // Adiciona o subconjunto

    for (let i = start; i < array.length; i++) {
      subset.push(array[i]);
      backtrack(i + 1, subset);
      subset.pop();
    }
  }

  backtrack(0, []);

  return result;
}

function remove_elementos_pelo_index(array, index, count) {
  if (index >= 0 && index < array.length) {
    array.splice(index, count);
  }
  return array;
}


let historico = JSON.parse(localStorage.getItem("historico")) || [];

let nomesTarefas = {
  sumps: "Limpeza dos Sumps",
  calhas: "Limpeza das Calhas do GNV",
  fornos: "Limpeza dos Fornos",
  deposito: "Limpeza e Organização do Depósito do GNV",
  troca: "Organização da Troca de Óleo",
  conveniencia: "Organização do Depósito da Conveniência",
  bomba: "Limpeza das Bombas de Combustível",
};

function mostrarChecklistsDoLider(nomeLider) {
  let detalhes = document.getElementById("detalhes-lider");

  let texto = "";

  for (let i = 0; i < historico.length; i++) {
    if (historico[i].lider == nomeLider) {
      texto +=
        "<div class='card-checklist'>" +
        "<button type='button' onclick='mostrarDetalhesChecklist(" +
        i +
        ")'>📅 " +
        historico[i].data +
        "</button>" +
        "</div>";
    }
  }

  detalhes.innerHTML = texto;
}

function mostrarDetalhesChecklist(posicao) {
  let detalhes = document.getElementById("detalhes-lider");
  let checklist = historico[posicao];

  let texto = "";

  texto += "<h3>📅 Data: " + checklist.data + "</h3>";
  texto += "<p><strong>Líder:</strong> " + checklist.lider + "</p>";

  for (let i = 0; i < checklist.tarefas.length; i++) {
    texto +=
      "<div class='card-checklist'>" +
      "<strong>" +
      nomesTarefas[checklist.tarefas[i].nome] +
      "</strong><br>" +
      "Status: " +
      (checklist.tarefas[i].status == "Concluído"
        ? "✅ Concluído"
        : "❌ Não Concluído") +
      "<br>" +
      "Responsável: " +
      checklist.tarefas[i].responsavel +
      "<br>" +
      "Observação: " +
      checklist.tarefas[i].observacao +
      "</div><br>";
  }

  texto +=
    "<button type='button' onclick='excluirChecklist(" +
    posicao +
    ")'>🗑 Excluir Checklist</button>";

    texto +=
  "<button type='button' onclick='exportarPDF(" +
  posicao +
  ")'>📄 Exportar PDF</button>";

  detalhes.innerHTML = texto;
}

function excluirChecklist(posicao) {
  let confirmar = confirm("Tem certeza que deseja excluir este checklist?");

  if (confirmar == false) {
    return;
  }

  historico.splice(posicao, 1);

  localStorage.setItem("historico", JSON.stringify(historico));

  alert("Checklist excluído com sucesso!");

  location.reload();
}

function exportarPDF(posicao) {
  let checklist = historico[posicao];

  const { jsPDF } = window.jspdf;
  let pdf = new jsPDF();

  let y = 10;

  pdf.text("Checklist de Organização e Limpeza", 10, y);
  y += 10;

  pdf.text("Líder: " + checklist.lider, 10, y);
  y += 10;

  pdf.text("Data: " + checklist.data, 10, y);
  y += 15;

  for (let i = 0; i < checklist.tarefas.length; i++) {
    let tarefa = checklist.tarefas[i];

    pdf.text(nomesTarefas[tarefa.nome], 10, y);
    y += 8;

    pdf.text("Status: " + tarefa.status, 10, y);
    y += 8;

    pdf.text("Responsável: " + tarefa.responsavel, 10, y);
    y += 8;

    pdf.text("Observação: " + tarefa.observacao, 10, y);
    y += 12;

    if (y > 270) {
      pdf.addPage();
      y = 10;
    }
  }

  pdf.save("checklist-" + checklist.data + ".pdf");
}

let listaLideres = document.getElementById("lista-lideres");

let lideres = [];

for (let i = 0; i < historico.length; i++) {
  if (!lideres.includes(historico[i].lider)) {
    lideres.push(historico[i].lider);

    listaLideres.innerHTML +=
      "<button type='button' onclick='mostrarChecklistsDoLider(\"" +
      historico[i].lider +
      "\")'>" +
      historico[i].lider +
      "</button><br><br>";
  }
}
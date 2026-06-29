
      // Aqui você pode adicionar JavaScript para manipular o formulário, validar os dados ou enviar as informações para um servidor.
      function enviarChecklist() {
        // Lógica para coletar os dados do formulário e enviá-los para um servidor ou processá-los localmente
        let lider = document.getElementById("nome").value;
        let data = document.getElementById("data").value;

        let tarefas = [
          "sumps",
          "calhas",
          "fornos",
          "deposito",
          "troca",
          "conveniencia",
          "bomba",
        ];

        if (lider == "" || data == "") {
          alert("Preencher nome e data");
          return;
        }

        for (let i = 0; i < tarefas.length; i++) {
          let concluido = document.getElementById(
            tarefas[i] + "-concluido",
          ).checked;
          let naoConcluido = document.getElementById(
            tarefas[i] + "-nao-concluido",
          ).checked;

          let responsavel = document.getElementById(
            "responsavel-" + tarefas[i],
          ).value;

          if (!concluido && !naoConcluido) {
            alert("Marque o status de " + tarefas[i]);
            return;
          }

          if (responsavel == "") {
            alert("Preencha o responsavel de " + tarefas[i]);
            return;
          }
        }

        let tarefasPreenchidas = [];

        for (let i = 0; i < tarefas.length; i++) {
          let status = document.getElementById(tarefas[i] + "-concluido")
            .checked
            ? "Concluído"
            : "Não Concluído";

          let responsavel = document.getElementById(
            "responsavel-" + tarefas[i],
          ).value;
          let observacao = document.getElementById("obs-" + tarefas[i]).value;

          tarefasPreenchidas.push({
            nome: tarefas[i],
            status: status,
            responsavel: responsavel,
            observacao: observacao,
          });
        }

        let checklist = {
          lider,
          data,
          tarefas: tarefasPreenchidas,
        };

        console.log(checklist);

        let historico = JSON.parse(localStorage.getItem("historico")) || [];

        historico.push(checklist);

        localStorage.setItem("historico", JSON.stringify(historico));

        mostrarHistorico();

        alert("Checklist enviado com sucesso!");

        document.getElementById("nome").value = "";
        document.getElementById("data").value = "";

        for (let i = 0; i < tarefas.length; i++) {
          document.getElementById(tarefas[i] + "-concluido").checked = false;

          document.getElementById(tarefas[i] + "-nao-concluido").checked =
            false;

          document.getElementById("responsavel-" + tarefas[i]).value = "";
          document.getElementById("obs-" + tarefas[i]).value = "";
        }
      }

      function mostrarHistorico() {
        let historico = JSON.parse(localStorage.getItem("historico")) || [];

        if (historico.length == 0) {
          document.getElementById("historico").innerText =
            "Nenhum checklist salvo ainda.";
          return;
        }

        let texto = "";

        for (let i = 0; i < historico.length; i++) {
          texto +=
            "Data: " +
            historico[i].data +
            " | Líder: " +
            historico[i].lider +
            "\n";
        
        for (let j = 0; j < historico[i].tarefas.length; j++) {
          texto +=
          "- " +
          historico[i].tarefas[j].nome +
          " | Status: " +
          historico[i].tarefas[j].status +
          " | Responsável: " +
          historico[i].tarefas[j].responsavel + 
          "\n";
        }
        texto += "\n";
        }

        document.getElementById("historico").innerText = texto;
      }
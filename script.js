let isAdmin = false;

// ==================== SISTEMA POR DATA ===========================
let dataAtual = new Date().toISOString().split("T")[0]; // formato AAAA-MM-DD
document.getElementById("dataSelecionada").value = dataAtual;

let lista = carregarLista(dataAtual);

function carregarLista(data) {
    return JSON.parse(localStorage.getItem("presenca_" + data)) || [];
}

function salvar(data) {
    localStorage.setItem("presenca_" + data, JSON.stringify(lista));
}

// =================================================================

// === LOGIN DE ADMIN ===
function loginAdmin() {
    const senha = prompt("Digite a senha de administrador:");

    if (senha === "1234") {
        isAdmin = true;
        alert("Login de administrador realizado!");
        render();
    } else {
        alert("Senha incorreta!");
    }
}

// === CALENDARIO ===
function trocarData() {
    dataAtual = document.getElementById("dataSelecionada").value;
    lista = carregarLista(dataAtual);
    render();
}




function render() {
    const tbody = document.getElementById("lista");
    tbody.innerHTML = "";

    lista.forEach((p, index) => {
        let classeArea = "";
        switch (p.area) {
            case "AZUL": classeArea = "area-azul"; break;
            case "VERMELHA": classeArea = "area-vermelha"; break;
            case "AMARELA": classeArea = "area-amarela"; break;
            case "VERDE": classeArea = "area-verde"; break;
        }

        tbody.innerHTML += `
            <tr>
                <td>${p.uf}</td>
                <td>${p.recurso}</td>
                <td>${p.coordVivo}</td>
                <td>${p.supervisorTLP}</td>
                <td>${p.coordTLP}</td>
                <td>${p.status}</td>
                <td class="${classeArea}">${p.area}</td>
                <td>
                    ${isAdmin
                ? `<button class="excluir" onclick="excluir(${index})">X</button>`
                : `<span style="color:#888;">—</span>`
            }
                </td>
            </tr>
        `;
    });

    atualizarDashboard(); // <--- ATUALIZA O DASHBOARD
}


function excluir(index) {
    lista.splice(index, 1);
    salvar(dataAtual);
    render();
}

function adicionar() {
    const uf = document.getElementById("uf").value;
    const recurso = document.getElementById("recurso").value;
    const coordVivo = document.getElementById("coordVivo").value;
    const supervisorTLP = document.getElementById("supervisorTLP").value;
    const coordTLP = document.getElementById("coordTLP").value;
    const status = document.getElementById("status").value;
    const area = document.getElementById("area").value;

    if (recurso === "" || recurso === "Selecione o Técnico") {
        return alert("Selecione o técnico!");
    }

    lista.push({
        uf,
        recurso,
        coordVivo,
        supervisorTLP,
        coordTLP,
        status,
        area
    });

    salvar(dataAtual);
    render();
}

render();

//DASHBOARD================================

function atualizarDashboard() {

    // === RESUMO TOTAL ===

    // Total de UF (RJ + ES)
    document.getElementById("totalUF").textContent =
        lista.filter(p => p.uf === "RJ" || p.uf === "ES").length;

    // Total de ÁREAS
    document.getElementById("totalAREA").textContent =
        lista.filter(p => ["AZUL", "AMARELA", "VERDE", "VERMELHA"].includes(p.area)).length;

    // Total de SUPERVISORES
    document.getElementById("totalSUP").textContent =
        lista.filter(p => p.supervisorTLP === "LUCIANO INACIO DA SILVA" ||
            p.supervisorTLP === "LEANDRO MARTINS ABBUD").length;

    // Total de STATUS (Condição técnica)
    document.getElementById("totalSTATUS").textContent = lista.length;

}

//EXPORTAR EM EXCEL PARA CASO PRECISE

function exportarExcel() {
    // Seleciona a tabela completa
    var tabela = document.querySelector("table").outerHTML;

    // Substitui caracteres especiais
    tabela = tabela.replace(/ /g, '%20');

    // Nome do arquivo
    var nomeArquivo = `lista_presenca_${new Date().toLocaleDateString('pt-BR')}.xls`;

    // Cria um link temporário para download
    var a = document.createElement('a');
    a.href = 'data:application/vnd.ms-excel,' + tabela;
    a.download = nomeArquivo;
    a.click();
}


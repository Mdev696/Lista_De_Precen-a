// ==================================================
// ANALITYS.JS - Gerenciamento de Presença
// ==================================================

// Registrar plugins do Chart.js
Chart.register(ChartDataLabels);

// Variáveis globais
let charts = {};
let isAdmin = false;
let dataAtual = new Date().toISOString().split("T")[0]; // Formato AAAA-MM-DD
let lista = [];

// ===================== UTILITÁRIOS =====================

/**
 * Carrega os dados do localStorage
 * @param {string} data - Data no formato YYYY-MM-DD
 * @returns {Array} Lista de registros
 */
function carregarDados(data) {
    return JSON.parse(localStorage.getItem("presenca_" + data)) || [];
}

/**
 * Salva a lista atual no localStorage
 * @param {string} data 
 */
function salvar(data) {
    localStorage.setItem("presenca_" + data, JSON.stringify(lista));
}

/**
 * Conta ocorrências de um campo específico
 * @param {Array} lista 
 * @param {string} chave 
 * @returns {Object} { valor: quantidade }
 */
function contarOcorrencias(lista, chave) {
    const contagens = {};
    lista.forEach(item => {
        const valor = item[chave];
        contagens[valor] = (contagens[valor] || 0) + 1;
    });
    return contagens;
}

/**
 * Processa o status de presença
 * @param {Array} lista 
 * @returns {Object} { status: quantidade }
 */
function processarStatus(lista) {
    const contagens = {
        "PRESENTE": 0, "INTERJORNADA": 0, "INTERMEDIÁRIO": 0, "NOTURNO": 0,
        "FÉRIAS": 0, "INSS": 0, "ATESTADO": 0, "FOLGA": 0, "OUTROS": 0
    };

    lista.forEach(p => {
        const status = p.status.toUpperCase();
        if (status.includes("PRESENTE")) contagens["PRESENTE"]++;
        else if (status.includes("INTERJORNADA")) contagens["INTERJORNADA"]++;
        else if (status.includes("INTERMEDIÁRIO") || status.includes("INTERMEDIARIO")) contagens["INTERMEDIÁRIO"]++;
        else if (status === "NOTURNO") contagens["NOTURNO"]++;
        else if (status === "FÉRIAS") contagens["FÉRIAS"]++;
        else if (status === "INSS") contagens["INSS"]++;
        else if (status === "ATESTADO") contagens["ATESTADO"]++;
        else if (status === "FOLGA") contagens["FOLGA"]++;
        else contagens["OUTROS"]++;
    });

    // Remove zero
    const dadosStatus = {};
    let total = 0;
    for (const key in contagens) {
        if (contagens[key] > 0) dadosStatus[key] = contagens[key];
        total += contagens[key];
    }
    return total > 0 ? dadosStatus : contagens;
}

// ===================== CORES PARA OS GRÁFICOS =====================
const coresUF = ['#007bff', '#ffc107'];
const coresAreas = ['#007bff', '#dc3545', '#ffc107', '#28a745'];
const coresSupervisor = ['#6f42c1', '#fd7e14'];
const coresStatus = ['#28a745', '#007bff', '#ffc107', '#6c757d', '#dc3545', '#e83e8c', '#17a2b8', '#6610f2', '#f8f9fa', '#343a40'];

// ===================== GRÁFICOS =====================
function renderizarGraficoPizza(canvasId, title, dataMap, backgroundColors) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const labels = Object.keys(dataMap);
    const data = Object.values(dataMap);

    if (charts[canvasId]) charts[canvasId].destroy();

    const total = data.reduce((a, b) => a + b, 0);
    const percentuais = data.map(v => ((v / total) * 100).toFixed(1));

    charts[canvasId] = new Chart(ctx, {
        type: 'pie',
        data: { labels, datasets: [{ label: title, data, backgroundColor: backgroundColors.slice(0, labels.length), hoverOffset: 4 }] },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: title },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.label}: ${context.raw} (${percentuais[context.dataIndex]}%)`;
                        }
                    }
                },
                datalabels: {
                    color: '#fff',
                    formatter: (value, context) => `${percentuais[context.dataIndex]}%`,
                    font: { weight: 'bold', size: 14 }
                }
            }
        }
    });
}

// ===================== FUNÇÃO PRINCIPAL =====================
function carregarDadosEAtualizarGraficos() {
    dataAtual = document.getElementById("dataSelecionada").value || dataAtual;
    document.getElementById("dataSelecionada").value = dataAtual;
    lista = carregarDados(dataAtual);

    renderizarGraficoPizza('graficoUF', 'Técnicos por UF', contarOcorrencias(lista, 'uf'), coresUF);
    renderizarGraficoPizza('graficoArea', 'Técnicos por Área', contarOcorrencias(lista, 'area'), coresAreas);
    renderizarGraficoPizza('graficoSupervisor', 'Técnicos por Supervisor TLP', contarOcorrencias(lista, 'supervisorTLP'), coresSupervisor);
    renderizarGraficoPizza('graficoStatus', 'Técnicos por Condição Técnica', processarStatus(lista), coresStatus);
}

// ===================== LISTA =====================
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
                    ${isAdmin ? `<button class="excluir" onclick="excluir(${index})">X</button>` : `<span style="color:#888;">—</span>`}
                </td>
            </tr>
        `;
    });

    atualizarDashboard();
}

// ===================== DADOS =====================
function adicionar() {
    const uf = document.getElementById("uf").value;
    const recurso = document.getElementById("recurso").value;
    const coordVivo = document.getElementById("coordVivo").value;
    const supervisorTLP = document.getElementById("supervisorTLP").value;
    const coordTLP = document.getElementById("coordTLP").value;
    const status = document.getElementById("status").value;
    const area = document.getElementById("area").value;

    if (!recurso || recurso === "Selecione o Técnico") return alert("Selecione o técnico!");

    lista.push({ uf, recurso, coordVivo, supervisorTLP, coordTLP, status, area });
    salvar(dataAtual);
    render();
}

function excluir(index) {
    lista.splice(index, 1);
    salvar(dataAtual);
    render();
}

// ===================== DASHBOARD =====================
function atualizarDashboard() {
    document.getElementById("totalUF").textContent = lista.filter(p => p.uf === "RJ" || p.uf === "ES").length;
    document.getElementById("totalAREA").textContent = lista.filter(p => ["AZUL", "AMARELA", "VERDE", "VERMELHA"].includes(p.area)).length;
    document.getElementById("totalSUP").textContent = lista.filter(p => p.supervisorTLP === "LUCIANO INACIO DA SILVA" || p.supervisorTLP === "LEANDRO MARTINS ABBUD").length;
    document.getElementById("totalSTATUS").textContent = lista.length;
}

// ===================== ADMIN =====================
function loginAdmin() {
    const senha = prompt("Digite a senha de administrador:");
    if (senha === "1234") { isAdmin = true; alert("Login de administrador realizado!"); render(); }
    else alert("Senha incorreta!");
}

// ===================== CALENDÁRIO =====================
function trocarData() {
    dataAtual = document.getElementById("dataSelecionada").value;
    lista = carregarDados(dataAtual);
    render();
}

// ===================== EXPORTAÇÃO =====================
function exportarExcel() {
    let tabela = document.querySelector("table").outerHTML;
    tabela = tabela.replace(/ /g, '%20');
    const nomeArquivo = `lista_presenca_${new Date().toLocaleDateString('pt-BR')}.xls`;
    const a = document.createElement('a');
    a.href = 'data:application/vnd.ms-excel,' + tabela;
    a.download = nomeArquivo;
    a.click();
}

// ===================== INICIALIZAÇÃO =====================
document.getElementById("dataSelecionada").value = dataAtual;
carregarDadosEAtualizarGraficos();
render();

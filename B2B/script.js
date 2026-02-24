const SUPABASE_URL = 'https://ftouwpfhjwfoupvhsnth.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0b3V3cGZoandmb3VwdmhzbnRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNTk5MzIsImV4cCI6MjA4NTkzNTkzMn0.roTjDn8MWoHVqlGWeZ3s1SqzGv-wxlapZqzfzeJJBCQ';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let idAtualNota = null;

const baseDados = {

    // DADOS RIO DE JANEIRO (RJ) - HIGIENIZADOS (SEM SOBREPOSIÇÃO)
    "ANDRE FRANÇA VIEIRA": { uf: "RJ", super: "RENATO COSTA MOREIRA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "BRUNO NOGUEIRA GONTIJO": { uf: "RJ", super: "CARLOS HENRIQUE DE PAULA BATISTA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "FELIPE DA SILVA FREIRE": { uf: "RJ", super: "RENATO COSTA MOREIRA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "GABRIEL ZULU MARQUES DE OLIVIERA": { uf: "RJ", super: "RENATO COSTA MOREIRA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "GERSON HENRIQUE ALVES CUSTODIO": { uf: "RJ", super: "RENATO COSTA MOREIRA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "GUSTAVO DOS SANTOS FERREIRA": { uf: "RJ", super: "RENATO COSTA MOREIRA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "IAGO VENÂNCIO DA SILVA": { uf: "RJ", super: "RENATO COSTA MOREIRA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "JOEL SEBASTIÃO DE LIMA": { uf: "RJ", super: "RENATO COSTA MOREIRA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "LEONARDO FERREIRA": { uf: "RJ", super: "CARLOS HENRIQUE DE PAULA BATISTA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "SUB - BRZ SYS", micro: "B2B" },
    "CLEYSON ALVES DOS SANTOS (2)": { uf: "RJ", super: "CARLOS HENRIQUE DE PAULA BATISTA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - CENTRO" },
    "MATHEUS FELIPPE PONCE DE OLIVEIRA": { uf: "RJ", super: "CARLOS HENRIQUE DE PAULA BATISTA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "PAULO DANIEL DE OLIVEIRA FREIRE": { uf: "RJ", super: "RENATO COSTA MOREIRA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "RENATO DA CONÇEIÇÃO DE PAULA ARAUJO JUNIOR": { uf: "RJ", super: "RENATO COSTA MOREIRA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "RUAN PEREIRA RIBEIRO": { uf: "RJ", super: "RENATO COSTA MOREIRA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "EDUARDO OSÓRIO": { uf: "RJ", super: "CARLOS HENRIQUE DE PAULA BATISTA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "TIAGO ALVEZ": { uf: "RJ", super: "CARLOS HENRIQUE DE PAULA BATISTA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "LEONARDO FERREIRA DOS REIS": { uf: "RJ", super: "CARLOS HENRIQUE DE PAULA BATISTA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "SUB - BRZ SYS", micro: "B2B" },
    "ALEXANDRE ROBERTO LOPES": { uf: "RJ", super: "RENATO COSTA MOREIRA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "EDUARDO AUGUSTO BENTO": { uf: "RJ", super: "RENATO COSTA MOREIRA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "LEANDRO SANTOS DE ALMEIDA": { uf: "RJ", super: "RENATO COSTA MOREIRA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "ALEXSSANDRO PEDRO ARAUJO DE FREITAS (2)": { uf: "RJ", super: "CARLOS HENRIQUE DE PAULA BATISTA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "B2B" },
    "ARCHIMEDES DA COSTA NUNES LOPES": { uf: "RJ", super: "CARLOS HENRIQUE DE PAULA BATISTA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "B2B" },
    "EDUARDO VIEGAS OSORIO": { uf: "RJ", super: "CARLOS HENRIQUE DE PAULA BATISTA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "B2B" },
    "FABIO MORAIS ": { uf: "RJ", super: "CARLOS HENRIQUE DE PAULA BATISTA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "B2B" },
    "IGOR DE MORAES VENTURA NERI": { uf: "RJ", super: "CARLOS HENRIQUE DE PAULA BATISTA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "B2B" },
    "RICARDO CRISTIANO FERREIRA MOTTA": { uf: "RJ", super: "CARLOS HENRIQUE DE PAULA BATISTA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "B2B" },
    "EDSON VANDER PAIXAO (1)": { uf: "RJ", super: "CARLOS HENRIQUE DE PAULA BATISTA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "B2B" },
    "FABIO MORAES RAMOS": { uf: "RJ", super: "CARLOS HENRIQUE DE PAULA BATISTA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "B2B" },
    "LUAN VITOR CANDIDO DOS SANTOS": { uf: "RJ", super: "CARLOS HENRIQUE DE PAULA BATISTA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "B2B" },
    "YGOR DE MORAIS": { uf: "RJ", super: "CARLOS HENRIQUE DE PAULA BATISTA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "B2B" },
    "RODRIGO GOMEZ AZEVEDO": { uf: "RJ", super: "CARLOS HENRIQUE DE PAULA BATISTA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "VITOR EDUARDO ROCHA SILVA": { uf: "RJ", super: "RENATO COSTA MOREIRA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "LEANDRO MACEDO DO COUTO": { uf: "RJ", super: "CARLOS HENRIQUE DE PAULA BATISTA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "SUB - BRZ SYS", micro: "B2B" },
    "TIAGO DE ARAUJO MARTINS": { uf: "RJ", super: "RENATO COSTA MOREIRA", coord: "ALEXSANDRO MALAQUIAS", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },


};

const listaStatus = ["PRESENTE", "PRESENTE - CONJUNTA", "PRESENTE - FORMATAÇÃO", "PRESENTE - PREVENTIVA", "FALTA", "INTERJORNADA(10h)", "INTERJORNADA(12H)", "INTERMEDIÁRIO (13h)", "INTERJORNADA(13h)", "INTERJORNADA(16h)", "INTERJORNADA (SEM RETORNO)", "NOTURNO", "FÉRIAS", "INSS", "ATESTADO", "FOLGA", "DESLIGADO"];

async function checarSessao() {
    const { data: { session } } = await _supabase.auth.getSession();
    if (session) {
        document.getElementById('login-view').classList.add('hidden');
        document.getElementById('dashboard-view').classList.remove('hidden');
        inicializarApp();
    }
}

async function realizarLogin() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;
    const { error } = await _supabase.auth.signInWithPassword({ email, password: pass });
    if (error) document.getElementById('login-erro').innerText = "Erro: " + error.message;
    else location.reload();
}

async function realizarLogout() {
    await _supabase.auth.signOut();
    location.reload();
}

function inicializarApp() {
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('dataSelecionada').value = hoje;
    gerarRadiosStatus();
    atualizarTabela();
}

window.onload = checarSessao;

function toggleSection(sectionId, headerEl) {
    const section = document.getElementById(sectionId);
    section.classList.toggle('hidden');
    headerEl.classList.toggle('collapsed');
}

function gerarRadiosStatus() {
    const container = document.getElementById('statusRadios');
    container.innerHTML = listaStatus.map(s => `
        <label class="item-check">
            <input type="radio" name="status" value="${s}"> ${s}
        </label>
    `).join('');
}

function filtrarSupervisores() {
    const uf = document.getElementById('uf').value;
    const supervisores = [...new Set(Object.values(baseDados).filter(d => d.uf === uf).map(d => d.super))].sort();
    const select = document.getElementById('supervisorTLP');
    select.innerHTML = '<option disabled selected value="">2º Selecione o Supervisor</option>' +
        supervisores.map(s => `<option value="${s}">${s}</option>`).join('');
    document.getElementById('colaboradoresCheckboxes').innerHTML = '';
}

function filtrarColaboradores() {
    const superv = document.getElementById('supervisorTLP').value;
    const colabs = Object.keys(baseDados).filter(nome => baseDados[nome].super === superv).sort();
    const container = document.getElementById('colaboradoresCheckboxes');
    container.innerHTML = colabs.map(c => `
        <label class="item-check">
            <input type="checkbox" name="colab" value="${c}"> ${c}
        </label>
    `).join('');
}

async function importarPlanilha(event) {
    const arquivo = event.target.files[0];
    if (!arquivo) return;
    const dataHoje = document.getElementById('dataSelecionada').value;

    const leitor = new FileReader();
    leitor.onload = async (e) => {
        const dadosExcel = new Uint8Array(e.target.result);
        const workbook = XLSX.read(dadosExcel, { type: 'array' });
        const primeiraAba = workbook.SheetNames[0];
        const linhas = XLSX.utils.sheet_to_json(workbook.Sheets[primeiraAba]);

        let inseridos = [];
        let naoEncontrados = [];

        for (let linha of linhas) {
            const chaveNome = Object.keys(linha).find(k => k.toLowerCase().trim() === 'colaborador');
            const chaveStatus = Object.keys(linha).find(k => k.toLowerCase().trim() === 'status');

            if (chaveNome) {
                const nomeOriginal = linha[chaveNome].toString().trim().toUpperCase();
                const statusLido = chaveStatus ? linha[chaveStatus].toString().trim().toUpperCase() : "PRESENTE";

                if (baseDados[nomeOriginal]) {
                    inseridos.push({
                        data: dataHoje,
                        uf: baseDados[nomeOriginal].uf,
                        empresa: baseDados[nomeOriginal].empresa,
                        micro_area: baseDados[nomeOriginal].micro,
                        colaborador: nomeOriginal,
                        supervisor: baseDados[nomeOriginal].super,
                        coordenador: baseDados[nomeOriginal].coord,
                        gerente_tlp: baseDados[nomeOriginal].gerente,
                        status: statusLido,
                        observacao: ""
                    });
                } else {
                    naoEncontrados.push(nomeOriginal);
                }
            }
        }

        if (inseridos.length > 0) {
            const { error } = await _supabase.from('registros_presenca').insert(inseridos);
            if (error) alert("Erro ao salvar no banco: " + error.message);
            else {
                let msg = `${inseridos.length} registros importados!`;
                if (naoEncontrados.length > 0) msg += `\n\n${naoEncontrados.length} nomes não foram encontrados na baseDados.`;
                alert(msg);
                atualizarTabela();
            }
        } else {
            alert("Nenhum dado válido encontrado. Verifique o cabeçalho 'Colaborador'.");
        }
        event.target.value = "";
    };
    leitor.readAsArrayBuffer(arquivo);
}

async function salvarPresenca() {
    const data = document.getElementById('dataSelecionada').value;
    const colabs = Array.from(document.querySelectorAll('input[name="colab"]:checked')).map(i => i.value);
    const status = document.querySelector('input[name="status"]:checked')?.value;
    if (!data || colabs.length === 0 || !status) return alert("Por favor, selecione a data, os colaboradores e o status.");

    const registros = colabs.map(nome => ({
        data,
        uf: baseDados[nome].uf,
        empresa: baseDados[nome].empresa,
        micro_area: baseDados[nome].micro,
        colaborador: nome,
        supervisor: baseDados[nome].super,
        coordenador: baseDados[nome].coord,
        gerente_tlp: baseDados[nome].gerente,
        status
    }));

    const { error } = await _supabase.from('registros_presenca').insert(registros);
    if (error) alert("Erro ao salvar: " + error.message);
    else {
        alert("Presença lançada!");
        document.querySelectorAll('input[name="colab"]').forEach(i => i.checked = false);
        atualizarTabela();
    }
}

async function atualizarTabela() {
    const data = document.getElementById('dataSelecionada').value;
    if (!data) return;
    const { data: registros, error } = await _supabase.from('registros_presenca').select('*').eq('data', data).order('colaborador', { ascending: true });
    if (error) return;
    const tbody = document.getElementById('lista');
    tbody.innerHTML = registros.map(r => `
        <tr>
            <td>${r.uf}</td><td>${r.empresa}</td><td>${r.micro_area}</td>
            <td>${r.colaborador}</td><td>${r.supervisor}</td><td>${r.coordenador}</td>
            <td>${r.gerente_tlp}</td><td>${r.status}</td>
            <td>
                <button class="btn-note" onclick="abrirNotas('${r.id}', \`${r.observacao || ''}\`)">📝</button>
                <button class="btn-del" onclick="deletar('${r.id}')">🗑️</button>
            </td>
        </tr>
    `).join('');
    atualizarDashboard(registros);
    document.getElementById('inputBusca').value = "";
}

function filtrarTabela() {
    const input = document.getElementById("inputBusca");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("tabelaPresenca");
    const tr = table.getElementsByTagName("tr");
    for (let i = 1; i < tr.length; i++) {
        let colabCell = tr[i].getElementsByTagName("td")[3];
        let ufCell = tr[i].getElementsByTagName("td")[0];
        if (colabCell || ufCell) {
            let txtValueColab = colabCell.textContent || colabCell.innerText;
            let txtValueUF = ufCell.textContent || ufCell.innerText;
            if (txtValueColab.toUpperCase().indexOf(filter) > -1 || txtValueUF.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function abrirNotas(id, texto) {
    idAtualNota = id;
    document.getElementById("modalId").innerText = id;
    document.getElementById("notaTexto").value = texto;
    document.getElementById("modalNotas").style.display = "block";
}

function fecharModal() {
    document.getElementById("modalNotas").style.display = "none";
}

async function salvarNotaBD() {
    const texto = document.getElementById("notaTexto").value;
    const { error } = await _supabase.from('registros_presenca').update({ observacao: texto }).eq('id', idAtualNota);
    if (error) alert("Erro: " + error.message);
    else {
        alert("Nota salva!");
        fecharModal();
        atualizarTabela();
    }
}

function atualizarDashboard(regs) {
    document.getElementById('count-uf').innerText = [...new Set(regs.map(r => r.uf))].length;
    document.getElementById('count-empresa').innerText = [...new Set(regs.map(r => r.empresa))].length;
    document.getElementById('count-colab').innerText = regs.length;
    document.getElementById('count-super').innerText = [...new Set(regs.map(r => r.supervisor))].length;
    document.getElementById('count-gerente').innerText = [...new Set(regs.map(r => r.gerente_tlp))].length;
}

async function deletar(id) {
    if (confirm("Excluir este registro?")) {
        await _supabase.from('registros_presenca').delete().eq('id', id);
        atualizarTabela();
    }
}

window.onclick = function (event) {
    if (event.target == document.getElementById("modalNotas")) fecharModal();
}
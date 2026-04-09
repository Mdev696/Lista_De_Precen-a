const SUPABASE_URL = 'https://ftouwpfhjwfoupvhsnth.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0b3V3cGZoandmb3VwdmhzbnRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNTk5MzIsImV4cCI6MjA4NTkzNTkzMn0.roTjDn8MWoHVqlGWeZ3s1SqzGv-wxlapZqzfzeJJBCQ';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let idAtualNota = null;
let tecnicosCache = [];

// --- VARIÁVEIS DE CONTROLE DE EXIBIÇÃO ---
let registrosFiltrados = [];
let registrosOriginal = [];
let paginaAtual = 1;
const registrosPorPagina = 25;

const listaStatus = ["PRESENTE", "PRESENTE - CONJUNTA (SWAP/N1)", "PRESENTE - FORMATAÇÃO", "PRESENTE - PREVENTIVA", "FALTA", "INTERJORNADA(10h)", "INTERJORNADA(12H)", "INTERMEDIÁRIO (13h)", "INTERJORNADA(13h)", "INTERJORNADA(16h)", "INTERJORNADA (SEM RETORNO)", "NOTURNO", "FÉRIAS", "INSS", "ATESTADO", "FOLGA", "DESLIGADO", "DUPLADO", "FROTA"];

// --- 1. GESTÃO DE ACESSO ---
async function checarSessao() {
    const { data: { session } } = await _supabase.auth.getSession();
    if (session) {
        // Lógica de Saudação (Apenas Primeiro Nome)
        const emailUsuario = session.user.email;
        const parteAntesDoArroba = emailUsuario.split('@')[0];
        const primeiroNomeRaw = parteAntesDoArroba.split(/[\._-]/)[0];
        const primeiroNome = primeiroNomeRaw.charAt(0).toUpperCase() + primeiroNomeRaw.slice(1).toLowerCase();

        const saudacaoEl = document.getElementById('boas-vindas');
        if (saudacaoEl) {
            saudacaoEl.innerText = `Olá, bem-vindo de volta, ${primeiroNome}!`;
        }

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

// --- 2. INICIALIZAÇÃO ---
async function inicializarApp() {
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('dataSelecionada').value = hoje;

    await carregarTecnicosDoBanco();
    gerarRadiosStatus();
    atualizarTabela();
    atualizarOpcoesCadastro();
}

async function carregarTecnicosDoBanco() {
    const { data, error } = await _supabase.from('tecnicos').select('*');
    if (error) console.error("Erro ao carregar técnicos:", error.message);
    else tecnicosCache = data;
}

// --- 3. LOGICA DO DASHBOARD E FILTROS ---
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
    const supervisores = [...new Set(tecnicosCache.filter(d => d.uf === uf).map(d => d.supervisor))].sort();
    const select = document.getElementById('supervisorTLP');
    select.innerHTML = '<option disabled selected value="">2º Selecione o Supervisor</option>' +
        supervisores.map(s => `<option value="${s}">${s}</option>`).join('');
    document.getElementById('colaboradoresCheckboxes').innerHTML = '';
}

function filtrarColaboradores() {
    const superv = document.getElementById('supervisorTLP').value;
    const colabs = tecnicosCache.filter(t => t.supervisor === superv).sort((a, b) => a.nome.localeCompare(b.nome));
    const container = document.getElementById('colaboradoresCheckboxes');
    container.innerHTML = colabs.map(c => `
        <label class="item-check">
            <input type="checkbox" name="colab" value="${c.nome}"> ${c.nome}
        </label>
    `).join('');
}

// --- 4. FUNÇÕES DE PERSISTÊNCIA (SALVAR / CADASTRAR) ---

async function cadastrarNovoNaBase() {
    const nomeInput = document.getElementById('new-nome').value.toUpperCase().trim();

    // TRAVA 1: Verifica se o técnico já existe no cadastro
    const jaExisteCadastro = tecnicosCache.some(t => t.nome === nomeInput);
    if (jaExisteCadastro) {
        return alert("ERRO: Já existe um colaborador cadastrado com este nome!");
    }

    const novo = {
        uf: document.getElementById('new-uf').value,
        empresa: document.getElementById('new-empresa').value || 'TLP SERVIÇOS',
        cluster: document.getElementById('new-micro').value.toUpperCase(),
        nome: nomeInput,
        supervisor: document.getElementById('new-super').value.toUpperCase(),
        coordenador: document.getElementById('new-coord').value.toUpperCase(),
        gerente: document.getElementById('new-gerente').value.toUpperCase()
    };

    if (!novo.nome || !novo.supervisor) return alert("Nome e Supervisor são obrigatórios!");

    const { error } = await _supabase.from('tecnicos').insert([novo]);
    if (error) alert("Erro ao cadastrar na base: " + error.message);
    else {
        alert("Colaborador cadastrado com sucesso!");
        await carregarTecnicosDoBanco();
        atualizarOpcoesCadastro();
        ['new-empresa', 'new-micro', 'new-nome', 'new-super', 'new-coord', 'new-gerente'].forEach(id => document.getElementById(id).value = '');
    }
}

async function salvarPresenca() {
    const data = document.getElementById('dataSelecionada').value;
    const colabsSelecionados = Array.from(document.querySelectorAll('input[name="colab"]:checked')).map(i => i.value);
    const status = document.querySelector('input[name="status"]:checked')?.value;

    if (!data || colabsSelecionados.length === 0 || !status) return alert("Selecione data, colaboradores e status.");

    // TRAVA 2: Verifica se o técnico já tem presença lançada NESTA DATA
    const jaLancados = colabsSelecionados.filter(nome =>
        registrosOriginal.some(r => r.tecnico === nome && r.data === data)
    );

    if (jaLancados.length > 0) {
        return alert(`ERRO: Presença já lançada hoje para:\n${jaLancados.join('\n')}`);
    }

    const registros = colabsSelecionados.map(nome => {
        const info = tecnicosCache.find(t => t.nome === nome);
        return {
            data: data,
            tecnico: info.nome,
            uf: info.uf,
            supervisor: info.supervisor,
            coordenador: info.coordenador,
            gerente_tlp: info.gerente,
            status: status,
            empresa: info.empresa || "TLP SERVIÇOS",
            cluster: info.cluster || ""
        };
    });

    const { error } = await _supabase.from('presencas').insert(registros);
    if (error) alert("Erro ao salvar: " + error.message);
    else {
        alert("Presença lançada com sucesso!");
        document.querySelectorAll('input[name="colab"]').forEach(i => i.checked = false);
        atualizarTabela();
    }
}

// --- 5. TABELA, BUSCA E PAGINAÇÃO ---

async function atualizarTabela() {
    const data = document.getElementById('dataSelecionada').value;
    if (!data) return;

    const { data: registros, error } = await _supabase
        .from('presencas')
        .select('*')
        .eq('data', data)
        .order('tecnico', { ascending: true });

    if (error) return;

    registrosOriginal = registros;
    registrosFiltrados = registros;
    paginaAtual = 1;
    exibirPagina();
    atualizarDashboard(registros);
}

function exibirPagina() {
    const tbody = document.getElementById('lista');
    const inicio = (paginaAtual - 1) * registrosPorPagina;
    const fim = inicio + registrosPorPagina;
    const paginados = registrosFiltrados.slice(inicio, fim);

    tbody.innerHTML = paginados.map(r => `
        <tr>
            <td>${r.uf}</td>
            <td>${r.empresa || ''}</td>
            <td>${r.cluster || ''}</td> 
            <td>${r.tecnico}</td>
            <td>${r.supervisor}</td>
            <td>${r.coordenador}</td>
            <td>${r.gerente_tlp}</td>
            <td>${r.status}</td>
            <td>
                <button class="btn-note" onclick="abrirNotas('${r.id}', \`${r.observacao || ''}\`)">📝</button>
                <button class="btn-del" onclick="deletar('${r.id}')">🗑️</button>
            </td>
        </tr>
    `).join('');

    renderizarControlesPaginacao();
}

function renderizarControlesPaginacao() {
    const totalPaginas = Math.ceil(registrosFiltrados.length / registrosPorPagina);
    let container = document.getElementById('paginacao-controles');

    if (!container) {
        container = document.createElement('div');
        container.id = 'paginacao-controles';
        container.style.textAlign = 'center';
        container.style.marginTop = '20px';
        container.style.padding = '10px';
        document.getElementById('tabelaPresenca').after(container);
    }

    container.innerHTML = `
        <button onclick="mudarPagina(-1)" ${paginaAtual === 1 ? 'disabled' : ''} style="padding: 5px 15px; cursor: pointer;">Anterior</button>
        <span style="margin: 0 15px">Página <strong>${paginaAtual}</strong> de ${totalPaginas || 1}</span>
        <button onclick="mudarPagina(1)" ${paginaAtual >= totalPaginas ? 'disabled' : ''} style="padding: 5px 15px; cursor: pointer;">Próximo</button>
    `;
}

function mudarPagina(direcao) {
    paginaAtual += direcao;
    exibirPagina();
}

function filtrarTabela() {
    const filter = document.getElementById("inputBusca").value.toUpperCase();
    registrosFiltrados = registrosOriginal.filter(r => {
        const searchString = `${r.tecnico} ${r.supervisor} ${r.cluster} ${r.status}`.toUpperCase();
        return searchString.includes(filter);
    });
    paginaAtual = 1;
    exibirPagina();
}

// --- 6. MODAL E UTILITÁRIOS ---
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
    const { error } = await _supabase.from('presencas').update({ observacao: texto }).eq('id', idAtualNota);
    if (error) alert("Erro: " + error.message);
    else {
        alert("Nota salva!");
        fecharModal();
        atualizarTabela();
    }
}

async function deletar(id) {
    if (confirm("Excluir este registro?")) {
        await _supabase.from('presencas').delete().eq('id', id);
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

// --- 7. SUGESTÕES DINÂMICAS PARA CADASTRO ---
function atualizarOpcoesCadastro() {
    const campos = {
        'list-supers': 'supervisor',
        'list-coords': 'coordenador',
        'list-gerentes': 'gerente'
    };

    for (let idList in campos) {
        const coluna = campos[idList];
        const datalist = document.getElementById(idList);
        if (!datalist) continue;

        const valores = [...new Set(tecnicosCache.map(t => t[coluna]))]
            .filter(v => v)
            .sort();

        datalist.innerHTML = valores.map(v => `<option value="${v}">`).join('');
    }
}

window.onload = checarSessao;
window.onclick = (event) => {
    if (event.target == document.getElementById("modalNotas")) fecharModal();
};
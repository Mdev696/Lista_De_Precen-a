// Configurações de Conexão com o Banco de Dados
const SUPABASE_URL = 'https://ftouwpfhjwfoupvhsnth.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0b3V3cGZoandmb3VwdmhzbnRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNTk5MzIsImV4cCI6MjA4NTkzNTkzMn0.roTjDn8MWoHVqlGWeZ3s1SqzGv-wxlapZqzfzeJJBCQ';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let idAtualNota = null;

// Base de Dados de Colaboradores
const baseDados = {
    // RIO DE JANEIRO (RJ)
    "RODOLPHO JOSE TAVARES": { uf: "RJ", super: "LEANDRO MARTINS ABBUD", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERMELHA - INTERIOR" },
    "ALAN PETRILHO HONORIO": { uf: "RJ", super: "LEANDRO MARTINS ABBUD", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERMELHA - INTERIOR" },
    "MAX EMILIANO INACIO DA ROCHA": { uf: "RJ", super: "LEANDRO MARTINS ABBUD", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERMELHA - INTERIOR" },
    "VAUSLEY DA SILVA COUTINHO": { uf: "RJ", super: "LEANDRO MARTINS ABBUD", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERMELHA - INTERIOR" },
    "IAN MACIEL ALVES DA SILVA": { uf: "RJ", super: "RODRIGO CUNHA DE LIMA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "NOTURNO" },
    "WILLAN TORRES": { uf: "RJ", super: "LUCIANO INACIO DA SILVA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERMELHA - BAIXADA" },
    "GABRIEL RODRIGUES DA SILVA": { uf: "RJ", super: "LUCIANO INACIO DA SILVA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERMELHA - CAXIAS" },
    "GABRIEL EMANUEL DOS SANTOS TORRES": { uf: "RJ", super: "LUCIANO INACIO DA SILVA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERMELHA - CAXIAS" },
    "THALLES EDUARDO MARQUES BORGES": { uf: "RJ", super: "DIEGO CARDOSO", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AMARELA" },
    "MIGUEL PEREIRA GIMENES JUNIOR": { uf: "RJ", super: "DIEGO CARDOSO", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AMARELA" },
    "CHRISTIANO SUZANO BARCELOS": { uf: "RJ", super: "RICARDO LUIZ SANTA ROSA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "NOTURNO" },
    "IVANILDO EDUARDO DE LIMA NETO": { uf: "RJ", super: "LUCIANO INACIO DA SILVA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERMELHA - BAIXADA" },
    "LUCAS OLIVEIRA NUNES": { uf: "RJ", super: "LUCIANO INACIO DA SILVA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERMELHA - BAIXADA" },
    "WILLAN TORRES ": { uf: "RJ", super: "LUCIANO INACIO DA SILVA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERMELHA - BAIXADA" },
    "HIAGO MARQUES RUAS": { uf: "RJ", super: "DIEGO CARDOSO", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AMARELA" },
    "BRUNO DE LIMA SALLES": { uf: "RJ", super: "DIEGO CARDOSO", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AMARELA" },
    "FELIPE MIRANDA DE OLIVEIRA": { uf: "RJ", super: "DIEGO CARDOSO", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AMARELA" },
    "PEDRO PAULO CARVALHO SALEMA": { uf: "RJ", super: "DIEGO CARDOSO", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AMARELA" },
    "WALLACE FERREIRA": { uf: "RJ", super: "LUCIANO INACIO DA SILVA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERMELHA - CAXIAS" },
    "WILLIAM CORDEIRO DE MOURA": { uf: "RJ", super: "DIEGO CARDOSO", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AMARELA" },
    "ROGERIO GOMES DA SILVA": { uf: "RJ", super: "LUCIANO INACIO DA SILVA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERMELHA - CAXIAS" },
    "IAGO DAVI D AVILA DAMAZIO": { uf: "RJ", super: "LEANDRO MARTINS ABBUD", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERMELHA - INTERIOR" },
    "DAVID DE OLIVEIRA CARDOSO": { uf: "RJ", super: "CLOVIS BATISTA TORRES JUNIOR", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERDE" },
    "THALLES ROCHA CASTELIANO": { uf: "RJ", super: "CLOVIS BATISTA TORRES JUNIOR", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERDE" },
    "LUCAS PEREIRA BONFIM": { uf: "RJ", super: "CLOVIS BATISTA TORRES JUNIOR", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERDE" },
    "MATHEUS DA SILVA TORRES": { uf: "RJ", super: "CLOVIS BATISTA TORRES JUNIOR", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERDE" },
    "THIAGO PINTO EUGENIO": { uf: "RJ", super: "BRENO BEZERRA CORREA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERMELHA - BAIXADA" },
    "GABRIEL DA SILVA COSTA": { uf: "RJ", super: "BRENO BEZERRA CORREA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERMELHA - BAIXADA" },
    "MAX WILLIANFURTADO DE JESUS": { uf: "RJ", super: "BRENO BEZERRA CORREA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERMELHA - BAIXADA" },
    "JONATHAN SANTOS DA SILVA": { uf: "RJ", super: "BRENO BEZERRA CORREA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERMELHA - BAIXADA" },
    "MOISES GOMES DA SILVA FILHO": { uf: "RJ", super: "BRENO BEZERRA CORREA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERMELHA - BAIXADA" },
    "MATEUS DINIZ": { uf: "RJ", super: "BRENO BEZERRA CORREA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERMELHA - BAIXADA" },
    "MATEUS FONSECA DINIZ": { uf: "RJ", super: "BRENO BEZERRA CORREA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERMELHA - BAIXADA" },
    "RODRIGO BANNY DA SILVA": { uf: "RJ", super: "BRENO BEZERRA CORREA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERMELHA - BAIXADA" },
    "ALLAN CESAR SILVA DE SOUZA": { uf: "RJ", super: "ADRIANO TEIXEIRA PINHEIRO", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - BARRA/JPA" },
    "VICTOR HUGO DE SOUZA KLEN": { uf: "RJ", super: "ADRIANO TEIXEIRA PINHEIRO", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - BARRA/JPA" },
    "JEAN CARLOS SILVA DO NASCIMENTO": { uf: "RJ", super: "ADRIANO TEIXEIRA PINHEIRO", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - SUL" },
    "MARIO CESAR RODRIGUES DOS SANTOS": { uf: "RJ", super: "ADRIANO TEIXEIRA PINHEIRO", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - BARRA/JPA" },
    "LUCAS CONTES MOREIRA": { uf: "RJ", super: "ADRIANO TEIXEIRA PINHEIRO", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - SUL" },
    "FELIPE SILVA DE LIMA": { uf: "RJ", super: "HAROLDO SANT ANNA DA CUNHA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - CENTRO" },
    "WILLIAM CESAR NASCIMENTO SILVA": { uf: "RJ", super: "HAROLDO SANT ANNA DA CUNHA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - NORTE" },
    "MARCELO LUIZ LEITE": { uf: "RJ", super: "HAROLDO SANT ANNA DA CUNHA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - NORTE" },
    "LEANDRO ALBERTO CORREA BERREDO": { uf: "RJ", super: "HAROLDO SANT ANNA DA CUNHA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - NORTE" },
    "ALEX SANTOS PEREIRA DA CRUZ": { uf: "RJ", super: "HAROLDO SANT ANNA DA CUNHA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - NORTE" },
    "MATEUS BATISTA DA CUNHA": { uf: "RJ", super: "HAROLDO SANT ANNA DA CUNHA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - NORTE" },
    "FABIO EUGENIO GONCALVES": { uf: "RJ", super: "HAROLDO SANT ANNA DA CUNHA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - NORTE" },
    "RAMON PEREIRA": { uf: "RJ", super: "HAROLDO SANT ANNA DA CUNHA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - NORTE" },
    "WALLACE DA CONCEICAO PEREIRA": { uf: "RJ", super: "HAROLDO SANT ANNA DA CUNHA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - CENTRO" },
    "CLEYSON ALVES DOS SANTOS": { uf: "RJ", super: "HAROLDO SANT ANNA DA CUNHA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - CENTRO" },
    "LEANDERSON MARCOS VIEIRA DA SILVA": { uf: "RJ", super: "ROMULO E SILVA CABRAL", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - NORTE" },
    "ALESSANDER SANTOS DOMINGOS": { uf: "RJ", super: "ROMULO E SILVA CABRAL", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - GRAN.TIJUCA" },
    "ROMEU DO NASCIMENTO VALENTE": { uf: "RJ", super: "ROMULO E SILVA CABRAL", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - GRAN.TIJUCA" },
    "ALEXSSANDRO PEDRO ARAUJO DE FREITAS": { uf: "RJ", super: "ROMULO E SILVA CABRAL", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - GRAN.TIJUCA" },
    "THIAGO DE OLIVEIRA FONSECA": { uf: "RJ", super: "ROMULO E SILVA CABRAL", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - OESTE" },
    "NILTON VIEIRA DA SILVA": { uf: "RJ", super: "ROMULO E SILVA CABRAL", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - OESTE" },
    "REGINALDO AVELINO": { uf: "RJ", super: "ROMULO E SILVA CABRAL", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - OESTE" },
    "ATILA VICTORIO MOCO": { uf: "RJ", super: "ROMULO E SILVA CABRAL", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - OESTE" },
    "CARLOS EDUARDO LACERDA DE OLIVEIRA": { uf: "RJ", super: "ROMULO E SILVA CABRAL", coord: "IVSON PEREIRA COELHO JUNIOR", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - OESTE" },
    "ANDRE FRANÇA VIEIRA": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "BRUNO NOGUEIRA GONTIJO": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "FELIPE DA SILVA FREIRE": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "GABRIEL ZULU MARQUES DE OLIVIERA": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "GUSTAVO DOS SANTOS FERREIRA": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "IAGO VENÂNCIO DA SILVA": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "JOEL SEBASTIÃO DE LIMA": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "LEONARDO FERREIRA DOS REIS": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "ALEXANDRE ROBERTO LOPES": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "EDUARDO AUGUSTO BENTO": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "LEANDRO SANTOS DE ALMEIDA": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "ALEXSSANDRO PEDRO ARAUJO DE FREITAS": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "CLEYSON ALVES DOS SANTOS": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "EDSON VANDER PAIXAO": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "LUAN VITOR CANDIDO DOS SANTOS": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "FABIO MORAES RAMOS": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "YGOR DE MORAIS": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "LEONARDO FERREIRA": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - BRZ SYS", micro: "B2B" },
    "MATHEUS FELIPE PONCE DE OLIVEIRA": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "PAULO DANIEL DE OLIVEIRA FREIRE": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "RENATO DA CONÇEIÇÃO DE PAULA ARAUJO JUNOR": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "RUAN PEREIRA RIBEIRO": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "EDUARDO OSÓRIO": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "TIAGO ALVEZ": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "RODRIGO GOMEZ AZEVEDO": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "VITOR EDUARDO ROCHA SILVA": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "LEANDRO MACEDO DO COUTO": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - BRZ SYS", micro: "B2B" },
    "TIAGO DE ARAUJO MARTINS": { uf: "RJ", super: "ALEXSANDRO MALAQUIAS", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "SUB - LUZ TELECOM", micro: "B2B" },
    "FABIO RODRIGO SAIEGH DUARTE": { uf: "RJ", super: "HAROLDO SANT ANNA DA CUNHA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - NORTE" },
    "WAGNER FERNANDES DOS SANTOS": { uf: "RJ", super: "HAROLDO SANT ANNA DA CUNHA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - GRAN.TIJUCA" },
    "MARCIO DE OLIVEIRA DA SILVA": { uf: "RJ", super: "HAROLDO SANT ANNA DA CUNHA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - NORTE" },
    "SAMUEL FIRMINO DE OLIVEIRA": { uf: "RJ", super: "HAROLDO SANT ANNA DA CUNHA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - NORTE" },
    "STEFANO EDUARDO AGUIAR SILVA": { uf: "RJ", super: "HAROLDO SANT ANNA DA CUNHA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - NORTE" },
    "FABIANO OLIVEIRA DA SILVA": { uf: "RJ", super: "HAROLDO SANT ANNA DA CUNHA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "AZUL - NORTE" },
    "EDSON VANDER PAIXAO": { uf: "RJ", super: "BRENO BEZERRA CORREA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERMELHA - BAIXADA" },
    "FABIANO DE SANTANA ANDRADE": { uf: "RJ", super: "BRENO BEZERRA CORREA", coord: "MARCELO ROCHA BATISTA", gerente: "FABRICIO LEAL", empresa: "TLP SERVIÇOS", micro: "VERMELHA - BAIXADA" },

    // ESPÍRITO SANTO (ES)
    "RAYAN SILVEIRA SCHAIDER": { uf: "ES", super: "RENAN ALVARINTO", coord: "LUCAS PERES", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "CACHOEIRO" },
    "RONEY MELO SANTOS": { uf: "ES", super: "RENAN ALVARINTO", coord: "LUCAS PERES", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "ICONHA" },
    "DIOSE ALENCAR DE SOUZA": { uf: "ES", super: "RENAN ALVARINTO", coord: "LUCAS PERES", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "ICONHA" },
    "JONATAS SANTOS DOS ANJOS": { uf: "ES", super: "PABLO BATISTA", coord: "LUCAS PERES", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "GUARAPARI" },
    "PATRICK HENRIQUE ALVES DE OLIV": { uf: "ES", super: "LIVIO MOREIRA", coord: "LUCAS PERES", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "GUARAPARI" },
    "JOAIS SANTOS DE OLIVEIRA": { uf: "ES", super: "ITALO COELHO", coord: "THIAGO JACOB", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "SERRA" },
    "DAVID COSTA MIRANDA": { uf: "ES", super: "PABLO BATISTA", coord: "LUCAS PERES", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "VILA VELHA" },
    "MARCELO PEREIRA DOS SANTOS": { uf: "ES", super: "BRUNO ALCANTARA", coord: "THIAGO JACOB", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "VILA VELHA" },
    "RAFAEL GUASTI MARTINS": { uf: "ES", super: "PABLO BATISTA", coord: "LUCAS PERES", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "CARIACICA" },
    "BRENO NICOLAU VALASCO DA SILVA": { uf: "ES", super: "PABLO BATISTA", coord: "LUCAS PERES", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "CARIACICA" },
    "IGOR MAGNO MARTINS LEITE": { uf: "ES", super: "PABLO BATISTA", coord: "LUCAS PERES", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "CARIACICA" },
    "WARLEY CARVALHO BERNADES": { uf: "ES", super: "LIVIO MOREIRA", coord: "LUCAS PERES", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "CARIACICA" },
    "DOUGLAS NUNES DA COSTA": { uf: "ES", super: "PABLO BATISTA", coord: "LUCAS PERES", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "CARIACICA" },
    "KAIQUE DE MELO DE SOUZA": { uf: "ES", super: "BRUNO ALCANTARA", coord: "THIAGO JACOB", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "CARIACICA" },
    "PABLO DOS SANTOS": { uf: "ES", super: "BRUNO ALCANTARA", coord: "THIAGO JACOB", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "CARIACICA" },
    "ANDRE DOS SANTOS FUKS": { uf: "ES", super: "BRUNO ALCANTARA", coord: "THIAGO JACOB", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "SERRA" },
    "DEILSON DOS SANTOS SOUZA": { uf: "ES", super: "ITALO COELHO", coord: "THIAGO JACOB", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "SERRA" },
    "WETHYLLEY DO CARMO NETO": { uf: "ES", super: "BRUNO ALCANTARA", coord: "THIAGO JACOB", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "SÃO MATEUS" },
    "WDSON NASCIMENTO DO CARMO": { uf: "ES", super: "ITALO COELHO", coord: "THIAGO JACOB", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "SÃO MATEUS" },
    "VALDECI DOS REIS ANTUNES": { uf: "ES", super: "BRUNO ALCANTARA", coord: "THIAGO JACOB", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "LINHARES" },
    "EMANUEL MARTINS DE MORAES": { uf: "ES", super: "LIVIO MOREIRA", coord: "LUCAS PERES", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "CARIACICA" },
    "LUCAS SANTOS DE ALMEIDA": { uf: "ES", super: "ITALO COELHO", coord: "THIAGO JACOB", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "SERRA" },
    "CARLOS EDUARDO MENDONÇA": { uf: "ES", super: "ITALO COELHO", coord: "THIAGO JACOB", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "COLATINA" },
    "EMANUEL FREITAS OTT": { uf: "ES", super: "ITALO COELHO", coord: "THIAGO JACOB", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "VIANA" },
    "LORRAN PEREIRA DA SILVA": { uf: "ES", super: "LIVIO MOREIRA", coord: "LUCAS PERES", gerente: "PAULO RADAELLI", empresa: "TLP SERVIÇOS", micro: "CARIACICA" }
};

const listaStatus = ["PRESENTE", "PRESENTE - CONJUNTA", "PRESENTE - FORMATAÇÃO", "PRESENTE - PREVENTIVA", "FALTA", "INTERJORNADA(10h)", "INTERJORNADA(12H)", "INTERMEDIÁRIO (13h)", "INTERJORNADA(13h)", "INTERJORNADA(16h)", "INTERJORNADA (SEM RETORNO)", "NOTURNO", "FÉRIAS", "INSS", "ATESTADO", "FOLGA", "DESLIGADO"];

// Funções de Autenticação e Sessão
async function checarSessao() {
    const { data: { session } } = await _supabase.auth.getSession();
    if (session) {
        document.getElementById('login-view').classList.add('hidden');
        document.getElementById('dashboard-view').classList.remove('hidden');

        // --- NOVO: Saudação Personalizada ---
        const email = session.user.email;
        const login = email.split('@')[0];
        const primeiroNome = login.split('.')[0].split('_')[0];
        const nomeFormatado = primeiroNome.charAt(0).toUpperCase() + primeiroNome.slice(1);
        const h1 = document.getElementById('boas-vindas');
        if (h1) h1.innerText = `Olá, ${nomeFormatado}! Seja bem-vindo`;
        // ------------------------------------

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

window.onload = checarSessao;

// Inicialização da Dashboard
function inicializarApp() {
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('dataSelecionada').value = hoje;
    gerarRadiosStatus();
    atualizarTabela();
}

// Interface e Filtros
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

// Funções de Banco de Dados (Salvar, Atualizar, Deletar)
async function salvarPresenca() {
    const data = document.getElementById('dataSelecionada').value;
    const colabs = Array.from(document.querySelectorAll('input[name="colab"]:checked')).map(i => i.value);
    const status = document.querySelector('input[name="status"]:checked')?.value;

    // --- NOVO: Captura o email do usuário logado ---
    const { data: { session } } = await _supabase.auth.getSession();
    const usuarioEmail = session?.user?.email || "Desconhecido";
    // -----------------------------------------------

    if (!data || colabs.length === 0 || !status) return alert("Selecione data, colaboradores e status.");

    const registros = colabs.map(nome => ({
        data,
        uf: baseDados[nome].uf,
        empresa: baseDados[nome].empresa,
        micro_area: baseDados[nome].micro,
        colaborador: nome,
        supervisor: baseDados[nome].super,
        coordenador: baseDados[nome].coord,
        gerente_tlp: baseDados[nome].gerente,
        status,
        criado_por: usuarioEmail // <--- NOVO: Grava quem lançou
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
    const tr = document.getElementById("tabelaPresenca").getElementsByTagName("tr");
    for (let i = 1; i < tr.length; i++) {
        let colabCell = tr[i].getElementsByTagName("td")[3];
        let ufCell = tr[i].getElementsByTagName("td")[0];
        if (colabCell || ufCell) {
            let txtColab = colabCell.textContent || colabCell.innerText;
            let txtUF = ufCell.textContent || ufCell.innerText;
            tr[i].style.display = (txtColab.toUpperCase().indexOf(filter) > -1 || txtUF.toUpperCase().indexOf(filter) > -1) ? "" : "none";
        }
    }
}

// Notas e Modais
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

// Importação Excel
async function importarPlanilha(event) {
    const arquivo = event.target.files[0];
    if (!arquivo) return;
    const dataHoje = document.getElementById('dataSelecionada').value;

    // Captura quem está importando
    const { data: { session } } = await _supabase.auth.getSession();
    const usuarioEmail = session?.user?.email || "Importado";

    const leitor = new FileReader();
    leitor.onload = async (e) => {
        const dadosExcel = new Uint8Array(e.target.result);
        const workbook = XLSX.read(dadosExcel, { type: 'array' });
        const linhas = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        let inseridos = [];
        for (let linha of linhas) {
            const chaveNome = Object.keys(linha).find(k => k.toLowerCase().trim() === 'colaborador');
            const chaveStatus = Object.keys(linha).find(k => k.toLowerCase().trim() === 'status');
            if (chaveNome) {
                const nome = linha[chaveNome].toString().trim().toUpperCase();
                const statusLido = chaveStatus ? linha[chaveStatus].toString().trim().toUpperCase() : "PRESENTE";
                if (baseDados[nome]) {
                    inseridos.push({
                        data: dataHoje, uf: baseDados[nome].uf, empresa: baseDados[nome].empresa,
                        micro_area: baseDados[nome].micro, colaborador: nome, supervisor: baseDados[nome].super,
                        coordenador: baseDados[nome].coord, gerente_tlp: baseDados[nome].gerente,
                        status: statusLido, observacao: "",
                        criado_por: usuarioEmail // Grava o email na importação também
                    });
                }
            }
        }
        if (inseridos.length > 0) {
            const { error } = await _supabase.from('registros_presenca').insert(inseridos);
            if (!error) { alert(inseridos.length + " registros importados!"); atualizarTabela(); }
        }
    };
    leitor.readAsArrayBuffer(arquivo);
}

window.onclick = function (event) {
    if (event.target == document.getElementById("modalNotas")) fecharModal();
};

// ==========================================
// FUNÇÃO NOVA: EXPORTAR PARA EXCEL
// ==========================================
async function exportarParaExcel() {
    const dataRef = document.getElementById('dataSelecionada').value;

    const { data: registros, error } = await _supabase
        .from('registros_presenca')
        .select('*')
        .eq('data', dataRef)
        .order('colaborador', { ascending: true });

    if (error || !registros || registros.length === 0) {
        alert("Não há dados para exportar na data: " + dataRef);
        return;
    }

    const dadosPlanilha = registros.map(r => ({
        "DATA": r.data,
        "UF": r.uf,
        "EMPRESA": r.empresa,
        "MICRO ÁREA": r.micro_area,
        "COLABORADOR": r.colaborador,
        "SUPERVISOR": r.supervisor,
        "COORDENADOR": r.coordenador,
        "GERENTE TLP": r.gerente_tlp,
        "STATUS": r.status,
        "OBSERVAÇÃO": r.observacao || "",
        "LANÇADO POR": r.criado_por || "" // Inclui quem lançou no Excel
    }));

    const worksheet = XLSX.utils.json_to_sheet(dadosPlanilha);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Presença");
    XLSX.writeFile(workbook, `Relatorio_Presenca_${dataRef}.xlsx`);
}
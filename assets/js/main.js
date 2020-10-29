
const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');


inputTarefa.addEventListener('keypress', (e)=>{
    if(e.keyCode === 13){
        if(!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});


function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}


function criarBtnApagar(li){
    li.innerText += ' ';
    const btnApagar = document.createElement('button');
    btnApagar.innerText = 'Apagar';
    btnApagar.setAttribute('class', 'apagar');
    li.appendChild(btnApagar);
}


function criaTarefa(txt){
    const li = document.createElement('li');
    li.innerHTML = txt;
    tarefas.appendChild(li);
    limpaInput();
    criarBtnApagar(li);
    salvarTarefas();
}


btnTarefa.addEventListener('click', ()=>{
    if(!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});


document.addEventListener('click', (e)=>{
    const el = e.target;

    if(el.classList.contains('apagar')){
        el.parentElement.remove();
        salvarTarefas();
    }
});


function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}


function addTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
}

addTarefasSalvas();
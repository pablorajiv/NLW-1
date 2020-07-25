//     FUNÇÃO QUE BUSCA TODOS OS ESTADOS DO BRASIL - API IBGE
//      CADASTRO PONTO DE COLETA
function populateUFs (){
    const ufSelect = document.querySelector('select[name = uf')
   
    const urlStates = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados' 

    fetch(urlStates)
        .then( (res) => { return res.json()})
        .then( states => {
            for(state of states){
                ufSelect.innerHTML += ` <option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs();


function getCity(event){
    const citySelect = document.querySelector('select[name = city')
    const stateInput = document.querySelector('input[name = state')

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    
    const urlCity = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML =  `<option value="">Selecione a Cidade</option>`
    citySelect.disabled = true
    
    fetch(urlCity)
        .then( (res) => { return res.json()})
        .then( cities => {
            for(city of cities){
                citySelect.innerHTML += `<option value="${city.name}">${city.nome}</option>`
            }

            citySelect.disabled = false;
        })
}


document
    .querySelector('select[name = uf')
    .addEventListener('change', getCity);


//      ITEMS DE COLETA
//      pegar todos os li's
const ItemsCollect = document.querySelectorAll(".items-grid li")

for (const item of ItemsCollect) {
    item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name = items")

let selectedItems =[]; 

//MANIPULA ITEM SELECIONADO
//altera bg color 
function handleSelectedItem(event) {
    const itemLi = event.target;
    
    //add or remove class with javascript 
    itemLi.classList.toggle("selected")  
    
    const itemId = event.target.dataset.id;


    //verificar se existem itens selecionados 
    //pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId // retorna true(0) or false(-1)
        return itemFound 
    })
    
    //se ja estiver selecionado, tirar da seleçao
    if(alreadySelected != -1) {
        //tirar seleção
        const filteredItems = selectedItems.filter(item =>{
            itemISDifferent = item != itemId;
            return itemISDifferent;
        });
        selectedItems = filteredItems;
    } else {
        //se nao estiver selecionado 
        // adicionar a seleção
        selectedItems.push(itemId);
    }

    //atualizar input escondido
    collectedItems.value = selectedItems;
    
}
 

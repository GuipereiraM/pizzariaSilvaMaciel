let show = true;
const menuContent = document.querySelector('.content');
const menuToggle = menuContent.querySelector('.menu-toggle');


menuToggle.addEventListener('click', () => {

    document.body.style.overflow = show ? 'hidden' : 'initial'

    menuContent.classList.toggle('on', show);
    show = !show;
})
const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sPizza = document.querySelector('#m-pizza')
const sIngredientes = document.querySelector('#m-ingredientes')
const sBairro = document.querySelector('#m-bairro')
const btnSalvar = document.querySelector('#btnIncluir')
const btnExcluir = document.querySelector('btnExcluir')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sPizza.value = itens[index].pizza
    sIngredientes.value = itens[index].ingredientes
    sBairro.value = itens[index].bairro
    id = index
  } else {
    sPizza.value = ''
    sIngredientes.value = ''
    sBairro.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.pizza}</td>
    <td>${item.ingredientes}</td>
    <td>R$${item.bairro}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sPizza.value == '' || sIngredientes.value == '' || sBairro.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].pizza = sPizza.value
    itens[id].ingredientes = sIngredientes.value
    itens[id].bairro = sBairro.value
  } else {
    itens.push({'pizza': sPizza.value, 'ingredientes': sIngredientes.value, 'bairro': sBairro.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
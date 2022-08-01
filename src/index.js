document.addEventListener('DOMContentLoaded', () => {
  fetchDogs()
  let form = document.getElementById('dog-form')
  form.addEventListener('submit', event => {
    event.preventDefault()
    editDogs(event.target)
    form.reset()
  })
})

function fetchDogs() {
  fetch('http://localhost:3000/dogs')
  .then(resp => resp.json())
  .then(dogs => renderDogs(dogs))
}

function renderDogs(dogs) {
  let table = document.getElementById('table-body')
  dogs.forEach(dog => {
    let tr = document.createElement('tr')
    tr.id = dog.id
    tr.innerHTML = `
                    <td name='name'>${dog.name}</td>
                    <td name ='breed'>${dog.breed}</td>
                    <td name ='sex'>${dog.sex}</td>
                    <td>
                    <button class='dog-btn' id=${dog.id}>Edit</button>
                    </td>
                  `
    table.append(tr)
  })
  const editBtn = Array.from(document.querySelectorAll('button'))
  editBtn.forEach(btn => {
    btn.addEventListener('click', event => {
      if(event.target.id === btn.id) {
        fillForm(btn.id)
      }
    })
  })
}

function fillForm(id) {
  let dog = document.getElementById(`${id}`)
  let dogName = dog.children['name'].innerText
  let dogBreed = dog.children['breed'].innerText
  let dogSex = dog.children['sex'].innerText
  let form = document.getElementById('dog-form')
  form.children['name'].value = dogName
  form.children['breed'].value = dogBreed
  form.children['sex'].value = dogSex
  
  form.dataset.id = id
}

function editDogs(dog) {
  let id = dog.dataset.id
  let dogObj = {
    id: id,
    name: dog.name.value,
    breed: dog.breed.value,
    sex: dog.sex.value
  }
  fetch(`http://localhost:3000/dogs/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify(dogObj)
  })
  let updatedDog = document.getElementById(id)
  updatedDog.children.name.textContent = dogObj.name
  updatedDog.children.breed.textContent = dogObj.breed
  updatedDog.children.sex.textContent = dogObj.sex
}
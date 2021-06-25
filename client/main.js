const form = document.getElementById('form');
form.addEventListener('submit', submitForm);

function submitForm(event){
    event.preventDefault();
    let newEntry = event.target.item.value;
    console.log(newEntry);
}

async function getItems(){
    let response = await fetch('http://localhost:3000/items');
    let items  = await response.json();
    console.log(items);
    items.forEach(item => addToList(item))
}

function addToList(item){
    let list = document.getElementById('list');
    let li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);  
}

getItems();

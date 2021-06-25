const form = document.getElementById('form');
form.addEventListener('submit', submitForm);

const list = document.getElementById('list');

function submitForm(event){
    event.preventDefault(); //stops the page reloading
    let task = event.target.item.value;
    console.log(task);
    postData(task);
}

async function postData(task){
    let options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({task})
    }
    let response = await fetch('http://localhost:3000/items', options);
    let responseJSON = await response.json();
    console.log(responseJSON)
    getItems();
}

async function getItems(){
    let response = await fetch('http://localhost:3000/items');
    let items  = await response.json();
    console.log(items);
    list.textContent = ''; //remove all items from list first
    items.forEach(item => addToList(item)) 
    
}

function addToList(item){
    let li = document.createElement('li');
    let btn = document.createElement('button');
    btn.textContent = 'delete me!';
    btn.style.backgroundColor = 'red';
    btn.addEventListener('click', () => deleteTask(item.id));
    li.textContent = item.task;
    list.appendChild(li);  
    li.appendChild(btn);
}

async function deleteTask(id){
    console.log(`this task has an id of ${id}`);
    let options = {
        method: 'DELETE'
    }
    let response = await fetch(`http://localhost:3000/items/${id}`, options);
    let responseJSON = await response.json();
    console.log(responseJSON);
    getItems();
}

getItems();

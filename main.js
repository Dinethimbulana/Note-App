var form = document.getElementById('add-frm');
var items = document.getElementById('items');
var ntitle = document.getElementById('n-title');
var nbody = document.getElementById('n-body');
var tableDiv = document.getElementById('tbl-div');
var search = document.getElementById('srch');
var resetBtn = document.getElementById('reset');

var noteCount = 0;
var newNote = '';
var isUpdate = false;
var record = '';
var note = '';
var body = '';

form.addEventListener('submit', addNote);

function addNote(e){
    e.preventDefault();

    if(ntitle.value == '' || nbody.value == ''){
        alert("Please fill all fields!");
    }
    else{
        var tr = document.createElement('tr');
        tr.className = 'item';

        var td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(ntitle.value));
        
        var span = document.createElement('span');
        span.className = 'note-body';
        span.appendChild(document.createTextNode(nbody.value));
        td1.appendChild(span);   
    }
    var td2 = document.createElement('td');
    td2.className = 'btcellv';
    var btn1 = document.createElement('button');
    btn1.appendChild(document.createTextNode('View'));
    btn1.setAttribute('id','del');
    td2.appendChild(btn1);

    var td3 = document.createElement('td');
    td3.className = 'btcelld';
    var btn2 = document.createElement('button');
    btn2.appendChild(document.createTextNode('Delete'));
    btn2.setAttribute('id','del');
    td3.appendChild(btn2);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    noteCount++;

    newNote = tr;

    updateTable();

    resetAll();


}

function updateTable(){
    if(noteCount > 0){
        tableDiv.style.display = ''; //display as normal
        

        if(isUpdate){
            note.firstChild.textContent = ntitle.value;
            note.lastChild.textContent = nbody.value;

            isUpdate = false;
            noteCount--;
        }
        else{
            items.appendChild(newNote);
        }
    }
    else{
        tableDiv.style.display = 'none';
    }
}

window.onload = updateTable();

search.addEventListener('keyup', searchNotes);

function searchNotes(e){
    var searchTxt = e.target.value.toLowerCase();

    var list = items.getElementsByClassName('item');

    //htlm collection convert to array
    var listArr = Array.from(list);

    listArr.forEach(function(item){
        var noteTitle = item.firstChild.textContent;

        if(noteTitle.toLocaleLowerCase().indexOf(searchTxt) != -1){
            item.style.display = '';
        }
        else{
            item.style.display = 'none';
        }
    });

}

items.addEventListener('click',removeNote);

function removeNote(e){
    if(e.target.id == 'del'){
        if(confirm('Are you sure?')){
            var tr = e.target.parentElement.parentElement;
            items.removeChild(tr);

            noteCount--;
            if(noteCount == 0){
                updateTable();
            }
        }

    }
}

items.addEventListener('click', viewUpdateNote);

function viewUpdateNote(e){
    if(e.target.id == 'vw'){
        record = e.target.parentElement.parentElement;
        note = record.firstChild;
        ntitle.value = note.firstChild.textContent;
        nbody.value = note.lastChild.textContent;
        isUpdate = true;

    }
}

resetBtn.addEventListener('çlick', resetAll);
function resetAll(){
    ntitle.value = '';
    nbody.value = '';
    isUpdate = false;
    newNote = '';
}
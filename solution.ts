class Task {
    text: String
    complete: Boolean


    constructor(text: String, complete: boolean) {
        this.text = text
        this.complete = complete
    }
}

let arrNotes: Task[] = [];

let btnEl = document.querySelector('#todo-save');

btnEl.addEventListener('click', (event: Event): void => {
    event.preventDefault()
    let tempText: String = (<HTMLInputElement>document.querySelector('#todo-item')).value
    event.preventDefault()
    if (tempText !== "") {
        let hh = new Task(tempText, false)

        addNote(hh);

        arrNotes.push(hh)
        localStorage.setItem('tasks', JSON.stringify(arrNotes));
        (<HTMLInputElement>document.querySelector('#todo-item')).value = "";
    }
})
let divEl = document.querySelector('#todo-list');


const addNote = (note: Task): void => {
    let temp = `<div class="todo-add pi" '> <p>${note.text}</p> <input type="submit" class="todo-s" value="&radic;"/></div>`
    divEl.innerHTML += temp;
    let todo = document.querySelectorAll(".todo-s")
    for (let i = 0; i < todo.length; i++) {
       
        todo[i].addEventListener('click', function makeComplete(event: any) {
            for (let index = 0; index < arrNotes.length; index++) {
                if (arrNotes[index].text == event.target.parentElement.children[0].innerText) {
                    arrNotes[index].complete = true
                    
                }
                localStorage.setItem('tasks', JSON.stringify(arrNotes));
            }
    
            this.complete = true;
            event.target.parentElement.className = 'divComplete'
        });
    }
  
}
const update = (): void => {

    let r: NodeListOf<Element> = document.querySelectorAll('.todo-add')
    for (let index: number = 0; index < r.length; index++) {
        r[index].remove()
    }

    let tempArr: Task[] = JSON.parse(localStorage.getItem('tasks'))
    if (tempArr !== null) {


        for (let i: number = 0; i < tempArr.length; i++) {
            addNote(tempArr[i])
        }
    }
}

let deleteEl = document.querySelector('#todo-delall');
deleteEl.addEventListener('click', () => {
    let modal: any = document.querySelector('#myModal');
    let btnYes: any = document.querySelector('#yes');
    let btnNo: any = document.querySelector('#no');

    var span = document.querySelector(".close");
    modal.style.display = "block";
    span.addEventListener('click', function () {
        modal.style.display = "none";
    })

    btnYes.addEventListener('click', function () {
        modal.style.display = "none";
        let r: NodeListOf<Element> = document.querySelectorAll('.todo-add')
        for (let index: number = 0; index < r.length; index++) {
            r[index].remove()
        }
        arrNotes = [];
        localStorage.setItem('tasks', JSON.stringify(arrNotes));

    })

    btnNo.addEventListener('click', function () {
        modal.style.display = "none";
    })
})

let btnDeleteComplete = document.querySelector('#todo-delcom');
btnDeleteComplete.addEventListener('click', (event: any) => {
    let tempArr = JSON.parse(localStorage.getItem('tasks'))
    for (let j = 0; j < tempArr.length; j++) {
        if (tempArr[j].complete == true) {
            tempArr.splice(j, 1)
            localStorage.setItem('tasks', JSON.stringify(tempArr))
            update()
        }
    }

});

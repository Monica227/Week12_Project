//Getting elements form html page by their id
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

//Button Click Submit or Create step
form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

//Form Validation step, if nothing is submitted into task bar user will get a error message
let formValidation = () => {
    if (textInput.value === "") {
        console.log("failure");
        msg.innerHTML = "Task cannot be blank"; //Error message
    } else {
        console.log("success"); //If data is entered into the task bar successfully
        msg.innerHTML = "";
        acceptData(); //Data will be accepted and pushed into array
        add.setAttribute("data-bs-dismiss","modal") //Dismisses form card
        add.click(); //Click on icon dismisses card

        (()=>{
            add.setAttribute("data-bs-dismiss",""); //If nothing is put into task bar user will get error message and form card will not go away
        })();
    }
}

//Accept store data or Read step 
let data = []; //Stores collected data in array

let acceptData = () => { //Collects user input data
    data.push({          //All data is pushed into array
        text: textInput.value,    //Text Data
        date: dateInput.value, //Date data
        description: textarea.value, //Description data
    })

    localStorage.setItem("data", JSON.stringify(data));     //Used to store the data received from array
                            

    console.log(data); //Test that data is in fact stored in array
    createTasks();
}; 


//Upload data to app screen step
let createTasks = () => { //Task cards updated
    tasks.innerHTML = ""; //When function is run clears tasks
    data.map((x,y) => {     //Data is loaded,X targets objects one by one, Y counts the index numbers of array
        return (tasks.innerHTML += `
        <div id=${y}>   
        <span class="fw-bold">${x.text}</span>
        <span class="small text-secondary">${x.date}</span>
        <p>${x.description}</p>
    

        <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-user-pen"></i>
            <i onClick ="deleteTasks(this);createTasks()" class="fa-solid fa-trash"></i>
        </span>
    </div>
    `);
    }); 
    

resetForm(); //Form is reset to a blank card after adding new task card
};

//Delete
let deleteTasks = (e)=>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
}

//Update
let editTask = (e)=>{
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    deleteTasks(e);
};

//Reset form step returns app to default settings
let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};



(()=> {
    data = JSON.parse(localStorage.getItem("data")) || []; //Retrieves data from local storage and pushes it to array
    createTasks(); //Data from array is placed onto tasks cards
    console.log(data);
})()
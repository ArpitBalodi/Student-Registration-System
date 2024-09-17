const textArea = document.querySelectorAll(".textarea");
const studentName = document.querySelector("#stuname");
const studentId = document.querySelector("#stuid");
const email = document.querySelector("#email");
const contact = document.querySelector("#contact");
const button = document.querySelector(".add");
const info = document.querySelector(".info");

let currentEditElement = null; // Track the current element being edited

// Event listener to add or update the record
button.addEventListener("click", addToRecord);

// On page load, fetch data from local storage and display it
window.addEventListener("load", () => {
    const storedRecords = JSON.parse(localStorage.getItem("students"));
    if (storedRecords) {
        storedRecords.forEach(student => {
            createRecord(student.name, student.id, student.email, student.contact);
        });
    }
});

function addToRecord() {
    const form = document.querySelector(".registrationForm");

    // Check if the form is valid
    if (!form.checkValidity()) {
        form.reportValidity();  // Show HTML5 validation messages
        return;
    }

    const studentData = {
        name: studentName.value,
        id: studentId.value,
        email: email.value,
        contact: contact.value
    };

    // If in edit mode, update the current record
    if (currentEditElement) {
        currentEditElement.querySelector(".input1").innerText = studentData.name;
        currentEditElement.querySelector(".input2").innerText = studentData.id;
        currentEditElement.querySelector(".input3").innerText = studentData.email;
        currentEditElement.querySelector(".input4").innerText = studentData.contact;

        updateLocalStorage();
        currentEditElement = null;
        button.innerText = "Add";
    } else {
        // Create a new record
        createRecord(studentData.name, studentData.id, studentData.email, studentData.contact);
        saveToLocalStorage(studentData);
    }

    // Clear input fields after adding or updating
    textArea.forEach(textarea => {
        textarea.value = '';
    });

}

// Function to create a record visually
function createRecord(name, id, email, contact) {
    const recordDiv = document.createElement("div");
    recordDiv.classList.add("product");

    const box = document.createElement("div");
    box.classList.add("box");

    // input 1 - Student Name
    const input1 = document.createElement("span");
    input1.innerText = name;
    input1.classList.add("input1");
    recordDiv.appendChild(input1);

    // input 2 - Student ID
    const input2 = document.createElement("span");
    input2.innerText = id;
    input2.classList.add("input2");
    recordDiv.appendChild(input2);

    // input 3 - Email ID
    const input3 = document.createElement("span");
    input3.innerText = email;
    input3.classList.add("input3");
    recordDiv.appendChild(input3);

    // input 4 - Contact Number
    const input4 = document.createElement("span");
    input4.innerText = contact;
    input4.classList.add("input4");
    recordDiv.appendChild(input4);

    box.appendChild(recordDiv);
    info.appendChild(box);

    // Add Edit 
    const editButton = document.createElement("button");
    editButton.id = "edit";
    editButton.classList.add("add");
    editButton.innerText = "Edit";
    box.appendChild(editButton);
 
    const deleteButton = document.createElement("button");
    deleteButton.id = "delete";
    deleteButton.classList.add("add");
    deleteButton.innerText = "Delete";
    box.appendChild(deleteButton);
}

// Save a student to local storage
function saveToLocalStorage(student) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
}

// Update the local storage after editing
function updateLocalStorage() {
    let students = [];
    document.querySelectorAll(".product").forEach(record => {
        const name = record.querySelector(".input1").innerText;
        const id = record.querySelector(".input2").innerText;
        const email = record.querySelector(".input3").innerText;
        const contact = record.querySelector(".input4").innerText;
        students.push({ name, id, email, contact });
    });
    localStorage.setItem("students", JSON.stringify(students));
}

// Handle clicks for Edit and Delete
info.addEventListener("click", infoClick);

function infoClick(e) {
    const item = e.target;

    if (item.id === "delete") {
        const parent = item.parentElement;
        parent.remove();
        updateLocalStorage();  // Update storage after deletion
    }

    if (item.id === "edit") {
        const parent = item.parentElement;
        currentEditElement = parent; // Track the current element being edited

        // Pre- filling the input fields with the values of the selected record
        studentName.value = currentEditElement.querySelector(".input1").innerText;
        studentId.value = currentEditElement.querySelector(".input2").innerText;
        email.value = currentEditElement.querySelector(".input3").innerText;
        contact.value = currentEditElement.querySelector(".input4").innerText;

        // Change the "Add" button text to "Update"
        button.innerText = "Update";
    }
}

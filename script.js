var selectedRow = null;

// Function to show alert messages
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    // Goes away in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// clear input fields
function clearFields() {
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#phoneNumber").value = "";
}

// Add data 
document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const phoneNumber = document.querySelector("#phoneNumber").value;

    // Checks the  input fields
    if (firstName === "" || lastName === "" || phoneNumber === "") {
        showAlert("Please fill in all fields", "danger");
    } else {
        if (selectedRow == null) {
            // Add new student
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${phoneNumber}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                </td>
            `;
            list.appendChild(row);
            showAlert("Student Added", "success");
        } else {
            // Update existing student
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = phoneNumber;
            showAlert("Student Info Updated", "info");
            selectedRow = null;
        }
        clearFields();
    }
});

// Event delegation for Edit and Delete
document.querySelector("#student-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("edit")) {
        selectedRow = e.target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#phoneNumber").value = selectedRow.children[2].textContent;
    }

    if (e.target.classList.contains("delete")) {
        e.target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");
    }
});

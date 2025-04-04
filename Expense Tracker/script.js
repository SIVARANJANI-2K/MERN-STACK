// Load stored expenses
document.addEventListener("DOMContentLoaded", loadExpenses);

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
    const name = document.getElementById("expense-name").value;
    const amount = document.getElementById("expense-amount").value;
    const category = document.getElementById("expense-category").value;
    const date = document.getElementById("expense-date").value;

    if (name === "" || amount === "" || date === "") {
        alert("Please fill all fields");
        return;
    }

    const expense = { id: Date.now(), name, amount, category, date };
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    renderExpenses();
    clearForm();
}

function renderExpenses() {
    const tableBody = document.getElementById("expense-table");
    tableBody.innerHTML = "";

    let total = 0;

    expenses.forEach(exp => {
        total += Number(exp.amount);

        tableBody.innerHTML += `
            <tr>
                <td>${exp.name}</td>
                <td>$${exp.amount}</td>
                <td>${exp.category}</td>
                <td>${exp.date}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="deleteExpense(${exp.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });

    document.getElementById("total-expense").innerText = total;
}

function deleteExpense(id) {
    expenses = expenses.filter(exp => exp.id !== id);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
}

function clearForm() {
    document.getElementById("expense-name").value = "";
    document.getElementById("expense-amount").value = "";
    document.getElementById("expense-date").value = "";
}

function loadExpenses() {
    renderExpenses();
}

//------------------------ELEMENTS----------------------------
const welcomeEl = document.querySelector(".welcome"); //paragraph wich changes when we login
const dateEl = document.querySelector(".date"); //current date
const balanceEl = document.querySelector(".balance__amount"); //balance
const sumInEl = document.querySelector(".summary__value--in"); //summ of all ins in account
const sumOutEl = document.querySelector(".summary__value--out"); //summ of all outs in account
const interestEl = document.querySelector(".summary__value--interest"); //summ of interests (% of all ins in account)

const appContainer = document.querySelector(".app"); //all app
const movementsContainer = document.querySelector(".movements"); //ins/outs in account

const loginCreateBtn = document.querySelector(".login-buttons")//create account/login buttons
const logoutBtn = document.querySelector(".logout-btn"); //logout button
const transferBtn = document.querySelector(".form__btn--transfer"); //transfer button
const loanBtn = document.querySelector(".form__btn--loan"); //loan button
const closeBtn = document.querySelector(".form__btn--close"); //close account button
const sortBtn = document.querySelector(".btn--sort"); //sort button, first click sorts by ascending, second by descending, third unsort it

const inputLoginUsername = document.getElementById("loginUsername");
const inputLoginPin = document.getElementById("loginPin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//------------------------INIT----------------------------
const accounts = [
    {
        owner: "Miley Cyrus",
        movements: [200, 450, -100, 3000, -650, -130, 70, 1300],
        interestRate: 1.2,
        pin: 1111,
    },
    {
        owner: "Lana Del Ray",
        movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
        interestRate: 0.5,
        pin: 2222,
    },
    {
        owner: "Harry Styles",
        movements: [2000, -200, 340, -300, -20, 50, 4000, -460, -10],
        interestRate: 0.7,
        pin: 3333,
    },
];

let currentUserIndex;

//------------------------CREATE USERNAME------------------------
function createUsername(ownerName) {
    return ownerName.split(" ").map((word) => word[0].toLowerCase()).join("");
}
//------------------------LOGIN/CREATE ACCOUNT/LOGOUT BUTTONS------------------------
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
    appContainer.style.display = "none";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

function login() {
    const loginUsername = inputLoginUsername.value;
    const loginPin = inputLoginPin.value;

    const foundAccount = accounts.find(account => {
        const username = createUsername(account.owner);
        return loginUsername === username && parseInt(loginPin) === account.pin;
    });

    if (foundAccount) {
        closeModal('loginModal');
        welcomeEl.textContent = `Welcome back, ${foundAccount.owner.split(" ")[0]}`;
        appContainer.style.display = "grid";
        loginCreateBtn.style.display = "none";
        logoutBtn.style.display = "block";
        inputLoginUsername.value = inputLoginPin.value = "";
        currentUserIndex = accounts.indexOf(foundAccount);
        displayMovements();
        calcSummary(foundAccount);
    } else {
        alert("Incorrect username or PIN");
    }
}

function createAccount() {
    const createUsername = document.getElementById('createUsername').value;
    const createPin = document.getElementById('createPin').value;

    if (createUsername && createPin) {
        const newAccount = {
            owner: createUsername,
            movements: [],
            interestRate: 2,
            pin: parseInt(createPin),
        };

        accounts.push(newAccount);
        closeModal('createAccountModal');
        alert("Your account has been created. Please log in.");
    } else {
        alert("Please complete all fields.");
    }
}

function logout() {
    appContainer.style.display = "none";
    loginCreateBtn.style.display = "block";
    logoutBtn.style.display = "none";
    welcomeEl.textContent = "Log in to get started";
    inputLoginUsername.value = inputLoginPin.value = "";
}
//------------------------DATE------------------------
const currentDate = new Date();
dateEl.textContent = currentDate.toLocaleDateString();

//------------------------MOVEMENTS------------------------
const displayMovements = function () {
    movementsContainer.innerHTML = ""; //delete the old content to display the transactions of the logged in user

    const transactions = accounts[currentUserIndex].movements; //accessing movements of the logged in user

    transactions.forEach(function (mov, i) {
        const type = mov > 0 ? "deposit" : "withdrawal";
        const html = `<div class="movements__row">
              <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
              <div class="movements__value">${mov}</div>
              </div>`;
        movementsContainer.insertAdjacentHTML("afterbegin", html);
    });
};

//------------------------SORT------------------------
let sortState = 0; //track sort status 0 - unsorted, 1 - descending, 2 - ascending
let originalTransactions = null;

const sortTransactions = function () {
    const transactions = accounts[currentUserIndex].movements;

    movementsContainer.innerHTML = ""; //delete initial content from transactions

    if (!originalTransactions) {
        originalTransactions = transactions.slice(); //save a copy of the initial sorting
    }

    const sortedTransactions = [...transactions]; //copy of transactions for not to affect the original array

    if (sortState === 1) {
        sortedTransactions.sort((a, b) => b - a); //sort descending
    } else if (sortState === 2) {
        sortedTransactions.sort((a, b) => a - b); //sort ascending
    }

    sortedTransactions.forEach(function (mov, i) {
        const type = mov > 0 ? "deposit" : "withdrawal";
        const originalIndex = originalTransactions.indexOf(mov);
        const html = `<div class="movements__row">
              <div class="movements__type movements__type--${type}">${originalIndex + 1} ${type}</div>
              <div class="movements__value">${mov}</div>
              </div>`;
        movementsContainer.insertAdjacentHTML("afterbegin", html);
    });
};

sortBtn.addEventListener("click", function () {
    if (sortState < 2) {
        sortState += 1;
    } else {
        sortState = 0;
    };
    sortTransactions();
});
//------------------------BALANCE------------------------
const calcSummary = function (acc) {
    const balance = acc.movements.reduce((arr, mov) => arr + mov, 0); //summ all movements/ account balance
    const totalIns = acc.movements.filter(mov => mov > 0).reduce((sum, mov) => sum + mov, 0); //summ all ins
    const totalOuts = acc.movements.filter(mov => mov < 0).reduce((sum, mov) => sum + mov, 0); //summ all outs
    const interestSum = (totalIns * (acc.interestRate / 100)).toFixed(2);
    balanceEl.textContent = `${balance}`;
    sumInEl.textContent = `${totalIns} €`;
    sumOutEl.textContent = `${Math.abs(totalOuts)} €`;
    interestEl.textContent = `${interestSum} €`;
}
const verificare = Number(balanceEl.textContent);

//------------------------TRANSFER------------------------

transferBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const transferToUsername = inputTransferTo.value;
    const transferAmount = Number(inputTransferAmount.value);

    inputTransferTo.value = "";
    inputTransferAmount.value = "";

    const recipientIndex = accounts.findIndex(
        (acc) => createUsername(acc.owner) === transferToUsername.toLowerCase()
    );//find user index which we want to transfer money

    if (recipientIndex !== -1 && transferAmount > 0 && transferAmount <= Number(balanceEl.textContent)) {//check if user exists and if transfer amount is bigger than 0
        accounts[currentUserIndex].movements.push(-transferAmount);//add transfer amount in the movements with "-" of the logged in user
        accounts[recipientIndex].movements.push(transferAmount);//add transfer amount in the movements with "+" of the recipient user

        displayMovements();//refresh movements

        calcSummary(accounts[currentUserIndex]);//recalc all the total on the page
    } else {
        alert("Transfer has failed. Check your data.");//if the user or transfer amount is invalid
    }
});


//------------------------LOAN------------------------
loanBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const loanAmount = Number(inputLoanAmount.value);
    inputLoanAmount.value = "";

    if (loanAmount > 0 && loanAmount <= (Number(balanceEl.textContent) * 0.3)) { //check if loan amount is bigger than 0 and less than 30% of the balance
        accounts[currentUserIndex].movements.push(loanAmount);//add amount from input to movements
        displayMovements();//refresh movements
        calcSummary(accounts[currentUserIndex]);//recalc all the total on the page
    } else {
        alert("Invalid loan amount. You cannot borrow more than 30% of the balance.");//if the loan amount is invalid
    }
});

//------------------------CLOSE------------------------
closeBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const confirmUsername = inputCloseUsername.value;
    const confirmPin = Number(inputClosePin.value);

    inputCloseUsername.value = "";
    inputClosePin.value = "";

    if (
        confirmUsername === createUsername(accounts[currentUserIndex].owner) &&
        confirmPin === accounts[currentUserIndex].pin
    ) {
        accounts.splice(currentUserIndex, 1);//delete logged in user from accounts array
        appContainer.style.display = "none";//hide the app container  
        alert("Account closed successfully.");
    } else {
        alert("Invalid data. Try again.");
    }
});

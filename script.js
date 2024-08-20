let localData;
let markUp = "";

let popup = document.getElementById("popup");
let employeeContainer = document.getElementById("employee-container");
let myForm = document.getElementById('myForm');
let update = document.getElementById("update-btn")
let saveBtn = document.getElementById("save-btn")
let close = document.getElementById("close");
let resetBtn = document.getElementById("reset-btn");
update.style.display = "block"
saveBtn.style.display = "block"

// form submit
myForm.addEventListener('submit', function (event) {
    event.preventDefault();
    validation();
});


//reset the localstorage
resetBtn.addEventListener("click", function () {

    localStorage.clear();

    localData = [];

    employeeContainer.innerHTML = "<p> NO DATA FOUNDED PLEASE ADD A DATA</p>";
});

if (localStorage.getItem("form") === null || JSON.parse(localStorage.getItem("form")).length === 0) {
    employeeContainer.innerHTML = "<p style='margin:150px  auto;'>NO DATA FOUNDED PLEASE ADD A DATA</p>";
};

//get the value
let fname = document.getElementById("fname").value;
let contact = document.getElementById("contact").value;
let email = document.getElementById("email").value;
let salary = document.getElementById("salary").value;

//manipulation error para
let errFname = document.getElementById("err-name");
let errContact = document.getElementById("err-contact");
let errMail = document.getElementById("err-mail");
let errSalary = document.getElementById("err-salary");

// name 
function fName() {
    let nameRegex = /^[A-Za-z]+$/;

    if (!nameRegex.test(fname)) {
        errFname.textContent = "username is invalid ";
        errFname.style.visibility = "visible";
        return false;
    } else if (fname.length <= 3) {
        errFname.textContent = "Username must be at least 3 characters ";
        errFname.style.visibility = "visible";
        return false;
    } else {
        errFname.style.visibility = "hidden";
        return true;
    }

};
//mobile number validation
function mobileNumber() {

    if (contact.length < 10) {
        errContact.textContent = "check the mobile number";
        errContact.style.visibility = "visible";
        return false;
    } else if (isNaN(contact)) {
        errContact.textContent = "number only allowed";
        errContact.style.visibility = "visible";
        return false;
    } else {
        errContact.style.visibility = "hidden";
        return true;
    }
};

//email validation
function Email() {
    if (email === "") {
        errMail.textContent = "email is invalid";
        errMail.style.visibility = "visible";
        return false;
    } else {
        errMail.style.visibility = "hidden";
        return true;
    }

};
//salary validation
function Salary() {
    if (isNaN(salary)) {
        errSalary.textContent = "only number ";
        errSalary.style.visibility = "visible";
        return false;
    } else if (salary.length <= 3) {
        errSalary.textContent = "enter your correct salary";
        errSalary.style.visibility = "visible";
        return false;
    } else {
        errSalary.style.visibility = "hidden";
        return true;
    }

};


// open popup
function openModal() {

    document.getElementById("fname").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("email").value = "";
    document.getElementById("salary").value = "";

    update.style.display = "none";
    saveBtn.style.display = "block";
    popup.style.display = "block";
    close.onclick = function () {
        popup.style.display = "none";
    };
};
//render the localstorage []
function checkLocalStorage() {
    if (JSON.parse(localStorage.getItem("form")) !== null) {
        localData = JSON.parse(localStorage.getItem("form"));
        // console.log(localData);
    } else {
        localData = [];
        localStorage.setItem("form", JSON.stringify(localData));
    }
    appendUserData();
};



//checking the form values
function validation() {

    update.style.display = "none";
    saveBtn.style.display = "block";


    //name validation
    fName()

    //mobile number validation
    mobileNumber()

    //email validation
    Email()

    //salary validation
    Salary()

    //get the value
    fname = document.getElementById("fname").value;
    contact = document.getElementById("contact").value;
    email = document.getElementById("email").value;
    salary = document.getElementById("salary").value;

    let isvalid = fName(fname) && mobileNumber(contact) && Email(email) && Salary(salary);


    //storing the  data to localstorage
    if (isvalid) {
        let userdata = {
            name: fname,
            mobilenumber: contact,
            mail: email,
            salary: salary
        };

        // console.log(userdata);
        document.getElementById("fname").value = "";
        document.getElementById("contact").value = "";
        document.getElementById("email").value = "";
        document.getElementById("salary").value = "";

        localData.push(userdata);

        // console.log(localStorage.getItem("form"));
        localStorage.setItem("form", JSON.stringify(localData));

        document.getElementById("popup").style.display = "none";

        appendUserData();
    };

};
function appendUserData() {

    // Fetch and parse the stored data
    let containerData = JSON.parse(localStorage.getItem("form"));

    // Clear previous content
    employeeContainer.innerHTML = "";

    if (localData !== null && containerData !== null) {
        // Create HTML string for the user data
        let markUp = containerData.
            map(
                (empdata, index) => `
            <div key="${index}" class="user-data" >
                <h4>${empdata.name} Detail</h4>
                <p>Name: ${empdata.name}</p>
                <p>Mobile Number: ${empdata.mobilenumber}</p>
                <p>Email: ${empdata.mail}</p>
                <p>Salary: ${empdata.salary}</p>
                <button id="del-btn-${index}" class="del-btn" onclick="deleteUser(${index})">Delete</button>
                <button class="edit-data"  data-index="${index}" onclick="editData(${index})">Edit</button>
            </div>
        `
            )
            .join("");
        employeeContainer.innerHTML = markUp;
        // Ensure the container is displayed
        employeeContainer.style.display = "flex";
    };
};

function deleteUser(index) {

    let storedData = JSON.parse(localStorage.getItem("form"));
    storedData.splice(index, 1); // Remove item at the specified index
    localStorage.setItem("form", JSON.stringify(storedData));
    // // Update the localData array
    localData = storedData;

    // Re-render the user data on the page
    appendUserData();

};


//store data
function editData(index) {



    update.style.display = "block"
    saveBtn.style.display = "none"

    close.onclick = function () {
        popup.style.display = "none";
    };

    console.log(index)

    popup.style.display = "block";

    storedData = JSON.parse(localStorage.getItem("form"));

    let newdata = storedData[index];

    console.log(newdata);

    document.getElementById("fname").value = newdata.name;
    document.getElementById("contact").value = newdata.mobilenumber;
    document.getElementById("email").value = newdata.mail;
    document.getElementById("salary").value = newdata.salary;

    // console.log(newdata);


    update.onclick = function () {


        fname = document.getElementById("fname").value;
        contact = document.getElementById("contact").value;
        email = document.getElementById("email").value;
        salary = document.getElementById("salary").value;


        let isValid = fName(fname) && mobileNumber(contact) && Email(email) && Salary(salary);
        console.log(isValid);
        if (isValid) {

            newdata = {
                name: fname,
                mobilenumber: contact,
                mail: email,
                salary: salary
            };
            // storedData.splice(index,1,data)

            storedData.forEach((olddata, oldindex) => {
                if (oldindex === index) {
                    storedData[oldindex] = newdata;
                    olddata.name = newdata.fname;
                    olddata.mobilenumber = newdata.contact;
                    olddata.mail = newdata.email;
                    olddata.salary = newdata.salary;
                }
            });
            console.log(newdata);

            localData = storedData;
            
            localStorage.setItem("form", JSON.stringify(storedData));

            popup.style.display = "none";


            appendUserData()

        }
        else {
            update.style.display = "block";
            saveBtn.style.display = "none";
        };
    };

};

document.onload = checkLocalStorage();

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});
window.onload = fromValidation;

function values(event)
{
    let valid = checkFields();    
    if(valid)
    {
        console.log("valid form");
    }else 
    {
        console.log("Invalid Form");    
        event.preventDefault();
    }
}

function fromValidation(){
    
    let form = document.getElementById("checkoutForm");
    form.onsubmit = values;
}

function checkFields()
{
    let NameInput = document.getElementById("fName").value;
    let EmailInput = document.getElementById("email").value;
    let AddressInput = document.getElementById("Address").value;
    let dropdown = document.getElementById("sel1").value;


    let isValid = true;

    if(NameInput === "")
    {
        document.getElementById("fName").style.borderColor = "red";
        document.getElementById("name-error").style.display = "inline";
        document.getElementById("name-error").textContent = "This field is requried *";
        isValid = false;
    }
    else
    {
        document.getElementById("name-error").style.display = "none";
        document.getElementById("fName").style.borderColor = "";
    }

    if(EmailInput === "")
    {
        document.getElementById("email-error").style.display = "inline";
        document.getElementById("email").style.borderColor = "red";
        document.getElementById("email-error").textContent = "This field is requried *";
        isValid = false;
    }
    else
    {
        document.getElementById("email-error").style.display = "none";
        document.getElementById("email").style.borderColor = "";
    }

    if(AddressInput === "")
    {
        document.getElementById("add-error").style.display = "inline";
        document.getElementById("Address").style.borderColor = "red";
        document.getElementById("add-error").textContent = "This field is requried *";
        isValid = false;
    }
    else
    {
        document.getElementById("add-error").style.display = "none";
        document.getElementById("Address").style.borderColor = "";
    }

    if(dropdown === "")
    {
        document.getElementById("city-error").style.display = "inline";
        document.getElementById("sel1").style.borderColor = "red";
        document.getElementById("city-error").textContent = "This field is requried *";
        isValid = false;
    }
    else
    {
        document.getElementById("city-error").style.display = "none";
        document.getElementById("sel1").style.borderColor = "";
    }

    return isValid;
}
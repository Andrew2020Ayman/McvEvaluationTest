

let Employees = [];
let EmpolyeesResult ;
let Alldepartments ;

function getDepartmentsNames() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           let deptNames =  JSON.parse(this.responseText);
           const deptNamesArray = [];
           for (let i = 0; i < deptNames.length; i++) {
            deptNamesArray.push(deptNames[i].departmentName);
           }

           Alldepartments =  deptNamesArray;
        }
    }
    xhttp.open("GET", "https://localhost:5001/Department", true);
    xhttp.send();
}
/* weekday: 'short', */
function appendLeadingZeroes(n){
    if(n <= 9){
      return "0" + n;
    }
    return n
  }

function getShortDate(date){
    let formatted_date = date.getFullYear() + "-" + appendLeadingZeroes(date.getMonth() + 1) + "-" + appendLeadingZeroes(date.getDate())
      return formatted_date;
}
function getEmployees() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            Employees = this.responseText;
            EmpolyeesResult = JSON.parse(Employees);

  
        const body = document.querySelector('#newTable tbody');
        EmpolyeesResult.forEach((employee,index) => {
         const birthDate = new Date(employee.birthDate);
         const hiringDate = new Date(employee.hiringDate);
            const htmlTemplate = `
            <tr class="employee-${index}" >
            <td>${index}</td>

            <td id="Ename">${employee.employeeName} </td>
            <td id="Ebirth">${getShortDate(birthDate)}</td>
            <td id="ETitle">${employee.employeeTitle}</td>
            <td id="Ehire">${getShortDate(hiringDate)}</td>
            <td id="Edept">${employee.departmentName}</td>

            <td>
                    <a class="edit" title="Edit" data-toggle="tooltip" onclick="EditEmpRow(${index})"><i class="material-icons">&#xE254;</i></a>
                    <a class="delete" title="Delete" data-toggle="tooltip" onclick="DeleteEmployee(${employee.id},${index})"><i class="material-icons">&#xE872;</i></a>
            </td>

            </tr>
            `;
            body.innerHTML += htmlTemplate;
        });
        }
    };
    xhttp.open("GET", "https://localhost:5001/Employee", true);
    xhttp.send();
    }


    function DeleteEmployeeFromTable(index){
        document.getElementById("newTable").deleteRow(index+1);
        document.getElementById("add-new").disabled = false;
    }

    function DeleteEmployee(id,index) {
        let confirmAction = confirm("Are you sure you want delete Employee?");
        if (confirmAction) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    DeleteEmployeeFromTable(index);
                }
            };
            xhttp.open("DELETE", "https://localhost:5001/Employee/"+id , true);
            xhttp.send();
            
           
            
            let DeleteEmp = EmpolyeesResult.at(index);
            if (DeleteEmp != undefined || DeleteEmp != null) {
                EmpolyeesResult.splice(index,1); 
            }
            location.reload();
            console.log(EmpolyeesResult);
        } else {
            alert("Action canceled");
        }
    }

    function addNewEmployeeRow(){
        document.getElementById("add-new").disabled = true;

        const body = document.querySelector('#newTable tbody');

        var table = document.getElementById("newTable");
        var rowCount = table.rows.length;

        const htmlTemplate = `
        <tr class=""employee" >
        
        <td>${rowCount-1}</td>
        <td> 
            <input type="text" class="form-control" name="employeeName" id="employeeName" >
            <p id="notValidName" style="color: red;font-size: small;margin: 0;"></p>
        </td>
        <td> 
            <input type="date" class="form-control" name="birthDate" id="birthDate">
            <p id="notValidDate" style="color: red;font-size: small;margin: 0;"></p>
        </td>
        <td> 
            <input type="text" class="form-control" name="employeeTitle" id="employeeTitle" >
            <p id="notValidTitle" style="color: red;font-size: small;margin: 0;"></p>
        </td>
        <td> 
            <input type="date" class="form-control" name="hiringDate" id="hiringDate">
            <p id="notValidhireDate" style="color: red;font-size: small;margin: 0;"></p>
        </td>
        <td> 
        
           <select name="departments" id="departments">           
           </select>
            
        </td>

            <td>
                    <a class="add" title="Add" data-toggle="tooltip" onclick="addNewEmployee()" ><i class="material-icons">&#xE03B;</i></a>
                    <a class="delete" title="Delete" data-toggle="tooltip" onclick="DeleteEmployeeFromTable(${rowCount-1})"><i class="material-icons">&#xE872;</i></a>
            </td>

            </tr>
        `;

        body.innerHTML += htmlTemplate;
        fillSelectDepartment()
    }

    function fillSelectDepartment(){

      console.log("department select");
        var min = 0,
        max = Alldepartments.length -1,
        select = document.getElementById('departments');
        select.innerHTML = "";
        console.log(Alldepartments);

        for (var i = min; i<=max; i++){
                var opt = document.createElement('option');
                opt.value = Alldepartments[i];
                opt.innerHTML = Alldepartments[i];
                select.appendChild(opt);
        }
        console.log(select);
    }


    function addNewEmployee(){
        var empNameInput =  document.getElementById("employeeName");
        var birthDateInput =  document.getElementById("birthDate");
        var employeeTitleInput =  document.getElementById("employeeTitle");
        var hiringDateInput =  document.getElementById("hiringDate");
        
        var empName =  document.getElementById("employeeName").value;
        var birthDate =  document.getElementById("birthDate").value;
        var empTitle =  document.getElementById("employeeTitle").value;
        var hiringDate =  document.getElementById("hiringDate").value;
        var select = document.getElementById('departments');
        var value = select.options[select.selectedIndex].value;

        var isValid = true;
        let text = "please fill all data"
        empNameInput.style.border = "1px solid #ced4da";
        birthDateInput.style.border = "1px solid #ced4da";
        employeeTitleInput.style.border = "1px solid #ced4da";
        hiringDateInput.style.border = "1px solid #ced4da";
        document.getElementById("notValidName").innerHTML = "";
        document.getElementById("notValidDate").innerHTML = "";
        document.getElementById("notValidTitle").innerHTML = "";
        document.getElementById("notValidhireDate").innerHTML = "";

        if(empName == null || empName == ""){
            empNameInput.style.border = "1px solid red";
            document.getElementById("notValidName").innerHTML = text;
            isValid = false;
        }
        if(birthDate == null || birthDate == ""){
            birthDateInput.style.border = "1px solid red";
            document.getElementById("notValidDate").innerHTML = text;
            isValid = false;
        }
        if(empTitle == null || empTitle == ""){
            employeeTitleInput.style.border = "1px solid red";
            document.getElementById("notValidTitle").innerHTML = text;
            isValid = false;
        }
        if(hiringDate == null || hiringDate == ""){
            hiringDateInput.style.border = "1px solid red";
            document.getElementById("notValidhireDate").innerHTML = text;
            isValid = false;
        }
        if(isValid){
            empNameInput.style.border = "1px solid #ced4da";
            birthDateInput.style.border = "1px solid #ced4da";
            employeeTitleInput.style.border = "1px solid #ced4da";
            hiringDateInput.style.border = "1px solid #ced4da";
            document.getElementById("notValidName").innerHTML = "";
            document.getElementById("notValidDate").innerHTML = "";
            document.getElementById("notValidTitle").innerHTML = "";
            document.getElementById("notValidhireDate").innerHTML = "";
            var newEmp = {
                "employeeName": empName,
                "birthDate": birthDate,
                "employeeTitle": empTitle,
                "hiringDate": hiringDate,
                "departmentName": value
            }
            var NewempJson = JSON.stringify(newEmp);
            let empresult={};

            
            var xhttp = new XMLHttpRequest();
           xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                empresult = JSON.parse(this.responseText);
                EmpolyeesResult.push(empresult);
                console.log(EmpolyeesResult);

              
                var table = document.getElementById("newTable");
                var rowCount = table.rows.length;
                
                DeleteEmployeeFromTable(rowCount-2);
                rowCount = rowCount-2;
        
                const body = document.querySelector('#newTable tbody');
                const htmlTemplate = `
                <tr class="employee-${rowCount}" >
                <td>${rowCount}</td>

                <td id="">${EmpolyeesResult[rowCount].employeeName} </td>
                <td id="">${EmpolyeesResult[rowCount].birthDate}</td>
                <td id="">${EmpolyeesResult[rowCount].employeeTitle}</td>
                <td id="">${EmpolyeesResult[rowCount].hiringDate}</td>
                <td id="">${EmpolyeesResult[rowCount].departmentName}</td>

                <td>
                        <a class="edit" title="Edit" data-toggle="tooltip" onclick="EditEmpRow(${rowCount})"><i class="material-icons">&#xE254;</i></a>
                        <a class="delete" title="Delete" data-toggle="tooltip" onclick="DeleteEmployee(${EmpolyeesResult[rowCount].id},${rowCount})"><i class="material-icons">&#xE872;</i></a>
                </td>

                </tr>

                `;
        
                body.innerHTML += htmlTemplate;
                
                
            }
        };
        xhttp.open("POST", "https://localhost:5001/Employee");
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(NewempJson);
            
        }
         
}



function EditEmpRow(index){
    document.getElementById("add-new").disabled = true;

    const body = document.querySelector(`#newTable tbody .employee-${index}`);
    
    const CurrentEmpName = document.querySelector(`#newTable tbody .employee-${index} #Ename`).innerHTML;
    let CurrentEmpBirth = document.querySelector(`#newTable tbody .employee-${index} #Ebirth`).innerHTML;
    const CurrentEmpTitle = document.querySelector(`#newTable tbody .employee-${index} #ETitle`).innerHTML;
    let CurrentEmpHire = document.querySelector(`#newTable tbody .employee-${index} #Ehire`).innerHTML;
    const CurrentEmpdept = document.querySelector(`#newTable tbody .employee-${index} #Edept`).innerHTML;
    
  
    const htmlTemplate = `
    <tr class=""employee-${index}">
        
        <td>${index}</td>
        <td> 
        
            <input type="text" class="form-control" value=${CurrentEmpName} id="updateemployeeName-${index}" name="employeeName" >
            <p id="notValidName" style="color: red;font-size: small;margin: 0;"></p>
        </td>
        <td> 
            <input type="date" class="form-control" value=${CurrentEmpBirth} id="updatebirthDate-${index}" name="birthDate">
            <p id="notValidDate" style="color: red;font-size: small;margin: 0;"></p>
        </td>
        <td> 
            <input type="text" class="form-control" value=${CurrentEmpTitle} id="upadateemployeeTitle-${index}" name="employeeTitle" >
            <p id="notValidTitle" style="color: red;font-size: small;margin: 0;"></p>
        </td>
        <td> 
            <input type="date" class="form-control" value=${CurrentEmpHire} id="updatehiringDate-${index}" name="hiringDate">
            <p id="notValidhireDate" style="color: red;font-size: small;margin: 0;"></p>
        </td>
        <td> 
        
        <select name="departments" id="departments">           
         </select> 
            
        </td>

            <td>
                    <a class="add" title="Add" data-toggle="tooltip" onclick="saveEmployee(${index})" ><i class="material-icons">&#xE03B;</i></a>
                    <a class="delete" title="Delete" data-toggle="tooltip" onclick="DeleteEmployeeFromTable(${index})"><i class="material-icons">&#xE872;</i></a>
            </td>

            </tr>
        `;

        body.innerHTML = htmlTemplate;
        fillSelectDepartment();

}

function saveEmployee(index){
    
    var empName =  document.getElementById(`updateemployeeName-${index}`).value;
    var birthDate =  document.getElementById(`updatebirthDate-${index}`).value;
    var empTitle =  document.getElementById(`upadateemployeeTitle-${index}`).value;
    var hiringDate =  document.getElementById(`updatehiringDate-${index}`).value;
    
    var select = document.getElementById('departments');
    var value = select.options[select.selectedIndex].value;
   

    var empNameInput =  document.getElementById(`updateemployeeName-${index}`);
    var birthDateInput =  document.getElementById(`updatebirthDate-${index}`);
    var employeeTitleInput =  document.getElementById(`upadateemployeeTitle-${index}`);
    var hiringDateInput =  document.getElementById(`updatehiringDate-${index}`);
    
   
    /* var select = document.getElementById('updatedepartments');
    var value = select.options[select.selectedIndex].value; */

    var isValid = true;
    let text = "please fill all data"

    empNameInput.style.border = "1px solid #ced4da";
    birthDateInput.style.border = "1px solid #ced4da";
    employeeTitleInput.style.border = "1px solid #ced4da";
    hiringDateInput.style.border = "1px solid #ced4da";

    document.getElementById("notValidName").innerHTML = "";
    document.getElementById("notValidDate").innerHTML = "";
    document.getElementById("notValidTitle").innerHTML = "";
    document.getElementById("notValidhireDate").innerHTML = "";

        if(empName == null || empName == ""){
            empNameInput.style.border = "1px solid red";
            document.getElementById("notValidName").innerHTML = text;
            isValid = false;
        }
        if(birthDate == null || birthDate == ""){
            birthDateInput.style.border = "1px solid red";
            document.getElementById("notValidDate").innerHTML = text;
            isValid = false;
        }
        if(empTitle == null || empTitle == ""){
            employeeTitleInput.style.border = "1px solid red";
            document.getElementById("notValidTitle").innerHTML = text;
            isValid = false;
        }
        if(hiringDate == null || hiringDate == ""){
            hiringDateInput.style.border = "1px solid red";
            document.getElementById("notValidhireDate").innerHTML = text;
            isValid = false;
        }
        if(isValid){
            empNameInput.style.border = "1px solid #ced4da";
            birthDateInput.style.border = "1px solid #ced4da";
            employeeTitleInput.style.border = "1px solid #ced4da";
            hiringDateInput.style.border = "1px solid #ced4da";
            document.getElementById("notValidName").innerHTML = "";
            document.getElementById("notValidDate").innerHTML = "";
            document.getElementById("notValidTitle").innerHTML = "";
            document.getElementById("notValidhireDate").innerHTML = "";
        
         const body = document.querySelector(`#newTable tbody .employee-${index}`);
         let Updateemp = EmpolyeesResult.at(index);

         EmpolyeesResult[index].employeeName = empName;
         EmpolyeesResult[index].birthDate = birthDate;
         EmpolyeesResult[index].employeeTitle = empTitle;
         EmpolyeesResult[index].hiringDate = hiringDate;
         EmpolyeesResult[index].departmentName = value;

        let empId = Updateemp.id;
            var UpdateEmployee = {
                "employeeName": empName,
                "birthDate": birthDate,
                "employeeTitle": empTitle,
                "hiringDate": hiringDate,
                "departmentName": value,
            };
        var UpdateEmpJson = JSON.stringify(UpdateEmployee);
            console.log(UpdateEmpJson);
         
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && (this.status == 200 || this.status ==204)) {

                const birthDate = new Date(EmpolyeesResult[index].birthDate);
                const hiringDate = new Date(EmpolyeesResult[index].hiringDate);
                const htmlTemplate = `

                <tr class="employee-${index}" >
                
                <td>${index}</td>
                <td id="Ename">${EmpolyeesResult[index].employeeName} </td>
                <td id="Ebirth">${getShortDate(birthDate)}</td>
                <td id="ETitle">${EmpolyeesResult[index].employeeTitle}</td>
                <td id="Ehire">${getShortDate(hiringDate)}</td>
                <td id="Edept">${EmpolyeesResult[index].departmentName}</td>

              
        
                    <td>
                    <a class="edit" title="Edit" data-toggle="tooltip" onclick="EditEmpRow(${index})"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip"
                            onclick="DeleteEmployee(${EmpolyeesResult[index].id},${index})"><i class="material-icons">&#xE872;</i></a>
                    </td>
        
                    </tr>
                `;
                body.innerHTML = htmlTemplate; 
                document.getElementById("add-new").disabled = false;
            }
        };
        xhttp.open("PUT", "https://localhost:5001/Employee/"+ empId , true);
        xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhttp.send(UpdateEmpJson);
        
        }
      
   

}
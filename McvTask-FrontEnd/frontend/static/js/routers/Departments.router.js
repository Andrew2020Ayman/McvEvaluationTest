
let Departments = [];
let result ;

function getDepartments() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

        Departments = this.responseText;
         result = JSON.parse(Departments);

          console.log(result);
        const body = document.querySelector('#newTable tbody');
        result.forEach((department,index) => {
     
            const htmlTemplate = `
            <tr class="department-${index}" >
            <td>${index}</td>
            <td id="deptName">${department.departmentName}</td>

            <td>
                    <a class="edit" title="Edit" data-toggle="tooltip" onclick="EditRow(${index})"><i class="material-icons">&#xE254;</i></a>
                    <a class="delete" title="Delete" data-toggle="tooltip" onclick="DeleteDepartment(${department.id},${index})"><i class="material-icons">&#xE872;</i></a>
            </td>

            </tr>
            `;
            body.innerHTML += htmlTemplate;
        });
        }
    };
    xhttp.open("GET", "https://localhost:5001/Department", true);
    xhttp.send();
    }

    function DeleteDepartmentFromTable(index){
        document.getElementById("newTable").deleteRow(index+1);
        document.getElementById("add-new").disabled = false;
    }

    function DeleteDepartment(id,index) {
        let confirmAction = confirm("Are you sure you want delete department?");
        if (confirmAction) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    DeleteDepartmentFromTable(index);
                }
            };
            xhttp.open("DELETE", "https://localhost:5001/Department/"+id , true);
            xhttp.send();
            
           
            
            let Deletedep = result.at(index);
            if (Deletedep != undefined || Deletedep != null) {
              result.splice(index,1); 
            }
            location.reload();
            console.log(result);
        } else {
            alert("Action canceled");
        }
    }

    function addNewRow(){
        document.getElementById("add-new").disabled = true;

        const body = document.querySelector('#newTable tbody');

        var table = document.getElementById("newTable");
        var rowCount = table.rows.length;

        const htmlTemplate = `
        <tr class="department" >
        
        <td>${rowCount-1}</td>
        <td> 
            <input type="text" class="form-control" name="Newdepartment" id="Newdepartment" required>
            <p id="notValid" style="color: red;font-size: small;margin: 0;"></p>
        </td>

            <td>
                    <a class="add" title="Add" data-toggle="tooltip" onclick="addNewDepartment()" ><i class="material-icons">&#xE03B;</i></a>
                    <a class="delete" title="Delete" data-toggle="tooltip" onclick="DeleteDepartmentFromTable(${rowCount-1})"><i class="material-icons">&#xE872;</i></a>
            </td>

            </tr>
        `;

        body.innerHTML += htmlTemplate;
    }

    function addNewDepartment(){
       var deptName =  document.getElementById("Newdepartment").value;
       var deptInput =  document.getElementById("Newdepartment"); 
       let text = "Department name is not valid";
       if(deptName == null || deptName == ""){
        deptInput.style.border = "1px solid red";
        document.getElementById("notValid").innerHTML = text;
       }
       else if(result.filter(e => e.departmentName === deptName).length > 0){
        deptInput.style.border = "1px solid red";
         text = "This department is exist";
         document.getElementById("notValid").innerHTML = text;
       }
       else{
        deptInput.style.border = "1px solid #ced4da";
        document.getElementById("notValid").innerHTML = "";
        var Newdept = {
            "departmentName": deptName
        }
        
        var NewdeptJson = JSON.stringify(Newdept);
        let deptresult={};
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                deptresult = JSON.parse(this.responseText);
                result.push(deptresult);
                console.log(result);

                /* ----------------- */
                var table = document.getElementById("newTable");
                var rowCount = table.rows.length;
                
                DeleteDepartmentFromTable(rowCount-2);
                rowCount = rowCount-2;
        
                const body = document.querySelector('#newTable tbody');
                const htmlTemplate = `
                <tr class="department-${rowCount}" >
                
                <td>${rowCount}</td>
                <td id="deptName">${result[rowCount].departmentName}</td>
        
                    <td>
                    <a class="edit" title="Edit" data-toggle="tooltip" onclick="EditRow(${rowCount})"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip"
                            onclick="DeleteDepartment(${result[rowCount].id},${rowCount})"><i class="material-icons">&#xE872;</i></a>
                    </td>
        
                    </tr>
                `;
        
                body.innerHTML += htmlTemplate;
                console.log(result);
                /* ----------------- */
            }
        };
        xhttp.open("POST", "https://localhost:5001/Department");
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(NewdeptJson);
      
    } 
}

/*  */
function EditRow(index){
    document.getElementById("add-new").disabled = true;

    const body = document.querySelector(`#newTable tbody .department-${index}`);

    const CurrentdeptNamebody = document.querySelector(`#newTable tbody .department-${index} #deptName`);

    CurrentdeptName = CurrentdeptNamebody.innerHTML;
    
    const htmlTemplate = `
    <tr class="department-${index}" >
    
    <td>${index}</td>
    <td> 
        <input type="text" class="form-control" value=${CurrentdeptName} name="Updatedepartment" id="Updatedepartment-${index}" required>
        <p id="notValid" style="color: red;font-size: small;margin: 0;"></p>
    </td>

        <td>
                <a class="add" title="save" data-toggle="tooltip" onclick="SaveDepartment(${index})" ><i class="material-icons">&#xE03B;</i></a>
                <a class="delete" title="Delete" data-toggle="tooltip" onclick="DeleteDepartmentFromTable(${index})"><i class="material-icons">&#xE872;</i></a>
        </td>

        </tr>
    `;

    body.innerHTML = htmlTemplate; 
}

function SaveDepartment(index){
    var NewdeptName =  document.getElementById(`Updatedepartment-${index}`).value;
    var deptInput =  document.getElementById(`Updatedepartment-${index}`); 
       let text = "Department name is not valid";
       if(NewdeptName == null || NewdeptName == ""){
        deptInput.style.border = "1px solid red";
        document.getElementById("notValid").innerHTML = text;
       }
       else if(result.filter(e => e.departmentName === NewdeptName).length > 0){
        deptInput.style.border = "1px solid red";
         text = "This department is exist";
         document.getElementById("notValid").innerHTML = text;
       }
       else{
        const body = document.querySelector(`#newTable tbody .department-${index}`);
       
        let Updatedep = result.at(index);
        result[index].departmentName = NewdeptName;
        console.log(result);
        let deptId = Updatedep.id;
        var Updatedept = {
            "departmentName": NewdeptName
        }
        
        var UpdatedeptJson = JSON.stringify(Updatedept);
      
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && (this.status == 200 || this.status ==204)) {

                const htmlTemplate = `
                <tr class="department-${index}" >
                
                <td>${index}</td>
                <td id="deptName">${result[index].departmentName}</td>
        
                    <td>
                    <a class="edit" title="Edit" data-toggle="tooltip" onclick="EditRow(${index})"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip"
                            onclick="DeleteDepartment(${result[index].id},${index})"><i class="material-icons">&#xE872;</i></a>
                    </td>
        
                    </tr>
                `;
                body.innerHTML = htmlTemplate; 
                document.getElementById("add-new").disabled = false;
            }
        };
        xhttp.open("PUT", "https://localhost:5001/Department/"+ deptId , true);
        xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhttp.send(UpdatedeptJson);
       }
   

}
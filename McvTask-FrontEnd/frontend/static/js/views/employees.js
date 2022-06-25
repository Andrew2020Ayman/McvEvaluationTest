import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Employees");
        getEmployees();
        getDepartmentsNames();
    }

    async getHtml() {
        return `
        <div class="container mt-5">
        <div class="row">
                    <div class="col-sm-8"><h2>Employees  <b>Details</b> </h2></div>
                    <div class="col-sm-4 text-right">
                        <button type="button" class="btn btn-info add-new" id="add-new" onclick="addNewEmployeeRow()" ><i class="fa fa-plus"></i> Add New Employee</button>
                    </div>
                </div>

       
        <table class="table table-bordered" id="newTable" style="width:100%">
        <thead>
        <tr class="bg-dark thColor">
            <th  scope="col">#</th>
            <th  scope="col">Name</th>
            <th  scope="col"> Birth Date </th>
            <th  scope="col">Title</th>
            <th  scope="col"> Hiring Date </th>
            <th  scope="col">Department</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        
        </tbody>
        </table>

        </div>

            
        `;
    }
}
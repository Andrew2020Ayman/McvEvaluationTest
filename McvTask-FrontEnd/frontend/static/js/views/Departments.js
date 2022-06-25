import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Departments");
        getDepartments();

    }


    async getHtml() {
        return `
        <div class="container mt-5">
        <div class="row">
                    <div class="col-sm-8"><h2>Departments  <b>Details</b> </h2></div>
                    <div class="col-sm-4 text-right">
                        <button type="button" class="btn btn-info add-new" id="add-new" onclick="addNewRow()"  ><i class="fa fa-plus"></i> Add New Department</button>
                    </div>
                </div>

       
        <table class="table table-bordered" id="newTable" style="width:100%">
        <thead>
        <tr class="bg-dark thColor" >
            <th  scope="col">#</th>
            <th  scope="col" style="width:80%">name</th>
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
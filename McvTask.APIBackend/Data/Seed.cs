using System.Collections.Generic;
using System.Linq;
using McvTask.API.models;
using Newtonsoft.Json;

namespace McvTask.API.Data
{
    public class Seed
    {
        private readonly DataContext context;

        public Seed(DataContext context)
        {
            this.context = context;
        }

        public void seedData(){
            SeedDepartments();
            SeedEmployees();
        }
        public  void SeedDepartments(){
            if(!context.Departments.Any())
                {
                  var DepartmentData = System.IO.File.ReadAllText("Data/DepartmentSeedData.json");
                  List<department> departments = JsonConvert.DeserializeObject<List<department>>(DepartmentData);

                foreach( var department in departments)
                {
                    context.Departments.Add(department);
                }
            }

        }
        public  void SeedEmployees()
        {
            if(!context.Employees.Any()){
            var EmployeesData = System.IO.File.ReadAllText("Data/EmployeesSeedData.json");
            List<employee> employees = JsonConvert.DeserializeObject<List<employee>>(EmployeesData);

            foreach( var user in employees)
            {
                context.Employees.Add(user);
            }
            context.SaveChanges();
            }
        }
    }
}
using System;
using McvTask.API.models;

namespace McvTask.API.Dtos
{
    public class EmployeeForReturnDto
    {
        public int Id { get; set; }
         public string employeeName { get; set; }
        public DateTime birthDate { get; set; }
        public string employeeTitle { get; set; }
        public DateTime hiringDate { get; set; }
         public string departmentName { get; set; }
    }
}
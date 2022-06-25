using System;

namespace McvTask.API.Dtos
{
    public class EmployeeForCreationDto
    {
         public string employeeName { get; set; }
        public DateTime birthDate { get; set; }
        public string employeeTitle { get; set; }
        public DateTime hiringDate { get; set; }
        public string departmentName { get; set; }
    }
}
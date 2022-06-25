using System;

namespace McvTask.API.models
{
    public class employee
    {
        public int Id { get; set; }
        public string employeeName { get; set; }
        public DateTime birthDate { get; set; }
        public string employeeTitle { get; set; }
        public DateTime hiringDate { get; set; }
        
        public int departmentId { get; set; }
        public virtual department department { get; set; }

    }
}
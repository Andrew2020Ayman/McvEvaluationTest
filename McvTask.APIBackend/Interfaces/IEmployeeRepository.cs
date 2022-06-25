using System.Collections.Generic;
using System.Threading.Tasks;
using McvTask.API.models;

namespace McvTask.API.Data
{
    public interface IEmployeeRepository
    {
        void Add<T>(T entity) where T:class;
        void Delete<T>(T entity) where T:class;
        Task<bool> SaveAll();

        public Task<IEnumerable<employee>> GetEmployees();
        public Task<employee> GetEmployee(int id);
        public Task<department> getDepartment(string departmentName);
    }
}
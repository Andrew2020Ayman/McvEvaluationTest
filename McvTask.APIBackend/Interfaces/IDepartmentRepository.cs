using System.Collections.Generic;
using System.Threading.Tasks;
using McvTask.API.models;

namespace McvTask.API.Interfaces
{
    public interface IDepartmentRepository
    {
         void Add<T>(T entity) where T:class;
        void Delete<T>(T entity) where T:class;
        Task<bool> SaveAll();

        public Task<IEnumerable<department>> GetDepartments();
        public Task<department> GetDepartment(int id);
        public Task<bool> DepartmentNameIsFound(string departmentName);

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using McvTask.API.Data;
using McvTask.API.Dtos;
using McvTask.API.Interfaces;
using McvTask.API.models;
using Microsoft.AspNetCore.Mvc;

namespace McvTask.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentRepository repo;
        private readonly IMapper mapper;

        public DepartmentController(IDepartmentRepository repo , IMapper mapper)
       {
            this.repo = repo;
            this.mapper = mapper;
        }

       [HttpGet]
       public async Task<IActionResult> GetDepartments(){
        var Departments = await repo.GetDepartments();
        var departmentsToReturn =  mapper.Map<IEnumerable<DepartmentForReturnDto>>(Departments);
        return Ok(departmentsToReturn);
       } 
       [HttpGet("{id}")]
       public async Task<IActionResult> GetDepartment(int id){
        var Department = await repo.GetDepartment(id);
        if(Department ==null)
          return BadRequest($"Department with id: {id} doesn't exist");

        var departmentToReturn =  mapper.Map<DepartmentForReturnDto>(Department);
        return Ok(departmentToReturn);
       } 

       [HttpPost]
       public async Task<IActionResult> AddDepartment(DepartmentForCreationDto departmentForCreationDto){

            departmentForCreationDto.departmentName = departmentForCreationDto.departmentName.ToLower();
            if( ! await repo.DepartmentNameIsFound(departmentForCreationDto.departmentName)){
            return BadRequest("This Department is already exists");
            }
            var Createddepartment = mapper.Map<department>(departmentForCreationDto);
            repo.Add<department>(Createddepartment);
            if(await repo.SaveAll()){
                var department = mapper.Map<DepartmentForReturnDto>(Createddepartment);
                return Ok(department);
            }
            throw new Exception("Failed to create department");
       } 
     [HttpPut("{id}")]
       public async Task<IActionResult> EditDepartment(int id,DepartmentForUpdateDto departmentForUpdateDto)
       {
         departmentForUpdateDto.departmentName = departmentForUpdateDto.departmentName.ToLower();
         if(!await repo.DepartmentNameIsFound(departmentForUpdateDto.departmentName))
            return BadRequest("This Department name is already exists");
         
         var departmentfromRepo = await repo.GetDepartment(id);
                    
        mapper.Map(departmentForUpdateDto,departmentfromRepo);
        if(await repo.SaveAll())
            return NoContent();   
            
          throw new Exception($"Updating department {id} failed on save") ;
       }
        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteDepartment(int id){
             var departmentFromRepo = await repo.GetDepartment(id);
              if(departmentFromRepo == null)
               return BadRequest($"department with id: {id} doesn't exist");

             repo.Delete(departmentFromRepo);

             if(await repo.SaveAll())
                return Ok();

            return BadRequest("Failed to delete the department");
        }

    }
}
using System.Linq;
using AutoMapper;
using McvTask.API.Dtos;
using McvTask.API.models;
using McvTask.API___test.Dtos;

namespace McvTask.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
             CreateMap<EmployeeForCreationDto,employee>();
             CreateMap<employee,EmployeeForReturnDto>()
             .ForMember(opt => opt.departmentName, opt =>{
                    opt.MapFrom(src => src.department.departmentName);});

             CreateMap<EmployeeForUpdateDto,employee>();
             CreateMap<department,DepartmentForReturnDto>();
             CreateMap<DepartmentForCreationDto,department>();
              CreateMap<DepartmentForUpdateDto,department>();
        }
    }
}
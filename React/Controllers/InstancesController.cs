using Microsoft.AspNetCore.Mvc;
using React.Models;
using System.Collections.Generic;
using System.Linq;

namespace React.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class InstancesController : ControllerBase
    {
        List<Instance> instances = new List<Instance>();

        //экземпляры операции
        [HttpGet("{id}")]
        public IEnumerable<Instance> GetInstancesOfOperation([FromRoute] int id)
        {
            instances.Add(new Instance { Id = 1, Name = "instance1", Id_type = 1 });
            instances.Add(new Instance { Id = 2, Name = "instance2", Id_type = 1 });
            instances.Add(new Instance { Id = 3, Name = "instance3", Id_type = 2 });
            return instances.Where(x => x.Id_type == id);
        }

        //экземпляры критерия
        [HttpGet("instancesOfCriteria/{id}")]
        public IEnumerable<Instance> Get([FromRoute] int id)
        {
            instances.Add(new Instance { Id = 1, Name = "instance1", Id_type = 1 });
            instances.Add(new Instance { Id = 2, Name = "instance2", Id_type = 1 });
            instances.Add(new Instance { Id = 3, Name = "instance3", Id_type = 2 });
            return instances.Where(x => x.Id_type == id); 
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using React.Models;
using System.Collections.Generic;

namespace React.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TypesController : ControllerBase
    {
        List<Type> types = new List<Type>();

        [HttpGet]
        public IEnumerable<Type> Get()
        {
            types.Add(new Type { Id = 1, Name = "type1" });
            types.Add(new Type { Id = 2, Name = "type2" });
            types.Add(new Type { Id = 3, Name = "type3" });
            return types;
        }
    }
}

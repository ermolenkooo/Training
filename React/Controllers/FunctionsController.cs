using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using React.Models;

namespace React.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FunctionsController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Function> Get()
        {
            List<Function> functions = new List<Function>();
            functions.Add(new Function { Id = 1, Name = "функция1" });
            functions.Add(new Function { Id = 2, Name = "функция2" });
            functions.Add(new Function { Id = 3, Name = "функция3" });
            return functions;
        }
    }
}

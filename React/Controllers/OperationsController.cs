using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using React.Models;
using System.Collections.Generic;
using System.Linq;

namespace React.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OperationsController : ControllerBase
    {
        List<Operation> operations = new List<Operation>();

        [HttpGet("{id}")]
        public IEnumerable<Operation> Get([FromRoute] int id)
        {
            operations.Add(new Operation { Id = 1, Name = "operation1", Id_command = 1, Id_type = 1, Id_training = 1 });
            operations.Add(new Operation { Id = 2, Name = "operation2", Id_command = 2, Id_type = 2, Id_training = 2 });
            operations.Add(new Operation { Id = 3, Name = "operation3", Id_command = 3, Id_type = 3, Id_training = 2 });
            return operations.Where(x => x.Id_training == id).ToList();
        }

        /*[HttpGet("{id}")]
        public IActionResult GetOperation([FromRoute] int id) 
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            /*var operation = //получение;
            if (operation == null)
            {
                return NotFound();
            }*/
            /*return Ok(/*operation);
        }*/

        [HttpPost]
        public IActionResult Add([FromBody] Operation o)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //добавление в базу данных
            return CreatedAtAction("GetOperation", new { id = o.Id }, o);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //тут удаление из базы данных
            return NoContent();
        }
    }
}

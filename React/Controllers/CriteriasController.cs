using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using React.Models;
using System.Collections.Generic;
using System.Linq;

namespace React.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CriteriasController : ControllerBase
    {
        List<Criteria> criterias = new List<Criteria>();

        [HttpGet("{id}")]
        public IEnumerable<Criteria> Get([FromRoute] int id)
        {
            criterias.Add(new Criteria { Id = 1, Name = "criteria1", Id_function = 1, Id_type = 1, Id_training = 1, Price = 1 });
            criterias.Add(new Criteria { Id = 2, Name = "criteria2", Id_function = 2, Id_type = 2, Id_training = 2, Price = 2 });
            criterias.Add(new Criteria { Id = 3, Name = "criteria3", Id_function = 3, Id_type = 3, Id_training = 2, Price = 3 });
            return criterias.Where(x => x.Id_training == id).ToList();
        }

        [HttpPost]
        public IActionResult Add([FromBody] Criteria c)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //добавление в базу данных
            return CreatedAtAction("GetOperation", new { id = c.Id }, c);
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

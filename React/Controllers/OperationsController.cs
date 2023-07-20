using ArchiveRederScadaV;
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
        TrainingDbManager dbManager;

        public OperationsController()
        {
            dbManager = new TrainingDbManager();
            dbManager.ConnectToDb("D:\\work\\programs\\React\\React\\TrainingEvents.db");
        }

        [HttpGet("{id}")]
        public IEnumerable<Operation> Get([FromRoute] int id)
        {
            return dbManager.GetAllOperations(id);
        }


        [HttpPost]
        public IActionResult Add([FromBody] Operation o)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //добавление в базу данных
            dbManager.AddOperation(o);
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
            dbManager.DeleteOperation(id);
            return NoContent();
        }
    }
}

using ArchiveRederScadaV;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using React.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace React.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CriteriasController : ControllerBase
    {
        TrainingDbManager dbManager;

        public CriteriasController()
        {
            dbManager = new TrainingDbManager();
            dbManager.ConnectToDb("D:\\work\\programs\\React\\React\\TrainingEvents.db");
        }

        [HttpGet("{id}")]
        public IEnumerable<Criteria> Get([FromRoute] int id)
        {
            return dbManager.GetAllCriterias(id);
        }

        [HttpPost]
        public IActionResult Add([FromBody] Criteria c)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //добавление в базу данных
            dbManager.AddCriteria(c);
            return CreatedAtAction("GetCriteria", new { id = c.Id }, c);
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] Criteria c) 
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            dbManager.UpdateCriteria(id, c);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //тут удаление из базы данных
            dbManager.DeleteCriteria(id);
            return NoContent();
        }
    }
}

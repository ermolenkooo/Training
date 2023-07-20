using ArchiveRederScadaV;
using Microsoft.AspNetCore.Mvc;
using React.Models;
using System.Collections.Generic;

namespace React.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TrainingsController : ControllerBase
    {
        TrainingDbManager dbManager;

        public TrainingsController()
        {
            dbManager = new TrainingDbManager();
            dbManager.ConnectToDb("D:\\work\\programs\\React\\React\\TrainingEvents.db");
        }

        [HttpGet]
        public IEnumerable<Training> Get()
        {
            return dbManager.GetAllTraining();
        }

        [HttpPost]
        public IActionResult Add([FromBody] Training t)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //добавление в базу данных
            dbManager.AddTraining(t);
            return CreatedAtAction("GetOperation", new { id = t.Id }, t);
        }
    }
}

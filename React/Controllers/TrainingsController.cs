using Microsoft.AspNetCore.Mvc;
using React.Models;
using System.Collections.Generic;

namespace React.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TrainingsController : ControllerBase
    {
        List<Training> trainings = new List<Training>();

        [HttpGet]
        public IEnumerable<Training> Get()
        {
            trainings.Add(new Training { Id = 1, Name = "training1" });
            trainings.Add(new Training { Id = 2, Name = "training2" });
            trainings.Add(new Training { Id = 3, Name = "training3" });
            return trainings;
        }

        [HttpPost]
        public IActionResult Add([FromBody] Training t)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //добавление в базу данных
            return CreatedAtAction("GetOperation", new { id = t.Id }, t);
        }
    }
}

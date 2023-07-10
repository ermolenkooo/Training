using Microsoft.AspNetCore.Mvc;
using React.Models;
using System.Collections.Generic;
using System.IO;

namespace React.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        List<Task> tasks = new List<Task>();

        [HttpGet]
        public IEnumerable<Task> Get()
        {
            tasks.Add(new Task { Id = 1, Name = "task1" });
            tasks.Add(new Task { Id = 2, Name = "task2" });
            tasks.Add(new Task { Id = 3, Name = "task3" });
            return tasks;
        }

        [HttpPost]
        public Task Add([FromBody] Task t)
        {
            Task task = new Task();
            return task;
        }
    }
}

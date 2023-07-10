using Microsoft.AspNetCore.Mvc;
using React.Models;
using System.Collections.Generic;

namespace React.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ObjectsController : ControllerBase
    {
        List<TaskObject> objects = new List<TaskObject>();

        [HttpGet]
        public IEnumerable<TaskObject> Get()
        {
            objects.Add(new TaskObject() { Id = 1, Id_Function = 1, Id_Task = 1, Mark = "mark1", Parameters = "parameters1", Result = "result1", Id_Object = "" });
            objects.Add(new TaskObject() { Id = 2, Id_Function = 2, Id_Task = 1, Mark = "mark2", Parameters = "parameters2", Result = "result2", Id_Object = "" });
            objects.Add(new TaskObject() { Id = 3, Id_Function = 3, Id_Task = 1, Mark = "mark3", Parameters = "parameters3", Result = "result3", Id_Object = "" });
            return objects;
        }

        [HttpPost]
        public TaskObject Add()
        {
            TaskObject taskObject = new TaskObject() { Id = 4, Id_Function = 1, Id_Task = 1, Mark = "", Parameters = "", Result = "", Id_Object = "" };
            objects.Add(taskObject);
            return taskObject;
        }
    }
}

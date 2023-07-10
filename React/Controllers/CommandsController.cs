using Microsoft.AspNetCore.Mvc;
using React.Models;
using System.Collections.Generic;

namespace React.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CommandsController : ControllerBase
    {
        List<Command> commands = new List<Command>();

        [HttpGet]
        public IEnumerable<Command> Get()
        {
            commands.Add(new Command { Id = 1, Name = "command1" });
            commands.Add(new Command { Id = 2, Name = "command2" });
            commands.Add(new Command { Id = 3, Name = "command3" });
            return commands;
        }
    }
}

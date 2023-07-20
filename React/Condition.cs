using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiveRederScadaV
{
    public class Condition
    {
        public string text;
        public string operation;

        public Condition(string text, string operation)
        {
            this.text = text;
            this.operation = operation;
        }

        public Condition(string text)
        {
            this.text = text;
            this.operation = "_";
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiveRederScadaV
{
    public class TexnObjDescription
    {
        public string Marka;
        public string Name;

        public TexnObjDescription()
        {
            Marka = string.Empty;
            Name = string.Empty;
        }

        public TexnObjDescription(string marka, string name)
        {
            Marka = marka;
            Name = name;
        }
    }
}

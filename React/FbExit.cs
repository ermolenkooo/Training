using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiveRederScadaV
{
    public class FbExit//выход функционального блока
    {
        public FbExit()
        {
            Id = 0;
            ParamName = string.Empty;
        }

        public FbExit(int id, string paramName)
        {
            Id = id;
            ParamName = paramName;
        }

        public int Id;//Тэг-Id
        public string ParamName;//Названиепараметра, например, "AD_Вых"
    }
}

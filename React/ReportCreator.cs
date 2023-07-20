using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiveRederScadaV
{
    public class ReportCreator
    {
        public string PathToReports { get; private set; }

        

        public void SetPathToReports(string pathToReports)
        {
            PathToReports = pathToReports;
        }

        public void CreateReport(string fio, string job, List<string> criteriaMarks, int itogMark)
        {
            string head = "           Оценка тренировки           \n";
            head += "                      " + fio + "\n" + "                      " + job + "\n\n" + "    Протокол проведения тренировки    \n"; 
            string protokol = "";
            for(int i = 0; i < criteriaMarks.Count; i++)
            {
                protokol += "Критерий номер " + (i + 1).ToString() + "\n";
                protokol += criteriaMarks[i] + "\n" + "\n";
            }
            protokol += "Итог: " + itogMark + " баллов.";
            string fileName = fio.Replace(".", "");
            fileName = fileName.Replace(" ", "");
            System.IO.File.WriteAllText(PathToReports+"\\" +fileName+".txt", head+protokol);
        }
    }
}

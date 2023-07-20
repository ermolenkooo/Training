using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiveRederScadaV
{
    public class GraficsDbManager
    {
        private SqliteConnection connection;

        public void ConnectToDb(string dbName)
        {
            connection = new SqliteConnection("Data Source=" + dbName);
            connection.Open();
        }

        public void Disconnect()
        {
            connection.Close();
        }

        /// <summary>
        /// Добавляет функцию с новым именем в таблицу и возвращает id этой функции
        /// </summary>
        /// <param name="function">имя новой функции</param>
        /// <returns>id новой функции</returns>
        public int AddFunction(string function) 
        {
            SqliteCommand sqliteCommand = new SqliteCommand("Insert into Function (description) VALUES ('" + function + "')", connection);
            sqliteCommand.ExecuteScalar();
            int functionId = getFunctionIdByDescription(function);
            sqliteCommand.Dispose();
            return functionId;
        }

        /// <summary>
        /// Удаляет функцию из таблицы функций и все её значения из таблицы значений, если они есть
        /// </summary>
        /// <param name="function">имя функции</param>
        public void RemoveFunction(string function) 
        {
            int functionId = getFunctionIdByDescription(function);
            SqliteCommand command = new SqliteCommand("Delete from Function where id = " + functionId, connection);
            command.ExecuteScalar();
            //удаление всех значений, соответствующих функции
            SqliteCommand command1 = new SqliteCommand("Delete from Value where functionId = " + functionId, connection);
            try
            {
                command1.ExecuteScalar();
            }
            catch (Exception e)
            {

            }
            finally 
            {
                command.Dispose();
                command1.Dispose();
            }
        }

        public void AddValueTimePairToFunction(string function, float v, DateTime d)
        {
            int functionId = getFunctionIdByDescription(function);
            SqliteCommand command = new SqliteCommand("Insert into Value (xValue, TimeStamp, functionId) VALUES (" + v.ToString().Replace(',', '.') + ", " + d.Ticks + ", "+ functionId+")", connection);
            command.ExecuteScalar();
            command.Dispose();
        }

        public void RemoveValuePairFromFunction(string function, float v, DateTime d)
        {
            int functionId = getFunctionIdByDescription(function);
            SqliteCommand command = new SqliteCommand("Delete from Value where xValue = "+ v.ToString().Replace(',', '.') + " and TimeStamp = "+d.Ticks+" and functionId = "+functionId, connection);
            command.ExecuteScalar();
            command.Dispose();
        }

        public void RemoveValuesWithCurrentData(string function, DateTime d)
        {
            int functionId = getFunctionIdByDescription(function);
            SqliteCommand command = new SqliteCommand("Delete from Value where TimeStamp = " + d.Ticks + " and functionId = " + functionId, connection);
            command.ExecuteScalar();
            command.Dispose();
        }

        /// <summary>
        /// Получение всех пар значение - дата для конкретной функции
        /// </summary>
        /// <param name="function">имя функции</param>
        /// <returns>Список пар значение - дата</returns>
        public List<Tuple<float, DateTime>> GetValuePairs(string function)
        {
            List<Tuple<float, DateTime>> ans = new List<Tuple<float, DateTime>>();
            int functionId = getFunctionIdByDescription(function);
            SqliteCommand command = new SqliteCommand("Select xValue, TimeStamp from Value where functionId = " + functionId, connection);
            SqliteDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                ans.Add(new Tuple<float, DateTime>(Convert.ToSingle(reader[0]), new DateTime(Convert.ToInt64(reader[1]))));
            }
            command.Dispose();
            return ans;
        }

        /// <summary>
        /// Получение id функции по её имени
        /// </summary>
        /// <param name="description">имя функции (строка)</param>
        /// <returns>id функции или 0, если функции с таким именем нет в базе</returns>
        private int getFunctionIdByDescription(string description)
        {
            int functionId;
            SqliteCommand command = new SqliteCommand("Select id from Function where description = '" + description + "'", connection);
            try
            {
                functionId = Convert.ToInt32(command.ExecuteScalar());
            }
            catch (Exception ex)
            {
                return 0;
            }
            finally 
            { 
                command.Dispose(); 
            }
            return functionId;
        }
    }
}

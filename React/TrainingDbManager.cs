using Microsoft.Data.Sqlite;
using React.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiveRederScadaV
{
    public class TrainingDbManager
    {
        private SqliteConnection connection;

        public void ConnectToDb(string dbName)
        {
            connection = new SqliteConnection("Data Source="+dbName);
            connection.Open();
        }

        public void Disconnect()
        {
            connection.Close();
        }

        public List<Training> GetAllTraining()
        {
            List<Training> trainings = new List<Training>();
            SqliteCommand command = new SqliteCommand("SELECT id, name, mark FROM Training", connection);

            SqliteDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                trainings.Add(new Training { Id = Convert.ToInt32(reader[0]), Name = reader[1].ToString(), Mark = Convert.ToInt32(reader[2]) });
            }

            command.Dispose();
            return trainings;
        }

        public void AddTraining(Training training)
        {
            SqliteCommand command = new SqliteCommand("INSERT INTO Training (name, mark) VALUES ('" + training.Name.ToString() + "', '" + training.Mark.ToString() + "')", connection);
            command.ExecuteNonQuery();
            command.Dispose();
        }

        public List<Operation> GetAllOperations(int id)
        {
            List<Operation> operations = new List<Operation>();
            SqliteCommand command = new SqliteCommand("SELECT id, name FROM Operation WHERE id_training = " + id.ToString(), connection);

            SqliteDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                operations.Add(new Operation { Id = Convert.ToInt32(reader[0]), Name = reader[1].ToString(), Id_training = id });
            }

            command.Dispose();
            return operations;
        }

        public void AddOperation(Operation operation)
        {
            SqliteCommand command = new SqliteCommand("INSERT INTO Operation (name, id_training) VALUES ('" + operation.Name.ToString() + "', '" + operation.Id_training.ToString() + "')", connection);
            command.ExecuteNonQuery();
            command.Dispose();
        }

        public void DeleteOperation(int id)
        {
            SqliteCommand command = new SqliteCommand("DELETE FROM Operation WHERE id = " + id.ToString(), connection);
            command.ExecuteNonQuery();
            command.Dispose();
        }

        public List<Criteria> GetAllCriterias(int id)
        {
            List<Criteria> criterias = new List<Criteria>();
            SqliteCommand command = new SqliteCommand("SELECT id, name, price, id_type, id_function, id_instance FROM Criteria WHERE id_training = " + id.ToString(), connection);

            SqliteDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                criterias.Add(new Criteria { Id = Convert.ToInt32(reader[0]), Name = reader[1].ToString(), Price = Convert.ToInt32(reader[2]), Id_type = Convert.ToInt32(reader[3]), Id_function = Convert.ToInt32(reader[4]), Id_instance = Convert.ToInt32(reader[5]), Id_training = id });
            }

            command.Dispose();
            return criterias;
        }

        public void AddCriteria(Criteria criteria)
        {
            SqliteCommand command = new SqliteCommand("INSERT INTO Criteria (name, id_training, price, id_type, id_function, id_instance) VALUES ('" + criteria.Name.ToString() + "', '" + criteria.Id_training.ToString() + "', '0', '1', '1', '1')", connection);
            command.ExecuteNonQuery();
            command.Dispose();
        }

        public void DeleteCriteria(int id)
        {
            SqliteCommand command = new SqliteCommand("DELETE FROM Criteria WHERE id = " + id.ToString(), connection);
            command.ExecuteNonQuery();
            command.Dispose();
        }

        public void UpdateCriteria(int id, Criteria criteria)
        {
            SqliteCommand command = new SqliteCommand("UPDATE Criteria SET price = '" + criteria.Price.ToString() + "', id_type = '" + criteria.Id_type.ToString() + "', id_function = '" + criteria.Id_function.ToString() + "', id_instance = '" + criteria.Id_instance.ToString() + "' WHERE id = " + id.ToString(), connection);
            command.ExecuteNonQuery();
            command.Dispose();
        }

        /// <summary>
        /// Получение списка всех условий для конкретного события
        /// </summary>
        /// <param name="eventName">Имя события</param>
        /// <returns>Список условий данного события</returns>
        public List<Condition> GetConditionsListByEventName(string eventName)
        {
            List<Condition> ans = new List<Condition>();
            List<int> conditionIds = new List<int>();
            SqliteCommand command = new SqliteCommand("Select id from Event where name = '" + eventName + "'", connection);
            int eventId = Convert.ToInt32(command.ExecuteScalar());

            SqliteCommand command1 = new SqliteCommand("Select conditionId from EventConditionComparison where eventId = "+eventId, connection);
            SqliteDataReader reader = command1.ExecuteReader();
            while (reader.Read())
            {
                conditionIds.Add(Convert.ToInt32(reader[0]));
            }

            for(int i = 0; i<conditionIds.Count; i++)
            {
                SqliteCommand command2 = new SqliteCommand("Select conditionText, operation from Condition where id = " + conditionIds[i], connection);
                SqliteDataReader reader2 = command2.ExecuteReader();
                while(reader2.Read())
                {
                    ans.Add(new Condition(reader2[0].ToString(), reader2[1].ToString()));
                }
            }
            command.Dispose();
            command1.Dispose();
            return ans;
        }

        /// <summary>
        /// Сохранение нового события и относящихся к нему условий
        /// </summary>
        /// <param name="eventName">Имя события</param>
        /// <param name="conditions">Спиок условий</param>
        public void SaveEvent(string eventName, List<Condition> conditions)
        {
            SqliteCommand command = new SqliteCommand("Insert into Event (name) VALUES ('" + eventName + "')", connection);
            command.ExecuteScalar();

            SqliteCommand command1 = new SqliteCommand("Select id from Event where name = '" + eventName + "'", connection);
            int eventId = Convert.ToInt32(command1.ExecuteScalar());

            int conditionId = 0;

            string createCondition = "Insert into Condition (conditionText, operation) VALUES ('";
            string getCurrentConditionId = "Select id from Condition where conditionText = '";
            string createEventConditionComparison = "Insert into EventConditionComparison (eventId, conditionId) VALUES (";

            for(int i = 0; i<conditions.Count; i++)
            {
                SqliteCommand command2 = new SqliteCommand(createCondition + conditions[i].text+"', '"+ conditions[i].operation+"')", connection);
                command2.ExecuteScalar();

                SqliteCommand command3 = new SqliteCommand(getCurrentConditionId+conditions[i].text+ "' and operation = '"+ conditions[i].operation+"'", connection);
                conditionId = Convert.ToInt32(command3.ExecuteScalar());

                SqliteCommand command4 = new SqliteCommand(createEventConditionComparison + eventId+", "+ conditionId+")", connection);
                command4.ExecuteScalar();
            }
            command.Dispose();
            command1.Dispose();
        }

        /// <summary>
        /// Удаление события и всех условий, относящихся к нему
        /// </summary>
        /// <param name="eventName">Имя события</param>
        public void DeleteEvent(string eventName)
        {
            SqliteCommand command = new SqliteCommand("Select id from Event where name = '" + eventName + "'", connection);
            int eventId = Convert.ToInt32(command.ExecuteScalar());

            List<int> conditionIds = new List<int>();
            List<int> eventConditionComparisonIds = new List<int>();
            SqliteCommand command1 = new SqliteCommand("Select conditionId, id from EventConditionComparison where eventId = " + eventId, connection);
            SqliteDataReader reader = command1.ExecuteReader();
            while (reader.Read())
            {
                conditionIds.Add(Convert.ToInt32(reader[0]));
                eventConditionComparisonIds.Add(Convert.ToInt32(reader[1]));
            }
            SqliteCommand command2 = new SqliteCommand("Delete from Event where id = " + eventId, connection);
            command2.ExecuteScalar();
            for(int i = 0; i < conditionIds.Count; i++)
            {
                SqliteCommand command3 = new SqliteCommand("Delete from Condition where id = " + conditionIds[i], connection);
                command3.ExecuteScalar();
                
            }
            for(int i = 0; i < eventConditionComparisonIds.Count; i++)
            {
                SqliteCommand command4 = new SqliteCommand("Delete from EventConditionComparison where id = " + eventConditionComparisonIds[i], connection);
                command4.ExecuteScalar();
            }
            command.Dispose();
            command1.Dispose();
        }

        /// <summary>
        /// Добавление одного условия к событию
        /// </summary>
        /// <param name="eventName">Имя события</param>
        /// <param name="condition">Условие</param>
        public void AddConditionToEvent(string eventName, Condition condition)
        {
            SqliteCommand command = new SqliteCommand("Select id from Event where name = '"+eventName+"'", connection);
            int eventId = Convert.ToInt32(command.ExecuteScalar());

            SqliteCommand command1 = new SqliteCommand("Insert into Condition (conditionText, operation) VALUES ('"+condition.text+"', '" + condition.operation+"')", connection);
            command1.ExecuteScalar();

            SqliteCommand command2 = new SqliteCommand("Select id from Condition where conditionText = '" + condition.text +"' and operation = '"+condition.operation+"'", connection);
            int conditionId = Convert.ToInt32(command2.ExecuteScalar());

            SqliteCommand command3 = new SqliteCommand("Insert into EventConditionComparison (eventId, conditionId) VALUES ("+eventId+", "+conditionId+")", connection);
            command3.ExecuteScalar();

            command.Dispose();
            command1.Dispose();
            command2.Dispose();
            command3.Dispose();
        }

        /// <summary>
        /// Удаление одного условия внутри конкретного события
        /// </summary>
        /// <param name="eventName">Имя события</param>
        /// <param name="condition">Условие</param>
        public void DeleteConditionInEvent(string eventName, Condition condition)
        {
            SqliteCommand command = new SqliteCommand("Select id from Event where name = '" + eventName + "'", connection);
            int eventId = Convert.ToInt32(command.ExecuteScalar());

            SqliteCommand command2 = new SqliteCommand("Select id from Condition where conditionText = '" + condition.text + "' and operation = '" + condition.operation + "'", connection);
            int conditionId = Convert.ToInt32(command2.ExecuteScalar());

            SqliteCommand command1 = new SqliteCommand("Delete from EventConditionComparison where conditionId = "+conditionId, connection);
            command1.ExecuteScalar();

            SqliteCommand command3 = new SqliteCommand("Delete from Condition where id = "+conditionId, connection); 
            command3.ExecuteScalar();
            command.Dispose();
            command1.Dispose();
            command2.Dispose();
            command3.Dispose();
        }
    }
}

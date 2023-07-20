using FirebirdSql.Data.FirebirdClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiveRederScadaV
{
    public class ScadaDbConnection
    {
        public ScadaDbConnection(string pathToBase)
        {
            connectionStatus = ConnectToDataBase(pathToBase);
        }

        public void Disconnect()
        {
            if (connectionStatus)
            {
                _fb.Close();
            }
        }

        bool connectionStatus;

        /// <summary>
        /// Объект для работы с базой данных
        /// </summary>
        private FbConnection _fb;

        private string getTagIdQuery1 = "Select PARAMID from GATE_SELECTPLCSTAGS((Select PLC_ID From Cards Where Cards.Marka = '{0}'), (select id from cards where objtypeid in (select id from objtype where section = 3))) WHERE MARKA = '{0}'";

        private string getTypeNameQuery = "SELECT OBJTYPE.NAME FROM OBJTYPE INNER JOIN CARDS ON CARDS.OBJTYPEID = OBJTYPE.ID  AND CARDS.MARKA = '{0}'";

        private string getExitsTagsQuery = "SELECT CARDPARAMS.ID, OBJTYPEPARAM.NAME AS PARAMNAME,ED_IZM FROM CardParams inner join ObjTypeParam on (cardparams.objtypeparamid=ObjTypeParam.id) inner join Cards on (Cards.id=CARDPARAMS.CARDID) inner join Cards PLC on (PLC.ID=Cards.PLC_ID) left join aobjtypeproperty on (aobjtypeproperty.objtypeid=PLC.objtypeid)and(upper(aobjtypeproperty.Name)='PLCMODE') left join CardProperty on (CardProperty.mode=0)and(CardProperty.objid=PLC.ID)and(CardProperty.propertyid=aobjtypeproperty.id) Where (cardparams.id>0)and(cardparams.cardid in (SELECT Cards.ID FROM Cards WHERE Cards.MARKA = '{0}')) ORDER BY cardparams.cardid";

        private string getUserNamesQuery = "SELECT USERNAME FROM Users";

        private string getObjectNamesQuery = "SELECT NAME FROM OBJTYPE";

        private string getMarkaNameByObjTypeNameQuery = "SELECT MARKA, NAME FROM CARDS WHERE OBJTYPEID = (SELECT ID FROM OBJTYPE WHERE NAME = '{0}')";

        private string getScaleBoundariesQuery = "SELECT CARDPARAMS.S0, CARDPARAMS.S100 FROM CARDPARAMS WHERE CARDPARAMS.ID = {0}";

        public void GetScaleBoundaries(int channelId, out float low, out float high)
        {
            low = float.MinValue;
            high = float.MinValue;
            if (connectionStatus)
            {
                var cmd = _fb.CreateCommand();
                cmd.CommandText = String.Format(getScaleBoundariesQuery, channelId);
                using (var reader = cmd.ExecuteReader())
                    while (reader.Read())
                        try
                        {
                            low = Convert.ToSingle(reader[0]);
                            high = Convert.ToSingle(reader[1]);
                        }
                        catch (Exception ex)
                        {
                            low = float.MinValue;
                            high = float.MinValue;
                        }
            }
        }

        public int GetTagIdByMark(string marka)
        {
            if (connectionStatus)
            {
                var cmd = _fb.CreateCommand();
                cmd.CommandText = String.Format(getTagIdQuery1, marka);
                int tagId = int.MinValue;
                using (var reader = cmd.ExecuteReader())
                    while (reader.Read())
                        try
                        {
                            tagId = Convert.ToInt32(reader[0]);
                        }
                        catch (Exception ex)
                        {
                            return int.MinValue;
                        }

                return tagId;
            }
            else return int.MinValue;
        }

        /// <summary>
        /// Извлекает из БД список Id выходов ФБ, соответствующего марке
        /// </summary>
        /// <param name="marka">марка переменной</param>
        /// <returns>список Id выходов блока</returns>
        public List<FbExit> GetExitsTagsByMark(string marka)
        {
            List<FbExit> ans = new List<FbExit>();
            if (connectionStatus)
            {
                var cmd = _fb.CreateCommand();
                cmd.CommandText = String.Format(getExitsTagsQuery, marka);
                using (var reader = cmd.ExecuteReader())
                    while (reader.Read())
                        try
                        {
                            ans.Add(new FbExit(Convert.ToInt32(reader[0]), reader[1].ToString()));
                        }
                        catch (Exception ex)
                        {
                            ans.Add(new FbExit());
                        }
            }
            return ans;
        }

        public List<string> GetUserNames()
        {
            List<string> ans = new List<string>();
            if (connectionStatus)
            {
                var cmd = _fb.CreateCommand();
                cmd.CommandText = String.Format(getUserNamesQuery);
                using (var reader = cmd.ExecuteReader())
                    while (reader.Read())
                        try
                        {
                            ans.Add(reader[0].ToString());
                        }
                        catch (Exception ex)
                        {
                            ans.Add("");
                        }
            }
            return ans;
        }

        public List<string> GetObjectNames()
        {
            List<string> ans = new List<string>();
            if (connectionStatus)
            {
                var cmd = _fb.CreateCommand();
                cmd.CommandText = String.Format(getObjectNamesQuery);
                using (var reader = cmd.ExecuteReader())
                    while (reader.Read())
                        try
                        {
                            ans.Add(reader[0].ToString());
                        }
                        catch (Exception ex)
                        {
                            ans.Add("");
                        }
            }
            return ans;
        }

        /// <summary>
        /// Извлекает марку, имя и полное имя для всех технических объектов (переменных) определенного типа
        /// </summary>
        /// <param name="objTypeName">Название типа, например, "AD3_v1"</param>
        /// <returns>марка имя и полное имя для всех найденных объектов</returns>
        public List<TexnObjDescription> GetMarkaNameByObjTypeName(string objTypeName)
        {
            List<TexnObjDescription> ans = new List<TexnObjDescription>();
            if (connectionStatus)
            {
                var cmd = _fb.CreateCommand();
                cmd.CommandText = String.Format(getMarkaNameByObjTypeNameQuery, objTypeName);
                using (var reader = cmd.ExecuteReader())
                    while (reader.Read())
                        try
                        {
                            ans.Add(new TexnObjDescription(reader[0].ToString(), reader[1].ToString()));
                        }
                        catch (Exception ex)
                        {
                            ans.Add(new TexnObjDescription());
                        }
            }
            return ans;
        }

        public string GetTypeNameByMark(string marka)
        {
            string ans = "No_data";
            if (connectionStatus)
            {
                var cmd = _fb.CreateCommand();
                cmd.CommandText = String.Format(getTypeNameQuery, marka);
                using (var reader = cmd.ExecuteReader())
                    while (reader.Read())
                        try
                        {
                            ans = Convert.ToString(reader[0]);
                        }
                        catch (Exception ex)
                        {
                            return "No_data";
                        }

                return ans;
            }
            else return "No_data";
        }

        /// <summary>
        /// Подключение к базе данных
        /// </summary>
        /// <param name="pathToBase">путь к базе</param>
        /// <returns>true - если подключение успешно, иначе false</returns>
        private bool ConnectToDataBase(string pathToBase)
        {
            try
            {
                //формируем connection string для последующего соединения с нашей базой данных
                FbConnectionStringBuilder fbCon = new FbConnectionStringBuilder();
                //fbCon.Charset = "WIN1251"; //используемая кодировка
                fbCon.UserID = "SYSDBA"; //логин
                fbCon.Password = "masterkey"; //пароль
                fbCon.Database = pathToBase; //путь к файлу базы данных
                fbCon.ServerType = 0; //указываем тип сервера (0 - "полноценный Firebird" (classic или super server), 1 - встроенный (embedded))
                fbCon.DataSource = "localhost";
                //создаем подключение
                _fb = new FbConnection(fbCon.ToString()); //передаем нашу строку подключения объекту класса FbConnection
                _fb.Open(); //открываем БД
                return true;
            }
            catch (Exception ex)
            {
                //StreamWriter SW = new StreamWriter(new FileStream("e:\\logs.txt", FileMode.Create, FileAccess.Write));
                //SW.Write(ex.Message);
                //Console.WriteLine(ex.Message);
                //SW.Close();
                return false;
            }
        }
    }
}

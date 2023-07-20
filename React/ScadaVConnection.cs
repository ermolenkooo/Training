//using Scada.Connect.Base;
//using Scada.ConnectV;
//using Scada.Interfaces.Core;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace ArchiveRederScadaV
//{
//    internal class ScadaVConnection
//    {
//        public static ScadaArchiveRemoteServiceBuilder ArchiveBuilder(string host1, string host1r = null, string host2 = null, string host2r = null)
//        {
//            var scp = new RemoteServiceConnectionProperties
//            {
//                Hosts = RemoteServiceConnectionProperties.CreateHosts(WellKnownPorts.ArchivePort, host1, host1r, host2, host2r)
//            };

//            var uc = RemoteServiceUserContext.AnonymousWithApiKey("fXQY2CT+QwML+8VxFhJiUu0wMeZs6oBgCnTN45f3LN4ccPBBA50Z72SxivkD2kvBj6DSScEz6F4gMfxpEY+AKw==|94+gDv3hIZWT/B/wPHeKENpD6gMGEa9+QlCjQLjV+s9zXIZg9Ke4Tn7J05IlQVEZo1nUkggna8JeGxsR8dO/6G8PgrlNfuun");
//            return new ScadaArchiveRemoteServiceBuilder(scp, uc);
//        }

//        public static void CreateArchiveHost()
//        {
//            Scada.ConnectV.ScadaArchiveHost? archiveHost =  ScadaVConnection.ArchiveBuilder("127.0.0.1").CreateHost();
//            if (!archiveHost.TryGetAccessible(out archiveConnection)) throw new Exception("No connection");
//        }

//        public static float MaxOnInterval(int TagId, DateTime startTime, DateTime endTime)
//        {
//            ArchiveTagId tagId = new ArchiveTagId(1, TagId);//том = 1, tagId = TagId
//            ArchiveReadingOptionsAggFunc options = new ArchiveReadingOptionsAggFunc();
//            options.EndTimestamp = endTime;//задаем конечную дату интервала
//            //сюда будут складываться считанные значения
//            MagicOnion.UnaryResult<(ErrorContext, DateTime, IReadOnlyCollection<TagValue>)> res;
//            res = archiveConnection.Service.ReadValues(tagId, startTime, options);// собственно, получение значений
//            IReadOnlyCollection<TagValue> resultCollection = res.GetResultSync().Item3;//получение самой коллекции значений
//            List<TagValue> values =  resultCollection.ToList();
//            float max = Convert.ToSingle(values[0].Value);
//            float cur;
//            //выбор максимального значения из коллекции
//            for (int i = 1; i < values.Count; i++)
//            {
//                cur = Convert.ToSingle(values[i].Value);
//                if (cur > max) max = cur;
//            }
//            return max;
//        }

//        public static float MinOnInterval(int TagId, DateTime startTime, DateTime endTime)
//        {
//            ArchiveTagId tagId = new ArchiveTagId(1, TagId);//том = 1, tagId = TagId
//            ArchiveReadingOptionsAggFunc options = new ArchiveReadingOptionsAggFunc();
//            options.EndTimestamp = endTime;//задаем конечную дату интервала
//            //сюда будут складываться считанные значения
//            MagicOnion.UnaryResult<(ErrorContext, DateTime, IReadOnlyCollection<TagValue>)> res;
//            res = archiveConnection.Service.ReadValues(tagId, startTime, options);// собственно, получение значений
//            IReadOnlyCollection<TagValue> resultCollection = res.GetResultSync().Item3;//получение самой коллекции значений
//            List<TagValue> values = resultCollection.ToList();
//            float min = Convert.ToSingle(values[0].Value);
//            float cur;
//            //выбор максимального значения из коллекции
//            for (int i = 1; i < values.Count; i++)
//            {
//                cur = Convert.ToSingle(values[i].Value);
//                if (cur < min) min = cur;
//            }
//            return min;
//        }

//        public static TimeSpan TimeInInterval(int TagId, float minBorder, float maxBorder, DateTime start, DateTime end)
//        {
//            ArchiveTagId tagId = new ArchiveTagId(1, TagId);//том = 1, tagId = TagId
//            ArchiveReadingOptionsAggFunc options = new ArchiveReadingOptionsAggFunc();
//            options.EndTimestamp = end;//задаем конечную дату интервала
//            //сюда будут складываться считанные значения
//            MagicOnion.UnaryResult<(ErrorContext, DateTime, IReadOnlyCollection<TagValue>)> res;
//            res = archiveConnection.Service.ReadValues(tagId, start, options);// собственно, получение значений
//            IReadOnlyCollection<TagValue> resultCollection = res.GetResultSync().Item3;//получение самой коллекции значений
//            List<TagValue> values = resultCollection.ToList();


//            float v;
//            bool inside = false;
//            DateTime open = new DateTime();
//            DateTime close = new DateTime();
//            TimeSpan ans = new TimeSpan();
//            for (int i = 0; i < values.Count; i++)
//            {
//                v = Convert.ToSingle(values[i].Value);
//                if (v >= minBorder && v <= maxBorder && !inside)
//                {
//                    inside = true;
//                    open = values[i].TimeStamp;
//                }
//                if ((inside && (v < minBorder || v > maxBorder)) || (i == values.Count - 1 && inside))
//                {
//                    inside = false;
//                    close = values[i].TimeStamp;
//                    ans += close - open;
//                }
//            }
//            return ans;
//        }

//        public static void WriteVariableScadaServer()
//        {
//            List<TagValue> list = new List<TagValue>();
//            list.Add(new TagValue(15565656, true, DateTime.Now));
//            IReadOnlyCollection<TagValue> values = new TagValues(list);
//            ArchiveDataPack dataPack = new ArchiveDataPack(1, values);
//            archiveConnection.Service.WriteValues(dataPack);
//        }

//        private static Scada.ConnectV.ScadaArchiveConnection? archiveConnection;
//    }
//}

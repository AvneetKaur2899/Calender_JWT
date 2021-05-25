using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalenderApplications.Models
{
    public class EventsRequest
    {
        public string EventName { get; set; }
        public string Date { get; set; }
        public string Country { get; set; }
    }
}

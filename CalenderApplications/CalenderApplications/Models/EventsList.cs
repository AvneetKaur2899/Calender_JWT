using System;
using System.Collections.Generic;

namespace CalenderApplications.Models
{
    public partial class EventsList
    {
        public int Id { get; set; }
        public string EventName { get; set; }
        public string Date { get; set; }
        public string Country { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using CalenderApplications.Models;
using Microsoft.AspNetCore.Authorization;

namespace CalenderApplications.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CalenderController : ControllerBase
    {
        CalenderDBContext _context;
        public CalenderController(CalenderDBContext context)
        {
            _context = context;
        }


        [HttpPost]
        public ActionResult AddEvent([FromBody] EventsRequest events)
        {
            EventsList eventsList = new EventsList();
            eventsList.EventName = events.EventName;
            eventsList.Date = events.Date;
            eventsList.Country = events.Country;

            _context.EventsList.Add(eventsList);
            _context.SaveChanges();
            return Ok("Event Added successfully");
        }


        [HttpGet]
        public ActionResult GetEventsList()
        {
            var eventsList = _context.EventsList.ToList();
            return Ok(eventsList);
        }

        // GET: api/CalenderDB/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var eventsList = _context.EventsList.Where(x => x.Id == id);
            return Ok(eventsList);
        }


        [HttpPut("{id}")]
        public ActionResult UpdateEvent(int id, [FromBody] EventsList EventsRequest)
        {
            EventsList eventsList = _context.EventsList.FirstOrDefault(events => events.Id == id);
            eventsList.EventName = EventsRequest.EventName;
            eventsList.Date = EventsRequest.Date;
            eventsList.Country = EventsRequest.Country;
            _context.EventsList.Update(eventsList);
            _context.SaveChanges();
            return Ok(eventsList);
        }


        [HttpDelete("{id}")]
        public ActionResult DeleteEvent(int id)
        {
            var eventsList = _context.EventsList.FirstOrDefault(events => events.Id == id);
            _context.EventsList.Remove(eventsList);
            _context.SaveChanges();
            return Ok(eventsList);
        }
    }
}
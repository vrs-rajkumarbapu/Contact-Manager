using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ContactManagerDomain.Models;
using ContactManagerDomain.ViewModels;
using ContactManagerDomain.RepositoryInterfaces;
using ContactManagerData.Repository;
using System.Web.Http.ModelBinding;

namespace ContactManagerWebApi.Controllers
{
    public class ContactsController : BaseController<Contacts, ContactsRepository>
    {

        IContactsRepository _repo = new ContactsRepository();
        public IEnumerable<Contacts> Get()//On Page Load we get all contacts from this method
        {
            return _repo.Contacts();
        }
        [HttpPost]
        public HttpResponseMessage Add(ContactsViewModel contactsViewModel)//This method adds a contact to the contacts database
        {
            if (ModelState.IsValid)
            {
                AutoMapper.Mapper.CreateMap<ContactsViewModel, Contacts>();
                Contacts contacts = AutoMapper.Mapper.Map<ContactsViewModel, Contacts>(contactsViewModel);
                _repo.Add(contacts);
                return Request.CreateResponse<ContactsViewModel>(HttpStatusCode.OK, contactsViewModel);
            }
            return Request.CreateResponse<ModelStateDictionary>(HttpStatusCode.BadRequest, ModelState);
        }
        [HttpPut]
        public HttpResponseMessage update(ContactsViewModel contactsViewModel)// This method updates a contact in the database
        {
            if (ModelState.IsValid)
            {
                AutoMapper.Mapper.CreateMap<ContactsViewModel, Contacts>();
                Contacts contacts = AutoMapper.Mapper.Map<ContactsViewModel, Contacts>(contactsViewModel);
                _repo.Update(contacts);
                return Request.CreateResponse<ContactsViewModel>(HttpStatusCode.OK, contactsViewModel);
            }
            return Request.CreateResponse<ModelStateDictionary>(HttpStatusCode.BadRequest, ModelState);
        }
         [HttpDelete]
        public void Delete(int id)//This method deletes a contact from database
        {
            _repo.Delete(id);
        }
        //public ICollection<Contacts> ContactDetail
        //{
        //    get { return _repo.Contacts(); }
        //}
    }
}
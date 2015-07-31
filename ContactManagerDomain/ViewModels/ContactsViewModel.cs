using ContactManagerDomain.Validator;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ContactManagerDomain.ViewModels
{
    [FluentValidation.Attributes.Validator(typeof(ContactsViewModelValidator))]
    public class ContactsViewModel 
    {
        public int ID { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }

        public DateTime Born { get; set; }
        [Required]
        public string Cellphone { get; set; }
        public bool IsActive { get; set; }

        public DateTime LastUpdated { get; set; }

    }
}

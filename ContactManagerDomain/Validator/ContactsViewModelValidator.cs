using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ContactManagerDomain.ViewModels;

namespace ContactManagerDomain.Validator
{
    public class ContactsViewModelValidator : AbstractValidator<ContactsViewModel>
    {
        public ContactsViewModelValidator()
        {
            this.RuleFor(t => t.FirstName).NotEmpty().WithMessage("Firstname is required");
            this.RuleFor(t => t.LastName).NotEmpty().WithMessage("Lastname is required");
            this.RuleFor(t => t.Email).NotEmpty().WithMessage("Email is required");
            this.RuleFor(t => t.Cellphone).NotEmpty().WithMessage("Cellphone is required");
         
             

        }
    }
}

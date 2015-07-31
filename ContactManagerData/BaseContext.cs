using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
namespace ContactManagerData
{
    public class BaseContext<TContext>:DbContext where TContext:DbContext       
    {
        public BaseContext()
            : base("Name=ContactManagerEntities")
        {
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<TContext>());
        }
        //public BaseContext()
        //    : base(@"Server=.\sqlexpress;database=ContactsManagerDb;integrated security=true;")
        //{ }
    }
}

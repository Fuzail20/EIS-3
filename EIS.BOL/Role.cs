using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EIS.BOL
{
    [Table("Role")]
    public partial class Role
    {
        [Key]
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public string RoleCode { get; set; }

        public virtual IEnumerable<Employee> Employees { get; set; }
        //IEnumerable is for mapping role to employees 1:M (1 to many)
    }
}


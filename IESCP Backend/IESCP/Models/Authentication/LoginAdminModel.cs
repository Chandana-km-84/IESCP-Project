using System.ComponentModel.DataAnnotations;

namespace IESCP.Models.Authentication
{
    public class LoginAdminModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
     
}

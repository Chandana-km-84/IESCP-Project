using System.ComponentModel.DataAnnotations;

namespace IESCP.Models.Authentication
{
    public class LoginInfluencerModel
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}

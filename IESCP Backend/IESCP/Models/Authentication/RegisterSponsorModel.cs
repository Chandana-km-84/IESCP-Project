using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace IESCP.Models.Authentication
{
    public class RegisterSponsorModel
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string SponsorName { get; set; }

        [Required]
        public string Industry { get; set; }
        

        [Required]
        public string Company { get; set; }
        
        public string ProfilePictureUrl { get; set; }


    }
}

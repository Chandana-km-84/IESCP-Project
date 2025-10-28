using System.ComponentModel.DataAnnotations;

namespace IESCP.Models.Authentication
{
    public class RegisterInfluencerModel
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
        public string InfluencerName { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public string Niche { get; set; }

        [Required]
        public int Reach { get; set; }
       
        public string ProfilePictureUrl { get; set; }


    }
}

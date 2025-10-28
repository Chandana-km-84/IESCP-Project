using System.ComponentModel.DataAnnotations;

namespace IESCP.Models.Authentication
{
    public class VerifyOTPModel
    {
       
            [Required]
            public string Email { get; set; }
            [Required]
            public string Otp { get; set; }
        
    }
}

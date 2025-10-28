using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IESCP.Models
{

    public class Sponsor : User
    {
        [Required]
        public string SponsorName { get; set; }

        [Required]
        public string Industry{ get; set; }
        [Required]
        public double Budget { get; set; }

        [Required]
        public string Company { get; set; }
        [Required]
        [DefaultValue(false)]
        public bool IsApproved { get; set; }

        [Required]
        public string Website { get; set; }

    }
}

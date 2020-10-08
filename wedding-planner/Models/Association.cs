using System.ComponentModel.DataAnnotations;

namespace WeddingPlanner.Models {
    public class Association {

        [Key]
        public int AssociationId { get; set; }
        
        public int WeddingId { get; set; }

        public Wedding UsersWeddings { get; set; }

        public int UserId { get; set; }

        public User WeddingsUsers { get; set; }

    }
}
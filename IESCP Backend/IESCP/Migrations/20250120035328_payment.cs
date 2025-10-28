using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IESCP.Migrations
{
    public partial class payment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    PaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AdRequestId = table.Column<int>(type: "int", nullable: false),
                    SponsorId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    PaymentDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PaymentMethod = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TransactionId = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.PaymentId);
                    table.ForeignKey(
                        name: "FK_Payments_AdRequests_AdRequestId",
                        column: x => x.AdRequestId,
                        principalTable: "AdRequests",
                        principalColumn: "AdId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Payments_Users_SponsorId",
                        column: x => x.SponsorId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Ratings",
                columns: table => new
                {
                    RatingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SponsorId = table.Column<int>(type: "int", nullable: false),
                    InfluencerId = table.Column<int>(type: "int", nullable: false),
                    RatingValue = table.Column<int>(type: "int", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ratings", x => x.RatingId);
                    table.ForeignKey(
                        name: "FK_Ratings_Users_InfluencerId",
                        column: x => x.InfluencerId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Ratings_Users_SponsorId",
                        column: x => x.SponsorId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Discriminator", "Email", "IsFlagged", "Password", "PhoneNumber", "Role", "UserName" },
                values: new object[] { 3, "User", "kmchandu81@gmail.com", false, "0307", "8296986079", 0, "nekochan" });

            migrationBuilder.CreateIndex(
                name: "IX_Payments_AdRequestId",
                table: "Payments",
                column: "AdRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_SponsorId",
                table: "Payments",
                column: "SponsorId");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_InfluencerId",
                table: "Ratings",
                column: "InfluencerId");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_SponsorId",
                table: "Ratings",
                column: "SponsorId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "Ratings");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3);
        }
    }
}

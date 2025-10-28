using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IESCP.Migrations
{
    public partial class up : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "InfluencerId",
                table: "Payments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Payments_InfluencerId",
                table: "Payments",
                column: "InfluencerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Users_InfluencerId",
                table: "Payments",
                column: "InfluencerId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Users_InfluencerId",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Payments_InfluencerId",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "InfluencerId",
                table: "Payments");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IESCP.Migrations
{
    public partial class created : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InfluencerId",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "SponsorId",
                table: "Users",
                newName: "FollowersCount");

            migrationBuilder.AddColumn<string>(
                name: "InstaId",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProfilePictureUrl",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Website",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                column: "ProfilePictureUrl",
                value: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InstaId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ProfilePictureUrl",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Website",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "FollowersCount",
                table: "Users",
                newName: "SponsorId");

            migrationBuilder.AddColumn<int>(
                name: "InfluencerId",
                table: "Users",
                type: "int",
                nullable: true);
        }
    }
}

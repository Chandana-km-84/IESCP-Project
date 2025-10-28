using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IESCP.Migrations
{
    public partial class create : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    IsFlagged = table.Column<bool>(type: "bit", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InfluencerId = table.Column<int>(type: "int", nullable: true),
                    InfluencerName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Niche = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Reach = table.Column<int>(type: "int", nullable: true),
                    SponsorId = table.Column<int>(type: "int", nullable: true),
                    SponsorName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Industry = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Budget = table.Column<double>(type: "float", nullable: true),
                    Company = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsApproved = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Campaigns",
                columns: table => new
                {
                    CampaignId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CampaignName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Start_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    End_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Budget = table.Column<int>(type: "int", nullable: false),
                    Visibility = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CompNiche = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Goals = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SponsorId = table.Column<int>(type: "int", nullable: false),
                    IsFlagged = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Campaigns", x => x.CampaignId);
                    table.ForeignKey(
                        name: "FK_Campaigns_Users_SponsorId",
                        column: x => x.SponsorId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AdRequests",
                columns: table => new
                {
                    AdId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AdName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AdDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    InfluencerId = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CampaignId = table.Column<int>(type: "int", nullable: false),
                    IsFlagged = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdRequests", x => x.AdId);
                    table.ForeignKey(
                        name: "FK_AdRequests_Campaigns_CampaignId",
                        column: x => x.CampaignId,
                        principalTable: "Campaigns",
                        principalColumn: "CampaignId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AdRequests_Users_InfluencerId",
                        column: x => x.InfluencerId,
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdRequests_CampaignId",
                table: "AdRequests",
                column: "CampaignId");

            migrationBuilder.CreateIndex(
                name: "IX_AdRequests_InfluencerId",
                table: "AdRequests",
                column: "InfluencerId");

            migrationBuilder.CreateIndex(
                name: "IX_Campaigns_SponsorId",
                table: "Campaigns",
                column: "SponsorId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdRequests");

            migrationBuilder.DropTable(
                name: "Campaigns");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}

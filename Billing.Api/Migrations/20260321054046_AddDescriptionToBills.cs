using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Billing.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddDescriptionToBills : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Bills",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Bills");
        }
    }
}

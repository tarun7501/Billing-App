using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Billing.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddSnapNumberToBillItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SnapNumber",
                table: "BillItems",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SnapNumber",
                table: "BillItems");
        }
    }
}

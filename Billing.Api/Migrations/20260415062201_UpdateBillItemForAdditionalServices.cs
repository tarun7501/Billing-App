using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Billing.Api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateBillItemForAdditionalServices : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "PhotoSizeId",
                table: "BillItems",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<string>(
                name: "ItemName",
                table: "BillItems",
                type: "text",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_BillItems_PhotoSizes_PhotoSizeId",
                table: "BillItems",
                column: "PhotoSizeId",
                principalTable: "PhotoSizes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AlterColumn<int>(
                name: "PhotoSizeId",
                table: "BillItems",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_BillItems_PhotoSizes_PhotoSizeId",
                table: "BillItems",
                column: "PhotoSizeId",
                principalTable: "PhotoSizes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

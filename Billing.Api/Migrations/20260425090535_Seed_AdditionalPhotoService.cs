using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Billing.Api.Migrations
{
	/// <inheritdoc />
	public partial class Seed_AdditionalPhotoService : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.InsertData(
				table: "PhotoServices",
				columns: new[] { "Id", "Name" },
				values: new object[] { 4, "Additional Service" }
			);

			migrationBuilder.Sql(@"
		SELECT setval(
			pg_get_serial_sequence('""PhotoServices""', 'Id'),
			(SELECT MAX(""Id"") FROM ""PhotoServices"")
		);
	");
		}

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PhotoServices",
                keyColumn: "Id",
                keyValue: 4
            );
        }
    }
}

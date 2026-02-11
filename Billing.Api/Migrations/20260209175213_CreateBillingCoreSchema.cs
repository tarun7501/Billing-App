using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Billing.Api.Migrations
{
	/// <inheritdoc />
	public partial class CreateBillingCoreSchema : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			// Customers
			migrationBuilder.CreateTable(
				name: "Customers",
				columns: table => new
				{
					Id = table.Column<int>(nullable: false)
						.Annotation("Npgsql:ValueGenerationStrategy", Npgsql.EntityFrameworkCore.PostgreSQL.Metadata.NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
					Name = table.Column<string>(maxLength: 150, nullable: false),
					PhoneNumber = table.Column<string>(maxLength: 20, nullable: false),
					Email = table.Column<string>(maxLength: 150, nullable: true),
					CreatedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "NOW()")
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Customers", x => x.Id);
				});

			migrationBuilder.CreateIndex(
				name: "IX_Customers_PhoneNumber",
				table: "Customers",
				column: "PhoneNumber",
				unique: true);

			// Photo Services
			migrationBuilder.CreateTable(
				name: "PhotoServices",
				columns: table => new
				{
					Id = table.Column<int>(nullable: false)
						.Annotation("Npgsql:ValueGenerationStrategy", Npgsql.EntityFrameworkCore.PostgreSQL.Metadata.NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
					Name = table.Column<string>(maxLength: 100, nullable: false),
					IsActive = table.Column<bool>(nullable: false, defaultValue: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_PhotoServices", x => x.Id);
				});

			// Photo Sizes
			migrationBuilder.CreateTable(
				name: "PhotoSizes",
				columns: table => new
				{
					Id = table.Column<int>(nullable: false)
						.Annotation("Npgsql:ValueGenerationStrategy", Npgsql.EntityFrameworkCore.PostgreSQL.Metadata.NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
					Label = table.Column<string>(maxLength: 50, nullable: false),
					IsActive = table.Column<bool>(nullable: false, defaultValue: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_PhotoSizes", x => x.Id);
				});

			// Lamination Types
			migrationBuilder.CreateTable(
				name: "LaminationTypes",
				columns: table => new
				{
					Id = table.Column<int>(nullable: false)
						.Annotation("Npgsql:ValueGenerationStrategy", Npgsql.EntityFrameworkCore.PostgreSQL.Metadata.NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
					Name = table.Column<string>(maxLength: 50, nullable: false),
					IsActive = table.Column<bool>(nullable: false, defaultValue: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_LaminationTypes", x => x.Id);
				});

			// Lamination Finishes
			migrationBuilder.CreateTable(
				name: "LaminationFinishes",
				columns: table => new
				{
					Id = table.Column<int>(nullable: false)
						.Annotation("Npgsql:ValueGenerationStrategy", Npgsql.EntityFrameworkCore.PostgreSQL.Metadata.NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
					Name = table.Column<string>(maxLength: 50, nullable: false),
					IsActive = table.Column<bool>(nullable: false, defaultValue: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_LaminationFinishes", x => x.Id);
				});

			// Bills
			migrationBuilder.CreateTable(
				name: "Bills",
				columns: table => new
				{
					Id = table.Column<int>(nullable: false)
						.Annotation("Npgsql:ValueGenerationStrategy", Npgsql.EntityFrameworkCore.PostgreSQL.Metadata.NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
					BillNumber = table.Column<string>(maxLength: 50, nullable: false),
					BillDate = table.Column<DateTime>(nullable: false),
					CustomerId = table.Column<int>(nullable: false),
					SubTotalAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
					DiscountAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
					TotalAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
					AdvanceAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
					BalanceAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
					IsCleared = table.Column<bool>(nullable: false),
					CreatedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "NOW()")
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Bills", x => x.Id);
					table.ForeignKey(
						name: "FK_Bills_Customers_CustomerId",
						column: x => x.CustomerId,
						principalTable: "Customers",
						principalColumn: "Id",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateIndex(
				name: "IX_Bills_BillNumber",
				table: "Bills",
				column: "BillNumber",
				unique: true);

			migrationBuilder.CreateIndex(
				name: "IX_Bills_CustomerId",
				table: "Bills",
				column: "CustomerId");

			// Bill Items
			migrationBuilder.CreateTable(
				name: "BillItems",
				columns: table => new
				{
					Id = table.Column<int>(nullable: false)
						.Annotation("Npgsql:ValueGenerationStrategy", Npgsql.EntityFrameworkCore.PostgreSQL.Metadata.NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
					BillId = table.Column<int>(nullable: false),
					PhotoServiceId = table.Column<int>(nullable: false),
					PhotoSizeId = table.Column<int>(nullable: false),
					LaminationTypeId = table.Column<int>(nullable: true),
					LaminationFinishId = table.Column<int>(nullable: true),
					Quantity = table.Column<int>(nullable: false),
					UnitPrice = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
					TotalPrice = table.Column<decimal>(type: "numeric(18,2)", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_BillItems", x => x.Id);
					table.ForeignKey("FK_BillItems_Bills", x => x.BillId, "Bills", "Id", onDelete: ReferentialAction.Cascade);
					table.ForeignKey("FK_BillItems_PhotoServices", x => x.PhotoServiceId, "PhotoServices", "Id");
					table.ForeignKey("FK_BillItems_PhotoSizes", x => x.PhotoSizeId, "PhotoSizes", "Id");
					table.ForeignKey("FK_BillItems_LaminationTypes", x => x.LaminationTypeId, "LaminationTypes", "Id");
					table.ForeignKey("FK_BillItems_LaminationFinishes", x => x.LaminationFinishId, "LaminationFinishes", "Id");
				});

			migrationBuilder.CreateIndex(
				name: "IX_BillItems_BillId",
				table: "BillItems",
				column: "BillId");

			// SEED DATA
			migrationBuilder.InsertData(
				table: "PhotoServices",
				columns: new[] { "Id", "Name", "IsActive" },
				values: new object[,]
				{
					{ 1, "Mobile Photo", true },
					{ 2, "Studio Photo", true },
					{ 3, "Photo With Lamination", true }
				});

			migrationBuilder.InsertData(
				table: "PhotoSizes",
				columns: new[] { "Id", "Label", "IsActive" },
				values: new object[,]
				{
					{ 1, "4x6", true }, { 2, "5x7", true }, { 3, "6x9", true },
					{ 4, "8x12", true }, { 5, "10x15", true }, { 6, "12x18", true },
					{ 7, "16x24", true }, { 8, "20x24", true }, { 9, "20x30", true },
					{ 10, "20x40", true }, { 11, "24x24", true }, { 12, "24x30", true },
					{ 13, "24x36", true }, { 14, "24x40", true }
				});

			migrationBuilder.InsertData(
				table: "LaminationTypes",
				columns: new[] { "Id", "Name", "IsActive" },
				values: new object[,]
				{
					{ 1, "Bit", true },
					{ 2, "Frame", true }
				});

			migrationBuilder.InsertData(
				table: "LaminationFinishes",
				columns: new[] { "Id", "Name", "IsActive" },
				values: new object[,]
				{
					{ 1, "Matte", true },
					{ 2, "Glossy", true },
					{ 3, "Glitter", true },
					{ 4, "3D", true },
					{ 5, "Canvas", true }
				});
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable("BillItems");
			migrationBuilder.DropTable("Bills");
			migrationBuilder.DropTable("LaminationFinishes");
			migrationBuilder.DropTable("LaminationTypes");
			migrationBuilder.DropTable("PhotoSizes");
			migrationBuilder.DropTable("PhotoServices");
			migrationBuilder.DropTable("Customers");
		}
	}
}

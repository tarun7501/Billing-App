using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Billing.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialBillingSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LaminationFinishes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LaminationFinishes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LaminationTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LaminationTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PhotoServices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhotoServices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PhotoSizes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Label = table.Column<string>(type: "text", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhotoSizes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Bills",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BillNumber = table.Column<string>(type: "text", nullable: false),
                    BillDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CustomerId = table.Column<int>(type: "integer", nullable: false),
                    SubTotalAmount = table.Column<decimal>(type: "numeric", nullable: false),
                    DiscountAmount = table.Column<decimal>(type: "numeric", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "numeric", nullable: false),
                    AdvanceAmount = table.Column<decimal>(type: "numeric", nullable: false),
                    BalanceAmount = table.Column<decimal>(type: "numeric", nullable: false),
                    IsCleared = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
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

            migrationBuilder.CreateTable(
                name: "LaminationFinishPrices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PhotoSizeId = table.Column<int>(type: "integer", nullable: false),
                    LaminationFinishId = table.Column<int>(type: "integer", nullable: false),
                    ExtraPrice = table.Column<decimal>(type: "numeric(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LaminationFinishPrices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LaminationFinishPrices_LaminationFinishes_LaminationFinishId",
                        column: x => x.LaminationFinishId,
                        principalTable: "LaminationFinishes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LaminationFinishPrices_PhotoSizes_PhotoSizeId",
                        column: x => x.PhotoSizeId,
                        principalTable: "PhotoSizes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PhotoPricings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PhotoServiceId = table.Column<int>(type: "integer", nullable: false),
                    PhotoSizeId = table.Column<int>(type: "integer", nullable: false),
                    MinimumCopies = table.Column<int>(type: "integer", nullable: false),
                    BasePrice = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    ExtraCopyPrice = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhotoPricings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PhotoPricings_PhotoServices_PhotoServiceId",
                        column: x => x.PhotoServiceId,
                        principalTable: "PhotoServices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PhotoPricings_PhotoSizes_PhotoSizeId",
                        column: x => x.PhotoSizeId,
                        principalTable: "PhotoSizes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BillItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BillId = table.Column<int>(type: "integer", nullable: false),
                    PhotoServiceId = table.Column<int>(type: "integer", nullable: false),
                    PhotoSizeId = table.Column<int>(type: "integer", nullable: false),
                    LaminationTypeId = table.Column<int>(type: "integer", nullable: true),
                    LaminationFinishId = table.Column<int>(type: "integer", nullable: true),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "numeric(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BillItems_Bills_BillId",
                        column: x => x.BillId,
                        principalTable: "Bills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BillItems_LaminationFinishes_LaminationFinishId",
                        column: x => x.LaminationFinishId,
                        principalTable: "LaminationFinishes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_BillItems_LaminationTypes_LaminationTypeId",
                        column: x => x.LaminationTypeId,
                        principalTable: "LaminationTypes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_BillItems_PhotoServices_PhotoServiceId",
                        column: x => x.PhotoServiceId,
                        principalTable: "PhotoServices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BillItems_PhotoSizes_PhotoSizeId",
                        column: x => x.PhotoSizeId,
                        principalTable: "PhotoSizes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BillItems_BillId",
                table: "BillItems",
                column: "BillId");

            migrationBuilder.CreateIndex(
                name: "IX_BillItems_LaminationFinishId",
                table: "BillItems",
                column: "LaminationFinishId");

            migrationBuilder.CreateIndex(
                name: "IX_BillItems_LaminationTypeId",
                table: "BillItems",
                column: "LaminationTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_BillItems_PhotoServiceId",
                table: "BillItems",
                column: "PhotoServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_BillItems_PhotoSizeId",
                table: "BillItems",
                column: "PhotoSizeId");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_BillNumber",
                table: "Bills",
                column: "BillNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bills_CustomerId",
                table: "Bills",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_PhoneNumber",
                table: "Customers",
                column: "PhoneNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LaminationFinishPrices_LaminationFinishId",
                table: "LaminationFinishPrices",
                column: "LaminationFinishId");

            migrationBuilder.CreateIndex(
                name: "IX_LaminationFinishPrices_PhotoSizeId",
                table: "LaminationFinishPrices",
                column: "PhotoSizeId");

            migrationBuilder.CreateIndex(
                name: "IX_PhotoPricings_PhotoServiceId",
                table: "PhotoPricings",
                column: "PhotoServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_PhotoPricings_PhotoSizeId",
                table: "PhotoPricings",
                column: "PhotoSizeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BillItems");

            migrationBuilder.DropTable(
                name: "LaminationFinishPrices");

            migrationBuilder.DropTable(
                name: "PhotoPricings");

            migrationBuilder.DropTable(
                name: "Bills");

            migrationBuilder.DropTable(
                name: "LaminationTypes");

            migrationBuilder.DropTable(
                name: "LaminationFinishes");

            migrationBuilder.DropTable(
                name: "PhotoServices");

            migrationBuilder.DropTable(
                name: "PhotoSizes");

            migrationBuilder.DropTable(
                name: "Customers");
        }
    }
}

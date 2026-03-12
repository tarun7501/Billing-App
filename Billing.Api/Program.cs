using Billing.Api.Contracts;
using Billing.Api.Infrastructure.Data;
using Billing.Api.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

//Configuring Swagger Service
builder.Services.AddSwaggerGen();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

//Adding the connection string for database.
builder.Services.AddDbContext<BillingDbContext>(options =>
	options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

//Adding Services for Repositories
builder.Services.AddScoped<IPhotoRepository, PhotoRepository>();
builder.Services.AddScoped<ILaminationRepository, LaminationRepository>();

//Connecting Front End Angular
builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAngular",
		policy =>
		{
			policy
				.WithOrigins("http://localhost:4200")
				.AllowAnyHeader()
				.AllowAnyMethod();
		});
});

var app = builder.Build();

app.UseCors("AllowAngular");

// AUTO APPLY MIGRATIONS
using (var scope = app.Services.CreateScope())
{
	var dbContext = scope.ServiceProvider
		.GetRequiredService<BillingDbContext>();

	dbContext.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.MapOpenApi();
	app.UseSwagger();
	app.UseSwaggerUI();
}

// Configuration for serving Angular app
app.UseDefaultFiles();
app.UseStaticFiles();
app.MapFallbackToFile("index.html");

// For running the app automatically after installation
var url = "http://localhost:5000";
Process.Start(new ProcessStartInfo
{
    FileName = url,
    UseShellExecute = true
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

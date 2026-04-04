namespace eg_travil
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // 1. إضافة الخدمات (Services)
            builder.Services.AddControllers();
            builder.Services.AddOpenApi();

            // 2. إعداد الـ CORS بسياسة واحدة قوية (AllowAll) للتطوير
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });

            var app = builder.Build();

            // 3. ترتيب الـ Middleware (الترتيب هنا مهم جداً)

            // تفعيل الـ Swagger/OpenAPI في بيئة التطوير
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            // تفعيل الـ CORS قبل أي شيء آخر يخص الـ Routing أو Authorization
            app.UseCors("AllowAll");

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
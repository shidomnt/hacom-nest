import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ShowroomsModule } from './showrooms/showrooms.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CatalogsModule } from './catalogs/catalogs.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './guards/role.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.7ljnw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    ),
    ProductsModule,
    CategoriesModule,
    ShowroomsModule,
    CatalogsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}

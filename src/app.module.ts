import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ShowroomsModule } from './showrooms/showrooms.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CatalogsModule } from './catalogs/catalogs.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { CartsModule } from './carts/carts.module';

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
    UsersModule,
    AuthModule,
    BcryptModule,
    CartsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

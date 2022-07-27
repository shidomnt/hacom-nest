import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ShowroomsModule } from './showrooms/showrooms.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProductsModule,
    CategoriesModule,
    ShowroomsModule,
    MongooseModule.forRoot(
      'mongodb+srv://root:123456aA@cluster0.7ljnw.mongodb.net/hacom?retryWrites=true&w=majority',
      { dbName: 'hacom' },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

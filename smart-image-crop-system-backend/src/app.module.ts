import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageController } from './image/image.controller';
import { ImageService } from './image/image.service';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [ServicesModule],
  controllers: [AppController, ImageController],
  providers: [AppService, ImageService]
})
export class AppModule {}
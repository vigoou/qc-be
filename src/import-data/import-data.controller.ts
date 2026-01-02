import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ImportDataService } from './import-data.service';
import { CreateImportDatumDto } from './dto/create-import-datum.dto';
import { UpdateImportDatumDto } from './dto/update-import-datum.dto';
import { Public } from '../auth/jwt-auth.guard';

@Controller('import-data')
export class ImportDataController {
  constructor(private readonly importDataService: ImportDataService) {}

  @Public()
  @Get('read-file')
  readFile(@Query('fileName') fileName: string) {
    this.importDataService.readMasterDataFile(fileName);
    return;
  }

  @Post()
  create(@Body() createImportDatumDto: CreateImportDatumDto) {
    return this.importDataService.create(createImportDatumDto);
  }

  @Get()
  findAll() {
    return this.importDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.importDataService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateImportDatumDto: UpdateImportDatumDto,
  ) {
    return this.importDataService.update(+id, updateImportDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.importDataService.remove(+id);
  }
}

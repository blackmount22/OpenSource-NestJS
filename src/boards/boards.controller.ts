import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService : BoardsService){ }

    // @Get('/')
    // getAllBoard(): Board[] {
    //     return this.boardsService.getAllBoards()
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() createBoardDto: CreateBoardDto
    // ): Board {
    //     return this.boardsService.createBoard(createBoardDto);
    // }

    @Get('/:id')
    getboardByID(@Param('id') id:number): Promise<Board>{
        return this.boardsService.getBoardByID(id);
    }

    // @Get('/:id')
    // // 두개 이상 파라미터 인 경우 (@Param() params: string[])
    // getBoardByID(@Param('id') id: string) : Board {
    //     return this.boardsService.getBoardByID(id);
    // }

    // @Delete('/:id')
    // deleteBoard(@Param('id') id:string): void {
    //     this.boardsService.deleteBoard(id);
    // }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    // ) {
    //     return this.boardsService.updateBoardStatus(id, status);
    // }
}

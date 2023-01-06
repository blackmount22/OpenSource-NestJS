import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService : BoardsService){ }

    @Get('/')
    getAllBoard(): Board[] {
        return this.boardsService.getAllBoards()
    }

    @Post()
    createBoard(
        @Body() createBoardDto: CreateBoardDto
    ): Board {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Get('/:id')
    // 두개 이상 파라미터 인 경우 (@Param() params: string[])
    getBoardByID(@Param('id') id: string) : Board {
        return this.boardsService.getBoardByID(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id:string): void {
        this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id: string,
        @Body('status') status: BoardStatus,
    ) {
        return this.boardsService.updateBoardStatus(id, status);
    }
}

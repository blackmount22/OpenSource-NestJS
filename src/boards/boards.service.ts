import { Injectable, NotFoundException } from '@nestjs/common';
import {v1 as uuid} from 'uuid'
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards : Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    // 게시글 생성
    createBoard(createBoardDto: CreateBoardDto) {
        const {title, description} = createBoardDto;

        const board: Board = {
            id: uuid(),
            title,
            // title: title
            // 과 동일한 문법
            description,
            //description: description 
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }

    // 게시물 찾기
    getBoardByID(id: string) : Board{
         const found = this.boards.find((board) => board.id === id);

         if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
         }

         return found;
    }

    // filter 같지 않은 것만 남겨두기
    deleteBoard(id: string) : void {
        const found = this.getBoardByID(id);
        this.boards.filter((board) => board.id !== found.id);
    }

    // getBoardById로 board를 찾고
    // 찾은 board status 값을 업데이트
    updateBoardStatus(id: string, status:BoardStatus): Board {
        const board = this.getBoardByID(id);
        board.status = status;
        return board;
    }
}

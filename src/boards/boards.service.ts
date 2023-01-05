import { Injectable } from '@nestjs/common';
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
        return this.boards.find((board) => board.id === id);
    }

    // filter 같지 않은 것만 남겨두기
    deleteBoard(id: string) : void {
        this.boards.filter((board) => board.id !== id);
    }
}

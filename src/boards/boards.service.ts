import { Injectable } from '@nestjs/common';
import {v1 as uuid} from 'uuid'
import { Board, BoardStatus } from './board.model';

@Injectable()
export class BoardsService {
    private boards : Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    // 게시글 생성
    createBoard(title: string, description: string) {
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
}

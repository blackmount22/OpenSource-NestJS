import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {v1 as uuid} from 'uuid'
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private boardRepository:BoardRepository,
    ) {}

    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    // // 게시글 생성
    // createBoard(createBoardDto: CreateBoardDto) {
    //     const {title, description} = createBoardDto;

    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         // title: title
    //         // 과 동일한 문법
    //         description,
    //         //description: description 
    //         status: BoardStatus.PUBLIC
    //     }

    //     this.boards.push(board);
    //     return board;
    // }

    createBoard(createBoardDto: CreateBoardDto) : Promise<Board>{
        return this.boardRepository.createBoard(createBoardDto);
    }

    async getBoardByID(id: number): Promise <Board> {
        const found = await this.boardRepository.findOne(id);

        if(!found) {
            throw new NotFoundException(`Can't find board with id ${id}`);
        }

        return found;
    }

    async deleteBoard(id:number): Promise<void> {
        const result = await this.boardRepository.delete(id);

        if(result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }

    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board>{
        const board = await this.getBoardByID(id);
        board.status = status;

        await this.boardRepository.save(board);
        return board;
    }

    async getAllBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    // // 게시물 찾기
    // getBoardByID(id: string) : Board{
    //      const found = this.boards.find((board) => board.id === id);

    //      if(!found) {
    //         throw new NotFoundException(`Can't find Board with id ${id}`);
    //      }

    //      return found;
    // }

    // // filter 같지 않은 것만 남겨두기
    // deleteBoard(id: string) : void {
    //     const found = this.getBoardByID(id);
    //     this.boards.filter((board) => board.id !== found.id);
    // }

    // // getBoardById로 board를 찾고
    // // 찾은 board status 값을 업데이트
    // updateBoardStatus(id: string, status:BoardStatus): Board {
    //     const board = this.getBoardByID(id);
    //     board.status = status;
    //     return board;
    // }
}

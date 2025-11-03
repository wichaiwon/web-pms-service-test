import { Inject, Injectable } from "@nestjs/common";
import { PatchTaskInProcessFlagDto } from "src/application/dto/tasks/patch-task-in-process-flag";
import type { ITaskRepository } from "src/domain/repositories/task/task.repository.interface";

@Injectable()
export class PatchTaskInProcessUseCase {
    constructor(
        @Inject('ITaskRepository')
        private readonly taskRepository: ITaskRepository,
    ) {}

    async execute(id: string, patchTaskInProcessFlag: PatchTaskInProcessFlagDto): Promise<void> {
        const existingTask = await this.taskRepository.getTaskById(id);
        if (!existingTask) {
            throw new Error(`Task with id ${id} not found`);
        }

        await this.taskRepository.patchTaskInProcessFlag(id, patchTaskInProcessFlag);
    }
}
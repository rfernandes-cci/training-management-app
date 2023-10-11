import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateBatchDto } from './dto/create-batch.dto';
import { Batch } from './entities/batch.entity';
import { UpdateBatchDto } from './dto/update-batch.dto';

@Injectable()
export class BatchRepository extends Repository<Batch> {
  constructor(private dataSource: DataSource) {
    super(Batch, dataSource.createEntityManager());
  }

  async createRecord(createBatchDto: CreateBatchDto): Promise<Batch> {
    const newBatch = this.create(createBatchDto);
    const createdBatch = await this.save(newBatch);

    return createdBatch;
  }

  async getAll(): Promise<Batch[]> {
    const batch = await this.find();
    return batch;
  }

  async getOne(id: string): Promise<Batch> {
    const batch = await this.findOne({ where: { id: id } });

    if (!batch) {
      throw new NotFoundException(`Batch with ID: ${id} not found`);
    }

    return batch;
  }

  async updateData(id: string, UpdateBatchDto: UpdateBatchDto) {
    const batch = await this.getOne(id);
    const updateBatch = Object.assign(batch, UpdateBatchDto);
    const updatedBatch = await this.save(updateBatch);
    return updatedBatch;
  }

  async deleteData(id: string): Promise<Batch> {
    const batch = await this.getOne(id);

    await this.delete(batch);
    return batch;
  }

  async findBatch(
    batchType: string,
    batchTypeDescription: string,
    startDate: string,
  ): Promise<Batch> {
    const batch = await this.createQueryBuilder('batch')
      .where(
        '(batch.batch_title = :title1 AND batch.tech = :tech1) OR (batch.batch_title = :title2 AND batch.tech = :tech2)',
        {
          title1: batchType,
          tech1: batchTypeDescription,
          title2: batchTypeDescription,
          tech2: batchType,
          start_date: startDate,
        },
      )
      .getOne();
    return batch;
  }

  async getBatchesWithChildrenValue(
    batchTitleString: string,
    techString: string,
  ): Promise<Batch> {
    const treeRepository = this.manager.getTreeRepository(Batch);

    // Find the root batch nodes (batches with no parent)
    const rootBatches = await treeRepository.findTrees();

    // Initialize an array to store batches with children having "Postman"
    let batchesWithMentionedChildren = new Batch();

    // Recursive function to traverse the tree and find batches with "Postman" children
    async function findBatchesWithChildren(batches: Batch[]) {
      for (const batch of batches) {
        // Check if the current batch has mentioned children
        if (
          batch.children &&
          batch.children.some((child) => child.tech === techString) &&
          batch.children.some((child) => child.batchTitle === batchTitleString)
        ) {
          batchesWithMentionedChildren = batch;
        }

        // Recursively call the function for the children of this batch
        if (batch.children) {
          await findBatchesWithChildren(batch.children);
        }
      }
    }

    // Start the search from the root batches
    await findBatchesWithChildren(rootBatches);

    return batchesWithMentionedChildren;
  }
}

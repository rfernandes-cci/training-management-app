import { Injectable } from '@nestjs/common';
import { RawBatch } from './entities/raw-batch.entity';
import { RawBatchRepository } from './raw-batch.repository';
import { BatchesDto } from './dto/createBatches.dto';
import { PaginatedResponse } from 'src/core/pagination.interface';
import { DatesHelper } from 'src/core/dates.helper';

@Injectable()
export class RawBatchService {
  constructor(
    private batchesRepo: RawBatchRepository,
    private datesHelper: DatesHelper,
  ) {}

  getAll(
    pageNo: number,
    noOfRecords: number,
    orderBy: string,
    order: string,
    status: string,
    tech: string,
  ): Promise<PaginatedResponse> {
    return this.batchesRepo.getAll(
      pageNo,
      noOfRecords,
      orderBy,
      order,
      status,
      tech,
    );
  }

  getTech() {
    return this.batchesRepo.getTech();
  }

  getStatus() {
    return this.batchesRepo.getStatus();
  }

  async insertOrUpdateBatches(newData: BatchesDto[]): Promise<object> {
    let rowsInserted = 0;
    let rowsUpdated = 0;
    let rowsRejected = 0;
    const rejectedRows = [];
    let formatedStartDate: Date;

    for (const newRow of newData) {
      const {
        batchTitle,
        tech,
        startDate,
        trainingCoordinator,
        headTrainer,
        endDate,
        NoSuccess,
        NoFailed,
      } = newRow;

      if (typeof startDate === 'number') {
        formatedStartDate = this.datesHelper.changeDateFormat(startDate);
        newRow.startDate = formatedStartDate;
      }
      if (endDate === undefined || typeof newRow.endDate === 'string') {
        newRow.endDate = null;
      } else {
        const formatedEndDate: Date =
          this.datesHelper.changeDateFormat(endDate);
        newRow.endDate = formatedEndDate;
      }

      if (typeof newRow.NoSuccess === 'string') {
        newRow.NoSuccess = 0;
      }

      if (typeof newRow.NoFailed === 'string') {
        newRow.NoFailed = 0;
      }

      if (typeof newRow.startDate === 'string') {
        rejectedRows.push({
          row: {
            ...newRow,
            endDate: this.datesHelper.convertToDDMMMYY(newRow.endDate),
          },
          reason: 'Invalid Data: No Success/ No Failed/ Start Date/ End Date',
        });
        rowsRejected++;
        continue;
      }

      if (
        !batchTitle ||
        !startDate ||
        !tech ||
        !trainingCoordinator ||
        !headTrainer
      ) {
        rowsRejected++;
        rejectedRows.push({
          row: {
            ...newRow,
            startDate: this.datesHelper.convertToDDMMMYY(newRow.startDate),
            endDate: this.datesHelper.convertToDDMMMYY(newRow.endDate),
          },
          reason:
            'Missing: Batch Title/ start Date/ Tech/ Training Coordinator/ Head Trainer',
        });
        continue;
      }

      if (NoSuccess == undefined) {
        newRow.NoSuccess = null;
      }
      if (NoFailed == undefined) {
        newRow.NoFailed = null;
      }

      if (newRow.status === 'Complete') {
        newRow.status = 'Completed';
      }

      if (newRow.status) {
        newRow.status = newRow.status.replace(/\s+/g, '');
        const regex = /([a-z])([A-Z])/g;
        newRow.status = newRow.status.replace(regex, '$1 $2');
      }

      newRow.tech = this.formatText(newRow.tech);
      newRow.batchTitle = this.formatText(newRow.batchTitle);

      const conditions = {
        batchTitle: batchTitle,
        tech: tech,
        startDate: formatedStartDate,
        trainingCoordinator: trainingCoordinator,
        headTrainer: headTrainer,
      };

      const existingRow: RawBatch[] = await this.batchesRepo.findExisting(
        conditions,
      );

      if (existingRow.length !== 0) {
        if (this.isDifferent(existingRow, newRow)) {
          //Update the Existing row
          await this.batchesRepo.updateData(existingRow[0], {
            ...newRow,
            isProcessed: false,
          });
          rowsUpdated++;
        } else {
          rowsRejected++;
          continue;
        }
      } else {
        // Insert new row into the main table
        await this.batchesRepo.createNewEntry(newRow);
        rowsInserted++;
      }
    }
    return { rowsInserted, rowsUpdated, rowsRejected, rejectedRows };
  }

  // Function to check if other column beside PK's are same or not
  isDifferent(existing: RawBatch[], incoming: BatchesDto): boolean {
    return (
      this.datesHelper.convertToUnixTimestamp(existing[0].endDate) !==
        this.datesHelper.convertToUnixTimestamp(incoming.endDate) ||
      existing[0].NoOfTrainees !== incoming.NoOfTrainees ||
      existing[0].NoSuccess !== incoming.NoSuccess ||
      existing[0].NoFailed !== incoming.NoFailed
    );
  }

  formatText(text: string) {
    // Remove whitespace before a colon
    let result = text.replace(/\s*:/g, ':');

    // Remove double spaces
    result = result.replace(/\s{2,}/g, ' ');

    return result.trimEnd();
  }
}

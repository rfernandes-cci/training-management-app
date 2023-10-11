import { Injectable } from '@nestjs/common';

@Injectable()
export class DatesHelper {
  // Function to convert date from Unix
  changeDateFormat(NewRowsdate: any) {
    const newDate = new Date((NewRowsdate - 25569) * 86400 * 1000);
    return newDate;
  }

  // Function to convert Date timestamp to Unix
  convertToUnixTimestamp(timestamp: Date): number {
    const dateObject = new Date(timestamp);
    const unixTimestamp = Math.floor(dateObject.getTime() / 1000);
    const millisecondsSinceEpoch = dateObject.getTime();
    return unixTimestamp;
  }

  convertToDDMMMYY(dateObject: Date) {
    if (!dateObject || typeof dateObject === 'string') {
      return null;
    }
    const day = dateObject.getUTCDate();
    const month = dateObject.toLocaleString('default', { month: 'short' });
    const year = dateObject.getUTCFullYear().toString().substr(-2);

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }
}

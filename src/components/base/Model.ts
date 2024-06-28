import { IEvents } from './events';

export abstract class Model<T> {
  protected data: Partial<T>;

  constructor(data: Partial<T>, protected events: IEvents) {
    this.data = data;
    Object.assign(this, data);
  }

  protected emitChanges(event: string, payload: object = {}): void {
    this.events.emit(event, payload);
  }

  updateData(newData: Partial<T>): void {
    Object.assign(this.data, newData);
    Object.assign(this, newData);
    this.emitChanges('model:updated', { updatedData: newData });
  }
}

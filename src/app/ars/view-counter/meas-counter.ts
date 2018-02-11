export class MeasCounter {
  measName: string;
  counter: Object;

  constructor(measName, counter) {
    this.measName = measName;
    this.counter = counter;
  }
}

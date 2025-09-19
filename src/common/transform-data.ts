import { plainToInstance, ClassConstructor } from 'class-transformer';

export function transformData<T>(cls: ClassConstructor<T>, plain: any): T;
export function transformData<T>(cls: ClassConstructor<T>, plain: any[]): T[];
export function transformData<T>(
  cls: ClassConstructor<T>,
  plain: any | any[],
): T | T[] {
  return plainToInstance(cls, plain);
}

export function filterUndefinedValues<T>(obj: T): Partial<T> {
  const filteredObj: Partial<T> = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      filteredObj[key] = obj[key];
    }
  }
  return filteredObj;
}

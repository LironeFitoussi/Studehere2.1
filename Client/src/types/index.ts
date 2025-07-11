export * from './attendance-record.type';
export * from './building.type';
export * from './course.type';
export * from './daily-attendance.type';
export * from './institution.type';
export * from './instructor.type';
export * from './principal.type';
export * from './student.type';
export * from './user.type';
export * from './address.type';

// Test Types
export type Test = {
  _id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTest = Omit<Test, '_id' | 'createdAt' | 'updatedAt'>;

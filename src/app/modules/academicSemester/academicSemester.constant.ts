import { IAcademicSemesterCodes, IAcademicSemesterMonths, IAcademicSemesterTitles } from './academicSemester.interface';

export const academicSemesterTitles: IAcademicSemesterTitles[] = ['Spring', 'Summer', 'Autumn'];

export const academicSemesterCodes: IAcademicSemesterCodes[] = ['01', '02', '03'];

export const academicSemesterMonths: IAcademicSemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Spring: '01',
  Summer: '02',
  Autumn: '03',
};

export const academicSemesterSearchableFields = ['title', 'code', 'startMonth', 'endMonth'];

export const academicSemesterFilterableFields = ['searchTerm', 'title', 'code', 'year', 'startMonth', 'endMonth'];

import { Model, Schema } from 'mongoose';
import { IUserBloodGroup, IUserGender } from '../../../interfaces/common';

// Define interfaces for subdocuments
type Name = {
  firstName: string;
  middleName?: string | null;
  lastName: string;
};

type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};

type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

// Define the main document interface
export type IStudent = {
  id: string;
  name: Name;
  email: string;
  gender: IUserGender;
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: IUserBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  academicFaculty: Schema.Types.ObjectId;
  academicDepartment: Schema.Types.ObjectId;
  academicSemester: Schema.Types.ObjectId;
  profileImage?: string | null;
};

// Define the model
export type StudentModel = Model<IStudent, Record<string, unknown>>;

export type IStudentFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};

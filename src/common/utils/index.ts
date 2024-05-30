import { Environment } from '../constants';

export const isProd = () => {
  return process.env.NODE_ENV === Environment.PRODUCTION;
};
export const isTest = () => {
  return process.env.NODE_ENV === Environment.TEST;
};
export const isDevelopment = () => {
  return process.env.NODE_ENV === Environment.DEVELOPMENT;
};
export const isLocal = () => {
  return process.env.NODE_ENV === Environment.LOCAL;
};
export const convertToCamelCase = (str: string) => {
  return str.replace(/_([a-z])/g, (_match, letter) => letter.toUpperCase());
};
export const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
export const deleteUndefinedValues = <T>(row: T): T => {
  for (const key of Object.keys(row)) {
    const element = row[key];
    element ?? delete row[key];
  }

  return row;
};

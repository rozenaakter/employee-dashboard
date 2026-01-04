import { Employee } from "../types/employee";

const STORAGE_KEY = 'employeeData';

// Get employees from local storage
export const getEmployeesFromStorage = (): Employee[] => {
  if (typeof window === 'undefined') return [];
  try{
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Enter reading from localstorage:", error);
    return[];
  }
};

// Save employees to local storage
export const saveEmployeesToStorage = (employees: Employee[]): void => {
  if (typeof window === 'undefined') return;
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  } catch (error) {
    console.log("Error saving to LocalStorage:", error);
  }
};

// Clear employees from local storage
export const clearStorage = (): void => {
  if (typeof window === 'undefined') return;
  try{
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

import {
  getDocs,
  collection,
  query,
  orderBy,
  startAt,
  endAt,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const teachersCollection = collection(db, "teachers");

export const getTeacherByName = async (name: string): Promise<any[]> => {
  const teachers: any[] = [];
  const nameQuery = query(
    teachersCollection,
    orderBy("name"),
    startAt(`${name}`),
    endAt(name + "\uf8ff")
  );
  const teachersDocs = await getDocs(nameQuery);
  teachersDocs.forEach((doc) => {
    teachers.push(doc.data());
  });
  return teachers;
};

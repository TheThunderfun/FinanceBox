import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private db = getFirestore();

  constructor() {}

  async addUser(
    name: string,
    lastName: string,
    empress: string,
    admin: boolean
  ) {
    try {
      const docRef = await addDoc(collection(this.db, 'users'), {
        nombre: name,
        apellido: lastName,
        empresa: empress,
        admin: admin,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
  async readUsers() {
    const querySnapshot = await getDocs(collection(this.db, 'users'));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  }
}

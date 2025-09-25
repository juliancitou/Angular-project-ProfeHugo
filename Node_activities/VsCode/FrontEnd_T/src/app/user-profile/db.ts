// db.ts
export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

export class db {
  private userList: User[] = [
    { id: 1, name: 'Julián García Villedas', age: 20, email: '22690208@tecvalles.mx' },
    { id: 2, name: 'Nestor Moises Castillo Bautista', age: 28, email: '22690491@tecvalles.mx' },
    { id: 3, name: 'Erick Ivan Algo', age: 22, email: '22692323@tecvalles.mx' },
  ];

  constructor() {}

  getAll(): User[] {
    return [...this.userList]; // Devolver copia para evitar mutaciones
  }

  count(): number {
    return this.userList.length;
  }

  agregarUsuario(usuario: User): void {
    this.userList.push(usuario);
  }

  eliminarUsuario(id: number): void {
    this.userList = this.userList.filter(user => user.id !== id);
  }

  obtenerUsuarioPorId(id: number): User | undefined {
    return this.userList.find(user => user.id === id);
  }
}
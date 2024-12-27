export class EmployeeEntity {
    id: string;
    nome: string;
    cpf: string;
    email: string;
    phone: string;
    linkedin?: string;
    endereco: {
        rua: string;
        numero?: string;
        complemento?: string;
        bairro: string;
        cidade: string;
        estado: string;
        cep: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

export class CompanyEntity {
    id: string;
    nome: string;
    cnpj: string;
    email: string;
    phone: string;
    site?: string;
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

import { NotFoundException } from "@nestjs/common";
import { COMPANY_EXCEPTIONS } from "../constants/exceptions";

export function validationCreateCompany(data) {
    if (data.cnpj === null || data.cnpj === undefined) {
        throw new NotFoundException(
            COMPANY_EXCEPTIONS.COMPANY_NOT_CREATED
        );
    }

    if (data.email === null || data.email === undefined) {
        throw new NotFoundException(
            COMPANY_EXCEPTIONS.COMPANY_NOT_CREATED
        );
    }

    if (data.nome === null || data.nome === undefined) {
        throw new NotFoundException(
            COMPANY_EXCEPTIONS.COMPANY_NOT_CREATED
        );
    }

    if(data.cnpj.length < 14 || data.cnpj.length > 20) {
        throw new NotFoundException(
            COMPANY_EXCEPTIONS.COMPANY_NOT_CREATED
        );
    }
}

export function validateUpdateCompany(data) {
    if (data.cnpj === null || data.cnpj === undefined) {
        throw new NotFoundException(
            COMPANY_EXCEPTIONS.COMPANY_NOT_UPDATED
        );
    }

    if (data.email === null || data.email === undefined) {
        throw new NotFoundException(
            COMPANY_EXCEPTIONS.COMPANY_NOT_UPDATED
        );
    }

    if (data.nome === null || data.nome === undefined) {
        throw new NotFoundException(
            COMPANY_EXCEPTIONS.COMPANY_NOT_UPDATED
        );
    }

    if(data.cnpj.length < 14 || data.cnpj.length > 20) {
        throw new NotFoundException(
            COMPANY_EXCEPTIONS.COMPANY_NOT_UPDATED
        );
    }
}

from drf_spectacular.utils import (
    extend_schema,
    OpenApiExample,
    OpenApiResponse,
    OpenApiParameter,
)
from drf_spectacular.types import OpenApiTypes


class CompanyUserCreateSwaggerMixin:

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)

        if hasattr(cls, "post"):
            cls.post = extend_schema(
                tags=["Empresa"],
                summary="Cria uma nova empresa.",
                methods=["POST"],
                auth=[{"Bearer": []}],
                description="Faz o cadastro de uma nova empresa no sistema.",
                request=OpenApiTypes.OBJECT,
                responses={
                    201: OpenApiResponse(
                        description="Usuário criado com sucesso",
                        response=OpenApiTypes.OBJECT,
                        examples=[
                            OpenApiExample(
                                name="Exemplo de resposta de sucesso",
                                value={
                                    "id": 1,
                                    "username": "abc3",
                                    "email": "contato3@empresaabc.com",
                                    "name": "Empresa ABC Ltda3",
                                    "cnpj": "12345678000193",
                                    "company_phone": "81999998888",
                                    "company_site": "https://www.empresaabc.com",
                                    "company_endereco": {
                                        "rua": "Av. Principal",
                                        "numero": "1000",
                                        "bairro": "Centro",
                                        "cidade": "Recife",
                                        "estado": "PE",
                                        "cep": "50000-000",
                                    },
                                },
                            )
                        ],
                    ),
                    400: OpenApiResponse(
                        description="Erro no registro",
                        response=OpenApiTypes.OBJECT,
                        examples=[
                            OpenApiExample(
                                name="Exemplo de resposta de erro",
                                value={"message": "Erro ao criar empresa."},
                            )
                        ],
                    ),
                },
                examples=[
                    OpenApiExample(
                        name="Exemplo de requisição",
                        value={
                            "username": "abc3",
                            "name": "Empresa ABC Ltda3",
                            "password": "Ativos@2025",
                            "email": "contato3@empresaabc.com",
                            "cnpj": "12345678000193",
                            "phone": "81999998888",
                            "site": "https://www.empresaabc.com",
                            "endereco": {
                                "rua": "Av. Principal",
                                "numero": "1000",
                                "bairro": "Centro",
                                "cidade": "Recife",
                                "estado": "PE",
                                "cep": "50000-000",
                            },
                        },
                    )
                ],
            )(cls.post)


class CompanyUserListSwaggerMixin:
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)

        if hasattr(cls, "get"):
            cls.get = extend_schema(
                tags=["Empresa"],
                summary="Lista todas as empresas.",
                methods=["GET"],
                description="Retorna uma lista de todas as empresas cadastradas no sistema.",
                responses={
                    200: OpenApiResponse(
                        description="Usuários listados com sucesso.",
                        response=OpenApiTypes.OBJECT,
                        examples=[
                            OpenApiExample(
                                name="Exemplo de resposta de sucesso",
                                value={
                                    "result": [
                                        {
                                            "count": 2,
                                            "next": None,
                                            "previous": None,
                                            "results": [
                                                {
                                                    "id": 1,
                                                    "username": "abc",
                                                    "email": "contato@empresaabc.com",
                                                    "name": "Empresa ABC Ltda",
                                                    "cnpj": "12345678000190",
                                                    "company_id": "4762a0e6-3b98-4c2b-ba0f-1c8ead74c010",
                                                    "company_phone": "81999998888",
                                                    "company_site": "https://www.empresaabc.com",
                                                    "company_endereco": {
                                                        "cep": "50000-000",
                                                        "rua": "Av. Principal",
                                                        "bairro": "Centro",
                                                        "cidade": "Recife",
                                                        "estado": "PE",
                                                        "numero": "1000",
                                                    },
                                                },
                                                {
                                                    "id": 2,
                                                    "username": "abc2",
                                                    "email": "contato2@empresaabc.com",
                                                    "name": "Empresa ABC Ltda2",
                                                    "cnpj": "12345678000192",
                                                    "company_id": "c4a837c2-c63d-4629-9b1d-408e2994edcd",
                                                    "company_phone": "81999998888",
                                                    "company_site": "https://www.empresaabc.com",
                                                    "company_endereco": {
                                                        "cep": "50000-000",
                                                        "rua": "Av. Principal",
                                                        "bairro": "Centro",
                                                        "cidade": "Recife",
                                                        "estado": "PE",
                                                        "numero": "1000",
                                                    },
                                                },
                                            ],
                                        }
                                    ]
                                },
                                response_only=True,
                            ),
                        ],
                    ),
                    401: OpenApiResponse(
                        description="Usuário não autorizado.",
                        response=OpenApiTypes.OBJECT,
                        examples=[
                            OpenApiExample(
                                name="Usuário não autorizado",
                                value={
                                    "detail": "Authentication credentials were not provided."
                                },
                                response_only=True,
                            ),
                        ],
                    ),
                },
            )(cls.get)


class CompanyUserUpdateSwaggerMixin:
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)

        if hasattr(cls, "patch"):
            cls.patch = extend_schema(
                tags=["Empresa"],
                description="Atualiza a empresa no sistema.",
                summary="Atualiza a empresa.",
                methods=["PATCH"],
                parameters=[
                    OpenApiParameter(
                        name="id",
                        location=OpenApiParameter.PATH,
                        type=OpenApiTypes.UUID,
                        description="ID do usuário empresa a ser atualizado.",
                        required=True,
                    ),
                ],
                request=OpenApiTypes.OBJECT,
                responses={
                    202: OpenApiResponse(
                        description="Usuário atualizado com sucesso.",
                        response=OpenApiTypes.OBJECT,
                        examples=[
                            OpenApiExample(
                                name="Exemplo de resposta de sucesso",
                                value={
                                    "id": 1,
                                    "username": "abc3",
                                    "email": "contato3@empresaabc.com",
                                    "name": "Empresa ABC Ltda3",
                                    "cnpj": "12345678000193",
                                    "company_phone": "81999998888",
                                    "company_site": "https://www.empresaabc.com",
                                    "company_endereco": {
                                        "rua": "Av. Principal",
                                        "numero": "1000",
                                        "bairro": "Centro",
                                        "cidade": "Recife",
                                        "estado": "PE",
                                        "cep": "50000-000",
                                    },
                                },
                                response_only=True,
                            ),
                        ],
                    ),
                    401: OpenApiResponse(
                        description="Usuário não autorizado.",
                        response=OpenApiTypes.OBJECT,
                        examples=[
                            OpenApiExample(
                                name="Usuário não autorizado",
                                value={
                                    "detail": "Authentication credentials were not provided."
                                },
                                response_only=True,
                            ),
                        ],
                    ),
                    404: OpenApiResponse(
                        description="Usuário não encontrado.",
                        response=OpenApiTypes.OBJECT,
                        examples=[
                            OpenApiExample(
                                name="Usuário não encontrado",
                                value={"detail": "Usuário não encontrado."},
                                response_only=True,
                            ),
                        ],
                    ),
                },
                examples=[
                    OpenApiExample(
                        name="Exemplo de requisição",
                        value={
                            "username": "abc3",
                            "name": "Empresa ABC Ltda3",
                            "password": "Ativos@2025",
                            "email": "contato3@empresaabc.com",
                            "cnpj": "12345678000193",
                            "phone": "81999998888",
                            "site": "https://www.empresaabc.com",
                            "endereco": {
                                "rua": "Av. Principal",
                                "numero": "1000",
                                "bairro": "Centro",
                                "cidade": "Recife",
                                "estado": "PE",
                                "cep": "50000-000",
                            },
                        },
                        request_only=True,
                    )
                ],
            )(cls.patch)


class CompanyUserDeleteSwaggerMixin:
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)

        if hasattr(cls, "delete"):
            cls.delete = extend_schema(
                tags=["Empresa"],
                description="Deleta o usuário empresa.",
                summary="Deleta o usuário.",
                methods=["DELETE"],
                parameters=[
                    OpenApiParameter(
                        name="id",
                        location=OpenApiParameter.PATH,
                        type=OpenApiTypes.UUID,
                        description="ID do usuário a ser deletado.",
                        required=True,
                    ),
                ],
                responses={
                    204: OpenApiResponse(
                        description="Usuário deletado com sucesso.",
                        response=OpenApiTypes.OBJECT,
                        examples=[
                            OpenApiExample(
                                name="Exemplo de resposta de sucesso",
                                value={},
                                response_only=True,
                            ),
                        ],
                    ),
                    401: OpenApiResponse(
                        description="Usuário não autorizado.",
                        response=OpenApiTypes.OBJECT,
                        examples=[
                            OpenApiExample(
                                name="Usuário não autorizado",
                                value={
                                    "detail": "Authentication credentials were not provided."
                                },
                                response_only=True,
                            ),
                        ],
                    ),
                    404: OpenApiResponse(
                        description="Usuário não encontrado.",
                        response=OpenApiTypes.OBJECT,
                        examples=[
                            OpenApiExample(
                                name="Usuário não encontrado",
                                value={"detail": "Usuário não encontrado."},
                                response_only=True,
                            ),
                        ],
                    ),
                },
            )(cls.delete)

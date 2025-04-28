from drf_spectacular.utils import (
    extend_schema,
    OpenApiExample,
    OpenApiResponse,
    OpenApiParameter,
)
from drf_spectacular.types import OpenApiTypes


class EmployeeUserCreateSwaggerMixin:

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)

        if hasattr(cls, "post"):
            cls.post = extend_schema(
                tags=["Funcionário"],
                summary="Cria um novo funcionário.",
                methods=["POST"],
                auth=[{"Bearer": []}],
                description="Faz o cadastro de um novo funcionário no sistema.",
                request=OpenApiTypes.OBJECT,
                responses={
                    201: OpenApiResponse(
                        description="Usuário criado com sucesso",
                        response=OpenApiTypes.OBJECT,
                        examples=[
                            OpenApiExample(
                                name="Exemplo de resposta de sucesso",
                                value={
                                    "message": "Funcionário criado com sucesso",
                                    "result": {
                                        "id": 1,
                                        "username": "chrisredfield",
                                        "name": "Chris Redfield",
                                        "email": "chrisredfield@umbrella.com",
                                        "cpf": "98765432112",
                                        "phone": "81999995555",
                                        "linkedin": "https://www.linkedin.com/in/christredfield",
                                        "endereco": {
                                            "rua": "Rua dos dead",
                                            "numero": "123",
                                            "bairro": "Raccon",
                                            "cidade": "Raccon City",
                                            "estado": "PE",
                                            "cep": "51020-000",
                                        },
                                        "company_id": "c4a837c2-c63d-4629-9b1d-408e2994edcd",
                                        "date_joined": "27-04-2025 23:46",
                                        "created_at": "27-04-2025 23:46",
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
                                value={"message": "Erro ao criar funcionário."},
                            )
                        ],
                    ),
                },
                examples=[
                    OpenApiExample(
                        name="Exemplo de requisição",
                        value={
                            "username": "chrisredfield",
                            "name": "Chris Redfield",
                            "password": "Senha@123",
                            "email": "chrisredfield@umbrella.com",
                            "cpf": "98765432112",
                            "phone": "81999995555",
                            "linkedin": "https://www.linkedin.com/in/christredfield",
                            "endereco": {
                                "rua": "Rua dos dead",
                                "numero": "123",
                                "bairro": "Raccon",
                                "cidade": "Raccon City",
                                "estado": "PE",
                                "cep": "51020-000",
                            },
                            "company_id": "c4a837c2-c63d-4629-9b1d-408e2994edcd",
                        },
                    )
                ],
            )(cls.post)


class EmployeeUserListSwaggerMixin:

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)

        if hasattr(cls, "get"):
            cls.get = extend_schema(
                tags=["Funcionário"],
                summary="Lista todos os funcionários.",
                methods=["GET"],
                description="Retorna uma lista de todos funcionários cadastradas no sistema.",
                responses={
                    200: OpenApiResponse(
                        description="Usuários listados com sucesso.",
                        response=OpenApiTypes.OBJECT,
                        examples=[
                            OpenApiExample(
                                name="Exemplo de resposta de sucesso",
                                value={
                                    "count": 1,
                                    "next": None,
                                    "previous": None,
                                    "results": [
                                        {
                                            "id": 1,
                                            "username": "funcionario_joao",
                                            "email": "joao@empresaabc.com",
                                            "name": "João da Silva",
                                            "cpf": "98765432100",
                                            "employee_id": "5304400b-78c8-4594-957a-5e47af2d0b15",
                                            "employee_phone": "81999995555",
                                            "employee_linkedin": "https://www.linkedin.com/in/joaosilva",
                                            "employee_endereco": {
                                                "cep": "51020-000",
                                                "rua": "Rua das Flores",
                                                "bairro": "Boa Viagem",
                                                "cidade": "Recife",
                                                "estado": "PE",
                                                "numero": "123",
                                            },
                                        },
                                        {
                                            "id": 2,
                                            "username": "funcionario_joao",
                                            "email": "joao@empresaabc.com",
                                            "name": "João da Silva",
                                            "cpf": "98765432100",
                                            "employee_id": "5304400b-78c8-4594-957a-5e47af2d0b15",
                                            "employee_phone": "81999995555",
                                            "employee_linkedin": "https://www.linkedin.com/in/joaosilva",
                                            "employee_endereco": {
                                                "cep": "51020-000",
                                                "rua": "Rua das Flores",
                                                "bairro": "Boa Viagem",
                                                "cidade": "Recife",
                                                "estado": "PE",
                                                "numero": "123",
                                            },
                                        }
                                    ],
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


class EmployeeUserUpdateSwaggerMixin:
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)

        if hasattr(cls, "patch"):
            cls.patch = extend_schema(
                tags=["Funcionário"],
                description="Atualiza um funcionário no sistema.",
                summary="Atualiza um funcionáro.",
                methods=["PATCH"],
                parameters=[
                    OpenApiParameter(
                        name="id",
                        location=OpenApiParameter.PATH,
                        type=OpenApiTypes.UUID,
                        description="ID do usuário funcionário a ser atualizado.",
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
                                    "username": "funcionario_joao_atualizado",
                                    "email": "joao@empresaabc.com",
                                    "name": "João da Silva",
                                    "cpf": "98765432100",
                                    "employee_id": "5304400b-78c8-4594-957a-5e47af2d0b15",
                                    "employee_phone": "81999995555",
                                    "employee_linkedin": "https://www.linkedin.com/in/joaosilva",
                                    "employee_endereco": {
                                        "rua": "Rua das Flores",
                                        "numero": "123",
                                        "bairro": "Boa Viagem",
                                        "cidade": "Recife",
                                        "estado": "PE",
                                        "cep": "51020-000",
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
                            "username": "funcionario_joao_atualizado",
                            "name": "João da Silva",
                            "password": "Senha@123",
                            "email": "joao@empresaabc.com",
                            "cpf": "98765432100",
                            "phone": "81999995555",
                            "linkedin": "https://www.linkedin.com/in/joaosilva",
                            "endereco": {
                                "rua": "Rua das Flores",
                                "numero": "123",
                                "bairro": "Boa Viagem",
                                "cidade": "Recife",
                                "estado": "PE",
                                "cep": "51020-000",
                            },
                        },
                        request_only=True,
                    )
                ],
            )(cls.patch)


class EmployeeUserDeleteSwaggerMixin:
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)

        if hasattr(cls, "delete"):
            cls.delete = extend_schema(
                tags=["Funcionário"],
                description="Deleta o usuário funcionário.",
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


class EmployeeTransferSwaggerMixin:
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)

        if hasattr(cls, "patch"):
            cls.patch = extend_schema(
                tags=["Funcionário"],
                description="Transfere um funcionário para outra empresa.",
                summary="Transfere um funcionáro.",
                methods=["PATCH"],
                parameters=[
                    OpenApiParameter(
                        name="id",
                        location=OpenApiParameter.PATH,
                        type=OpenApiTypes.UUID,
                        description="ID do usuário funcionário a ser transferido.",
                        required=True,
                    ),
                ],
                request=OpenApiTypes.OBJECT,
                responses={
                    202: OpenApiResponse(
                        description="Usuário transferido com sucesso.",
                        response=OpenApiTypes.OBJECT,
                        examples=[
                            OpenApiExample(
                                name="Exemplo de resposta de sucesso",
                                value={
                                    "message": "Funcionário transferido com sucesso",
                                    "employee_id": "5304400b-78c8-4594-957a-5e47af2d0b15",
                                    "employee_username": "funcionario_joao",
                                    "employee_name": "João da Silva",
                                    "employee_email": "joao@empresaabc.com",
                                    "employee_cpf": "98765432100",
                                    "old_company_id": "c4a837c2-c63d-4629-9b1d-408e2994edcd",
                                    "new_company_id": "4762a0e6-3b98-4c2b-ba0f-1c8ead74c010",
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
                        value={"company_id": "4762a0e6-3b98-4c2b-ba0f-1c8ead74c010"},
                        request_only=True,
                    )
                ],
            )(cls.patch)

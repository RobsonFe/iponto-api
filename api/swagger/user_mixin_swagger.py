from drf_spectacular.utils import (
    extend_schema,
    OpenApiExample,
    OpenApiResponse,
    OpenApiParameter,
)
from drf_spectacular.types import OpenApiTypes


class MasterUserCreateSwaggerMixin:

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)

        if hasattr(cls, "post"):
            cls.post = extend_schema(
                tags=["Usuário"],
                auth=[{"Bearer": []}],
                summary="Cria um usuário",
                methods=["POST"],
                description="Faz o cadastro de um novo usuário no sistema.",
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
                                    "is_superuser": True,
                                    "first_name": "Clint",
                                    "last_name": "Eastwood",
                                    "username": "clint",
                                    "name": "Clint Eastwood",
                                    "email": "clint@example.com",
                                    "cpf": "02458695412",
                                    "date_joined": "19-04-2025 11:51",
                                    "last_login": "19-04-2025 11:51",
                                    "created_at": "19-04-2025 11:51",
                                    "updated_at": "19-04-2025 11:51",
                                    "is_master": True,
                                    "is_staff": True,
                                    "is_active": True,
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
                                value={"message": "Erro ao criar usuário"},
                            )
                        ],
                    ),
                },
                examples=[
                    OpenApiExample(
                        name="Exemplo de requisição",
                        value={
                            "username": "clint",
                            "name": "Clint Eastwood",
                            "password": "robson123",
                            "email": "clint@example.com",
                            "cpf": "02458695412",
                        },
                    )
                ],
            )(cls.post)


class MasterUserListSwaggerMixin:

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)

        if hasattr(cls, "get"):
            cls.get = extend_schema(
                tags=["Usuário"],
                auth=[{"Bearer": []}],
                description="Lista todos os usuários master do sistema.",
                summary="Lista todos os usuários.",
                methods=["GET"],
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
                                                    "is_superuser": True,
                                                    "first_name": "Robson",
                                                    "last_name": "Ferreira",
                                                    "username": "robson",
                                                    "name": "Robson Ferreira",
                                                    "email": "robson12ferreira@gmail.com",
                                                    "cpf": "09826353469",
                                                    "cnpj": None,
                                                    "date_joined": "19-04-2025 12:43",
                                                    "last_login": "19-04-2025 12:44",
                                                    "created_at": "19-04-2025 12:43",
                                                    "updated_at": "19-04-2025 12:43",
                                                    "is_master": True,
                                                    "is_company": False,
                                                    "is_employee": False,
                                                    "user_type": None,
                                                    "is_staff": True,
                                                    "is_active": True,
                                                },
                                                {
                                                    "id": 2,
                                                    "is_superuser": True,
                                                    "first_name": "Lemmy",
                                                    "last_name": "Kilmister",
                                                    "username": "lemmy",
                                                    "name": "Lemmy Kilmister",
                                                    "email": "motorhead@gmail.com",
                                                    "cpf": "12345678900",
                                                    "cnpj": None,
                                                    "date_joined": "21-04-2025 09:45",
                                                    "last_login": "21-04-2025 16:37",
                                                    "created_at": "21-04-2025 09:45",
                                                    "updated_at": "21-04-2025 16:37",
                                                    "is_master": True,
                                                    "is_company": False,
                                                    "is_employee": False,
                                                    "user_type": "master",
                                                    "is_staff": True,
                                                    "is_active": True,
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


class MasterUserUpdateSwaggerMixin:

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)

        if hasattr(cls, "patch"):
            cls.patch = extend_schema(
                tags=["Usuário"],
                auth=[{"Bearer": []}],
                description="Atualiza o usuário master.",
                summary="Atualiza o usuário.",
                methods=["PATCH"],
                parameters=[
                    OpenApiParameter(
                        name="id",
                        location=OpenApiParameter.PATH,
                        type=OpenApiTypes.UUID,
                        description="ID do usuário a ser atualizado.",
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
                                    "id": 2,
                                    "is_superuser": True,
                                    "first_name": "Lemmy",
                                    "last_name": "Kilmister",
                                    "username": "lemmy",
                                    "name": "Lemmy Kilmister",
                                    "email": "motorhead@gmail.com",
                                    "cpf": "12345678900",
                                    "cnpj": None,
                                    "date_joined": "21-04-2025 09:45",
                                    "last_login": "21-04-2025 16:37",
                                    "created_at": "21-04-2025 09:45",
                                    "updated_at": "21-04-2025 16:37",
                                    "is_master": True,
                                    "is_company": False,
                                    "is_employee": False,
                                    "user_type": "master",
                                    "is_staff": True,
                                    "is_active": True,
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
                            "id": 2,
                            "is_superuser": True,
                            "first_name": "Lemmy",
                            "last_name": "Kilmister",
                            "username": "lemmy",
                            "name": "Lemmy Kilmister",
                            "email": "motorhead@gmail.com",
                            "cpf": "12345678900",
                        },
                        request_only=True,
                    )
                ],
            )(cls.patch)

class MasterUserDeleteSwaggerMixin:
    
        def __init_subclass__(cls, **kwargs):
            super().__init_subclass__(**kwargs)
    
            if hasattr(cls, "delete"):
                cls.delete = extend_schema(
                    tags=["Usuário"],
                    auth=[{"Bearer": []}],
                    description="Deleta o usuário master.",
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
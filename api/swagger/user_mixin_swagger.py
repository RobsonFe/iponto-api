from drf_spectacular.utils import extend_schema, OpenApiExample, OpenApiResponse
from drf_spectacular.types import OpenApiTypes


class UserCreateSwaggerMixin:

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)

        if hasattr(cls, "post"):
            cls.post = extend_schema(
                tags=["Usuário"],
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

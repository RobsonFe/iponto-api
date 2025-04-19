from drf_spectacular.utils import extend_schema, OpenApiExample, OpenApiResponse
from drf_spectacular.types import OpenApiTypes


class MyTokenObtainPairSwaggerMixin:

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)

        if hasattr(cls, 'post'):
            cls.post = extend_schema(
                tags=["Autenticação"],
                description="Autentica o usuário e retorna um objeto contendo o token de acesso e o token de atualização.",
                summary="Autentica o usuário e retorna um objeto contendo o token de acesso e o token de atualização.",
                request=OpenApiTypes.OBJECT,
                responses={
                    200: OpenApiResponse(
                        description="Autenticação bem-sucedida",
                        response=OpenApiTypes.OBJECT,
                        examples=[
                            OpenApiExample(
                                name='Exemplo de resposta (sucesso)',
                                value={
                                    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0MDAxNzE2MSwiaWF0IjoxNzM5OTMwNzYxLCJqdGkiOiJkZWUzMjY2OGVhMmY0NjI3YjE4ZjcxYzk0NjNjN2ZkOSIsInVzZXJfaWQiOjF9.Qto9F-qnF1K55bXjoT6Yga2HvKovg6QjpA0xuqbw3H8",
                                    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM5OTMxMDYxLCJpYXQiOjE3Mzk5MzA3NjEsImp0aSI6ImZiMTEwZGIzNDVlMzRlYjdiMDI5NTI3NWQ4NWYzODQzIiwidXNlcl9pZCI6MX0.RJPDM5vMm2mB7cy6Qlfe4fqMCGYzfYqjAAQ_e0yQT38"
                                },
                            ),
                        ],
                    ),
                    401: OpenApiResponse(
                        description="Credenciais inválidas",
                        response=OpenApiTypes.OBJECT,
                        examples=[
                            OpenApiExample(
                                name='Exemplo de resposta (erro)',
                                value={'error': 'Credenciais inválidas'},
                            ),
                        ],
                    ),
                    500: OpenApiResponse(
                        description="Erro interno do servidor",
                        response=OpenApiTypes.OBJECT,
                        examples=[
                            OpenApiExample(
                                name='Exemplo de resposta (erro)',
                                value={'error': 'Erro interno do servidor'},
                            ),
                        ],
                    ),
                },
                examples=[
                    OpenApiExample(
                        name='Exemplo de requisição',
                        value={'username': 'clint',
                               'password': '123456!#Abc'},
                        request_only=True,
                    ),
                ],
            )(cls.post)


class LogoutSwaggerMixin:
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)

        if hasattr(cls, 'post'):
            cls.post = extend_schema(
                tags=["Autenticação"],
                description="Desloga um usuário e invalida o token de atualização.",
                summary="Desloga o usuário e invalida o token de atualização.",
                request=OpenApiTypes.OBJECT,
                responses={
                    205: OpenApiResponse(
                        description="Token invalidado com sucesso",
                        response=OpenApiTypes.NONE,
                    ),
                    400: OpenApiResponse(
                        description="Token inválido ou erro no processamento",
                        response=OpenApiTypes.OBJECT,
                        examples=[
                            OpenApiExample(
                                name='Erro de Validação',
                                value={"error": "Token inválido"},
                            ),
                        ],
                    ),
                    401: OpenApiResponse(
                        description="Usuário não autorizado.",
                        response=OpenApiTypes.OBJECT,
                        examples=[
                            OpenApiExample(
                                name='Usuário não autorizado',
                                value={
                                    "detail": "Authentication credentials were not provided."},
                                response_only=True,
                            )
                        ],
                    ),
                },
                examples=[
                    OpenApiExample(
                        name='Exemplo de requisição',
                        value={'refresh': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0MDAxNzE2MSwiaWF0IjoxNzM5OTMwNzYxLCJqdGkiOiJkZWUzMjY2OGVhMmY0NjI3YjE4ZjcxYzk0NjNjN2ZkOSIsInVzZXJfaWQiOjF9.Qto9F-qnF1K55bXjoT6Yga2HvKovg6QjpA0xuqbw3H8'},
                        request_only=True,
                    ),
                ],
            )(cls.post)
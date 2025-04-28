from turtle import st
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from api.model.customuser import CustomUser
from api.serializers import MasterUserSerializer
from api.swagger.user_mixin_swagger import (
    MasterUserCreateSwaggerMixin,
    MasterUserDeleteSwaggerMixin,
    MasterUserListSwaggerMixin,
    MasterUserUpdateSwaggerMixin,
)


class MasterUserCreateView(MasterUserCreateSwaggerMixin, generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = MasterUserSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            user_data = response.data
            return Response(
                {
                    "message": "Usuário criado com sucesso",
                    "result": {
                        "id": user_data["id"],
                        "first_name": user_data["first_name"],
                        "last_name": user_data["last_name"],
                        "username": user_data["username"],
                        "name": user_data["name"],
                        "email": user_data["email"],
                        "cpf": user_data["cpf"],
                        "phone": user_data["phone"],
                        "date_joined": user_data["date_joined"],
                        "created_at": user_data["created_at"],
                        "is_superuser": user_data["is_superuser"],
                        "is_master": user_data["is_master"],
                    },
                },
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response(
                {"message": "Erro ao criar usuário", "error": str(e)}, status=400
            )


class MasterUserListView(MasterUserListSwaggerMixin, generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = MasterUserSerializer
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class MasterUserUpdateView(MasterUserUpdateSwaggerMixin, generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = MasterUserSerializer
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)


class MasterUserDeleteView(MasterUserDeleteSwaggerMixin, generics.DestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = MasterUserSerializer
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)

from rest_framework import generics, permissions, filters, status
from rest_framework.response import Response
from api import serializers
from api.model.customuser import CustomUser
from api.serializers.employee_serializer import EmployeeUserSerializer
from api.permissions import IsCompanyEmployeeOwnerOrMaster
from api.model.company_model import Company
from api.swagger.employee_mixin_swagger import (
    EmployeeUserCreateSwaggerMixin,
    EmployeeUserDeleteSwaggerMixin,
    EmployeeUserListSwaggerMixin,
    EmployeeUserUpdateSwaggerMixin,
)
from django.db import transaction


class EmployeeUserCreateView(EmployeeUserCreateSwaggerMixin, generics.CreateAPIView):
    queryset = CustomUser.objects.filter(is_employee=True)
    serializer_class = EmployeeUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def check_permissions(self, request):
        super().check_permissions(request)

        # Verificar se o usuário é master ou empresa
        if not (request.user.is_master or request.user.is_company):
            self.permission_denied(
                request,
                message="Apenas empresas ou administradores podem criar funcionários.",
                code="permission_denied",
            )

    def perform_create(self, serializer):
        # Se for empresa, valida se está criando para sua própria empresa
        if self.request.user.is_company:
            try:
                company = Company.objects.get(user=self.request.user)
                company_id = serializer.validated_data.get("company_id")

                if str(company.id) != str(company_id):
                    raise serializers.ValidationError(
                        {
                            "company_id": "Você só pode criar funcionários para sua própria empresa"
                        }
                    )
            except Company.DoesNotExist:
                raise serializers.ValidationError(
                    {"error": "Seu perfil de empresa não foi encontrado"}
                )

        serializer.save()
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            user_data = response.data
            return Response(
                {
                    "message": "Funcionário criado com sucesso",
                    "result": {
                        "id": user_data["id"],
                        "username": user_data["username"],
                        "name": user_data["name"],
                        "email": user_data["email"],
                        "cpf": user_data["cpf"],
                        "phone": user_data["employee_phone"],
                        "linkedin": user_data["employee_linkedin"],
                        "endereco": user_data["employee_endereco"],
                        "company_id": user_data["employee_company_id"],
                        "date_joined": user_data["date_joined"],
                        "created_at": user_data["created_at"],
                    },
                },
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response(
                {"message": "Erro ao criar funcionário", "error": str(e)}, status=400
            )


class EmployeeUserListView(EmployeeUserListSwaggerMixin, generics.ListAPIView):
    serializer_class = EmployeeUserSerializer
    permission_classes = [permissions.IsAuthenticated, IsCompanyEmployeeOwnerOrMaster]
    filter_backends = [filters.SearchFilter]
    search_fields = ["username", "name", "email", "employee_profile__nome"]

    def get_queryset(self):
        queryset = CustomUser.objects.filter(is_employee=True)

        # Se for master, pode ver todos os funcionários
        if self.request.user.is_master:
            return queryset

        # Se for empresa, só vê seus funcionários
        if self.request.user.is_company and hasattr(
            self.request.user, "company_profile"
        ):
            company_id = self.request.user.company_profile.id
            return queryset.filter(employee_profile__company__id=company_id)

        # Se for funcionário, só vê a si mesmo
        if self.request.user.is_employee:
            return queryset.filter(id=self.request.user.id)

        return CustomUser.objects.none()

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class EmployeeUserDetailView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.filter(is_employee=True)
    serializer_class = EmployeeUserSerializer
    permission_classes = [permissions.IsAuthenticated, IsCompanyEmployeeOwnerOrMaster]

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class EmployeeUserUpdateView(EmployeeUserUpdateSwaggerMixin, generics.UpdateAPIView):
    queryset = CustomUser.objects.filter(is_employee=True)
    serializer_class = EmployeeUserSerializer
    permission_classes = [permissions.IsAuthenticated, IsCompanyEmployeeOwnerOrMaster]

    @transaction.atomic
    def patch(self, request, *args, **kwargs):
        try:
            response = super().patch(request, *args, **kwargs)
            user_data = response.data
            return Response(
                {
                    "message": "Funcionário atualizado com sucesso",
                    "result": {
                        "id": user_data["id"],
                        "first_name": user_data["first_name"],
                        "last_name": user_data["last_name"],
                        "username": user_data["username"],
                        "name": user_data["name"],
                        "email": user_data["email"],
                        "cpf": user_data["cpf"],
                        "company_id": user_data["company_id"],
                        "date_joined": user_data["date_joined"],
                        "created_at": user_data["created_at"],
                    },
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"message": "Erro ao atualizar funcionário", "error": str(e)}, status=400
            )


class EmployeeUserDeleteView(EmployeeUserDeleteSwaggerMixin, generics.DestroyAPIView):
    queryset = CustomUser.objects.filter(is_employee=True)
    serializer_class = EmployeeUserSerializer
    permission_classes = [permissions.IsAuthenticated, IsCompanyEmployeeOwnerOrMaster]

    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)

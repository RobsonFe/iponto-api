from rest_framework import generics, permissions, filters
from api import serializers
from api.model.customuser import CustomUser
from api.serializers.employee_serializer import EmployeeUserSerializer
from api.permissions import IsMasterUser, IsCompanyUser, IsCompanyEmployeeOwnerOrMaster
from django.shortcuts import get_object_or_404
from api.model.company_model import Company

class EmployeeUserCreateView(generics.CreateAPIView):
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
                code="permission_denied"
            )
    
    def perform_create(self, serializer):
        # Se for empresa, valida se está criando para sua própria empresa
        if self.request.user.is_company:
            try:
                company = Company.objects.get(user=self.request.user)
                company_id = serializer.validated_data.get('company_id')
                
                if str(company.id) != str(company_id):
                    raise serializers.ValidationError(
                        {"company_id": "Você só pode criar funcionários para sua própria empresa"}
                    )
            except Company.DoesNotExist:
                raise serializers.ValidationError(
                    {"error": "Seu perfil de empresa não foi encontrado"}
                )
        
        serializer.save()
    
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

class EmployeeUserListView(generics.ListAPIView):
    serializer_class = EmployeeUserSerializer
    permission_classes = [permissions.IsAuthenticated, IsCompanyEmployeeOwnerOrMaster]
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'name', 'email', 'employee_profile__nome']
    
    def get_queryset(self):
        queryset = CustomUser.objects.filter(is_employee=True)
        
        # Se for master, pode ver todos os funcionários
        if self.request.user.is_master:
            return queryset
            
        # Se for empresa, só vê seus funcionários
        if self.request.user.is_company and hasattr(self.request.user, 'company_profile'):
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

class EmployeeUserUpdateView(generics.UpdateAPIView):
    queryset = CustomUser.objects.filter(is_employee=True)
    serializer_class = EmployeeUserSerializer
    permission_classes = [permissions.IsAuthenticated, IsCompanyEmployeeOwnerOrMaster]
    
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

class EmployeeUserDeleteView(generics.DestroyAPIView):
    queryset = CustomUser.objects.filter(is_employee=True)
    serializer_class = EmployeeUserSerializer
    permission_classes = [permissions.IsAuthenticated, IsCompanyEmployeeOwnerOrMaster]
    
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)
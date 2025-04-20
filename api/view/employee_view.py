from rest_framework import generics, permissions, filters
from api.model.Customuser import CustomUser
from api.serializers.employee_serializer import EmployeeUserSerializer
from api.permissions import IsMasterUser, IsCompanyUser, IsCompanyEmployeeOwnerOrMaster
from django.shortcuts import get_object_or_404
from api.model.company_model import Company

class EmployeeUserCreateView(generics.CreateAPIView):
    queryset = CustomUser.objects.filter(is_employee=True)
    serializer_class = EmployeeUserSerializer
    permission_classes = [permissions.IsAuthenticated, IsCompanyUser]
    
    def perform_create(self, serializer):
        # Se o usuário for uma empresa, só pode criar funcionários para sua própria empresa
        if self.request.user.is_company:
            company = get_object_or_404(Company, user=self.request.user)
            serializer.save(company_id=company.id)
        else:
            serializer.save()
    
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

class EmployeeUserListView(generics.ListAPIView):
    serializer_class = EmployeeUserSerializer
    permission_classes = [permissions.IsAuthenticated]
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
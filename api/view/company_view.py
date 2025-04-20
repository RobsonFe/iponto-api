from rest_framework import generics, permissions
from api.model.Customuser import CustomUser
from api.permissions import IsMasterUser, IsCompanyOwnerOrMaster
from api.serializers.company_serializer import CompanyUserSerializer

class CompanyUserCreateView(generics.CreateAPIView):
    queryset = CustomUser.objects.filter(is_company=True)
    serializer_class = CompanyUserSerializer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

class CompanyUserListView(generics.ListAPIView):
    queryset = CustomUser.objects.filter(is_company=True)
    serializer_class = CompanyUserSerializer
    permission_classes = [permissions.IsAuthenticated, IsMasterUser]
    
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

class CompanyUserDetailView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.filter(is_company=True)
    serializer_class = CompanyUserSerializer
    permission_classes = [permissions.IsAuthenticated, IsCompanyOwnerOrMaster]
    
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

class CompanyUserUpdateView(generics.UpdateAPIView):
    queryset = CustomUser.objects.filter(is_company=True)
    serializer_class = CompanyUserSerializer
    permission_classes = [permissions.IsAuthenticated, IsCompanyOwnerOrMaster]
    
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

class CompanyUserDeleteView(generics.DestroyAPIView):
    queryset = CustomUser.objects.filter(is_company=True)
    serializer_class = CompanyUserSerializer
    permission_classes = [permissions.IsAuthenticated, IsMasterUser]
    
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)
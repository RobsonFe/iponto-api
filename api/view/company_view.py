from rest_framework import generics, permissions
from api.model.customuser import CustomUser
from api.permissions import IsMasterUser, IsCompanyOwnerOrMaster
from api.serializers.company_serializer import CompanyUserSerializer
from api.swagger.company_mixin_swagger import (
    CompanyUserCreateSwaggerMixin,
    CompanyUserDeleteSwaggerMixin,
    CompanyUserListSwaggerMixin,
    CompanyUserUpdateSwaggerMixin,
)


class CompanyUserCreateView(CompanyUserCreateSwaggerMixin, generics.CreateAPIView):
    queryset = CustomUser.objects.filter(is_company=True)
    serializer_class = CompanyUserSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class CompanyUserListView(CompanyUserListSwaggerMixin, generics.ListAPIView):
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


class CompanyUserUpdateView(CompanyUserUpdateSwaggerMixin, generics.UpdateAPIView):
    queryset = CustomUser.objects.filter(is_company=True)
    serializer_class = CompanyUserSerializer
    permission_classes = [permissions.IsAuthenticated, IsCompanyOwnerOrMaster]

    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)


class CompanyUserDeleteView(CompanyUserDeleteSwaggerMixin, generics.DestroyAPIView):
    queryset = CustomUser.objects.filter(is_company=True)
    serializer_class = CompanyUserSerializer
    permission_classes = [permissions.IsAuthenticated, IsMasterUser]

    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)

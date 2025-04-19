from rest_framework import generics, permissions
from api.model.Customuser import CustomUser
from api.serializers import MasterUserSerializer
from api.swagger.user_mixin import UserCreateSwaggerMixin

class MasterUserCreateView(UserCreateSwaggerMixin,generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = MasterUserSerializer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

class MasterUserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = MasterUserSerializer
    permission_classes = [permissions.IsAdminUser]
    
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

class MasterUserUpdateView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = MasterUserSerializer
    permission_classes = [permissions.IsAdminUser]
    
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

class MasterUserDeleteView(generics.DestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = MasterUserSerializer
    permission_classes = [permissions.IsAdminUser]
    
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)
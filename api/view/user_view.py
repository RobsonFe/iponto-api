from rest_framework import generics, permissions
from api.model.Customuser import CustomUser
from api.serializers import MasterUserSerializer

class MasterUserCreateView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = MasterUserSerializer
    permission_classes = [permissions.IsAdminUser]
    

class MasterUserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = MasterUserSerializer
    permission_classes = [permissions.IsAdminUser]
    
class MasterUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = MasterUserSerializer
    permission_classes = [permissions.IsAdminUser]
    
class MasterUserUpdateView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = MasterUserSerializer
    permission_classes = [permissions.IsAdminUser]
    
class MasterUserDeleteView(generics.DestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = MasterUserSerializer
    permission_classes = [permissions.IsAdminUser]
    
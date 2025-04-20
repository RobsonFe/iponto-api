from rest_framework import generics, permissions
from api.model.company_model import Company
from api.serializers.company_serializer import CompanySerializer

class CompanyCreateView(generics.CreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
      
class CompanyListView(generics.ListAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
      
class CompanyUpdateView(generics.UpdateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)
      
class CompanyDeleteView(generics.DestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)
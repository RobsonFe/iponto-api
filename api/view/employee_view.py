from rest_framework import generics, permissions
from api.model.employee_model import Employee
from api.serializers.employee_serializer import EmployeeSerializer


class EmployeeCreateView(generics.CreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs) 
      
      
class EmployeeListView(generics.ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
      

class EmployeeUpdateView(generics.UpdateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)
      
class EmployeeDeleteView(generics.DestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)
      
class EmployeeListByCompanyView(generics.ListAPIView):
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'company_id'
    
    def get_queryset(self):
        company_id = self.kwargs['company_id']
        return Employee.objects.filter(company__id=company_id)

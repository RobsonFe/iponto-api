from rest_framework import generics, permissions
from rest_framework.response import Response
from api.model.employee_model import Employee
from api.permissions.permissions import IsMasterUser
from api.serializers.employee_transferer_serializer import EmployeeTransferSerializer
from api.swagger.employee_mixin_swagger import EmployeeTransferSwaggerMixin



class EmployeeTransferView(EmployeeTransferSwaggerMixin,generics.UpdateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeTransferSerializer
    permission_classes = [permissions.IsAuthenticated, IsMasterUser]
    lookup_field = 'id'  # Usamos o UUID do Employee
    
    def patch(self, request, *args, **kwargs):
        employee = self.get_object()
        
        # Obtém a empresa atual para incluir na resposta
        old_company_id = employee.company.id
        
        serializer = self.get_serializer(employee, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        return Response({
            'message': 'Funcionário transferido com sucesso',
            'employee_id': str(employee.id),
            'employee_username': employee.user.username,
            'employee_name': employee.user.name,
            'employee_email': employee.user.email,
            'employee_cpf': employee.user.cpf,
            'old_company_id': str(old_company_id),
            'new_company_id': str(employee.company.id)
        })
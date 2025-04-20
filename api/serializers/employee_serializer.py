from rest_framework import serializers
from api.model.Customuser import CustomUser
from api.model.employee_model import Employee
from api.model.company_model import Company
from django.db import transaction

class EmployeeUserSerializer(serializers.ModelSerializer):
    nome = serializers.CharField(required=True)
    phone = serializers.CharField(required=True)
    linkedin = serializers.URLField(required=False, allow_blank=True, allow_null=True)
    endereco = serializers.JSONField(required=False, default=dict)
    company_id = serializers.UUIDField(required=True)
    
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'password', 'email', 'name', 'cpf', 'nome', 
                  'phone', 'linkedin', 'endereco', 'company_id')
        extra_kwargs = {'password': {'write_only': True}}
        
    @transaction.atomic
    def create(self, validated_data):
        # Extrair dados do funcionário
        company_id = validated_data.pop('company_id')
        employee_data = {
            'nome': validated_data.pop('nome'),
            'cpf': validated_data.get('cpf'), 
            'email': validated_data.get('email'),  
            'phone': validated_data.pop('phone'),
            'linkedin': validated_data.pop('linkedin', None),
            'endereco': validated_data.pop('endereco', {}),
        }
        
        # Verificar se a empresa existe
        try:
            company = Company.objects.get(id=company_id)
        except Company.DoesNotExist:
            raise serializers.ValidationError({"company_id": "Empresa não encontrada"})
        
        # Criar o usuário
        user = CustomUser.objects.create_employee_user(**validated_data)
        
        # Criar o funcionário associado ao usuário e à empresa
        Employee.objects.create(user=user, company=company, **employee_data)
        
        return user
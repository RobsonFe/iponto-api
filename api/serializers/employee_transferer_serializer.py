from rest_framework import serializers
from api.model.company_model import Company

class EmployeeTransferSerializer(serializers.Serializer):
    company_id = serializers.UUIDField(required=True)
    
    def validate_company_id(self, value):
        try:
            company = Company.objects.get(id=value)
        except Company.DoesNotExist:
            raise serializers.ValidationError("Empresa de destino não encontrada")
        return value
        
    def update(self, instance, validated_data):
        company_id = validated_data.get('company_id')
        try:
            company = Company.objects.get(id=company_id)
            
            # Atualiza a empresa do funcionário
            instance.company = company
            instance.save()
            
            return instance
        except Company.DoesNotExist:
            raise serializers.ValidationError({"company_id": "Empresa de destino não encontrada"})
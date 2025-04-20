from rest_framework import serializers
from api.model.employee_model import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')
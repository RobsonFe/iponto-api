from rest_framework import serializers
from api.model.company_model import Company


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')
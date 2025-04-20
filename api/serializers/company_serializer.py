from rest_framework import serializers
from api.model.Customuser import CustomUser
from api.model.company_model import Company
from django.db import transaction

class CompanyUserSerializer(serializers.ModelSerializer):
    nome = serializers.CharField(required=True)
    cnpj = serializers.CharField(required=True)
    phone = serializers.CharField(required=True)
    site = serializers.URLField(required=False, allow_blank=True, allow_null=True)
    endereco = serializers.JSONField(required=False, default=dict)
    
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'password', 'email', 'name', 'cpf', 'nome', 
                  'cnpj', 'phone', 'site', 'endereco')
        extra_kwargs = {'password': {'write_only': True}}
        
    @transaction.atomic
    def create(self, validated_data):
        # Extrair dados da empresa
        company_data = {
            'nome': validated_data.pop('nome'),
            'cnpj': validated_data.pop('cnpj'),
            'email': validated_data.get('email'), 
            'phone': validated_data.pop('phone'),
            'site': validated_data.pop('site', None),
            'endereco': validated_data.pop('endereco', {})
        }
        
        # Criar o usuário
        user = CustomUser.objects.create_company_user(**validated_data)
        
        # Criar a empresa associada ao usuário
        Company.objects.create(user=user, **company_data)
        
        return user
        
    def update(self, instance, validated_data):
        company_data = {}
        if 'nome' in validated_data:
            company_data['nome'] = validated_data.pop('nome')
        if 'cnpj' in validated_data:
            company_data['cnpj'] = validated_data.pop('cnpj')
        if 'phone' in validated_data:
            company_data['phone'] = validated_data.pop('phone')
        if 'site' in validated_data:
            company_data['site'] = validated_data.pop('site')
        if 'endereco' in validated_data:
            company_data['endereco'] = validated_data.pop('endereco')
            
        # Atualizar usuário
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
            
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
            
        instance.save()
        
        # Atualizar empresa
        if company_data and hasattr(instance, 'company_profile'):
            for attr, value in company_data.items():
                setattr(instance.company_profile, attr, value)
            instance.company_profile.save()
            
        return instance
from rest_framework import serializers
from api.model.Customuser import CustomUser
from api.model.company_model import Company
from django.db import transaction

class CompanyUserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    cnpj = serializers.CharField(required=True)
    phone = serializers.CharField(required=True, write_only=True)
    site = serializers.URLField(required=False, allow_blank=True, allow_null=True, write_only=True)
    endereco = serializers.JSONField(required=False, default=dict, write_only=True)
    
    company_id = serializers.SerializerMethodField(read_only=True)
    company_phone = serializers.SerializerMethodField(read_only=True)
    company_site = serializers.SerializerMethodField(read_only=True)
    company_endereco = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'password', 'email', 'name', 'cnpj',
                 'phone', 'site', 'endereco','company_id','company_phone', 'company_site', 'company_endereco')
        extra_kwargs = {'password': {'write_only': True}}
        
    def get_company_id(self, obj):
        if hasattr(obj, 'company_profile'):
            return str(obj.company_profile.id)
        return None
    
    def get_company_phone(self, obj):
        if hasattr(obj, 'company_profile'):
            return obj.company_profile.phone
        return None
    
    def get_company_site(self, obj):
        if hasattr(obj, 'company_profile'):
            return obj.company_profile.site
        return None
    
    def get_company_endereco(self, obj):
        if hasattr(obj, 'company_profile'):
            return obj.company_profile.endereco
        return {}
        
    @transaction.atomic
    def create(self, validated_data):
        # Extrair dados da empresa
        company_data = {
            'cnpj': validated_data.pop('cnpj'),
            'phone': validated_data.pop('phone'),
            'site': validated_data.pop('site', None),
            'endereco': validated_data.pop('endereco', {})
        }
        
        cnpj = company_data['cnpj'] # Dado obrigatório para empresas
        user = CustomUser.objects.create_company_user(
            username=validated_data.get('username'),
            name=validated_data.get('name'),
            email=validated_data.get('email'),
            password=validated_data.get('password'),
            cnpj=cnpj
        )
        
        # Criar a empresa associada ao usuário
        Company.objects.create(user=user, **company_data)
        
        return user
        
    def update(self, instance, validated_data):
        company_data = {}
        
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
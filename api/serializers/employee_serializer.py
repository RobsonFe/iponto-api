from rest_framework import serializers
from api.model.customuser import CustomUser
from api.model.employee_model import Employee
from api.model.company_model import Company
from django.db import transaction


class EmployeeUserSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(required=True, write_only=True)
    linkedin = serializers.URLField(
        required=False, allow_blank=True, allow_null=True, write_only=True
    )
    endereco = serializers.JSONField(required=False, default=dict, write_only=True)
    company_id = serializers.UUIDField(required=True, write_only=True)

    employee_id = serializers.SerializerMethodField(read_only=True)
    employee_phone = serializers.SerializerMethodField(read_only=True)
    employee_linkedin = serializers.SerializerMethodField(read_only=True)
    employee_endereco = serializers.SerializerMethodField(read_only=True)
    employee_company_id = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        fields = (
            "id",
            "username",
            "password",
            "email",
            "name",
            "cpf",
            "date_joined", 
            "created_at", 
            "phone",
            "linkedin",
            "endereco",
            "company_id",
            "employee_id",
            "employee_phone",
            "employee_linkedin",
            "employee_endereco",
            "employee_company_id",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def get_employee_id(self, obj):
        if hasattr(obj, "employee_profile"):
            return str(obj.employee_profile.id)
        return None
    
    def get_employee_company_id(self, obj):
        if hasattr(obj, "employee_profile") and obj.employee_profile.company:
            return str(obj.employee_profile.company.id)
        return None
    
    def get_employee_phone(self, obj):
        if hasattr(obj, "employee_profile"):
            return obj.employee_profile.phone
        return None

    def get_employee_linkedin(self, obj):
        if hasattr(obj, "employee_profile"):
            return obj.employee_profile.linkedin
        return None

    def get_employee_endereco(self, obj):
        if hasattr(obj, "employee_profile"):
            return obj.employee_profile.endereco
        return {}

    @transaction.atomic
    def create(self, validated_data):
        # Extrair dados do funcionário
        company_id = validated_data.pop("company_id")
        employee_data = {
            "phone": validated_data.pop("phone"),
            "linkedin": validated_data.pop("linkedin", None),
            "endereco": validated_data.pop("endereco", {}),
            "company_id": company_id,
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

    def update(self, instance, validated_data):
        instance.username = validated_data.get("username", instance.username)
        instance.email = validated_data.get("email", instance.email)
        instance.name = validated_data.get("name", instance.name)
        instance.cpf = validated_data.get("cpf", instance.cpf)

        password = validated_data.get("password")
        if password:
            instance.set_password(password)

        instance.save()

        # Atualizar os dados do funcionário
        employee_profile = instance.employee_profile
        employee_profile.phone = validated_data.get("phone", employee_profile.phone)
        employee_profile.linkedin = validated_data.get(
            "linkedin", employee_profile.linkedin
        )
        employee_profile.endereco = validated_data.get(
            "endereco", employee_profile.endereco
        )

        employee_profile.save()

        return instance

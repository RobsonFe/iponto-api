from rest_framework import serializers
from api.model.Customuser import CustomUser

class MasterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ('groups', 'user_permissions')
        read_only_fields = ('id', 'date_joined', 'last_login', 'created_at', 'updated_at')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_master_user(**validated_data)
        return user
    
    
    def update(self, instance, validated_data):
        # Lidar com a senha separadamente
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)  # Usa o método apropriado para aplicar hash
        
        # Atualizar os outros campos
        instance.username = validated_data.get('username', instance.username)
        instance.name = validated_data.get('name', instance.name)
        instance.email = validated_data.get('email', instance.email)
        instance.cpf = validated_data.get('cpf', instance.cpf)
        instance.is_master = validated_data.get('is_master', instance.is_master)
        instance.is_staff = validated_data.get('is_staff', instance.is_staff)
        
        instance.save()
        return instance
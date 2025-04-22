from django.contrib import admin
from api.model.customuser import CustomUser

# Registro básico
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'name', 'email', 'cpf', 'is_staff', 'is_master', 'is_active')
    list_filter = ('is_master', 'is_staff', 'is_active')
    search_fields = ('username', 'name', 'email', 'cpf')
    readonly_fields = ('id', 'date_joined', 'last_login', 'created_at', 'updated_at')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Informações Pessoais', {'fields': ('name', 'first_name', 'last_name', 'email', 'cpf')}),
        ('Permissões', {'fields': ('is_active', 'is_staff', 'is_superuser', 'is_master')}),
        ('Datas Importantes', {'fields': ('date_joined', 'last_login', 'created_at', 'updated_at')}),
    )
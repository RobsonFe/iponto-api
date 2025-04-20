from django.contrib.auth.models import AbstractUser, BaseUserManager, Group, Permission
from django.db import models

class UserTypes:
    MASTER = 'master'
    COMPANY = 'company'
    EMPLOYEE = 'employee'
    
    CHOICES = [
        (MASTER, 'Master'),
        (COMPANY, 'Company'),
        (EMPLOYEE, 'Employee'),
    ]

class CustomUserManager(BaseUserManager):
    def create_master_user(self, username, name, email,cpf, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_master', True)
        extra_fields.setdefault('user_type', UserTypes.MASTER)
        return self._create_user(username, name, email,cpf, password, **extra_fields)

    def create_company_user(self, username, name, email, cnpj, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_company', True)
        extra_fields.setdefault('user_type', UserTypes.COMPANY)
        return self._create_user(username, name, email, cnpj, password, **extra_fields)
        
    def create_employee_user(self, username, name, email, cpf, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_employee', True)
        extra_fields.setdefault('user_type', UserTypes.EMPLOYEE)
        return self._create_user(username, name, email, cpf, password, **extra_fields)
    
    def _create_user(self, username, name, email, documento=None, password=None, **extra_fields):
        if not username:
            raise ValueError('O nome de usuário deve ser fornecido')
        
        if not name:
            raise ValueError('O nome deve ser fornecido')
        
        if not email:
            raise ValueError('O email deve ser fornecido')
        
        is_company = extra_fields.get('is_company', False)
        
        # Validação conforme o tipo de usuário
        if is_company:
            if not documento:
                raise ValueError('O CNPJ deve ser fornecido para empresas')
            cnpj = documento
            cpf = None
        else:
            if not documento:
                raise ValueError('O CPF deve ser fornecido')
            cpf = documento
            cnpj = None
        
        # Dividir o nome completo em partes
        name_parts = name.split()
        
        # Atribuir primeiro nome
        first_name = name_parts[0] if name_parts else ""
        
        # Atribuir último nome (pode ser vazio se o nome tiver apenas uma parte)
        last_name = " ".join(name_parts[1:]) if len(name_parts) > 1 else ""
        
        email = self.normalize_email(email)
        user = self.model(
            username=username,
            name=name, 
            email=email, 
            cpf=cpf,
            cnpj=cnpj, 
            first_name=first_name, 
            last_name=last_name,
            **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

class CustomUser(AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    cpf = models.CharField(max_length=11, unique=True, null=True, blank=True)
    cnpj = models.CharField(max_length=14, unique=True, null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_master = models.BooleanField(default=False)
    is_company = models.BooleanField(default=False)
    is_employee = models.BooleanField(default=False)
    user_type = models.CharField(
        max_length=10,
        choices=UserTypes.CHOICES,
        default=None,
        null=True,
        blank=True
    )
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    groups = models.ManyToManyField(
        Group,
        verbose_name='grupos',
        blank=True,
        related_name='customuser_set',  
        related_query_name='customuser',
        help_text='Os grupos aos quais este usuário pertence. Um usuário receberá todas as permissões concedidas a cada um de seus grupos.',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name='user permissions',
        blank=True,
        related_name='customuser_set', 
        related_query_name='customuser',
        help_text='As permissões específicas concedidas a este usuário.',
    )

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['name', 'cpf', 'email']

    objects = CustomUserManager()

    def __str__(self):
        return f'{self.username} - {self.name} - {self.email} - {self.cpf}'
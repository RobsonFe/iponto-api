from django.db import models
from django.contrib.postgres.fields import JSONField
import uuid
from api.model.Customuser import CustomUser

class Company(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        CustomUser, 
        on_delete=models.CASCADE,
        related_name='company_profile'
    )
    nome = models.CharField(max_length=255)
    cnpj = models.CharField(max_length=20, unique=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    site = models.URLField(max_length=255, null=True, blank=True)
    endereco = models.JSONField(
        default=dict, blank=True, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Companies"

    def __str__(self):
        return self.nome
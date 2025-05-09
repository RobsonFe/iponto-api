from django.db import models
import uuid
from api.model.company_model import Company
from api.model.customuser import CustomUser
class Employee(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        CustomUser, 
        on_delete=models.CASCADE,
        related_name='employee_profile'
    )
    phone = models.CharField(max_length=20)
    linkedin = models.URLField(max_length=255, null=True, blank=True)
    endereco = models.JSONField(
        default=dict, blank=True, null=True
    )
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='employees'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username
import uuid
from django.db import models

# Create your models here.

class Student(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    name = models.CharField(max_length=50)
    age = models.IntegerField()
    dob = models.DateField(auto_now=False, auto_now_add=False)
    course = models.CharField(max_length=50)
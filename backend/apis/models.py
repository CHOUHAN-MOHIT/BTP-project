from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class User(User):
    phone = models.CharField(max_length=20)


class Wedding(models.Model):
    #bride details
    bride_name = models.CharField(max_length=20)
    bride_email = models.EmailField()
    bride_phone = models.CharField(max_length=20)
    #groom details
    groom_phone = models.CharField(max_length=20)
    groom_email = models.EmailField()
    groom_name = models.CharField(max_length=20)
    #demographics
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    #dates
    registration_date = models.DateField()
    wedding_date = models.DateField()
    #media
    invitation_card = models.ImageField()
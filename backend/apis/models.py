from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
import json

# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if not email:
            raise ValueError('The email must be set when creating a superuser')

        user = self.create_user(email,password=password, )
        user.is_admin = True
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255 , unique=True)
    password = models.CharField(max_length=255)
    username = None
    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class Wedding(models.Model):
  # Bride and Groom Details
  bride_name = models.CharField(max_length=20)
  bride_email = models.EmailField()
  bride_phone = models.CharField(max_length=20)
  groom_phone = models.CharField(max_length=20)
  groom_email = models.EmailField()
  groom_name = models.CharField(max_length=20)

  # Demographics
  address = models.CharField(max_length=255)
  city = models.CharField(max_length=50)
  state = models.CharField(max_length=50)

  # Dates
  registration_date = models.DateField(auto_now_add=True)  # Set automatically on creation
  wedding_date = models.DateField()

  # Media
  invitation_card = models.ImageField(upload_to='weddings/', blank=True)

  # Status
  is_verified = models.BooleanField(default=False)

  # Event Details
  events = models.TextField(blank=True, null=True)  # Store event details as JSON string

  def save(self, *args, **kwargs):
    # Preprocess event details before saving (optional)
    if self.events:
      self.events = json.dumps(self.events)  # Convert to JSON string for storage
    super().save(*args, **kwargs)
from django.contrib import admin
from .models import User , Wedding , Payment

# Register your models here.
admin.site.register(User)
admin.site.register(Wedding)
admin.site.register(Payment)
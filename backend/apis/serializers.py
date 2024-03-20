from rest_framework import serializers
from .models import Wedding , User

class WeddingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wedding
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id' , 'name' , 'email' , 'password']
        extra_kwargs = {
            'password': {'write_only':True}
        }

    def create(self , validate_data):
        password = validate_data.pop('password' , None)
        instance = self.Meta.model(**validate_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
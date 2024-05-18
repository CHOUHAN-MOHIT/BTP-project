from rest_framework import serializers
from .models import Wedding , User , Payment

class WeddingFullSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wedding
        fields = '__all__'
class WeddingShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wedding
        fields = ['id' ,'bride_name' , 'groom_name' , 'city' , 'state' , 'wedding_date' , 'invitation_card']
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

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
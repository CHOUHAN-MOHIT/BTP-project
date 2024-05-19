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

class PaymentSerializerForDashBoard(serializers.ModelSerializer):
    wedding_id = serializers.CharField(source='wedding.id', read_only=True)
    wedding_name = serializers.CharField(source='wedding.get_wedding_name', read_only=True)
    bride_name = serializers.CharField(source='wedding.bride_name', read_only=True)
    groom_name = serializers.CharField(source='wedding.groom_name', read_only=True)
    wedding_date = serializers.DateField(source='wedding.wedding_date', read_only=True)
    address = serializers.CharField(source='wedding.address', read_only=True)
    city = serializers.CharField(source='wedding.city', read_only=True)
    state = serializers.CharField(source='wedding.state', read_only=True)

    class Meta:
        model = Payment
        fields = ['amount', 'timestamp', 'status', 'wedding_id', 'wedding_name', 'bride_name', 'groom_name', 'wedding_date', 'address', 'city', 'state']

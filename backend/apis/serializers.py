from rest_framework import serializers
from .models import Wedding

class WeddingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wedding
        #excluding invitation card (image data) for now
        exclude = ('invitation_card',)

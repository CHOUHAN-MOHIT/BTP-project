from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Wedding
from .serializers import WeddingSerializer

# Create your views here.
def home(request):
    return HttpResponse("Welcome")




class WeddingListCreateView(APIView):
    def get(self, request):
        """ Get a list of all weddings """
        weddings = Wedding.objects.all()
        serializer = WeddingSerializer(weddings, many=True)
        return Response(serializer.data)

    def post(self, request):
        """ Create a new wedding """
        serializer = WeddingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

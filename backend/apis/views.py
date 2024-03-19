from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
from .serializers import UserSerializer  , WeddingSerializer
from .models import User , Wedding
import jwt , datetime

# Create your views here.
class RegisterView(APIView):
    def post(self , request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found')
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrrect Password')
        
        payload = {
            'id' : user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload , 'secret' , algorithm='HS256')

        response = Response()
        response.set_cookie(key='jwt' , value=token, httponly=True)
        response.data = {
            'jwt' : token
        }
        return response

class UserView(APIView):
    def get(self , request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed("UnAuthenticated")
        
        try:
            payload = jwt.decode(token , 'secret' , algorithms='HS256')
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Invailid Token")

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)


class LogoutView(APIView):
    def post(self , request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message':'success'
        }
        return response

class WeddingListCreateView(APIView):
    def get(self, request):
        """ Get a list of all weddings """
        weddings = Wedding.objects.all()
        serializer = WeddingSerializer(weddings, many=True)
        return Response(serializer.data)

    def post(self, request):
        """ Create a new wedding """
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed("UnAuthenticated")
        
        try:
            payload = jwt.decode(token , 'secret' , algorithms='HS256')
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Invailid Token")
        print(request.data)
        serializer = WeddingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

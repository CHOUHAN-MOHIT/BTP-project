from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
from .serializers import UserSerializer  , WeddingFullSerializer , WeddingShortSerializer , PaymentSerializer
from .models import User , Wedding
import jwt , datetime , json
import razorpay
from django.conf import settings
from django.views import View
from .models import Wedding, Payment
from django.shortcuts import get_object_or_404 , render, redirect

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

        token = jwt.encode(payload , settings.SECRET_KEY, algorithm='HS256')

        response = Response()
        response.set_cookie(key='jwt' , value=token, httponly=True)
        response.data = {
            'jwt' : token
        }
        return response

class UserView(APIView):
    def get(self , request):
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
    def get(self, request, wedding_id=None):
        """ Get a list of all weddings or a single wedding by ID """
        if wedding_id is not None:
            # Retrieve a single wedding by ID
            wedding = get_object_or_404(Wedding, id=wedding_id)
            serializer = WeddingFullSerializer(wedding)
            return Response(serializer.data)
        
        # Retrieve a list of all weddings
        weddings = Wedding.objects.all()
        serializer = WeddingShortSerializer(weddings, many=True)
        return Response(serializer.data)

    def post(self, request):
        """ Create a new wedding """
        serializer = WeddingFullSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

razorpay_client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

import jwt
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import User

class CreateOrderView(APIView):
    @method_decorator(csrf_exempt)
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed("Unauthenticated")

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Invalid token")

        try:
            user = User.objects.get(id=payload['id'])
        except User.DoesNotExist:
            raise AuthenticationFailed("User not found")

        wedding_id = request.data.get('wedding_id')
        amount = request.data.get('amount')
        
        try:
            wedding = Wedding.objects.get(id=wedding_id)
        except Wedding.DoesNotExist:
            return Response({'error': 'Wedding not found'}, status=status.HTTP_404_NOT_FOUND)

        # Create a Razorpay order
        razorpay_order = razorpay_client.order.create({
            'amount': int(amount) * 100,  # Razorpay amount is in paisa
            'currency': 'INR',
            'payment_capture': '1'  # Auto-capture payment
        })
        
        # Create Payment record
        payment = Payment.objects.create(
            user=user,
            wedding=wedding,
            amount=amount,
            razorpay_order_id=razorpay_order['id'],
            status='pending',
        )

        return Response({
            'order_id': razorpay_order['id'],
            'amount': razorpay_order['amount'],
            'currency': razorpay_order['currency'],
            'key': settings.RAZORPAY_KEY_ID,
            'name': 'Wedding Payment',
            'description': f'Payment for {wedding.get_wedding_name()}',
            'notes': {
                'wedding_id': wedding_id
            }
        })


class PaymentSuccessView(APIView):
    def post(self, request, *args, **kwargs):
        payment_id = request.data.get('razorpay_payment_id')
        order_id = request.data.get('razorpay_order_id')
        signature = request.data.get('razorpay_signature')

        try:
            payment = Payment.objects.get(razorpay_order_id=order_id)
            payment.status = 'succeeded'
            payment.save()
            return Response({'status': 'Payment successful'})
        except Payment.DoesNotExist:
            return Response({'status': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)

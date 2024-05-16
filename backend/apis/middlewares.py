import jwt
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from django.shortcuts import redirect
from datetime import datetime

class JWTMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        if request.path.startswith('/api/'):  # Only check JWT for API endpoints
            token = request.COOKIES.get('jwt')

            if not token:
                raise AuthenticationFailed("Unauthenticated")

            try:
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            except jwt.ExpiredSignatureError:
                raise AuthenticationFailed("Invalid token")

            # Check if token has expired
            if datetime.utcnow() > datetime.fromtimestamp(payload['exp']):
                raise AuthenticationFailed("Token has expired")

        return response

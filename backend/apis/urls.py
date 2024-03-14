from django.urls import path
from . import views

urlpatterns = [
    path('csrf_cookie/', views.GetCSRFToken.as_view(), name='csrf_cookie'),
    path('registration/', views.RegistrationView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('user/', views.UserDetailView.as_view(), name='user_detail'),
    # path('activate/', ActivationConfirm.as_view(), name='activation_confirm'),
    # path('checkauth/', CheckAuthenticatedView.as_view(), name='check_auth'),
    # path('change_password/', ChangePasswordView.as_view(), name='change_password'),
    # path('delete/', DeleteAccountView.as_view(), name='user_delete'),
    # path('activate/<str:uid>/<str:token>/', ActivateView.as_view(), name='activate'),
    # path('reset_password/', ResetPasswordEmailView.as_view(), name='reset_password_email'),
    # path('reset_password/<str:uid>/<str:token>/', ResetPasswordView.as_view(), name='reset_password'),
    # path('reset_password_confirm/', ResetPasswordConfirmView.as_view(), name='reset_password_confirm'),
    path('weddings/', views.WeddingListCreateView.as_view()),
]
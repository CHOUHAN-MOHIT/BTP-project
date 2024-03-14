from django.urls import path
from . import views

urlpatterns = [
    path('account/csrf_cookie/', views.GetCSRFToken.as_view(), name='csrf_cookie'),
    path('account/registration/', views.RegistrationView.as_view(), name='register'),
    path('account/login/', views.LoginView.as_view(), name='login'),
    path('account/logout/', views.LogoutView.as_view(), name='logout'),
    path('account/user/', views.UserDetailView.as_view(), name='user_detail'),
    # path('account/activate/', ActivationConfirm.as_view(), name='activation_confirm'),
    # path('account/checkauth/', CheckAuthenticatedView.as_view(), name='check_auth'),
    # path('account/change_password/', ChangePasswordView.as_view(), name='change_password'),
    # path('account/delete/', DeleteAccountView.as_view(), name='user_delete'),
    # path('account/activate/<str:uid>/<str:token>/', ActivateView.as_view(), name='activate'),
    # path('account/reset_password/', ResetPasswordEmailView.as_view(), name='reset_password_email'),
    # path('account/reset_password/<str:uid>/<str:token>/', ResetPasswordView.as_view(), name='reset_password'),
    # path('account/reset_password_confirm/', ResetPasswordConfirmView.as_view(), name='reset_password_confirm'),
    path('weddings/', views.WeddingListCreateView.as_view()),
]
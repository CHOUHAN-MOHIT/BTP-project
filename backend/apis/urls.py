from django.urls import path
from . import views

urlpatterns = [
    path('register' , views.RegisterView.as_view() , name="register" ),
    path('login' , views.LoginView.as_view() , name="login" ),
    path('user' , views.UserView.as_view() , name="user" ),
    path('logout' , views.LogoutView.as_view() , name="logout" ),
    path('weddings/', views.WeddingListCreateView.as_view()),
    path('weddings/<int:wedding_id>/', views.WeddingListCreateView.as_view(), name='wedding-detail'),
    path('create_order/', views.CreateOrderView.as_view(), name='create_order'),
    path('payment_success/', views.PaymentSuccessView.as_view(), name='payment_success'),
]
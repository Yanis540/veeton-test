from django.urls import path
# This line of code is importing a specific function called `<nameOfFunction>` from the `views` module
# in the current package or directory. This function is then used as a view for a specific URL pattern
# in Django.
from .views import basic,create_user,get_user,get_chat_with_messages,create_chat,send_message
urlpatterns = [
    path('',basic),
    path('user/create',create_user),
    path('user/get',get_user),
    path('chat/get',get_chat_with_messages),
    path('chat/create',create_chat),
    path('chat/send/message',send_message),
]
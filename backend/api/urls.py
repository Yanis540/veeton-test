from django.urls import path
# This line of code is importing a specific function called `<nameOfFunction>` from the `views` module
# in the current package or directory. This function is then used as a view for a specific URL pattern
# in Django.
from .views import basic
urlpatterns = [
    path('',basic)
]
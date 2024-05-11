from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from rest_framework import serializers,status
# Create your views here.
@api_view(['GET','POST'])# <==array
def basic(req): 
    res = {"message":"hello there"}
    return  Response(data=res,status=status.HTTP_201_CREATED)
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from rest_framework import serializers,status
from .serializer import UserSerializer,MessageSerializer
from .models import User,Message,Chat

# Create your views here.
@api_view(['GET','POST'])# <==array
def basic(req): 
    res = {"message":"hello there"}
    return  Response(data=res,status=status.HTTP_201_CREATED)
@api_view(['POST'])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_user(request):
    user_id = request.query_params.get('id')
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = UserSerializer(user)
    return Response({'user':serializer.data})
@api_view(['POST'])
def send_message(request):
    content = request.data.get('content')
    user_id = request.data.get('user_id')
    chat_id = request.data.get('chat_id')
    if content is None or user_id is None or chat_id is None: 
        return Response({'message': 'Content or user ID is missing'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    try:
        chat = Chat.objects.get(id=chat_id)
    except Chat.DoesNotExist:
        return Response({'message': 'Chat not found'}, status=status.HTTP_404_NOT_FOUND)
        
    message = Message(content=content, user=user,chat = chat)
    message.save()
    message_info = {
        'id': message.id,
        'content': message.content,
        'created_at': message.created_at,
        'user':{
            'id': message.user.id,
            'name': message.user.name
        }
    }
    # serializer = MessageSerializer(message, many=False)
    return Response({'message':message_info},status=status.HTTP_201_CREATED)
    # return Response({'message': 'Message sent successfully',}, status=status.HTTP_201_CREATED)
    
    
@api_view(['POST'])
def create_chat(request):
    chat = Chat.objects.create()
    return Response({'chat_id': chat.id}, status=status.HTTP_201_CREATED)
@api_view(['GET'])
def get_chat_with_messages(request):
    chat_id = request.query_params.get('id')
    if chat_id is None:
        return Response({'message': 'Chat ID is missing'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        chat = Chat.objects.get(id=chat_id)
    except Chat.DoesNotExist:
        return Response({'message': 'Chat not found'}, status=status.HTTP_404_NOT_FOUND)
    
    messages = Message.objects.filter(chat=chat)
    message_data = []
    for message in messages:
        message_info = {
            'id': message.id,
            'content': message.content,
            'created_at': message.created_at,
            'user':{
                'id': message.user.id,
                'name': message.user.name
            }
        }
        message_data.append(message_info)
    return Response({'chat_id':chat.id,'messages':message_data})
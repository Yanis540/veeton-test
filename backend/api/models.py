from django.db import models
from django.utils import timezone

# Create your models here.
class Chat(models.Model):
    id = models.AutoField(primary_key=True)
    def __str__(self):
        return self.id
class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    def __str__(self):
        return self.id
    
class Message(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')
    created_at = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return self.id
from django.db import models
import re


class UserManager(models.Manager):
    ######################## REGISTER
    def register_validator(self, postData):
        errors = {}
        if len(postData['first_name']) < 2 or len(postData['last_name']) < 2:
            errors["first_name"] = "First name & last name should be at least 2 characters"
        EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
        if not EMAIL_REGEX.match(postData['email']):
            errors['email'] = "Invalid email address!"
        if len(postData['password']) < 8:
            errors["password"] = "Password should be at least 8 characters"
        if len(postData['password']) != len(postData['confirm_pw']):
            errors['confirm_pw'] = "Password confirmation needs to match"
        return errors
    ######################## LOGIN 
    def login_validator(self, context):
        errors = {}
        if not context['email']:
            errors['email'] = "Invalid email address!"
        if not context['password']:
            errors['password'] = "Invalid Password"
        return errors


class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = UserManager()
    
class Message(models.Model):
    message = models.TextField()
    user = models.ForeignKey(User, related_name="messages", on_delete = models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
class Comment(models.Model):
    comment = models.TextField()
    user = models.ForeignKey(User, related_name="userComments", on_delete = models.CASCADE)
    message = models.ForeignKey(Message, related_name="messageComments", on_delete = models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

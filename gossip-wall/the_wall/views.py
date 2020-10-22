from django.shortcuts import render, HttpResponse, redirect
from django.contrib import messages
from .models import User, Comment, Message
import bcrypt


######################################### LOGIN/REGISTER AREA ######################################
# HOME PAGE

def index(request):
    return render(request, "login.html")

# LOGIN AREA


def login(request):
    userEmail = User.objects.filter(email=request.POST['email'])
    print(request.POST)
    pass1 = False
    emai1 = False

    if userEmail:
        emai1 = True
        logged_user = userEmail[0]
        password_check = bcrypt.checkpw(
            request.POST['password'].encode(), logged_user.password.encode())
        if password_check:
            pass1 = True
            request.session['userid'] = logged_user.id
            request.session['login'] = True
            print(request.session['userid'])
            return redirect('/wall')

    context = {
        'password': pass1,
        'email': emai1
    }
    errors = User.objects.login_validator(context)
    if len(errors) > 0:
        for key, val in errors.items():
            messages.error(request, val)

    return redirect('/')

# REGISTRATION AREA


def register(request):
    errors = User.objects.register_validator(request.POST)
    print(request.POST)
    if len(errors) > 0:
        for key, val in errors.items():
            messages.error(request, val)
    else:
        password = request.POST['password']
        pw_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
        print(pw_hash)
        registered_user = User.objects.create(
            first_name=request.POST['first_name'], last_name=request.POST['last_name'], email=request.POST['email'], password=pw_hash)
        request.session['userid'] = registered_user.id
        request.session['register'] = True
        request.session['login'] = True
        return redirect('/wall')
    return redirect('/')

# SUCCESS PAGE AREA


def success(request):
    print(request.session['login'])
    user_id = request.session['userid']
    if request.session['login'] == True:
        context = {
            'user': User.objects.get(id=user_id),
            'login': 'logged in'
        }
    elif request.session['register'] == True:
        context = {
            'user': User.objects.get(id=user_id),
            'register': 'registered'
        }

    return render(request, "success.html", context)

# LOGOUT FUNCTION


def logout(request):
    request.session['userid'] = None
    request.session['register'] = False
    request.session['login'] = False
    
    print(request.session['userid'])
    print(request.session['register'])
    print(request.session['login'])
    return redirect('/')


######################################### WALL AREA ######################################


def wall(request):
    print(request.session['login'])
    user_id = request.session['userid']
    if request.session['login'] == True:
        context = {
            'user': User.objects.get(id=user_id),
            'all_user': User.objects.all(),
            'cmt': Comment.objects.all(),
            "msg": Message.objects.all(),
        }
    elif request.session['register'] == True:
        context = {
            'user': User.objects.get(id=user_id),
            'all_user': User.objects.all(),
            'cmt': Comment.objects.all(),
            "msg": Message.objects.all(),
        }
    else:
        return redirect('/')

    return render(request, "wall.html", context)

# Post - Post messages - add to database


def message(request):
    user_id = int(request.POST['which_form'])
    msg_from_form = request.POST['message_form']
    user_from_form = User.objects.get(id=user_id)
    if msg_from_form == "":
        return redirect('/wall')
    else:
        Message.objects.create(message=msg_from_form, user=user_from_form)
        print(request.POST)
        return redirect('/wall')

# Post - Post comments - add to database


def comment(request):
    cmt_from_form = request.POST['comment_form']
    msg_from_form = Message.objects.get(id=int(request.POST['which_form']))
    user_from_form = User.objects.get(id=request.session['userid'])
    if cmt_from_form == "":
        return redirect('/wall')
    else:
        Comment.objects.create(comment=cmt_from_form, message=msg_from_form, user=user_from_form)
        print(user_from_form.id)
        print(user_from_form.id)
        print(request.POST)
        return redirect('/wall')
# Get - Redirect to the Wall HTML page after login or registering

def delete(request, id, typeid, label):
    user_id = typeid
    this_id = id
    log_user = request.session['userid']
    
    if log_user == user_id:
        print(id)
        print(typeid)
        print(request.session['userid'])
        print(label)
        if label == "msg":
            Message.objects.get(id=this_id).delete()
        elif label == "cmt":
            Comment.objects.get(id=this_id).delete()
    
    print(request.POST)
    
    return redirect('/wall')
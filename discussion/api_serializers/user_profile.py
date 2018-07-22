import os
import django
from django.utils import timezone

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Quora.settings")
django.setup()

from rest_framework import serializers,routers,viewsets
from discussion.models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["id","username","first_name","last_name","email"]


class ProfileSerializer(serializers.ModelSerializer):
    user=UserSerializer()
    class Meta:
        model=Author
        fields=["id","rating","location","description","user"]


################################# Simple Question Anwer Data ###############################
class UserQuestions(serializers.ModelSerializer):
    class Meta:
        model=Question
        fields="__all__"

class AnswersPerQuestion(serializers.ModelSerializer):
    class Meta:
        model=Answer
        fields="__all__"
###########################################################################################







################################# Question Asswer Detail Json ############################

class QuestionDetailSerializer(serializers.ModelSerializer):
    author=ProfileSerializer()
    class Meta:
        model=Question
        fields=["id","author","title","description","time"]

class AnswerDetailSerializer(serializers.ModelSerializer):
    author=ProfileSerializer()
    question=QuestionDetailSerializer()
    class Meta:
        model=Answer
        fields=["id","author","question","description","time"]


###################################################################################

class CreateUpVote(serializers.ModelSerializer):
    class Meta:
        model=Upvote
        fields=[]
    def create(self, validated_data):
        user_id=self.context['user_id']
        author=Author.objects.get(user_id=user_id)
        answer_id=self.context['answer_id']
        answer=Answer.objects.get(id=answer_id)
        current_rating=Author.objects.filter(user_id=answer.author.user.id)[0].rating
        Author.objects.filter(user_id=answer.author.user.id).update(rating=current_rating+5)
        upvote=Upvote.objects.create(user=author,answer=answer,time=timezone.now())
        return upvote




################################# Question and Answer Creation ###############################
class CreateQuestion(serializers.ModelSerializer):
    class Meta:
        model=Question
        fields=["title","description"]
    def create(self, validated_data):
        user_id=self.context['user_id']
        author=Author.objects.get(user_id=user_id)
        question=Question.objects.create(author=author,**validated_data,time=timezone.now())
        return question

class CreateAnswer(serializers.ModelSerializer):
    class Meta:
        model=Answer
        fields=["description"]
    def create(self, validated_data):
        user_id=self.context['user_id']
        author=Author.objects.get(user_id=user_id)
        question_id = self.context['question_id']
        question=Question.objects.get(id=question_id)
        answer=Answer.objects.create(author=author,question=question,**validated_data,time=timezone.now())
        return answer



##############################################################################################

################################## User Creation #############################################

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["first_name","last_name","username","password","email"]

class ProfileCreateSerializer(serializers.ModelSerializer):
    user=UserCreateSerializer()
    class Meta:
        model=Author
        fields=["location","description","user"]

    def create(self, validated_data):
        user_data=validated_data.pop('user')
        password = user_data.pop('password')
        user=User.objects.create(**user_data)
        user.set_password(password)
        user.save()
        profile=Author.objects.create(user=user,**validated_data,rating=0)
        profile.save()
        return profile

    def update(self, instance, validated_data):
        pass

#########################################################################################
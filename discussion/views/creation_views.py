from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.generics import ListAPIView, CreateAPIView
from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

from discussion.api_serializers import *


class CreateUserView(CreateAPIView):
    serializer_class = ProfileCreateSerializer
    permission_classes = {AllowAny}
    queryset = Author.objects.all()



class CreateQuestionView(CreateAPIView):
    serializer_class = CreateQuestion
    queryset = Question.objects.all()

    def get_serializer_context(self):
        return {"user_id":self.request.user.id}


class CreateAnswerView(CreateAPIView):
    serializer_class = CreateAnswer
    queryset = Answer.objects.all()

    def get_serializer_context(self):
        return {"user_id":self.request.user.id,"question_id":self.kwargs["question_id"]}

class CreateUpVoteView(CreateAPIView):
    serializer_class = CreateUpVote
    queryset = Upvote.objects.all()
    def get_serializer_context(self):
        return{"user_id":self.request.user.id,"answer_id":self.kwargs["answer_id"]}


    pass

def dummy():
    print("reached here")

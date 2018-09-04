from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import request
from rest_framework.generics import ListAPIView
from django.shortcuts import render
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny

from discussion.api_serializers import *

class ResultsPagination(PageNumberPagination):
    page_size = 5
    page_query_param = 'page'
    max_page_size = 100


class UserProfileView(ListAPIView):
    serializer_class = ProfileSerializer
    authentication_classes = []
    permission_classes = [AllowAny]
    # lookup_field = 'pk'
    # queryset = Author.objects.all()
    def get_queryset(self):
        result=Author.objects.filter(id=self.kwargs['pk'])
        return result

class SingleUserProfileView(ListAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]
    # lookup_field = 'pk'
    # queryset = Author.objects.all()
    def get_queryset(self):
        id=self.request.user.id
        result = Author.objects.filter(user_id=id)
        return result



class UserQuestionsView(ListAPIView):
    serializer_class = QuestionDetailSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        result=Question.objects.filter(author__id=self.kwargs['author_id'])
        return result

class AnswersForQuestionView(ListAPIView):
    serializer_class = AnswerDetailSerializer
    permission_classes = [AllowAny]
    pagination_class = ResultsPagination
    def get_queryset(self):
        result=Answer.objects.filter(question__id=self.kwargs['question_id'])
        return result

class QuestionListView(ListAPIView):
    serializer_class = QuestionDetailSerializer
    permission_classes = [AllowAny]
    pagination_class = ResultsPagination
    def get_queryset(self):
        if 'search' in self.request.GET:
            result=Question.objects.filter(description__icontains=self.request.GET['search'])
        else:
            result=Question.objects.order_by('-time')
        return result


class QuestionView(ListAPIView):
    serializer_class = QuestionDetailSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        result=Question.objects.filter(id=self.kwargs['question_id'])
        return result




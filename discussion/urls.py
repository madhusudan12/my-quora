from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

from discussion.views import *

urlpatterns = [
    path('user/', SingleUserProfileView.as_view(), name='single_user_profile'),
    path('user/<int:pk>/',UserProfileView.as_view(),name='user_profile'),
    path('user/create/',CreateUserView.as_view(),name='add_user'),
    path('user/<int:author_id>/questions/', UserQuestionsView.as_view(), name='user_questions'),
    path('question/',QuestionListView.as_view(),name='question_list'),
    path('question/<int:question_id>/',QuestionView.as_view(),name='question_view'),
    path('question/<int:question_id>/answers/',AnswersForQuestionView.as_view(),name='Question_answers'),
    path('question/create/',CreateQuestionView.as_view(),name='add_question'),
    path('answer/create/<int:question_id>/',CreateAnswerView.as_view(),name='add_answer'),
    path('upvote/answer/<int:answer_id>/',CreateUpVoteView.as_view(),name='add_apvote'),
]

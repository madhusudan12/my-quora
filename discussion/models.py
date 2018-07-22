from django.contrib.auth.models import User
from django.db import models
from django.db.models import CASCADE


class Author(models.Model):
    rating=models.IntegerField()
    user=models.OneToOneField(User,on_delete=CASCADE)
    location=models.CharField(max_length=32)
    description=models.CharField(max_length=256)

    def __str__(self):
        return self.user.username

class Question(models.Model):
    author=models.ForeignKey(Author,on_delete=CASCADE)
    title=models.CharField(max_length=1024)
    description=models.CharField(max_length=8192)
    time=models.DateTimeField()

    def __str__(self):
        return self.description

class Answer(models.Model):
    author=models.ForeignKey(Author,on_delete=CASCADE)
    question=models.ForeignKey(Question,on_delete=CASCADE)
    description=models.CharField(max_length=16384)
    time=models.DateTimeField()

    def __str__(self):
        return self.description


class Upvote(models.Model):
    user=models.ForeignKey(Author,on_delete=CASCADE)
    #question=models.ForeignKey(Question,on_delete=CASCADE)
    answer=models.ForeignKey(Answer,on_delete=CASCADE)
    time=models.DateTimeField()

    def __str__(self):
        return self.user.answer.description


class Tag(models.Model):
    question=models.ForeignKey(Question,on_delete=CASCADE)
    tag=models.CharField(max_length=64)

    def __str__(self):
        return self.tag




# Create your models here.

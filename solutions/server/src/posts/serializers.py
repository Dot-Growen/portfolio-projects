from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    is_author = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = (
            "title",
            "description",
            "content",
            "thumbnail",
            "slug",
            "updated_at",
            "created_at",
            "is_author",
            "user",
            "problem",
            "tags"
        )
    def get_is_author(self, obj):
        request = self.context["request"]
        if request.user:
            return request.user == obj.user
        return False

class PostCreateSerializer(serializers.ModelSerializer):
    tags = serializers.CharField(required=False)
    thumbnail = serializers.ImageField(required=False)
    problem = serializers.CharField(required=False)
    class Meta:
        model = Post
        fields = (
            "title",
            "description",
            "content",
            "thumbnail",
            "problem",
            "tags",
        )


class PostUpdateSerializer(serializers.ModelSerializer):
    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False)
    content = serializers.CharField(required=False)
    thumbnail = serializers.ImageField(required=False)
    problem = serializers.CharField(required=False)
    content = serializers.CharField(required=False)
    tags = serializers.CharField(required=False)

    class Meta:
        model = Post
        fields = (
            "title",
            "description",
            "content",
            "thumbnail",
            "problem",
            "tags"
        )

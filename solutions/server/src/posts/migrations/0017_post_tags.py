# Generated by Django 3.1.1 on 2020-10-02 22:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0016_post_problem'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='tags',
            field=models.CharField(default='tag', max_length=100),
            preserve_default=False,
        ),
    ]

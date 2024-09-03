---
title: "Projects"
permalink: /projects/
layout: single
classes: wide
---

{% for project in site.data.projects %}
### [{{ project.title }}]({{ project.url }})

{{ project.description }}

{% endfor %}

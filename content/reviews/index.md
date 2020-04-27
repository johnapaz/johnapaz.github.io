---
layout: page
title: Reviews
image: assets/images/goat-heads-beach.jpg
permalink: /reviews/
categories: reviews
---

{% for collection in site.collections %}
  <h2>Items from {{ collection.reviews }}</h2>
  <ul>
    {% for item in site[collection.reviews] %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
    {% endfor %}
  </ul>
{% endfor %}
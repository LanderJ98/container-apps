#!/usr/bin/env bash
cd app
flask db upgrade
gunicorn --bind 0.0.0.0:5000 -w 4 wsgi:app
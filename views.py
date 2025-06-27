from django.http import HttpResponse
from django.shortcuts import render
from project import house
import joblib


def index(request):
    return render(request, 'index.html')

  
    


def analysis(request):
  
    predicted_price = None
    if request.method == 'POST':
        bedrooms = int(request.POST['bedrooms'])
        bathrooms = int(request.POST['bathrooms'])
        sqft_living = int(request.POST['sqft_living'])

        # Load model
        model = joblib.load('house_price_model.pkl')
        new_data = [[bedrooms, bathrooms, sqft_living]]
        predicted_price = model.predict(new_data)[0]

    return render(request, 'analysis.html', {'predicted_price': predicted_price})


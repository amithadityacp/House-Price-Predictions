import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

def house(bedrooms, bathrooms, sqft_living):
    data = pd.read_csv("data.csv")
    
    
    # Separate features (X) and target (y)
    X = data[['bedrooms','bathrooms','sqft_living']] # Features
    y = data["price"]  # Target

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize the Linear Regression model
    model = LinearRegression()

# Train the model
    model.fit(X_train, y_train)

# Make predictions on the test set
    y_pred = model.predict(X_test)

# Evaluate the model
# mse = mean_squared_error(y_test, y_pred)
# r2 = r2_score(y_test, y_pred)

# print("\nModel Evaluation:",y_pred)
# print(f"Mean Squared Error (MSE): {mse}")
# print(f"R-squared (R2): {r2}")

# Predict the price of a new house

 # Example: 1600 sqft, 3 bedrooms, 2 bathrooms, 4 years old
    new_house = [[bedrooms, bathrooms, sqft_living]]
    predicted_price = model.predict(new_house)
    return predicted_price[0]
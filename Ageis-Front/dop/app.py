import pandas as pd
from flask import Flask, request, render_template, jsonify
import json

# Initialize Flask app
app = Flask(__name__)

# Load data from JSON file
with open(r'C:\Users\NEHA SREE\Desktop\Ageis-Front\Ageis-Front\dop\data.json', 'r') as file:
    data = json.load(file)

# Convert JSON data to pandas DataFrame
athletes_df = pd.DataFrame(data)

def get_athlete_data(name):
    """
    Fetches the athlete's data by name from the dataset.
    """
    athlete = athletes_df[athletes_df['AthleteName'].str.lower() == name.lower()]
    if athlete.empty:
        return None
    return athlete.iloc[0]

def analyze_medical_reports(medical_reports):
    """
    Analyze medical test reports and summarize abnormal statuses.
    """
    abnormal_tests = [test for test in medical_reports if test['status'] == 'Abnormal']
    return {
        "total_tests": len(medical_reports),
        "abnormal_count": len(abnormal_tests),
        "details": abnormal_tests
    }

def analyze_financial_transactions(transactions):
    """
    Summarize suspicious transactions.
    """
    suspicious_transactions = [
        txn for txn in transactions['TransactionHistory'] if txn['suspicious']
    ]
    return {
        "total_transactions": len(transactions['TransactionHistory']),
        "suspicious_count": len(suspicious_transactions),
        "details": suspicious_transactions
    }

def analyze_travel_history(travel_history):
    """
    Summarize flagged travel history.
    """
    flagged_travel = [trip for trip in travel_history if trip['Flagged']]
    return {
        "total_trips": len(travel_history),
        "flagged_count": len(flagged_travel),
        "details": flagged_travel
    }

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def analyze():
    athlete_name = request.form.get('athlete_name')
    athlete_data = get_athlete_data(athlete_name)
    
    if athlete_data is None:
        return jsonify({"error": "Athlete not found"}), 404

    # Analyze data
    medical_report_analysis = analyze_medical_reports(athlete_data['MedicalTestReports'])
    financial_transaction_analysis = analyze_financial_transactions(athlete_data['FinancialTransactions'])
    travel_history_analysis = analyze_travel_history(athlete_data['TravelHistory'])

    # Doping detection logic
    doping_detected = (
        medical_report_analysis['abnormal_count'] > 2 or
        financial_transaction_analysis['suspicious_count'] > 1 or
        travel_history_analysis['flagged_count'] > 1
    )

    result = "Suspicious activity detected: further investigation required for doping" if doping_detected else "Not Doped"

    # Render results
    return render_template(
        'analysis.html',
        athlete_name=athlete_data['AthleteName'],
        medical_analysis=medical_report_analysis,
        financial_analysis=financial_transaction_analysis,
        travel_analysis=travel_history_analysis,
        result=result
    )

if __name__ == '__main__':
    app.run(debug=True)

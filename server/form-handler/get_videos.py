# imports for pulling data from google sheets
from __future__ import print_function
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

# imports for updating database 
from pymongo import MongoClient
from mongo_client import mongo_client

SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

SPREADSHEET_ID = '1cln8hTKQ8OQ5V06FfMsnJFIk_qOy3VPpfLlhSL50rIk'
RANGE_NAME = 'A2:G100'

db = mongo_client["adt-portal"]
user_col = db["users"]

def main():
    """Shows basic usage of the Sheets API.
    Prints values from a sample spreadsheet.
    """
    creds = None
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'cred.json', SCOPES)
            creds = flow.run_local_server(port=0)

        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('sheets', 'v4', credentials=creds)

    sheet = service.spreadsheets()
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID,
                                range=RANGE_NAME).execute()
    values = result.get('values', [])

    if not values:
        print('No data found.')
    else:
        # print('First Name, Last Name, Year, Kerb, Link:')
        for row in values:
            if(len(row) < 6):
                continue
            
            user_col.insert_one({ "kerb": row[4], "first_name": row[1], "last_name": row[2], "year": row[4], "video_id": row[5][row[5].index('v=')+2:] })

            # print('%s, %s, %s, %s, %s' % (row[1], row[2], row[3], row[4], row[5][row[5].index('v=')+2:] ))

if __name__ == '__main__':
    main()

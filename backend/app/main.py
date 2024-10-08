from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Xero API URL (mocked)
XERO_API_URL = "http://xero-api:3000/api.xro/2.0/Reports/BalanceSheet"

@app.get("/api/balance-sheet")
async def get_balance_sheet():
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(XERO_API_URL)
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail="Failed to fetch balance sheet data")
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Internal Server Error")

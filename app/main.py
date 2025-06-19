from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from app.core import exceptions, logger
from app.api.endpoints import router as api_router
from app.core.config import settings
from app.models.db import create_db_and_tables

app = FastAPI(title="KilimoGPT", docs_url="/docs")

app.add_middleware(
    CORSMiddleware,
    #allow_origins=settings.ALLOWED_ORIGINS,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

app.add_exception_handler(HTTPException, exceptions.http_exception_handler)
app.add_exception_handler(RequestValidationError, exceptions.validation_exception_handler)
app.add_exception_handler(Exception, exceptions.generic_exception_handler)

@app.on_event("startup")
async def startup_event():
    logger.logger.info("Starting KilimoGPT")
    create_db_and_tables()

@app.on_event("shutdown")
async def shutdown_event():
    logger.logger.info("Shutting down KilimoGPT")
@app.get("/")
def read_root():
    return {"message":"Welcome to KilimoGPT API"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}
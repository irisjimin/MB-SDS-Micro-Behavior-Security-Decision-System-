from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .schemas import EventIn
from .features import summarize_session
from .risk_model import score_session

app = FastAPI(title='MB-SDS API')
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

EVENTS = []

@app.get('/health')
def health():
    return {'status': 'ok'}

@app.post('/events')
def create_event(event: EventIn):
    EVENTS.append(event.model_dump())
    return {'ok': True}

@app.get('/sessions/{session_id}')
def get_session(session_id: str):
    events = [e for e in EVENTS if e['session_id'] == session_id]
    features = summarize_session(events)
    return {
        'session_id': session_id,
        'features': features,
        'risk_score': score_session(features),
        'events': events,
    }

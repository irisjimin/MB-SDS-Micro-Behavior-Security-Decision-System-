from pydantic import BaseModel
from typing import Any

class EventIn(BaseModel):
    session_id: str
    scenario_id: str
    event_type: str
    payload: dict[str, Any] = {}

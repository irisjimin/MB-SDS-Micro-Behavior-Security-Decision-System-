def score_session(features):
    score = 0.0
    score += min(features.get('hover_time_ms', 0) / 1500, 1.0) * 0.35
    score += min(features.get('cursor_entropy', 0) / 4, 1.0) * 0.45
    score += min(features.get('move_count', 0) / 50, 1.0) * 0.20
    return round(score, 3)

import math

def summarize_session(events):
    hover_time = 0.0
    move_count = 0
    path = []
    decision = None

    for e in events:
        t = e['event_type']
        p = e.get('payload', {})
        if t == 'hover_end':
            hover_time += float(p.get('duration_ms', 0))
        elif t == 'mousemove':
            move_count += 1
            path.append((p.get('x', 0), p.get('y', 0)))
        elif t == 'decision':
            decision = p.get('choice')

    entropy = 0.0
    if len(path) > 1:
        buckets = {(round(x / 25), round(y / 25)) for x, y in path}
        entropy = math.log2(len(buckets) + 1)

    return {
        'hover_time_ms': hover_time,
        'move_count': move_count,
        'cursor_entropy': entropy,
        'decision': decision,
    }

# MB-SDS: Micro-Behavior Security Decision System

## Abstract
MB-SDS is a lightweight behavioral analytics system designed to measure pre-click user behavior in security decision-making scenarios.  
It captures fine-grained interaction signals such as hover duration, mouse movement patterns, and cursor entropy to model human hesitation in phishing-like environments.

The system consists of a React-based frontend experiment interface and a FastAPI backend for real-time behavioral event logging.

---

## Problem Statement
Traditional phishing detection systems focus on post-click or content-based analysis.  
However, **pre-click behavioral signals** (e.g., hesitation, cursor movement, attention shifts) are underutilized.

This project explores whether micro-interaction patterns can serve as predictive signals for security decision risk.

---

## System Architecture

Frontend (React)
→ Behavioral experiment UI
→ Captures:
   - hover time
   - mouse movement
   - cursor trajectory
   - decision outcome

Backend (FastAPI)
→ Event ingestion API
→ Stores structured behavioral logs
→ Computes derived features

---

## Features Extracted

- Hover Time (ms)
- Mouse Movement Count
- Cursor Path Entropy
- Decision Label (safe / risky)
- Session-based aggregation

---

## API Endpoints

- GET /health
- POST /events
- GET /sessions/{session_id}

---

## Example Scenario

Phishing-style message:

"Your account will be locked unless you verify immediately."

User behaviors are tracked before decision:
- hesitation time
- cursor instability
- movement complexity

---

## Future Work

- Logistic regression / ML-based risk scoring
- Dataset accumulation (CSV / SQLite)
- Heatmap visualization of cursor paths
- Real phishing vs benign dataset comparison

---

## Tech Stack

- React (Vite)
- FastAPI
- Python
- JavaScript
- Behavioral analytics

---

## Author Notes

This project is part of an exploration into human-centered cybersecurity signals and behavioral risk modeling.

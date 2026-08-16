# TaskMatrix – System Architecture

## Architecture Overview

TaskMatrix follows a full-stack client-server architecture.

```text
                    ┌─────────────────────┐
                    │      User           │
                    │  Browser / Mobile   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Next.js Frontend  │
                    │ React + UI + Pages  │
                    └──────────┬──────────┘
                               │
                         HTTP / REST
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Express Backend   │
                    │   REST API + Auth   │
                    └──────┬────────┬─────┘
                           │        │
                    MongoDB│        │Socket.IO
                           │        │
                           ▼        ▼
                 ┌─────────────┐  ┌──────────────┐
                 │  MongoDB    │  │ Real-Time    │
                 │  Database   │  │ Communication│
                 └─────────────┘  └──────────────┘
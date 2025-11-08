# Spicy Monorepo

This is a monorepo for the Spicy project, containing the client, server, and shared packages.

## Overview

This project is a full-stack application built with a monorepo architecture using pnpm workspaces.

-   **`packages/client`**: A Vue.js single-page application using Vite.
-   **`packages/server`**: A Node.js backend with a tRPC API, using Fastify and Firebase.
-   **`packages/shared`**: Shared types and interfaces between the client and server.
-   **`packages/workflow`**: A package for managing workflows.

## Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](httpss://nodejs.org/en/) (v18 or higher)
-   [pnpm](httpss://pnpm.io/installation)
-   [Firebase CLI](httpss://firebase.google.com/docs/cli#install-cli-mac-linux)

## Getting Started

### 1. Installation

Clone the repository and install the dependencies using `pnpm`:

```bash
git clone <repository-url>
cd spicy-monorepo
pnpm install
```

### 2. Configuration

This project requires Firebase for authentication, database, and storage.

#### Client Configuration

The client application requires a Firebase configuration to connect to your Firebase project.

1.  Create a `.env` file in the `packages/client` directory.
2.  Add your Firebase project's web app configuration to the `.env` file. You can get this from the Firebase console (`Project settings > General > Your apps > Web app`).

```env
# packages/client/.env

VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
VITE_FIREBASE_APP_ID="your-app-id"
```

#### Server Configuration

The server requires a Firebase service account to use the Firebase Admin SDK.

1.  Go to the Firebase console, select your project, and navigate to `Project settings > Service accounts`.
2.  Click on **Generate new private key** to download a JSON file with your service account credentials.
3.  Rename the downloaded file to `firebase-service-account.json`.
4.  Place this file in the `packages/server/src` directory.

**Important**: The `firebase-service-account.json` file contains sensitive information. It is included in the `.gitignore` file to prevent it from being committed to the repository.

## Running the Project

To run the entire project (Firebase emulators, server, and client), use the following command from the root of the project:

```bash
pnpm dev:all
```

This command will:

-   🔥 Start the **Firebase Emulators** for Auth, Firestore, and Storage.
-   🚀 Start the **tRPC server** in development mode.
-   💻 Launch the **Vue.js client** on a local development server.

You can also run each part of the project individually:

-   **Run Firebase Emulators**: `pnpm dev:emulators`
-   **Run the Server**: `pnpm dev:server`
-   **Run the Client**: `pnpm dev:client`
-   **Run the Workflow**: `pnpm dev:workflow`

Once everything is running, you can access the client application in your browser, usually at `https://localhost:5173`.

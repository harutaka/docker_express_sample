# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm run dev` - Start development server with hot reload using tsx
- `pnpm run build` - Compile TypeScript to JavaScript in ./dist directory  
- `pnpm start` - Run compiled application from ./dist/src/app

### Code Quality
- `pnpm run lint` - Run ESLint on src/**/*.ts and __tests__/**/*.ts
- `pnpm run prettier` - Format code using Prettier
- `pnpm run test` - Run tests using Vitest

### Docker
- `docker compose up` - Build and run application in container on port 3000
- Multi-stage Dockerfile optimizes for production with separate build, module install, and runtime stages

## Architecture

### Project Structure
- `src/app.ts` - Main application entry point with Express server setup
- `src/routes/` - Route definitions (currently only base.ts)  
- `src/handlers/` - Request handlers separated by functionality
- `src/libs/` - Utility functions and shared code
- `__tests__/` - Test files using Vitest with global test functions

### Key Patterns
- Uses ES modules (type: "module" in package.json)
- Express handlers follow RequestHandler type from express
- Routes are organized in separate files and imported into app.ts
- In-memory data storage using tempStub object for simple state
- Error handling with custom error responses and 404/500 status codes
- TypeScript compilation target is ES2022 with Node16 module resolution

### API Endpoints
Current endpoints defined in src/routes/base.ts:
- `GET /health` - Health check endpoint
- `GET /readiness` - Readiness check endpoint  
- `GET /date` - Returns current date
- `GET /score` - Returns current score from in-memory store
- `PUT /score` - Updates score in in-memory store

### Testing
- Uses Vitest with globals enabled
- Test files use .spec.ts naming convention
- Tests are located in __tests__/ directory
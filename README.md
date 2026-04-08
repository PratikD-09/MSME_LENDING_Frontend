"# MSME_LENDING_Frontend" 
# MSME Lending Decision System - Architecture Overview

## System Architecture

The MSME Lending Decision System is designed as a modular, scalable full-stack application following clean architecture principles. The system processes business and loan data to provide automated credit decisions.

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Databases     │
│   (React)       │◄──►│   (Express)     │◄──►│   PostgreSQL    │
│                 │    │                 │    │   MongoDB       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Component Breakdown

### Frontend Layer
- **Technology**: React 18 + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React hooks
- **API Communication**: Axios

**Key Components:**
- `BusinessForm`: Collects business owner and financial data
- `LoanForm`: Gathers loan application details
- `DecisionResult`: Displays approval status, credit score, and reasons

### Backend Layer
- **Technology**: Node.js + Express
- **Validation**: Joi schemas
- **Security**: Helmet, CORS, Rate limiting
- **Logging**: Morgan, Winston

**Architecture Pattern**: MVC with separation of concerns

#### Routes
- `/api/business` - Business data management
- `/api/loan` - Loan application handling
- `/api/decision` - Credit decision processing

#### Controllers
- Handle HTTP requests/responses
- Coordinate between services and models
- Error handling and response formatting

#### Services
- `decisionService`: Core credit scoring logic
- `auditService`: Logging to MongoDB

#### Models
- `businessModel`: PostgreSQL business data
- `loanModel`: PostgreSQL loan data
- `decisionModel`: PostgreSQL decision records

#### Validators
- Input validation using Joi
- Consistent error responses

### Data Layer

#### PostgreSQL (Primary Data)
- **businesses**: Owner info, PAN, business type, revenue
- **loans**: Amount, tenure, purpose
- **decisions**: Complete decision records with scores

#### MongoDB (Audit Trail)
- **audit_logs**: Action logs for compliance and debugging

## Decision Engine

The credit scoring algorithm evaluates multiple risk factors:

### Scoring Factors
1. **Revenue-to-EMI Ratio**
   - Formula: `monthlyRevenue / (loanAmount / tenureMonths)`
   - Threshold: < 3 reduces score by 30

2. **Loan-to-Revenue Ratio**
   - Formula: `loanAmount / monthlyRevenue`
   - Threshold: > 0.5 reduces score by 20

3. **Tenure Risk Assessment**
   - Short tenure (< 6 months): -15 points
   - Long tenure (> 60 months): -10 points

4. **Consistency Checks**
   - Extreme loan amounts: -50 points
   - Very low revenue: -25 points

### Scoring Logic
- Base score: 100
- Deductions based on risk factors
- Final score: max(0, min(100, calculated_score))
- Approval threshold: ≥ 60

## Security & Performance

### Security Measures
- Input validation and sanitization
- Rate limiting (100 requests/15min per IP)
- CORS configuration
- Helmet security headers
- Environment variable configuration

### Performance Considerations
- Database connection pooling
- Async/await for non-blocking operations
- Modular code for maintainability
- Error handling without exposing internals

## Deployment Architecture

### Development
- Local Docker containers for databases
- Hot reload for both frontend and backend
- Environment-specific configurations

### Production
- **Frontend**: Vercel (static hosting)
- **Backend**: Render/Railway (Node.js hosting)
- **Database**: Neon (PostgreSQL), MongoDB Atlas
- **Containerization**: Docker for consistent environments

## Scalability Considerations

### Horizontal Scaling
- Stateless backend services
- Database connection pooling
- CDN for frontend assets

### Monitoring & Logging
- Structured logging with Winston
- Audit trails in MongoDB
- Error tracking and alerting

## API Design Principles

- RESTful endpoints
- Consistent JSON responses
- HTTP status codes for different scenarios
- Comprehensive error messages
- Versioned API paths (prepared for future versions)

## Data Flow

1. User submits business form → Frontend validation → API call
2. User submits loan form → Frontend validation → API call
3. Combined data sent to decision endpoint
4. Decision engine processes data
5. Results stored in databases
6. Audit log created
7. Response returned to frontend
8. UI displays results

## Assumptions & Constraints

- Monthly revenue is stable and representative
- No external credit bureau integration
- Simple EMI calculation (no interest compounding)
- PAN validation follows Indian format
- Tenure limited to 1-120 months
- No user authentication (public API)

## Future Enhancements

- User authentication and authorization
- Advanced ML-based scoring models
- Real-time dashboard for administrators
- Batch processing capabilities
- Integration with external financial APIs
- Multi-currency support
- Advanced risk modeling

---
title: "Data API Builder: Zero-Code REST and GraphQL APIs for Your Database"
date: "2025-11-08"
excerpt: "Stop writing repetitive CRUD APIs. Learn how Microsoft's Data API Builder auto-generates production-ready REST and GraphQL endpoints from your database with a single configuration file—no backend code required."
tags: ["Data API Builder", "REST", "GraphQL", "Azure", "MySQL", "Database", "API"]
---

# Data API Builder: Zero-Code REST and GraphQL APIs for Your Database

How many hours have you spent writing the same CRUD endpoints over and over? Authentication middleware, input validation, ORM configuration, error handling, unit tests, deployment pipelines—all to expose a few database tables as REST or GraphQL APIs.

**What if you could skip all of that?**

Microsoft's Data API Builder (DAB) eliminates this boilerplate entirely. Point it at your database, write a single configuration file, and you instantly get production-ready REST and GraphQL APIs with enterprise security, filtering, pagination, and Azure integration.

No frameworks. No custom code. No premium tiers. Just a free, open-source engine that does what 80% of backend APIs do: expose database tables over HTTP.

## Who Should Use Data API Builder?

### For Backend Developers: Stop Writing Boilerplate

If you've ever thought:
> *"I'm building the same CRUD endpoints for the 50th time. There has to be a better way."*

Data API Builder is that better way.

**What you gain:**
- Eliminate 1,000+ lines of repetitive API code
- Skip writing unit tests for basic CRUD operations
- Reduce CI/CD pipeline complexity (one container instead of custom app)
- Get GraphQL support without learning Apollo Server or Hot Chocolate
- Deploy to Azure Container Apps in minutes

**What you give up:**
- Complex business logic in API layer (use database views/stored procedures instead)
- Non-standard REST patterns (DAB follows RESTful conventions)

**When to switch:** Your API is 80% standard database operations (read products, create orders, update users) with minimal custom logic. Move that custom logic to database layer or separate microservices.

### For Frontend Developers: Backend in 5 Minutes

If you've ever thought:
> *"I just need a quick API to test my React app. Why does backend setup take days?"*

Think of DAB as:
> **"Instant backend-as-a-service for any database—MySQL, PostgreSQL, SQL Server, or Cosmos DB"**

**What you get:**
- Full CRUD APIs (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) without writing a single line of backend code
- GraphQL endpoint for flexible queries and avoiding over-fetching
- Built-in filtering, sorting, and pagination
- Swagger UI for REST, GraphQL playground for schema exploration
- Docker deployment or Azure hosting

**Perfect for:** Prototyping, MVPs, internal tools, admin dashboards, or any scenario where you control the database schema and need standard data access patterns.

## The 80/20 Solution

Data API Builder handles the 80% of API development that's repetitive:
- CRUD operations
- Authentication and authorization
- Input validation
- Query filtering and pagination
- Database connection management
- OpenAPI/GraphQL schema generation

You focus on the 20% that's unique to your application:
- Business logic (in views, stored procedures, or separate services)
- Complex workflows
- Third-party integrations
- Custom validation rules beyond database constraints

## Quick Start: From Database to API in 5 Minutes

### Prerequisites

```powershell
# Install Data API Builder CLI
dotnet tool install --global Microsoft.DataApiBuilder

# Verify installation
dab --version
```

### Your First API

Let's expose a MySQL product catalog as both REST and GraphQL APIs:

**1. Create database schema** (or use existing):

```sql
CREATE TABLE Product (
    ProductID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    ProductNumber VARCHAR(25) NOT NULL UNIQUE,
    Color VARCHAR(15),
    ListPrice DECIMAL(19,4) NOT NULL,
    ProductCategoryID INT
);

CREATE TABLE ProductCategory (
    ProductCategoryID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL
);
```

**2. Initialize DAB configuration**:

```powershell
# Create config file
dab init --database-type mysql `
  --connection-string "Server=localhost;Database=SalesLT;Uid=user;Pwd=password;"
```

**3. Add entities** (map tables to API endpoints):

```powershell
# Expose Product table
dab add Product --source Product --permissions "anonymous:*"

# Expose ProductCategory table
dab add ProductCategory --source ProductCategory --permissions "anonymous:*"
```

**4. Start the API server**:

```powershell
dab start
```

**That's it!** You now have:

- **REST API**: `http://localhost:5000/api/Product`
- **GraphQL API**: `http://localhost:5000/graphql`
- **Swagger UI**: `http://localhost:5000/swagger`
- **Health Check**: `http://localhost:5000/health`

## The Configuration File: Complete Example

The `dab add` commands created a `dab-config.json` file. Here's what it looks like:

```json
{
  "$schema": "https://github.com/Azure/data-api-builder/releases/download/v1.3.19/dab.draft.schema.json",
  "data-source": {
    "database-type": "mysql",
    "connection-string": "Server=localhost;Database=SalesLT;Uid=user;Pwd=password;",
    "options": {
      "set-session-context": false
    }
  },
  "runtime": {
    "rest": {
      "enabled": true,
      "path": "/api",
      "request-body-strict": true
    },
    "graphql": {
      "enabled": true,
      "path": "/graphql",
      "allow-introspection": true
    },
    "host": {
      "cors": {
        "origins": ["*"],
        "allow-credentials": false
      },
      "authentication": {
        "provider": "StaticWebApps"
      },
      "mode": "development"
    }
  },
  "entities": {
    "Product": {
      "source": "Product",
      "permissions": [
        {
          "actions": ["create", "read", "update", "delete"],
          "role": "anonymous"
        }
      ]
    },
    "ProductCategory": {
      "source": "ProductCategory",
      "permissions": [
        {
          "actions": ["create", "read", "update", "delete"],
          "role": "anonymous"
        }
      ]
    }
  }
}
```

**Key sections:**

- **`data-source`**: Database connection and type (MySQL, PostgreSQL, MSSQL, Cosmos DB)
- **`runtime`**: REST/GraphQL endpoint paths, CORS, authentication provider
- **`entities`**: Table-to-API mappings with role-based permissions

## Simple Feature: REST API with OData Filtering

Once your API is running, you get rich query capabilities out of the box:

### Basic CRUD Operations

```bash
# Get all products
GET http://localhost:5000/api/Product

# Get specific product by ID
GET http://localhost:5000/api/Product/id/1

# Create new product
POST http://localhost:5000/api/Product
Content-Type: application/json

{
  "Name": "Mountain Bike",
  "ProductNumber": "BK-M001",
  "Color": "Red",
  "ListPrice": 1200.00
}

# Update product
PATCH http://localhost:5000/api/Product/id/1
Content-Type: application/json

{
  "ListPrice": 1099.99
}

# Delete product
DELETE http://localhost:5000/api/Product/id/1
```

### OData-Style Filtering

DAB supports powerful query string filters:

```bash
# Filter by color
GET /api/Product?$filter=Color eq 'Red'

# Filter with multiple conditions
GET /api/Product?$filter=ListPrice gt 500 and Color eq 'Red'

# Sorting
GET /api/Product?$orderby=ListPrice desc

# Pagination
GET /api/Product?$top=10&$skip=20

# Select specific fields
GET /api/Product?$select=Name,ListPrice,Color

# Combine multiple filters
GET /api/Product?$filter=ListPrice lt 1000&$orderby=Name&$top=5
```

**OData operators supported:**
- **Comparison**: `eq`, `ne`, `gt`, `ge`, `lt`, `le`
- **Logical**: `and`, `or`, `not`
- **String**: `contains`, `startswith`, `endswith`

### GraphQL Alternative

Same data, different approach:

```graphql
query {
  products(
    filter: { ListPrice: { gt: 500 }, Color: { eq: "Red" } }
    orderBy: { ListPrice: DESC }
    first: 5
  ) {
    items {
      ProductID
      Name
      Color
      ListPrice
    }
  }
}
```

**Why GraphQL?**
- Request exactly the fields you need
- Avoid over-fetching data
- Single request for multiple resources
- Strongly-typed schema with validation

## Advanced Feature: Entity Relationships

Here's where DAB gets powerful: automatic relationship navigation in GraphQL.

### Define Relationships in Configuration

Update your `dab-config.json` to add a relationship between Product and ProductCategory:

```json
{
  "entities": {
    "Product": {
      "source": "Product",
      "permissions": [
        {
          "actions": ["create", "read", "update", "delete"],
          "role": "anonymous"
        }
      ],
      "relationships": {
        "category": {
          "cardinality": "one",
          "target.entity": "ProductCategory",
          "source.fields": ["ProductCategoryID"],
          "target.fields": ["ProductCategoryID"]
        }
      }
    },
    "ProductCategory": {
      "source": "ProductCategory",
      "permissions": [
        {
          "actions": ["create", "read", "update", "delete"],
          "role": "anonymous"
        }
      ],
      "relationships": {
        "products": {
          "cardinality": "many",
          "target.entity": "Product",
          "source.fields": ["ProductCategoryID"],
          "target.fields": ["ProductCategoryID"]
        }
      }
    }
  }
}
```

Or use the CLI:

```powershell
# Add one-to-many relationship from Product to Category
dab update Product --relationship category `
  --target.entity ProductCategory `
  --cardinality one `
  --relationship.fields "ProductCategoryID:ProductCategoryID"

# Add many-to-one relationship from Category to Products
dab update ProductCategory --relationship products `
  --target.entity Product `
  --cardinality many `
  --relationship.fields "ProductCategoryID:ProductCategoryID"
```

### Query Nested Data with GraphQL

Now you can traverse relationships in a single query:

```graphql
query {
  productCategories {
    items {
      ProductCategoryID
      Name
      products {
        items {
          ProductID
          Name
          Color
          ListPrice
        }
      }
    }
  }
}
```

**Response:**

```json
{
  "data": {
    "productCategories": {
      "items": [
        {
          "ProductCategoryID": 1,
          "Name": "Mountain Bikes",
          "products": {
            "items": [
              {
                "ProductID": 1,
                "Name": "Mountain-100 Silver",
                "Color": "Silver",
                "ListPrice": 3399.99
              },
              {
                "ProductID": 2,
                "Name": "Mountain-200 Black",
                "Color": "Black",
                "ListPrice": 2294.99
              }
            ]
          }
        }
      ]
    }
  }
}
```

### Navigate in Both Directions

Query from Product to Category:

```graphql
query {
  products(filter: { Name: { contains: "Mountain" } }) {
    items {
      Name
      ListPrice
      category {
        Name
      }
    }
  }
}
```

**Key Benefits:**
- **No N+1 queries**: DAB optimizes database calls
- **Type-safe traversal**: GraphQL schema validates relationships
- **Single HTTP request**: Get all related data at once
- **No custom resolvers**: Relationships defined purely in config

**REST Limitation**: Relationships only work in GraphQL. REST endpoints return flat data without nested objects.

## Security and Authorization

DAB uses role-based access control (RBAC) with granular permissions.

### System Roles

**Anonymous** (unauthenticated users):

```json
{
  "permissions": [
    {
      "role": "anonymous",
      "actions": ["read"]
    }
  ]
}
```

**Authenticated** (any logged-in user):

```json
{
  "permissions": [
    {
      "role": "authenticated",
      "actions": ["create", "read", "update"]
    }
  ]
}
```

### Custom Roles with Azure AD

```json
{
  "runtime": {
    "host": {
      "authentication": {
        "provider": "AzureAD",
        "jwt": {
          "audience": "your-app-id",
          "issuer": "https://login.microsoftonline.com/{tenant-id}/v2.0"
        }
      }
    }
  },
  "entities": {
    "Product": {
      "permissions": [
        {
          "role": "reader",
          "actions": ["read"]
        },
        {
          "role": "editor",
          "actions": ["create", "read", "update"]
        },
        {
          "role": "admin",
          "actions": ["*"]
        }
      ]
    }
  }
}
```

**Using custom roles:**

```bash
# Client sends role in header
GET /api/Product
Authorization: Bearer {jwt-token}
X-MS-API-ROLE: editor
```

### Field-Level Security

Restrict access to specific columns:

```json
{
  "permissions": [
    {
      "role": "customer",
      "actions": [
        {
          "action": "read",
          "fields": {
            "include": ["ProductID", "Name", "ListPrice"],
            "exclude": ["StandardCost"]
          }
        }
      ]
    }
  ]
}
```

### Policy-Based Authorization

Row-level security using database policies:

```json
{
  "permissions": [
    {
      "role": "user",
      "actions": [
        {
          "action": "read",
          "policy": {
            "database": "@claims.userId eq @item.OwnerId"
          }
        }
      ]
    }
  ]
}
```

DAB automatically passes claims from JWT tokens to the database session context.

## Deployment Options

### Local Development

```powershell
# Development mode (hot reload, introspection)
dab start --config dab-config.json
```

### Docker Container

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY dab-config.json .
RUN dotnet tool install --global Microsoft.DataApiBuilder
ENV PATH="${PATH}:/root/.dotnet/tools"
EXPOSE 5000
CMD ["dab", "start", "--config", "dab-config.json"]
```

```powershell
docker build -t my-dab-api .
docker run -p 5000:5000 my-dab-api
```

### Azure Static Web Apps (Database Connections)

Simplest Azure deployment—no containers required:

```powershell
# Initialize Static Web App with database connection
swa db init --database-type mysql

# Add entities
dab add Product --source Product --permissions "anonymous:*" `
  --config "swa-db-connections/staticwebapp.database.config.json"

# Deploy (automatic via GitHub Actions)
git push
```

Your API is accessible at: `https://your-app.azurestaticapps.net/data-api/api/Product`

### Azure Container Apps

Full container orchestration:

```powershell
# Create resource group
az group create --name dab-rg --location eastus

# Create container app environment
az containerapp env create --name dab-env --resource-group dab-rg

# Deploy DAB container
az containerapp create --name dab-api --resource-group dab-rg `
  --environment dab-env `
  --image mcr.microsoft.com/azure-databases/data-api-builder `
  --target-port 5000 `
  --ingress external `
  --env-vars DATABASE_CONNECTION_STRING=secretref:db-conn `
  --secrets db-conn="Server=...;Database=...;Uid=...;Pwd=..."
```

### Azure Container Instances

Simplest container deployment:

```powershell
az container create --resource-group dab-rg --name dab-api `
  --image mcr.microsoft.com/azure-databases/data-api-builder `
  --dns-name-label my-dab-api `
  --ports 5000 `
  --environment-variables DATABASE_CONNECTION_STRING="Server=..." `
  --cpu 1 --memory 1.5
```

## When to Use DAB vs Alternatives

### Use Data API Builder When:

**80% of your API is standard CRUD operations**
- Product catalogs, user management, order systems
- Admin dashboards, internal tools
- Prototypes and MVPs

**You control the database schema**
- Can add views, stored procedures, or indexes
- Database-first development approach

**You need both REST and GraphQL**
- Mobile apps prefer GraphQL
- Legacy integrations need REST
- Don't want to maintain two codebases

**You're already on Azure**
- Native Static Web Apps integration
- Easy deployment to Container Apps/Instances
- Azure AD authentication out of the box

**Security through configuration, not code**
- Role-based permissions in config file
- No authentication middleware to write
- Leverage existing Azure AD/JWT infrastructure

### Use Custom API Framework When:

**Complex business logic in API layer**
- Multi-step workflows with external service calls
- Complex validation beyond database constraints
- Heavy data transformation before responses

**Non-standard API patterns**
- WebSockets for real-time features
- File uploads/downloads
- SSE (Server-Sent Events)
- Custom HTTP methods or headers

**Database-agnostic abstraction needed**
- Switching databases frequently
- Multiple database types in single API
- Heavy use of ORM-specific features

### Comparison Matrix

| Feature | Data API Builder | Custom API (Express/ASP.NET) | Hasura | PostgREST |
|---------|------------------|------------------------------|--------|-----------|
| **Code Required** | Zero (config only) | High | Zero (config only) | Zero (config only) |
| **REST Support** | ✅ Full | ✅ Full | ⚠️ Limited | ✅ Full |
| **GraphQL Support** | ✅ Full | ⚠️ Manual | ✅ Full | ❌ No |
| **Database Support** | 6 types | Any | PostgreSQL only | PostgreSQL only |
| **Azure Integration** | ✅ Native | ⚠️ Manual | ⚠️ Manual | ⚠️ Manual |
| **Authentication** | Built-in | Manual | Built-in | Manual |
| **Cost** | Free | Free | Free/Paid | Free |
| **Custom Logic** | Views/SPs | ✅ Full control | Actions/Events | Functions |
| **Learning Curve** | Low | High | Medium | Low |

## Real-World Use Cases

### 1. Admin Dashboard for E-Commerce

**Challenge:** Need CRUD interface for products, orders, customers—200+ database tables.

**DAB Solution:**
```powershell
# Generate entities for all tables
foreach ($table in Get-Tables) {
  dab add $table --source $table --permissions "admin:*"
}
```

Result: Instant APIs for every table, secured with Azure AD, deployed to Static Web Apps.

### 2. Mobile App Backend

**Challenge:** iOS/Android apps need flexible data queries to avoid over-fetching.

**DAB Solution:**
- GraphQL endpoint for mobile apps
- REST endpoint for legacy web app
- Single backend serves both

```graphql
# Mobile app queries exactly what it needs
query {
  orders(filter: { userId: { eq: $userId } }) {
    items {
      orderId
      status
      total
      items {
        productName
        price
        quantity
      }
    }
  }
}
```

### 3. Microservices Data Layer

**Challenge:** 10 microservices, each needs database access with authentication.

**DAB Solution:**
- One DAB instance per database
- All microservices use DAB APIs instead of direct database access
- Centralized authentication, logging, and monitoring

### 4. Rapid Prototyping

**Challenge:** Frontend team needs working API to start development, backend team still designing schema.

**DAB Solution:**
- Define database schema
- Run DAB locally
- Frontend starts building immediately
- Backend team refines schema, DAB auto-updates

## Best Practices and Tips

### 1. Use Environment Variables for Secrets

```json
{
  "data-source": {
    "connection-string": "@env('DATABASE_CONNECTION_STRING')"
  }
}
```

Or Azure Key Vault:

```json
{
  "connection-string": "@akv('https://myvault.vault.azure.net/secrets/db-conn')"
}
```

### 2. Restrict CORS in Production

```json
{
  "runtime": {
    "host": {
      "cors": {
        "origins": ["https://myapp.com"],
        "allow-credentials": true
      },
      "mode": "production"
    }
  }
}
```

### 3. Use Database Views for Complex Queries

Instead of exposing raw tables, create views with pre-joined data:

```sql
CREATE VIEW ProductSummary AS
SELECT 
  p.ProductID,
  p.Name,
  p.ListPrice,
  c.Name AS CategoryName,
  m.Name AS ModelName
FROM Product p
LEFT JOIN ProductCategory c ON p.ProductCategoryID = c.ProductCategoryID
LEFT JOIN ProductModel m ON p.ProductModelID = m.ProductModelID;
```

```powershell
dab add ProductSummary --source ProductSummary --source.type view `
  --source.key-fields "ProductID" --permissions "anonymous:read"
```

### 4. Leverage Stored Procedures for Custom Logic

```sql
CREATE PROCEDURE GetProductsByPriceRange(
  @MinPrice DECIMAL(19,4),
  @MaxPrice DECIMAL(19,4)
)
AS
BEGIN
  SELECT * FROM Product 
  WHERE ListPrice BETWEEN @MinPrice AND @MaxPrice
  ORDER BY ListPrice;
END
```

```powershell
dab add GetProductsByPriceRange `
  --source dbo.GetProductsByPriceRange `
  --source.type stored-procedure `
  --permissions "anonymous:execute" `
  --rest.methods "post" `
  --graphql.operation "query"
```

### 5. Enable Monitoring with Application Insights

```json
{
  "runtime": {
    "telemetry": {
      "application-insights": {
        "connection-string": "@env('APPINSIGHTS_CONNECTION_STRING')",
        "enabled": true
      }
    }
  }
}
```

## Limitations to Know

### What DAB Doesn't Do

- **File uploads/downloads**: Use Azure Blob Storage API directly
- **WebSockets/real-time**: Use SignalR or Azure Web PubSub
- **Complex transactions**: Use stored procedures or separate service
- **Email/SMS**: Integrate with SendGrid/Twilio separately
- **Heavy data transformation**: Do in database views or client-side

### GraphQL Limitations

- Relationships only support one-hop navigation (no deep nesting)
- No GraphQL subscriptions (queries and mutations only)
- Stored procedures return first result set only

### REST Limitations

- No relationship navigation (GraphQL only)
- OData support is partial (not full OData v4 spec)

## Getting Help and Resources

### Official Documentation
- [Data API Builder Overview](https://learn.microsoft.com/azure/data-api-builder/)
- [Configuration Reference](https://learn.microsoft.com/azure/data-api-builder/configuration/)
- [CLI Command Reference](https://learn.microsoft.com/azure/data-api-builder/reference-cli)
- [Deployment Guide](https://learn.microsoft.com/azure/data-api-builder/deployment/)

### Sample Repository
- [GitHub: data-api-builder-sample](https://github.com/HiIAmShashank/data-api-builder-sample)
- Complete MySQL example with Docker setup
- Postman collection for testing
- Azure deployment templates

### Tools
- [DAB CLI](https://www.nuget.org/packages/Microsoft.DataApiBuilder) - Command-line interface
- [Swagger UI](http://localhost:5000/swagger) - REST API documentation
- [GraphQL Playground](http://localhost:5000/graphql) - Interactive GraphQL explorer

## Conclusion

Data API Builder solves a real problem: the massive amount of repetitive code required to expose databases as APIs. Instead of writing hundreds or thousands of lines of boilerplate CRUD operations, authentication middleware, and deployment configuration, you write a single JSON file.

For the right use cases—and there are many—this is transformative:

**For backend developers**: Eliminate weeks of grunt work and focus on unique business logic.

**For frontend developers**: Get production-ready APIs in minutes, not days.

**For teams**: Standardize API patterns, reduce maintenance burden, and accelerate delivery.

The key insight is recognizing when your API is 80% standard database operations. When it is, DAB lets you skip the boring parts and ship faster. When it's not, you still write custom code—but now you know exactly where the complexity lies.

**Ready to try it?** Clone the [sample repository](https://github.com/HiIAmShashank/data-api-builder-sample), run `dab start`, and watch your database become a fully-functional REST and GraphQL API in under 5 minutes.

The best API code is the code you don't have to write.

---
